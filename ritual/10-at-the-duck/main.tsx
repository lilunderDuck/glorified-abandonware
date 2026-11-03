import { renderHtmlTo } from "../../scripts/libs/dumb_html5str_renderer"
import HomePage from "./page"

const APP_GLOBAL_CSS = `

`

renderHtmlTo("./docs/10-at-the-duck/index.html", {
  noFlashbangWhenOpened: true,
  title: "The duck dot info",
  reason: "The final project for Web Design for Everybody - https://www.coursera.org/learn/web-design-project - what if you view someone's portfolio in a terminal?",
  libraryUsed: "jsx2html5 palette@catppuccin_mocha",
  css: APP_GLOBAL_CSS,
}, <HomePage />)