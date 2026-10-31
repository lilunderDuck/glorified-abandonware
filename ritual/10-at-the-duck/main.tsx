import { scrollbar, scrollbar__vertical } from "../../scripts/components"
import { renderHtmlTo } from "../../scripts/libs/dumb_html5str_renderer"
import HomePage from "./page"

const APP_GLOBAL_CSS = `
  @font-face {
    font-family: JetBrainMono;
    font-style: italic;
    font-display: swap;
    font-weight: 400 600;
    src: url("../assets/JetBrainMono.woff2") format('woff2');
  }

  html { overflow: hidden; }

  :root {
    font-family: JetBrainMono, consolas, monospace;
  }
`

renderHtmlTo("./docs/10-at-the-duck/index.html", {
  noFlashbangWhenOpened: true,
  title: "The duck dot info",
  reason: "The final project for Web Design for Everybody - https://www.coursera.org/learn/web-design-project - what if you view someone's portfolio in a terminal?",
  libraryUsed: "jsx2html5 palette@catppuccin_mocha",
  css: APP_GLOBAL_CSS,
}, <HomePage />)