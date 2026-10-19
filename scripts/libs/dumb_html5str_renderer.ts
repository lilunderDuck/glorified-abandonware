import fs from "node:fs"
import { Fragment, type JSX, type ReactElement } from "react" // type def only
import { compile, serialize, stringify, type Element as CSSElement } from 'stylis'
import { createSingleWordSlidingRandomizer, createWordSlidingRandomizer } from "./dumb_random"

declare global {
  // only be used for its jsx types
  namespace React {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      // patch: add class attribute, because we absolutely can
      // (since we don't care anything about reactive stuff and just a static site)
      class?: string
      // patch: patching out the 'style' attribute so I can directly write
      // CSS properties in string.
      // @ts-ignore - duplicated declaration, but we can ignore it.
      style?: CSSProperties | undefined | string
    }
  }
}

type ChildNodeCompatible = string | number | null | undefined | ChildNodeCompatible[]
type HTMLAttribute<T extends keyof HTMLElementTagNameMap> = Partial<HTMLElementTagNameMap[T]> & {
  class?: string
  // workaround hack: add this catch-all index to make typescript happy
  [any: string]: string | undefined
}

function elm<T extends keyof HTMLElementTagNameMap>(
  tag: T, 
  tagAttributes: HTMLAttribute<T> | undefined, 
  child: ChildNodeCompatible = []
) {
  let stringifiedAttribute = ""
  let childern = stringifyChildern(child)

  // don't count "children" attribute, otherwise the tag will have an extra space
  if (tagAttributes && 'children' in tagAttributes && Object.keys(tagAttributes).length == 1) {
    tagAttributes = undefined
  }
  
  for (let attributeName in tagAttributes) {
    let attributeValue = tagAttributes[attributeName]
    if (attributeName == "children") {
      continue // skip
    }

    if (attributeName === "defer") { // encounter "defer" attribute in <script> element
      attributeValue = "" // patch the value of "defer" from "true" to "" (nothing)
    }

    // edge-case: javascript land call "class"... "className"
    // so we need to handle that as well
    // oh god, the ReactJS flashback is getting me
    if (attributeName == "className") {
      // also to make typescript happy, as always
      attributeName = "class" as Extract<keyof HTMLElementTagNameMap[T], string>
    }
    stringifiedAttribute += `${attributeName}="${attributeValue}" `
  }

  // Fix w3c error: Stray end tag img.
  if (["img"].includes(tag)) {
    return `<${tag}${tagAttributes ? ` ${stringifiedAttribute.trim()}` : ""}>`
  }

  return `<${tag}${tagAttributes ? ` ${stringifiedAttribute.trim()}` : ""}>${childern}</${tag}>` as const
}

function stringifyChildern(child: ChildNodeCompatible) {
  let childern = ""
  if (!child) {
    // do nothing
  } else {
    childern = `${child}`
  }

  if (Array.isArray(child)) {
    childern = child.join('')
  }

  return childern
}

const cachedCssValues = new Map<string, string>()
function dumpCssThenClearCache() {
  let everything = ""
  for (const cssRule of cachedCssValues.values()) {
    everything += cssRule
  }

  cachedCssValues.clear()

  return everything
}

export const CSS_GLOBAL_CONTEXT = {
  currentHandler: cssDefaultHandler()
}

