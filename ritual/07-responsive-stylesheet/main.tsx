import { IRenderHtmlOption, renderHtmlTo } from "../../scripts/libs/dumb_html5str_renderer"
import Page from "./page"

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

const htmlRendererOptions: IRenderHtmlOption = {
  // look at that beautiful github url.
  reason: `A generic responsive website, this is a fork from https://github.com/academic-innovation-online-learning/WD4E-Advanced_Styling_with_Responsive_Design/tree/main/RD-week2-responsive_hw_starter.`,
  title: "Responsive website",
  noFlashbangWhenOpened: true,
  libraryUsed: "jsx2html5 palette@catppuccin_mocha",
  css: APP_GLOBAL_CSS,
  shouldIncludeSomeUnrelatedBodyAttributes: false
}

renderHtmlTo("./docs/06-a-moment-of-time/index.html", htmlRendererOptions, <Page />)