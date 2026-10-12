import fs from "node:fs"
import type { HTMLAttributes, JSX, ReactElement } from "react" // type def only

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

type ChildNodeCompatible = string | number | null | undefined | ChildNodeCompatible[]
type HTMLAttribute<T extends keyof HTMLElementTagNameMap> = Partial<HTMLElementTagNameMap[T]> & {
  class?: string
  // workaround hack: add this catch-all index to make typescript happy
  [any: string]: string | undefined
}

export function elm<T extends keyof HTMLElementTagNameMap>(
  tag: T, 
  tagAttributes: HTMLAttribute<T> | undefined, 
  child: ChildNodeCompatible = []
): string {
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

  return `<${tag}${tagAttributes ? ` ${stringifiedAttribute.trim()}` : ""}>${childern}</${tag}>`
}

/**Dummy css function to make use of styled-component highlighting */
export function css(template: TemplateStringsArray): string {
  return template.join(' ')
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

const NO_FLASHBANG_WORKAROUND = `
  <!-- Aw, why I can't use my custom attribute W3C, I'm beggin' -->
  <style data-why="prevent flashbang when reload/open this">
    html {background-color: #11111b}
  </style>
`

interface IRenderHtmlOption {
  title: string
  reason: string
  /**Prevent white "flash" on page load */
  noFlashbangWhenOpened: boolean
}

export function renderHtmlTo(fileName: string, options: IRenderHtmlOption, app: JSX.Element) {
  fs.writeFileSync(fileName, `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>${options.title}</title>
        <link rel="stylesheet" href="../assets/base.css">
        <meta name="description" content="${options.reason}">
        <meta name="duck" content="this is duck">
        <!-- Make sure to love coursera peer-rated project -->
        <script src="../assets/peer_rating_sim.js" defer></script>
        <script defer>document.addEventListener('DOMContentLoaded', () => shout("[none]"))</script>
        ${options.noFlashbangWhenOpened ? NO_FLASHBANG_WORKAROUND : ""}
      </head>
      <body data-should-confuse-you="true" data-dukasmd="jump break">
        <!-- You may believe that this page uses react, but no, it's plain html (and some CSS of course), but can you guess which [javascript] framework generates this kind of html? -->
        ${recursivelyRenderJSXFast(app.type()) /* spoiler: this function is **not** fast */}
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

  if (typeof element === "string") {
    return element
  }

  if (isExactlyAReactElement(element)) {
    const isEmptyProps = Object.keys(element.props).length === 0
    return elm(element.type, isEmptyProps ? undefined : element.props, recursivelyRenderJSXFast(element.props.children))
  }

  throw new Error(`panic: unknown element type ${element.type}`)
}

function isExactlyAReactElement(element: JSX.Element): element is AnyReactElement {
  return 'type' in element && 
    'key' in element && 
    'props' in element && 
    '_owner' in element // one more, just to make sure
}