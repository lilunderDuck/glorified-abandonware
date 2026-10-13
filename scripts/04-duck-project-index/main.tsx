import { dumpCssThenClearCache, IRenderHtmlOption, renderHtmlTo } from "../libs/dumb_html5str_renderer"
import { PROJECT_REGISTRY } from "./data"
import { HomePage } from "./HomePage"
import { HomeProjectPage } from "./HomeProjectPage"

const dateFormatter = new Intl.DateTimeFormat("default", {
  day: "2-digit",
  month: "short",
  year: "numeric"
})

const buildDate = dateFormatter.format(new Date())

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
`

const htmlRendererOptions: IRenderHtmlOption = {
  reason: `Every duck project (as for ${buildDate}), a project for a course final project on coursera: https://www.coursera.org/learn/introcss/peer/JMPGW/final-project-create-your-site`,
  title: "Duck's project index",
  noFlashbangWhenOpened: true,
  libraryUsed: "libduck_haxjsx2html5 palette@catppuccin_mocha",
  css: `${APP_GLOBAL_CSS} ${dumpCssThenClearCache()}`
}

renderHtmlTo("./docs/04-duck-project-index/index.html", htmlRendererOptions, <HomePage buildDate={buildDate} />)

for (const project of PROJECT_REGISTRY) {
  renderHtmlTo(`./docs/04-duck-project-index/${project.projectNameId}.html`, htmlRendererOptions, <HomeProjectPage {...project} />)
}