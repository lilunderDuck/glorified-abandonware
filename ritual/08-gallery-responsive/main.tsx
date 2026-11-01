import "./dumbconfig"
import { IRenderHtmlOption, renderHtmlTo } from "../../scripts/libs/dumb_html5str_renderer"
import Page from "./page"
import { scrollbar, scrollbar__vertical } from "../../scripts/components"
import { createWordSlidingRandomizer, splitAndClean, SRC_CAT_SET } from "../../scripts/libs/dumb_random"

const randomizer = createWordSlidingRandomizer(splitAndClean(SRC_CAT_SET))
const roll = () => randomizer(7)
export const GlobalRegistry = {
  /**This is for "jump to the top" id */
  TOP_HEADING_ID: roll(),
  /**Classname for all of the colored images, this is a workaround
   * because I haven't thought of handling `@media` queries yet.
   */
  COLOR_IMAGE_WRAP: roll(),
}

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

  body {
    padding-inline: 15px;
    padding-block: 10px;
  }

  /*displayed all images at the same time for mobile screens feel... very weird, but whatever, the instruction doesn't say anything so I should do (almost) the same thing*/
  .${GlobalRegistry.COLOR_IMAGE_WRAP} {
    width: 80%;
  }
  
  /*note 1: The first media query uses min-width and triggers at 772 px.*/
  @media screen and (min-width: 772px) {
    .${GlobalRegistry.COLOR_IMAGE_WRAP} {
      /*note 1.1: In the first media query the div selector is set to a width of 45vw and uses display inline-block*/
      width: 45vw;
    }

    .${GlobalRegistry.COLOR_IMAGE_WRAP} > img {
      /*note 1.2: In the first media query the <img> selector is set to a max-height of 30vh*/
      max-height: 30vh;
    }
  }

  /*note 2: The second media query uses min-width and triggers at 998 px.  */
  @media screen and (min-width: 998px) {
    .${GlobalRegistry.COLOR_IMAGE_WRAP} {
      width: 30vw;
    }
  }
`

const htmlRendererOptions: IRenderHtmlOption = {
  // look at that beautiful github url.
  reason: `A generic responsive website, this is a fork from https://github.com/academic-innovation-online-learning/WD4E-Advanced_Styling_with_Responsive_Design/tree/main/RD-week2-responsive_hw_starter.`,
  title: "Responsive website",
  noFlashbangWhenOpened: true,
  libraryUsed: "jsx2html5 palette@catppuccin_mocha",
  css: APP_GLOBAL_CSS,
  bodyClass: `${scrollbar} ${scrollbar__vertical}`,
  shouldIncludeSomeUnrelatedBodyAttributes: false
}

renderHtmlTo("./docs/07-responsive-stylesheet/index.html", htmlRendererOptions, <Page />)