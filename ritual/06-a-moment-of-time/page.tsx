import { css } from "../../scripts/libs/dumb_html5str_renderer"
import { ImageList, ImageShowcaseView } from "./components"

const page__root = css`
  user-select: none;
`

const page__accessFix = css`
  &[data-image-list-showing=false] #imageList__showBtn > svg {
    rotate: 180deg;
  }

  &[data-image-list-showing=true] .imageList__shadow {
    opacity: 1;
  }

  &[data-image-list-showing=false] .imageList__shadow {
    opacity: 0;
  }

  &[data-image-list-showing=false] .imageList__root {
    bottom: -14.8rem;
  }

  &[data-image-list-showing=true] .imageList__root {
    bottom: 0;
  }

  &[data-image-list-showing=false] .imageList__pusher {
    opacity: 0;
  }
`

export default function Page() {
  return (
    <>
      <script src="./workaround.js" />
      <script src="./pain.js" defer />
      <div id="root" data-image-list-showing={true} data-must-preserve-root={true} class={`${page__root} ${page__accessFix}`}>
        <ImageList />
        <ImageShowcaseView />
      </div>
    </>
  )
}