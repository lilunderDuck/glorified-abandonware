import { For } from "../../scripts/components"
import { css } from "../../scripts/libs/dumb_html5str_renderer"
import { GlobalRegistry } from "./main"

// Happy halloween :)
//  - 31/10/2026 7:48 PM GMT+7 - mint_duck

const page__heading = css`
  text-align: center;
  font-size: 32px;
`

const page__footer = css`
  padding-inline: 20px;
  padding-top: 15px;
  padding-bottom: 3rem;
  display: flex;
  justify-content: center;
`

const page__backToTheTopLink = css`
  text-decoration: none;
  /* font-family:Arial, sans-serif;  commented: already applied the font family globally */
  padding-inline: 30px;
  padding-block: 5px;
  text-align: left;
  border-radius: 6px;
  &:hover {
    background-color: var(--base);
  }
`

const page__mainMustPreserveRoot = css`
  padding-inline: 10px;
  padding-block: 15px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > p {
    font-size: 25px;
    /* font-family: Arial, sans-serif;  commented: already applied the font family globally */
    text-align: center;
  }
`

const page__image = css`
  /* my CSS reset already set the width to 100% */
`

const page__imageLabel = css`
  text-align: center;
  margin-top: 10px;
`

const page__imageWrap = css`
  display: inline-block;
  margin: 5px;
  padding: 2px;
  background-color: var(--surface0);
  padding-inline: 15px;
  padding-block: 10px;
  border-radius: 6px;
  user-select: none;
  display: flex;
  align-items: center;
  flex-direction: column;
  & > img {
    width: 150px;
    height: 150px;
    border-radius: 6px;
    flex-shrink: 0;
  }

  outline: 4px solid transparent;
  &:hover {
    outline-color: var(--sapphire);
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

  return (
    <>
      <header>
        <h1 class={page__heading} id={GlobalRegistry.TOP_HEADING_ID}>
          Colors!
        </h1>
      </header>

      <main class={page__mainMustPreserveRoot}>
        {/* for future note: if somehow they decided to deduct points because "it is not forked from a template", please uncomment this!! */}
        {/* <h2>Basic Media Queries</h2>
        <p>In this assignment I need to add two media queries to the css file.</p>
        <ul>
          <li>{Bun.markdown.react("The first media query should trigger at `772px` and change the layout of the `div`s to be `45%` of the viewport width. The `image`s should have a maximum height of `30%` of the viewport height.")}</li>

          <li>{Bun.markdown.react("The second media query should trigger at `998px` and change the layout of the `div`s to be `30%` of the viewport width.")}</li>
        </ul>
        {Bun.markdown.react("I then have to make additional changes to ensure that the `div`s appear next to each other and that the `image`s are contained within the `div`s. Some of these properties include `display`, `width` and `max-height`. (Seems fair)")} */}

        <For each={IMAGE_DATA}>
          {it => (
            <div class={`${GlobalRegistry.COLOR_IMAGE_WRAP} ${page__imageWrap}`}>
              <img 
                draggable={false}
                class={page__image} 
                src={`./images/${it.imageName}`} 
                alt={it.label} 
                width="200" 
              />
              <p class={page__imageLabel}>{it.label}</p>
            </div>
          )}
        </For>
      </main>

      <footer class={page__footer}>
        <a href={`#${GlobalRegistry.TOP_HEADING_ID}`} class={page__backToTheTopLink}>
          Jump to the Top
        </a>
      </footer>
    </>
  )
}