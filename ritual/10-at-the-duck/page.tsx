import { scrollbar, scrollbar__vertical } from "../../scripts/components"
import { css } from "../../scripts/libs/dumb_html5str_renderer"
import { ConnectionSection, PageWaveyBackground1 } from "./components"

const page__sectionProfileBackground = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: -2rem;
`

const page__content = css`
  width: 100%;
  height: 100%;
  font-size: 1.7rem;
`

const page__sectionProfile = css`
  width: 100%;
  height: 15rem;
  position: relative;
`

const page__sectionProfileBg = css`
  width: 14rem;
  height: 14rem;
  border-radius: 50%;
  border: 4px solid var(--surface0);
  position: absolute;
  left: 50%;
  bottom: -14rem;
  transform: translate(-50%, -50%);
  background: center center no-repeat url('./assets/icon.png');
  background-size: contain;
  z-index: 4;
`

export default function HomePage() {
  return (
    <>
      <div class={page__sectionProfileBackground}>
        <PageWaveyBackground1 />
      </div>
      <div class={`${page__content} ${scrollbar} ${scrollbar__vertical}`}>
        <section class={page__sectionProfile}>
          <div class={page__sectionProfileBg} />
        </section>
        <ConnectionSection />
      </div>
    </>
  )
}