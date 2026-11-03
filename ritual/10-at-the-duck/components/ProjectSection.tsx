import { css } from "../../../scripts/libs/dumb_html5str_renderer"
import { MockWebBroswer } from "./MockWebBrowser"

const section__root = css`
  width: 100%;
  height: 50%;
  padding-inline: 5rem;
  margin-top: 5rem;
`

export function ProjectSection() {
  return (
    <section class={section__root}>
      <MockWebBroswer name="Latest (weird) projects" pageUrl="https://lilunderduck.github.io/projects/" />
    </section>
  )
}