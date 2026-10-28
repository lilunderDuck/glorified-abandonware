import { css } from "../../../scripts/libs/dumb_html5str_renderer"

const terminal__root = css`
  display: inline-block;
`

const terminal__host = css`
  color: var(--blue);
`

const terminal__name = css`
  color: var(--lavender);
  font-weight: bold;
`

export function TerminalUsername(props: { host: string, name: string }) {
  return (
    <div class={terminal__root}>
      <span class={terminal__host}>{props.host}</span>@<span class={terminal__name}>{props.name}</span>
    </div>
  )
}