/**Dummy-ish css templated function to make use of `styled-component` highlighting.
 * 
 * To create style, all you need to do is:
 * ```tsx
 * const app__page = css`
 *   padding-inline: 10px;
 *   padding-block: 15px;
 *   &:hover {
 *     background-color: black;
 *   }
 * `
 * 
 * // use it somewhere, example:
 * <div class={app__page} />
 * ```
 * 
 * To swap out the generator responsible for generating CSS name:
 * ```
 * // dumbconfig.ts
 * import { yourHandler } from "./somewhere"
 * import { CSS_GLOBAL_CONTEXT } from "./dumb_html5str_renderer"
 * // must be on top!
 * CSS_GLOBAL_CONTEXT.currentHandler = yourHandler
 * 
 * // main.ts
 * import "./dumbconfig" // make sure that it on the top of all of the imports
 * import ...
 * 
 * // then you can use it like normal
 * const app__page = css`... some styles ...`
 * ```
 * 
 * @param template the templated string array, just ignore it and follow the example above.
 * @returns the compiled CSS classnames
 * @see `dumb_random.ts` for example randomizer function
 * @see {@link cssDefaultHandler()} - the default CSS class name handler
 * @see {@link cssAtomicHandler()} - more chaos version of the tame `cssDefaultHandler()`
 */
export function css(template: TemplateStringsArray): string {
  const rawCss = template.join(' ')
  return CSS_GLOBAL_CONTEXT.currentHandler(rawCss)
}

/**The default CSS class name handler, it's fine.
 * 
 * Instead of readable name like `page__root` (for example), it will literaly generate:
 * `the_missle_knows_where`, thank to my randomizer.
 * @returns 
 */
export function cssDefaultHandler() {
  const nameRandomizer = createWordSlidingRandomizer()
  const MAX_WORD_LENGTH = 4
  return (rawCss: string) => {
    const randomName = nameRandomizer(MAX_WORD_LENGTH)

    const compiled = serialize(compile(`.${randomName}{${rawCss}}`), stringify)
    cachedCssValues.set(compiled, compiled)
    
    return randomName
  }
}

/**An (almost) accurate atomic CSS-in-js handler. "Atomic" just means it will generate a class name
 * for every style `property: value` pair, [`tailwind css`](https://tailwindcss.com/) but fancier.
 * 
 * What does it do is... basically, if I have some style:
 * ```
 * const someStyl = css`
 *   padding-inline: 10px;
 *   &:hover {
 *     background-color: red;
 *     color: black;
 *   }
 * `
 * ```
 * 
 * It will generate something lile this one:
 * ```
 * // generated CSS name
 * const someStyl = "d6zW1 f3BS3 z8TKe"
 * ```
 * ```css
 * .d6zW1 { padding-inline: 10px }
 * .f3BS3:hover { background-color: red }
 * .z8TKe:hover { color: black }
 * ```
 * 
 * Except, for this one, it doesn't handle style duplication, **nested style is not breaking down**,
 * and the name is not a cat running through a keyboard.
 * 
 * Which also mean:
 * ```
 * const style_1 = css`
 *   padding-inline: 10px;
 *   &:hover {
 *     background-color: red;
 *     color: black;
 *   }
 * `
 * 
 * const style_2 = css`
 *   padding-inline: 10px;
 * `
 * ```
 * 
 * ...will generate this:
 * ```
 * // generated CSS name, the name is from my source set
 * const style_1 = "the missle"
 * const style_2 = "knows"
 * ```
 * 
 * ```css
 * .the { padding-inline: 10px; }
 * .missle:hover { background-color: red; color: black }
 * .knows { padding-inline: 10px; } // duplicated padding-inline property here
 * ```
 * 
 * @param nameRandomizer a randomizer function to generate CSS class name, 
 * default is `createSingleWordSlidingRandomizer()`
 * 
 * @see {@link createSingleWordSlidingRandomizer()}
 * @see {@link simpleCSSBlocksParser()}
 * @returns 
 */
