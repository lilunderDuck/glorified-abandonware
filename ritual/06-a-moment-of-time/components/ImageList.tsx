import { BsCaretDownFill, For, Kbd, scrollbar, scrollbar__horizontal, scrollbar__invs } from "../../../scripts/components"
import { css } from "../../../scripts/libs/dumb_html5str_renderer"
import { IMAGE_LIST } from "./image_list"

const imageList__root = css`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: end;
  flex-direction: column;
  transition: 0.2s ease-out;
  z-index: 5;
`

const imageList__shadow = css`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  background: linear-gradient(to top, var(--crust) 0%, transparent 100%);
  transition: 0.2s ease-out;
  z-index: 5;
`

const imageList__arrowWrap = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`

const imageList__pusher = css`
  width: 100%;
  padding-inline: 30px;
  transition: 0.2s ease-out;
  & > div {
    margin-bottom: 10px;
  }
`

const imageList__arrowButtonWrap = css`
  padding-inline: 15px;
  padding-block: 5px;
  background-color: var(--base);
  color: var(--overlay2);
  outline: 4px solid transparent;
  flex-shrink: 0;
  &:hover {
    color: var(--text);
    outline-color: var(--sapphire);
  }

  & > svg {
    transition: rotate 0.3s ease-out;
  }
`

const imageList__content = css`
  width: calc(100% - 20px * 2);
  height: 12rem;
  background-color: var(--mantle);
  display: flex;
  gap: 10px;
  padding-inline: 15px;
  padding-block: 10px;
  margin-inline: 20px;
  margin-bottom: 10px;
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
    <>
      <div class={`${imageList__shadow} imageList__shadow`} />
      <div class={`${imageList__root} imageList__root`}>
        <div class={imageList__arrowWrap}>
          <div class={`${imageList__pusher} imageList__pusher`}>
            <div>
              <Kbd>Shift + Mouse Wheel</Kbd> scroll image list
            </div>
            <div>
              <Kbd>Tab</Kbd> focus next image
            </div>
            <div>
              <Kbd>Shift + Tab</Kbd> focus previous image
            </div>
          </div>
          <div class={imageList__arrowButtonWrap} id="imageList__showBtn">
            <BsCaretDownFill size="1.25rem" />
          </div>
          <div class={`${imageList__pusher} imageList__pusher`} />
        </div>
        <div class={`${imageList__content} ${scrollbar} ${scrollbar__horizontal} ${scrollbar__invs}`}>
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
        </div>
      </div>
    </>
  )
}