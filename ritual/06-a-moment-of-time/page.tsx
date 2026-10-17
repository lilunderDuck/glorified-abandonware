import { css } from "../../scripts/libs/dumb_html5str_renderer"
import { ImageList, ImageShowcaseView } from "./components"
import { GalleryNavigationButtons } from "./components/GalleryNavigationButtons"

const page__root = css`
  user-select: none;
  position: relative;
`

export default function Page() {
  return (
    <>
      <script src="./pain.js" defer />
      <div id="root" data-must-preserve-root={true} class={page__root}>
        <GalleryNavigationButtons />
        <ImageList />
        <ImageShowcaseView />
      </div>
    </>
  )
}