export function cssAtomicHandler(nameRandomizer = createSingleWordSlidingRandomizer()) {
  const MAX_WORD_LENGTH = 1

  return (rawCss: string) => {
    const { rootDeclarations, nestedBlocks } = simpleCSSBlocksParser(rawCss)
    const compiledClassnames: string[] = []

    for (const [prop, val] of Object.entries(rootDeclarations)) {
      // const cacheKey = `${prop}:${val}`
      const thisClassname = nameRandomizer(MAX_WORD_LENGTH)
      const rule = `.${thisClassname} { ${prop}: ${val}; }` as const
      const compiled = serialize(compile(rule), stringify)
      
      cachedCssValues.set(compiled, compiled)
      compiledClassnames.push(thisClassname)
    }

    if (nestedBlocks.length > 0) {
      const baseClass = nameRandomizer(MAX_WORD_LENGTH)
      
      for (const block of nestedBlocks) {
        const nestedRule = `.${baseClass} { ${block.selector} { ${block.body} } }` as const
        const compiled = serialize(compile(nestedRule), stringify)
        
        cachedCssValues.set(compiled, compiled)
      }
      compiledClassnames.push(baseClass)
    }
    
    return compiledClassnames.join(' ')
  }
}

interface IFastCSSParserRef { 
  nestedBlocks: { selector: string; body: string }[]
}

function simpleCSSBlocksParser(cssString: string) {
  // Functions are passed by reference, so we can pass in a object
  // to mutate (I called) "ref" object
  const ref: IFastCSSParserRef = {
    nestedBlocks: []
  }

  const rootText = recursivelyParseCSSFast(compile(cssString), ref)
  
  // Parse remaining root declarations separated by semicolons
  const rootDeclarations: Record<string, string> = {}
  rootText.split(';').forEach(rule => {
    const [prop, val] = rule.split(':').map(s => s.trim())
    if (prop && val) {
      rootDeclarations[prop] = val
    }
  })

  return { rootDeclarations, nestedBlocks: ref.nestedBlocks }
}

function recursivelyParseCSSFast(thisCssRule: CSSElement[], ref: IFastCSSParserRef) {
  let rootText = ""
  for (const cssRule of thisCssRule) {
    // cssRule.type have the type of: string
    // would be the best if they declare a type for their css type...
    switch (cssRule.type) {
      case "decl":
        rootText += cssRule.value
      continue

      case "rule":
        if (!Array.isArray(cssRule.children)) {
          throw new Error(`panic: wrong type passed in`)
        }

        ref.nestedBlocks.push({
          body: recursivelyParseCSSFast(cssRule.children, ref),
          // Don't know why my selector names include \F character,
          // so we gonna make sure it doesn't do weird shit with our output
          selector: cssRule.value.replaceAll("\f", "")
        })

      continue

      case "comm": // comment
        // ... skip ...
      continue
    
      default:
        throw new Error("panic: unknown CSS type: " + cssRule.type)
    }
  }

  return rootText
} /* Not fast, as always */

export interface IRenderHtmlOption {
  title: string
  reason: string
  libraryUsed?: string
  /**Additional CSS (e.g global styles) to the page, default will be
   * the generated CSS output by `dumpCssThenClearCache()` function.
   * @default "... css output ..."
   * @see {@link css}
   * @see {@link dumpCssThenClearCache()}
   */
  css?: string
  /**Prevent white "flash" on page load */
  noFlashbangWhenOpened: boolean
  bodyClass?: string
  /**When setting to `true`, it will print the project name with libaries used and 
   * a "disclaimer" message, just to make sure anyone on coursera rate my works
   * correctly.
   * @default true
   * @see `peer_rating_sim.ts` for the message
   */
  shouldIncludeDisclaimer?: boolean
  /**When setting to `true`, it will inject the following attribute into the `<body />` tag.
   * ```
   * data-should-confuse-you="true" data-dukasmd="jump break"
   * ```
   * @default true
   */
  shouldIncludeSomeUnrelatedBodyAttributes?: boolean
  isRoot?: boolean
}

