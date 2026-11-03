import { css } from "../../../scripts/libs/dumb_html5str_renderer"
import { globalRegistry } from "../main"
import { PageWaveyBackground3 } from "./PageWaveyBackground"

const section__root = css`
  width: 100%;
  height: auto;
  position: relative;
  background-color: #496562;
  user-select: none;
`

const section__background = css`
  width: 100%;
  height: 150%;
  position: fixed;
  left: 0;
  top: 51.05rem;
  z-index: -1;
  & > svg {
    max-height: 100%;
  }
`

const section__heading = css`
  text-align: center;
`

const section__reasonList = css`
  list-style: none;
  padding-left: 0;
  margin-top: 30px;
  padding-bottom: 1rem;
  & > li {
    padding-inline: 20px;
    padding-block: 15px;
    background-color: var(--mantle);
    margin-bottom: 10px;
    border-radius: 6px;
    margin-inline: 3rem;
  }
`

const section__idkWhatToNameThis = css`
  color: var(--subtext1);
`

export function WhySection() {
  return (
    <section class={`${section__root} ${globalRegistry.WHY_SECTION_INLINE_PADDING}`}>
      <div class={section__background}>
        <PageWaveyBackground3 />
      </div>
      
      <h2 class={section__heading}>Why you should (not) hire/kidnapping me right now:</h2>
      <ul class={section__reasonList}>
        <li><b>(Everything here will be unserious)</b></li>
        <li>I might be dumb <span class={section__idkWhatToNameThis}>(unfixable)</span>.</li>
        <li>Currently in all time high of committing to my forever minecraft world</li>
        <li>Currently very experimental, <b>will write the most horrific code</b></li>
        <li>6.3 hours of experience in <a href="https://react.dev/" target="_blank">React-js</a> (But hey, at least I have messed <a href="https://www.solidjs.com/" target="_blank">Solid-js</a> for 2.5 years)</li>
        <li data-force-to-spill-code-on-main-thread={true}>I'm in mood of coding right now, I need to finish this before my brain tell me to play minecraft.</li>
      </ul>
    </section>
  )
}