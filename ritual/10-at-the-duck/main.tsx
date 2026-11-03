import { scrollbar, scrollbar__vertical } from "../../scripts/components"
import { renderHtmlTo } from "../../scripts/libs/dumb_html5str_renderer"
import HomePage from "./page"

const APP_GLOBAL_CSS = `
  @font-face {
    font-family: ZeroProtoNerdFont;
    font-display: swap;
    src: url("../assets/SourGummy.woff2") format('woff2');
  }

  html { overflow: hidden; }

  :root {
    font-family: ZeroProtoNerdFont, Arial, Helvetica, sans-serif;
  }
`

renderHtmlTo("./docs/10-at-the-duck/index.html", {
  noFlashbangWhenOpened: true,
  title: "The duck dot info",
  reason: "The final project for Web Design for Everybody - https://www.coursera.org/learn/web-design-project - of course, in a very unserious way.",
  libraryUsed: "jsx2html5 palette@catppuccin_mocha",
  css: APP_GLOBAL_CSS,
  shouldIncludeSomeUnrelatedBodyAttributes: false,
  bodyClass: `${scrollbar} ${scrollbar__vertical}`
}, <HomePage />)