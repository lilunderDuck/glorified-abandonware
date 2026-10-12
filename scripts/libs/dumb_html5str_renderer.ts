import fs from "node:fs"
import { JSX } from "react" // type def only

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

// @ts-ignore - MUST accept my overload
export function elm<T extends keyof HTMLElementTagNameMap>(
  tag: T, 
): string
// everything after this is fine, but you (peer) won't know that
// typescript is just javascript with types...
// at least it's better than ? extends SomeClass<? super AnotherClass>
export function elm<T extends keyof HTMLElementTagNameMap>(
  tag: T, 
  child: ChildNodeCompatible
): string
export function elm<T extends keyof HTMLElementTagNameMap>(
  tag: T, 
  tagAttributes: HTMLAttribute<T>,
  child: ChildNodeCompatible
): string
export function elm<T extends keyof HTMLElementTagNameMap>(
  tag: T, 
  tagAttributes: HTMLAttribute<T> | undefined, 
  child: ChildNodeCompatible = []
): string {
  let stringifiedAttribute = ""
  let childern = stringifyChildern(child)
  // overload #2 workaround: the second argument of that overload is
  // ChildNodeCompatible and not Partial<HTMLElementTagNameMap[T]>, we have to make sure
  // that it *actually* an object
  if (typeof tagAttributes === "object" && !Array.isArray(tagAttributes)) {
    for (let attributeName in tagAttributes) {
      // edge-case: javascript land call "class"... "className"
      // so we need to handle that as well
      // oh god, the ReactJS flashback is getting me
      if (attributeName == "className") {
        // ...which allow us to do this weird cast, just to... make typescript happy
        attributeName = "class" as Extract<keyof HTMLElementTagNameMap[T], string>
      }
      stringifiedAttribute += `${attributeName}="${tagAttributes[attributeName]}" `
    }
  } else {
    childern = stringifyChildern(tagAttributes as ChildNodeCompatible) // overload #2
  }

  return `<${tag}${tagAttributes ? ` ${stringifiedAttribute}` : ""}>${childern}</${tag}>`
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
  <!-- You can thank me later (when you're opening this page on a dark room), also can't put my neety custom attribute why=... inside this, w3c won't be too happy -->
  <style why="prevent flashbang when reload/open this">
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
        <script src="../assets/peer_rating_sim.js" defer></script>
        <script defer>document.addEventListener('DOMContentLoaded', () => shout("[none]"))</script>
        ${options.noFlashbangWhenOpened ? NO_FLASHBANG_WORKAROUND : ""}
      </head>
      <body>
        <!-- You may believe that this page uses react, but no, it's plain html (and some CSS of course), but can you guess which [javascript] framework generates this kind of html? -->
        ${recursivelyRenderJSXFast(app) /* spoiler: it's **not** fast */}
      </body>
    </html>
  `)
}

function recursivelyRenderJSXFast(app: JSX.Element) {
  return ""
}