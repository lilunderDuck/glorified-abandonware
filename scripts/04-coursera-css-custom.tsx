import { renderHtmlTo } from "./libs/dumb_html5str_renderer"
import "react" // only used for jsx tag types

const dateFormatter = new Intl.DateTimeFormat("default", {
  day: "2-digit",
  month: "short",
  year: "numeric"
})

const buildDate = dateFormatter.format(new Date())

function AppEntryPoint() {
  return (
    <div id="root" class="must_preserve_root">
      <h1>Duck's project index</h1>
      <p>
        What project did <a href="https://github.com/lilunderDuck" target="_blank">mint_duck</a> currently doing? <span>As for {buildDate}</span>
      </p>
    </div>
  )
}

renderHtmlTo("./docs/04-coursera-css-custom/index.html", {
  reason: `Every duck project (as for ${buildDate}), a project for a course final project on coursera: https://www.coursera.org/learn/introcss/peer/JMPGW/final-project-create-your-site`,
  title: "Duck's project index",
  noFlashbangWhenOpened: true,
  libraryUsed: "libduck_haxjsx2html5 palette@catppuccin_mocha"
}, <AppEntryPoint />)