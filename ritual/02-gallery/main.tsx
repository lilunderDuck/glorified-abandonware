import { scrollbar, scrollbar__horizontal } from "../../scripts/components"
import { dumpCssThenClearCache, type IRenderHtmlOption, renderHtmlTo } from "../../scripts/libs/dumb_html5str_renderer"
import HomePage from "./page/HomePage"
import NeighborhoodPage from "./page/NeighborhoodPage"
import ParksPage from "./page/Parks"

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

  a { border-radius: 6px; }

  *:focus {
    outline: 4px solid var(--sapphire);
  }

  p, code, li {
    font-size: 1.5rem;
  }

  p {
    line-height: 1.8rem;
  }

  h2 {
    font-size: 2.3rem;
  }

  h1 {
    font-size: 2.375rem;
  }

  p:not(:last-child) {
    margin-bottom: 20px;
  }
`

const htmlRendererOptions: IRenderHtmlOption = {
  reason: `Another peer rated project for: https://www.coursera.org/learn/introcss/peer/QUd5I/homework-one-styling-your-first-page`,
  title: "Springtime In Michigan",
  noFlashbangWhenOpened: true,
  libraryUsed: "libduck_haxjsx2html5 palette@catppuccin_mocha",
  css: `${APP_GLOBAL_CSS} ${dumpCssThenClearCache()}`,
  bodyClass: `${scrollbar} ${scrollbar__horizontal}`
}

renderHtmlTo("./docs/02-gallery/index.html", htmlRendererOptions, <HomePage />)
renderHtmlTo("./docs/02-gallery/neighborhood.html", htmlRendererOptions, <NeighborhoodPage />)
renderHtmlTo("./docs/02-gallery/parks.html", htmlRendererOptions, <ParksPage />)

// 16/10/2026 - Finished!