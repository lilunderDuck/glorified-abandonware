import { css } from "../../../scripts/libs/dumb_html5str_renderer"
import { globalRegistry } from "../main"
import { MockWebBroswer } from "./MockWebBrowser"
import { PageWaveyBackground2 } from "./PageWaveyBackground"

const section__root = css`
  width: 100%;
  height: 100%;
  margin-top: 5rem;
  margin-bottom: 2rem;
  position: relative;
`

const section__background = css`
  width: 100%;
  height: 200%;
  position: fixed;
  left: 0;
  top: 3.2rem;
  z-index: -1;
`

export function ProjectSection() {
  return (
    <section class={`${section__root} ${globalRegistry.PROJECT_SECTION_INLINE_PADDING}`}>
      <div class={section__background}>
        <PageWaveyBackground2 />
      </div>
      <MockWebBroswer name="Latest (weird) projects" pageUrl="https://lilunderduck.github.io/projects/" />
    </section>
  )
}