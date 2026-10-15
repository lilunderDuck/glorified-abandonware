import { css } from "../../../scripts/libs/dumb_html5str_renderer"

const footer__root = css`
  padding-inline: 10%;
  padding-top: 20px;
  padding-bottom: 3rem;
`

const footer__dividerRoot = css`
  width: calc(100% - 30px * 2);
  height: 5px;
  border-radius: 6px;
  background-color: var(--surface0);
  margin-inline: 30px;
  margin-top: 3rem;
`

export function ShoutOutFooter() {
  return (
    <>
      <div class={footer__dividerRoot} />
      <footer class={footer__root} data-should-shout-out={true}>
        Original template is forked from: <a href="https://github.com/academic-innovation-online-learning/WD4E-Intro_to_CSS3/tree/main/CSS-week1-HW1" target="_blank">WD4E-Intro_to_CSS3</a>. This page was originally created by <b>Colleen van Lent</b> for the <a href="https://www.coursera.org/specializations/web-design"> Web Design for Everybody</a> Specialization.
      </footer>
    </>
  )
}