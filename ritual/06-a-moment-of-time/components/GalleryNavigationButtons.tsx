import { BsCaretLeftFill, BsCaretRightFill } from "../../../scripts/components"
import { css } from "../../../scripts/libs/dumb_html5str_renderer"

const nav__buttonWrap = css`
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-inline: 10px;
  &[data-gray-out=true] {
    opacity: 0.65;
  }
`

const nav__leftNavButtonWrap = css`
  left: 0;
`

const nav__rightNavButtonWrap = css`
  right: 0;
`

const nav__button = css`
  padding-inline: 5px;
  padding-block: 15px;
  border-radius: 6px;
  color: var(--overlay2);
  background-color: var(--crust);
  &:disabled {
    opacity: 0.78;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: var(--base);
    color: var(--text);
  }
`

export function GalleryNavigationButtons() {
  return (
    <>
      <div class={`${nav__buttonWrap} ${nav__leftNavButtonWrap} gallery__navBtnRef`} data-gray-out={false}>
        <button class={nav__button} id="gallery__navLeftBtn">
          <BsCaretLeftFill size="2rem" />
        </button>
      </div>
      <div class={`${nav__buttonWrap} ${nav__rightNavButtonWrap} gallery__navBtnRef`} data-gray-out={false}>
        <button class={nav__button} id="gallery__navRightBtn">
          <BsCaretRightFill size="2rem" />
        </button>
      </div>
    </>
  )
}