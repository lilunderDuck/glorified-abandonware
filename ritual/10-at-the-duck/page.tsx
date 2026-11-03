import { css } from "../../scripts/libs/dumb_html5str_renderer"
import { ConnectionSection, PageWaveyBackground1, PageWaveyBackground2, ProjectSection } from "./components"

const page__background = css`
  width: 100%;
  position: absolute;
`

const page__firstBackgroundPosition = css`
  height: 110%;
  top: -2rem;
`

const page__secondBackgroundPosition = css`
  height: 170%;
  top: 5.6rem;
`

// ------------------------------

const page__content = css`
  width: 100%;
  height: 100%;
  font-size: 1.7rem;
  position: absolute;
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

const page__movingDots = css`
  background-size: 40px 40px;
  background-image: radial-gradient(var(--surface1) 2px, transparent 2px);
  width: 100%;
  height: 100%;
  background-color: var(--mantle);
  animation: dot_grid_move 5s linear infinite;
`

export default function HomePage() {
  return (
    <>
      <div class={`${page__background} ${page__firstBackgroundPosition}`}>
        <PageWaveyBackground1 />
      </div>
      <div class={`${page__background} ${page__secondBackgroundPosition}`}>
        <PageWaveyBackground2 />
      </div>
      <div class={`${page__content}`}>
        <section class={page__sectionProfile}>
          <div class={page__sectionProfileBg} />
        </section>
        <ConnectionSection />
        <ProjectSection />
      </div>
    </>
  )
}