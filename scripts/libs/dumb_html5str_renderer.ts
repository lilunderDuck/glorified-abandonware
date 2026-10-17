import fs from "node:fs"
import { Fragment, type JSX, type ReactElement } from "react" // type def only
import { compile, serialize, stringify } from 'stylis'
import { AnyRandomizerFn, createWordSlidingRandomizer } from "./dumb_random"

declare global {
  // only be used for its jsx types
  namespace React {
    // patch: add class attribute, because we absolutely can
    // (since we don't care anything about reactive stuff and just a static site)
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      class?: string
    }
  }
}

interface IRendererGlobalContext {
  readonly cssClasses: {
    nameRandomizer: AnyRandomizerFn,
    wordLength: number
  }
}

export const GLOBAL_CONTEXT: IRendererGlobalContext = {
  cssClasses: {
    nameRandomizer: createWordSlidingRandomizer(),
    wordLength: 4,
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
    if (attributeName == "children") {
      continue // skip
    }
    // edge-case: javascript land call "class"... "className"
    // so we need to handle that as well
    // oh god, the ReactJS flashback is getting me
    if (attributeName == "className") {
      // also to make typescript happy, as always
      attributeName = "class" as Extract<keyof HTMLElementTagNameMap[T], string>
    }
    stringifiedAttribute += `${attributeName}="${tagAttributes[attributeName]}" `
  }

  // Fix w3c error: Stray end tag img.
  if (["img"].includes(tag)) {
    return `<${tag}${tagAttributes ? ` ${stringifiedAttribute.trim()}` : ""}>`
  }

  return `<${tag}${tagAttributes ? ` ${stringifiedAttribute.trim()}` : ""}>${childern}</${tag}>` as const
}

const cachedCssValues = new Set<string>()

export function dumpCssThenClearCache() {
  let everything = ""
  for (const cssRule of cachedCssValues.values()) {
    everything += cssRule
  }

  cachedCssValues.clear()

  return everything
}

/**Dummy css function to make use of styled-component highlighting */
export function css(template: TemplateStringsArray): string {
  const rawCss = template.join(' ')
  const randomName = GLOBAL_CONTEXT.cssClasses.nameRandomizer(GLOBAL_CONTEXT.cssClasses.wordLength)

  const compiled = serialize(compile(`.${randomName}{${rawCss}}`), stringify)
  cachedCssValues.add(compiled)
  
  return randomName
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

export interface IRenderHtmlOption {
  title: string
  reason: string
  libraryUsed?: string
  css: string
  /**Prevent white "flash" on page load */
  noFlashbangWhenOpened: boolean
  bodyClass?: string
  /**When setting to `true`, it will print the project name with libaries used and 
   * a "disclaimer" message, just to make sure anyone on coursera rate my works
   * correctly.
   * 
   * @default true
   * @see `peer_rating_sim.ts` for the message
   */
  shouldIncludeDisclaimer?: boolean
  isRoot?: boolean
}

export function renderHtmlTo(fileName: string, options: IRenderHtmlOption, app: JSX.Element) {
  if (options.shouldIncludeDisclaimer === undefined) {
    options.shouldIncludeDisclaimer = true
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
        <style data-inline>${options.css}</style>
      </head>
      <body data-should-confuse-you="true" data-dukasmd="jump break"${options.bodyClass ? ` class="${options.bodyClass}"` : ""}>
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