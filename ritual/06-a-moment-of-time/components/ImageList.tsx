import { BsCaretDownFill } from "../../../scripts/components"
import { css } from "../../../scripts/libs/dumb_html5str_renderer"

const imageList__root = css`
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 15rem;
  background: linear-gradient(to top, var(--crust) 0%, transparent 100%);
  display: flex;
  justify-content: end;
  flex-direction: column;
  transition: 0.2s ease-out;

  &[data-image-list-showing=false] {
    bottom: -12.5rem;
  }

  &[data-image-list-showing=false] #imageList__showBtn {
    rotate: 180deg;
  }
`

const imageList__arrowWrap = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`

const imageList__arrowButtonWrap = css`
  padding-inline: 15px;
  padding-block: 5px;
  background-color: var(--base);
  color: var(--overlay2);
  outline: 4px solid transparent;
  &:hover {
    color: var(--text);
    outline-color: var(--sapphire);
  }
`

const imageList__content = css`
  width: calc(100% - 20px * 2);
  height: 12rem;
  background-color: var(--mantle);
  display: flex;
  padding-inline: 15px;
  padding-block: 10px;
  margin-inline: 20px;
  margin-bottom: 10px;
  border-radius: 6px;
`

const IMAGE_LIST = [
  {
    imageName: "", description: ""
  }
]

export function ImageList() {
  return (
    <section class={imageList__root} data-image-list-showing={false} id="imageList__root">
      <div class={imageList__arrowWrap}>
        <button class={imageList__arrowButtonWrap} id="imageList__showBtn">
          <BsCaretDownFill size="1.25rem" />
        </button>
      </div>
      <div class={imageList__content}></div>
    </section>
  )
}