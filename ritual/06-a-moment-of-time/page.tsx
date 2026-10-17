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

  &[data-image-list-showing=true] #view__imageDescription {
    top: 50px;
  }

  &[data-image-list-showing=false] #view__imageDescription {
    top: calc(100% - 5rem);
  }

  &[data-image-is-currently-showing=true] #view__imageView {
    display: block;
  }

  &[data-image-is-currently-showing=false] #view__imageView {
    display: none;
  }

  &[data-image-is-currently-showing=true] #view__emptyView {
    display: none;
  }
  
  &[data-image-is-currently-showing=false] #view__emptyView {
    display: flex;
  }

  &[data-image-is-currently-showing=false] #view__imageDescription {
    display: none;
  }
`

export default function Page() {
  return (
    <>
      <script src="./workaround.js" />
      <script src="./pain.js" defer />
      <div 
        id="root" 
        data-image-list-showing={true} 
        data-image-is-currently-showing={false}
        data-must-preserve-root={true} 
        class={`${page__root} ${page__accessFix}`}
      >
        <ImageList />
        <ImageShowcaseView />
      </div>
    </>
  )
}