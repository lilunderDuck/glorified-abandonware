import { For } from "../../../scripts/components"
import { css } from "../../../scripts/libs/dumb_html5str_renderer"

const cmd__root = css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1ch;
`

const cmd__cmd = css`
  color: var(--yellow);
  font-weight: bold;
`

const cmd__flag = css`
  color: var(--overlay0);
`

export function TerminalCmd(props: {
  rootCmd: string
  flags: {
    name: string,
    value?: string
  }[]
}) {
  return (
    <div class={cmd__root}>
      <span class={cmd__cmd}>{props.rootCmd}</span> <For each={props.flags}>
        {it => {
          if (it.name.startsWith("-")) {
            return <span class={cmd__flag}>{`${it.name}${it.value ? `=${it.value}` : ""} `}</span>
          }

          return it.name
        }}
      </For>
    </div>
  )
}