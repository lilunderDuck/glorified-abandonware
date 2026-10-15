import { scrollbar, scrollbar__horizontal } from "../../scripts/components"
import { dumpCssThenClearCache, IRenderHtmlOption, renderHtmlTo } from "../../scripts/libs/dumb_html5str_renderer"

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
  reason: ``,
  title: "Springtime In Michigan",
  noFlashbangWhenOpened: true,
  libraryUsed: "libduck_haxjsx2html5 palette@catppuccin_mocha",
  css: `${APP_GLOBAL_CSS} ${dumpCssThenClearCache()}`,
}

renderHtmlTo("./docs/06-a-moment-of-time/parks.html", htmlRendererOptions, <div>hello world</div>)