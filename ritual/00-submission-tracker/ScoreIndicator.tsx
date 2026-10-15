import { css } from "../../scripts/libs/dumb_html5str_renderer"
import { IProjectScoreData } from "./data"

const page__scoreWrap = css`
  display: flex;
  align-items: center;
  gap: 30px;
`

const page__score = css`
  width: 3.6rem;
  padding-inline: 10px;
  padding-block: 5px;
  border-radius: 6px;
  text-align: center;
  color: var(--crust);
  background-color: var(--score-background-color);
`

const page__scoreDummy = css`
  padding-inline: 10px;
  padding-block: 5px;
`

const page__dateRated = css`
  color: var(--overlay2);
`

const dateFormatter = new Intl.DateTimeFormat("default", {
  day: "2-digit",
  month: "short",
  year: "numeric"
})

export default function ScoreIndicator(props: { score: IProjectScoreData | undefined }) {
  if (props.score === undefined) {
    return (
      <div class={page__scoreDummy}>
        Not yet
      </div>
    )
  }

  const determentScoreColor = () => {
    if (props.score!.score < 33.3) {
      return "var(--red)"
    }

    if (props.score!.score < 66.6 && props.score!.score > 33.3) {
      return "var(--yellow)"
    }

    return "var(--green)"
  }

  return (
    <div class={page__scoreWrap}>
      <span class={page__dateRated}>
        {dateFormatter.format(props.score.date)}
      </span>
      <div class={page__score} style={`--score-background-color:${determentScoreColor()}`}>
        {`${props.score.score}`}
      </div>
    </div>
  )
}