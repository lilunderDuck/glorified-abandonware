import { scrollbar, scrollbar__horizontal } from "../../scripts/components"
import { IRenderHtmlOption, renderHtmlTo } from "../../scripts/libs/dumb_html5str_renderer"
import Page from "./page"

const APP_GLOBAL_CSS = `
  @font-face {
    font-family: ZeroProtoNerdFont;
    font-display: swap;
    src: url("./assets/SourGummy.woff2") format('woff2');
  }

  html { overflow: hidden; }

  :root {
    font-family: ZeroProtoNerdFont, Arial, Helvetica, sans-serif;
  }
`

const htmlRendererOptions: IRenderHtmlOption = {
  reason: `Tracking all of my projects score on coursera.`,
  title: "Glorified abandonware - submission tracker",
  noFlashbangWhenOpened: true,
  libraryUsed: "jsx2html5 palette@catppuccin_mocha",
  css: APP_GLOBAL_CSS,
  bodyClass: `${scrollbar} ${scrollbar__horizontal}`,
  shouldIncludeDisclaimer: false,
  isRoot: true
}

renderHtmlTo("./docs/index.html", htmlRendererOptions, <Page />)