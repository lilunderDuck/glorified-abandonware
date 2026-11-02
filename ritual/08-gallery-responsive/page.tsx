import { For } from "../../scripts/components"
import { css } from "../../scripts/libs/dumb_html5str_renderer"
import { IMAGE_DATA } from "./imageData"
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
  & > p {
    font-size: 25px;
    /* font-family: Arial, sans-serif;  commented: already applied the font family globally */
    text-align: center;
  }
`

const page__image = css`
  object-fit: cover;
`

const page__imageLabel = css`
  text-align: center;
  margin-top: 10px;
`

const page__imageWrap = css`
  background-color: var(--surface0);
  padding-inline: 15px;
  padding-block: 10px;
  user-select: none;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 17rem;
  & > img {
    width: 100%;
    height: 200px;
    border-radius: 6px;
    flex-shrink: 0;
  }

  outline: 4px solid transparent;
  &:hover {
    outline-color: var(--sapphire);
  }
`

export default function Page() {
  return (
    <>
      <header>
        <h1 class={page__heading} id={GlobalRegistry.TOP_HEADING_ID}>
          Colors!
        </h1>
      </header>

      <main class={`${page__mainMustPreserveRoot}`}>
        {Bun.markdown.react("Questioning to why there's so many gallery-based project, but, here we are.")}
        <div class={GlobalRegistry.IMAGE_LIST_CONTAINER}>
          <For each={IMAGE_DATA}>
            {it => (
              <div class={`${GlobalRegistry.IMAGE_ITEM} ${page__imageWrap}`}>
                <img 
                  draggable={false}
                  class={page__image} 
                  src={`../06-a-moment-of-time/assets/${it.imageName}`} 
                  alt={it.description}
                />
                <p class={page__imageLabel}>{it.description}</p>
              </div>
            )}
          </For>
        </div>
      </main>

      <footer class={page__footer}>
        <a href={`#${GlobalRegistry.TOP_HEADING_ID}`} class={page__backToTheTopLink}>
          Jump to the Top
        </a>
      </footer>
    </>
  )
}