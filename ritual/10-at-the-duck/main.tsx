import { scrollbar, scrollbar__vertical } from "../../scripts/components"
import { renderHtmlTo } from "../../scripts/libs/dumb_html5str_renderer"
import { createWordSlidingRandomizer, splitAndClean, SRC_CAT_SET } from "../../scripts/libs/dumb_random"
import HomePage from "./page"

const randomizer = createWordSlidingRandomizer(splitAndClean(SRC_CAT_SET))
export const globalRegistry = {
  BRIEF_SECTION_CONTACT_INFO: randomizer(7),
  BRIEF_SECTION_BOTTOM_MARGIN: randomizer(7),
  PROJECT_SECTION_INLINE_PADDING: randomizer(7),
  WHY_SECTION_INLINE_PADDING: randomizer(7),
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

  @keyframes dot_grid_move {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 40px -40px;
    }
  }

  .${globalRegistry.PROJECT_SECTION_INLINE_PADDING} {
    padding-inline: 5rem;
  }

  .${globalRegistry.WHY_SECTION_INLINE_PADDING} {
    padding-inline: 7rem;
  }

  @media screen and (max-width: 796px) {
    .${globalRegistry.BRIEF_SECTION_BOTTOM_MARGIN} {
      margin-bottom: 4rem !important;
    }

    .${globalRegistry.BRIEF_SECTION_CONTACT_INFO} {
      flex-direction: column;
      gap: 10px;
    }

    .${globalRegistry.WHY_SECTION_INLINE_PADDING} {
      padding-inline: 1rem;
    }

    .${globalRegistry.WHY_SECTION_INLINE_PADDING} > ul {
      padding-bottom: 1rem;
    }

    .${globalRegistry.PROJECT_SECTION_INLINE_PADDING} {
      padding-inline: 2rem;
    }
  }
`

renderHtmlTo("./docs/10-at-the-duck/index.html", {
  noFlashbangWhenOpened: true,
  title: "The duck dot info",
  reason: "The final project for Web Design for Everybody - https://www.coursera.org/learn/web-design-project - of course, in a very unserious way.",
  libraryUsed: "jsx2html5 palette@catppuccin_mocha",
  css: APP_GLOBAL_CSS,
  shouldIncludeSomeUnrelatedBodyAttributes: false,
  bodyClass: `${scrollbar} ${scrollbar__vertical}`
}, <HomePage />)