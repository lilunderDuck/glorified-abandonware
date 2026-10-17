import { For, scrollbar, scrollbar__horizontal, scrollbar__invs } from "../../../scripts/components"
import { css } from "../../../scripts/libs/dumb_html5str_renderer"
import { IMAGE_LIST } from "./image_list"

const imageList__root = css`
  width: 20rem;
  height: calc(100% - 20px * 2);
  display: flex;
  gap: 20px;
  flex-direction: column;
  flex-shrink: 0;
  margin-block: 20px;
  margin-right: 20px;
  background-color: var(--mantle);
  padding-inline: 10px;
  padding-block: 5px;
  padding-bottom: 3rem;
  border-radius: 8px;
`

const imageList__image = css`
  border-radius: 6px;
  outline: 4px solid transparent;
  &:hover {
    outline-color: var(--sapphire);
  }

  &:focus {
    outline-color: var(--sapphire);
  }
`

export function ImageList() {
  return (
    <aside class={`${imageList__root} ${scrollbar} ${scrollbar__horizontal} ${scrollbar__invs} imageList__root`} id="imageList__root">
      <For each={IMAGE_LIST}>
        {(it, index) => (
          <img 
            data-current-image-index={index}
            src={`./assets/${it.imageName}`} 
            alt={it.description} 
            loading="lazy" 
            class={`${imageList__image} imageList__imageRef`}
          />
        )}
      </For>
    </aside>
  )
}