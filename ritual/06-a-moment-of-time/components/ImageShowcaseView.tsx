import { For } from "../../../scripts/components"
import { css } from "../../../scripts/libs/dumb_html5str_renderer"
import { IMAGE_LIST } from "./image_list"

const view__root = css`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const view__imageWrap = css`
  width: calc(100% - 30px * 2);
  height: calc(100% - 25px * 2);
  margin-inline: 30px;
  margin-block: 25px;
  flex-shrink: 0;
`

const view__image = css`
  width: 100%;
  border-radius: 15px;
  border: none;
  outline: 4px solid var(--surface0);
  object-fit: cover;
`

export function ImageShowcaseView() {
  return (
    <div class={view__root}>
      <div class={view__imageWrap}>
        <img loading="lazy" draggable={false} class={view__image} id="imageShowcaseView__imgRef" />
      </div>
    </div>
  )
}