import { scrollbar, scrollbar__horizontal } from "../../scripts/components"
import { dumpCssThenClearCache, IRenderHtmlOption, renderHtmlTo } from "../../scripts/libs/dumb_html5str_renderer"
import Page from "./page"

const APP_GLOBAL_CSS = `
  @font-face {
    font-family: ZeroProtoNerdFont;
    font-display: swap;
    src: url("../assets/da_font.woff2") format('woff2');
  }

  html { overflow: hidden; }

  :root {
    font-family: ZeroProtoNerdFont, Arial, Helvetica, sans-serif;
  }
`

const htmlRendererOptions: IRenderHtmlOption = {
  title: "Interactive Photo Gallery",
  reason: `A fairly, very simple gallery page with a little bit of javascript, for the https://www.coursera.org/learn/javascript. Template is forked from: https://codepen.io/ColleenEMc/pen/wKYxZa`,
  noFlashbangWhenOpened: true,
  libraryUsed: "libduck_haxjsx2html5 palette@catppuccin_mocha",
  css: `${APP_GLOBAL_CSS} ${dumpCssThenClearCache()}`,
  bodyClass: `${scrollbar} ${scrollbar__horizontal}`
}

renderHtmlTo("./docs/05-gallery-js-w-template/parks.html", htmlRendererOptions, <Page />)