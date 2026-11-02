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
  IMAGE_ITEM: roll(),
  IMAGE_LIST_CONTAINER: roll(),
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

  .${GlobalRegistry.IMAGE_LIST_CONTAINER} {
    display: grid;
    gap: 10px;
    place-items: center;
  }

  .${GlobalRegistry.IMAGE_ITEM} {
    width: 80%;
  }
  
  @media screen and (min-width: 772px) {
    .${GlobalRegistry.IMAGE_LIST_CONTAINER} {
      grid-template-columns: 1fr 1fr;
    }
    
    .${GlobalRegistry.IMAGE_ITEM} {
      border-radius: 10px;
    }

    .${GlobalRegistry.IMAGE_ITEM}:last-child {
      grid-column: 1 / -1;
    }
  }

  @media screen and (min-width: 998px) {
    .${GlobalRegistry.IMAGE_ITEM} {
      border-radius: 0;
    }
    
    .${GlobalRegistry.IMAGE_ITEM}:nth-child(3n) {
      grid-column: 1 / -1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    body {
      scroll-behavior: auto !important;
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

renderHtmlTo("./docs/08-gallery-responsive/index.html", htmlRendererOptions, <Page />)