import "./dumbconfig"
import { IRenderHtmlOption, renderHtmlTo } from "../../scripts/libs/dumb_html5str_renderer"
import Page from "./page"

const APP_GLOBAL_CSS = `
  @font-face {
    font-family: ZeroProtoNerdFont;
    font-display: swap;
    src: url("../assets/ComicRelief-Bold.woff2") format('woff2');
  }

  html { overflow: hidden; }

  :root {
    font-family: ZeroProtoNerdFont, Arial, Helvetica, sans-serif;
  }
`

const htmlRendererOptions: IRenderHtmlOption = {
  reason: `Of course, a final project for Interactivity with JavaScript course - https://www.coursera.org/learn/javascript - on coursera, totally nothing complex hidden inside this page.`,
  title: "A moment of time",
  noFlashbangWhenOpened: true,
  libraryUsed: "libduck_haxjsx2html5 palette@catppuccin_mocha",
  css: APP_GLOBAL_CSS,
  shouldIncludeSomeUnrelatedBodyAttributes: false
}

renderHtmlTo("./docs/06-a-moment-of-time/index.html", htmlRendererOptions, <Page />)