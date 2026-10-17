import { css } from "../../scripts/libs/dumb_html5str_renderer"
import { ImageList } from "./components"

const page__root = css`
  user-select: none;
`

export default function Page() {
  return (
    <div id="root" class={page__root}>
      <script src="./pain.js" defer />
      <ImageList />
    </div>
  )
}