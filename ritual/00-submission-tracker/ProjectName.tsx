import { For, Tag } from "../../scripts/components"
import { css } from "../../scripts/libs/dumb_html5str_renderer"
import { IProjectData } from "./data"
import ScoreIndicator from "./ScoreIndicator"

const page__projectNameWrap = css`
  padding-inline: 10px;
  padding-block: 5px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  background-color: var(--base);
  & [data-see-source-code-link] {
    opacity: 0;
  }

  &:hover [data-see-source-code-link] {
    opacity: 1;
  }
`

const page__nameWrap = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`

const page__projectScoreNotAviable = css`
  opacity: 0.5;
`

const page__rateHistorySection = css`
  padding-inline: 15px;
  margin-block: 10px;
  & > h3 {
    margin-bottom: 10px;
  }
`

const page__rateHistoryLine = css`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`

const page__rateReason = css`
  padding-left: 20px;
`

export default function ProjectName(props: IProjectData) {
  const LAST_SCORE = props.score?.at(-1)

  return (
    <>
      <div class={`${page__projectNameWrap} ${props.score ? "" : page__projectScoreNotAviable}`.trim()}>
        <div class={page__nameWrap}>
          <code>{props.name}</code>

          <a data-see-source-code-link href={`https://github.com/lilunderDuck/glorified-abandonware/tree/main/docs/${props.name}`} target="_blank">See source code</a>
        </div>

        <div>
          <ScoreIndicator score={LAST_SCORE} />
        </div>
      </div>

      {(props.score?.length ?? 0) > 1 && (
        <section class={page__rateHistorySection}>
          <h3>Rate history</h3>
          <For each={props.score!}>
            {it => (
              <div class={page__rateHistoryLine}>
                <ScoreIndicator score={it} />
                <div class={page__rateReason}>{it.reason ?? "-"}</div>
              </div>
            )}
          </For>
        </section>
      )}
    </>
  )
}