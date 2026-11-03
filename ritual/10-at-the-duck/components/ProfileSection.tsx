import { css } from "../../../scripts/libs/dumb_html5str_renderer"

const page__sectionProfile = css`
  width: 100%;
  height: 15rem;
  position: relative;
  margin-bottom: 7rem; /* 14rem height / 2 = 7rem extra margin */
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

export function ProfileSection() {
  return (
    <section class={page__sectionProfile}>
      <div class={page__sectionProfileBg} />
    </section>
  )
}