export function renderHtmlTo(fileName: string, options: IRenderHtmlOption, app: JSX.Element) {
  if (options.shouldIncludeDisclaimer === undefined) {
    options.shouldIncludeDisclaimer = true
  }

  if (options.shouldIncludeSomeUnrelatedBodyAttributes === undefined) {
    options.shouldIncludeSomeUnrelatedBodyAttributes = true
  }

  const INCLUDE_DISCLAIMER_SCRIPTS = `
    <!-- Make sure to love coursera peer-rated project -->
    <script src="../assets/peer_rating_sim.js" defer></script>
    <script>document.addEventListener('DOMContentLoaded', () => duck.simulatePeerRatingExperience("${options.libraryUsed ?? '[none]'}", "${options.title}"))</script>
  `

  const NO_FLASHBANG_WORKAROUND = `
    <!-- Aw, why I can't use my custom attribute W3C, I'm beggin' -->
    <style data-why="prevent flashbang when reload/open this">
      html {background-color: #11111b}
    </style>
  `

  const CONFUSION_HINT = ` data-should-confuse-you="true" data-dukasmd="jump break"`

  // script notice: why the hell w3 mark "defer" attribute on a <script /> without src an error?
  //   "An inline script element (i.e., a script element without a src attribute and with 
  //   a type attribute that is either unspecified, empty, or a JavaScript MIME type) must not 
  //   have a defer attribute."
  fs.writeFileSync(fileName, `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>${options.title}</title>
        <link rel="stylesheet" href="${options.isRoot ? "" : "."}./assets/base.css">
        <meta name="description" content="${options.reason}">
        <meta name="duck" content="this is duck">
        ${options.shouldIncludeDisclaimer ? INCLUDE_DISCLAIMER_SCRIPTS : ""}
        ${options.noFlashbangWhenOpened ? NO_FLASHBANG_WORKAROUND : ""}
        <style data-inline>${`${options.css ?? ""} ${dumpCssThenClearCache()}`.trim()}</style>
      </head>
      <body${options.shouldIncludeSomeUnrelatedBodyAttributes ? CONFUSION_HINT : ""}${options.bodyClass ? ` class="${options.bodyClass}"` : ""}>
        <!-- You may believe that this page uses react, but no, it's plain html (and some CSS of course), but can you guess which [javascript] framework generates this kind of html? -->
        ${recursivelyRenderJSXFast(app) /* spoiler: this function is **not** fast */}
      </body>
    </html>
  `)
}

// Used dummy HTMLAttribute<"div"> because I'm lazy
type AnyReactElement = ReactElement<
  HTMLAttribute<"div"> & { children: any[] }, 
  keyof HTMLElementTagNameMap
>

function recursivelyRenderJSXFast(element: JSX.Element | JSX.Element[]): string {
  // check for 'null' or 'undefined' case
  if (element == null || element == undefined) return ''

  if (Array.isArray(element)) {
    let stringifiedElement = ""
    for (const someElement of element) {
      if (typeof someElement === "string") {
        stringifiedElement += someElement
        continue
      }
      
      if (isExactlyAReactElement(someElement)) { // sanity check
        stringifiedElement += recursivelyRenderJSXFast(someElement)
      }
    }

    return stringifiedElement
  }

  if (typeof element === "string" || typeof element === "number") {
    return element
  }
  
  // edge-case: using other component like <OtherComponent />
  if (typeof element?.type === "function") {
    return recursivelyRenderJSXFast(element.type(element.props))
  }

  // edge-case: dealing with fragments, these guys -> <></>
  if (isExactlyAReactElement(element) && Object.is(element.type, Fragment)) {
    return recursivelyRenderJSXFast(element.props.children)
  }

  if (isExactlyAReactElement(element)) {
    const isEmptyProps = Object.keys(element.props).length === 0
    return elm(element.type, isEmptyProps ? undefined : element.props, recursivelyRenderJSXFast(element.props.children))
  }

  throw new Error(`panic: unknown element type ${element}`)
}

function isExactlyAReactElement(element: JSX.Element): element is AnyReactElement {
  if (typeof element !== "object") return false

  return 'type' in element && 
    'key' in element && 
    'ref' in element
}