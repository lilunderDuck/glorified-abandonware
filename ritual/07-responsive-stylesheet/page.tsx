import { For } from "../../scripts/components"
import { css } from "../../scripts/libs/dumb_html5str_renderer"
import { createWordSlidingRandomizer, splitAndClean, SRC_CAT_SET } from "../../scripts/libs/dumb_random"

// Happy halloween :)
//  - 31/10/2026 7:48 PM GMT+7 - mint_duck

const page__heading = css`
  text-align: center;
  font-size: 32px;
`

const page__backToTheTopLink = css`
  text-decoration: none;
  /* font-family:Arial, sans-serif;  commented: already applied the font family globally */
`

const page__mainMustPreserveRoot = css`
  & > p {
    font-size: 25px;
    /* font-family: Arial, sans-serif;  commented: already applied the font family globally */
    text-align: center;
  }
`

const page__image = css`
  /* my CSS reset already set the width to 100% */
`

const page__imageWrap = css`
  display: inline-block;
  width: 24%;
  margin: 5px;
  padding: 2px;
  & > img {
    width: 150px;
    height: 150px;
    display: block;
    margin: auto;
  }
`

export default function Page() {
  const IMAGE_DATA = [
    { imageName: "Red.jpeg", label: "Red" },
    { imageName: "Orange.png", label: "Orange" },
    { imageName: "Yellow.png", label: "Yellow" },
    { imageName: "Green.png", label: "Green" },
    { imageName: "Blue.png", label: "Blue" },
    { imageName: "Indigo.jpeg", label: "Indigo" },
    { imageName: "Purple.png", label: "Purple" },
    { imageName: "Pink.jpeg", label: "Pink" },
    { imageName: "White.png", label: "White" },
  ]

  const TOP_HEADING_ID = createWordSlidingRandomizer(splitAndClean(SRC_CAT_SET))(5)

  return (
    <>
      <header>
        <h1 class={page__heading} id={TOP_HEADING_ID}>
          Colors!
        </h1>
      </header>

      <main class={page__mainMustPreserveRoot}>
        <h2>Basic Media Queries</h2>
        <p>In this assignment you will add two media queries to the css file.</p>
        <ul>
          <li>The first media query should trigger at 772px and change the layout of the divs to be 45% of the viewport width. The images should have a maximum height of 30% of the viewport height.</li>

          <li>The second media query should trigger at 998px and change the layout of the divs to be 30% of the viewport width.</li>
        </ul>
        <p>You will need to make additional changes to ensure that the divs appear next to each other and that the images are contained within the divs.  Some of these properties include display, width and max-height.</p>

        <For each={IMAGE_DATA}>
          {it => (
            <div class={page__imageWrap}>
              <img 
                draggable={false}
                class={page__image} 
                src={`./images/${it.imageName}`} 
                alt={it.label} 
                width="200" 
              />
              <p class= "label">{it.label}</p>
            </div>
          )}
        </For>
      </main>

      <footer>
        <a href={`#${TOP_HEADING_ID}`} class={page__backToTheTopLink}>
          Jump to the Top
        </a>
      </footer>
    </>
  )
}