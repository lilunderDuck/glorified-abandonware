import { css, cssAtomicHandler } from "../../scripts/libs/dumb_html5str_renderer"

css.handler = cssAtomicHandler()

const page__root = css`
  user-select: none;
  padding: 20px;

  &:hover {
    padding: 10px
  }
`

export default function Page() {
  return (
    <div id="root" class={page__root}>
      <script src="./pain.js" defer />
      hello world
    </div>
  )
}