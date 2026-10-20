import { IRenderHtmlOption, renderHtmlTo } from "../../scripts/libs/dumb_html5str_renderer"
import { PROJECT_REGISTRY } from "./data"
// ...
import AboutPage from "./pages/AboutPage"
import HomePage from "./pages/HomePage"
import HomeProjectPage from "./pages/HomeProjectPage"

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
    src: url("../assets/SourGummy.woff2") format('woff2');
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
  css: APP_GLOBAL_CSS
}

renderHtmlTo("./docs/04-duck-project-index/index.html", htmlRendererOptions, <HomePage buildDate={buildDate} />)

renderHtmlTo("./docs/04-duck-project-index/about.html", htmlRendererOptions, <AboutPage buildDate={buildDate} />)

for (const project of PROJECT_REGISTRY) {
  if (project.disabled) {
    continue
  }
  
  renderHtmlTo(`./docs/04-duck-project-index/${project.id}.html`, htmlRendererOptions, <HomeProjectPage {...project} />)
}