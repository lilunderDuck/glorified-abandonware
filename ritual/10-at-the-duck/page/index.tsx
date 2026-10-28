import { css } from "../../../scripts/libs/dumb_html5str_renderer"
import { MockWebBroswer } from "../components"

const page__root = css`
`

export default function HomePage() {
  return (
    <div class={page__root}>
      <MockWebBroswer pageUrl="https://lilunderduck.github.io/projects" name="Duck's project index" />
    </div>
  )
}