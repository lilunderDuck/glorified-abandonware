import { css } from "../../scripts/libs/dumb_html5str_renderer"

const page__root = css`
  user-select: none;
  padding: 20px;
`

export default function Page() {
  return (
    <div id="root" class={page__root}>
      <script src="./pain.js" defer />
      hello world
    </div>
  )
}