import { css } from "../../../scripts/libs/dumb_html5str_renderer"
import { MockWebBroswer, TerminalUsername, Tui } from "../components"

const page__root = css`
  height: calc(100% - 20px);
`

const page__bootText = css`
  opacity: 0.7;
`

export default function HomePage() {
  return (
    <Tui.Box class={page__root}>
      <Tui.Text class={page__bootText}>
        Local human connection opened to <TerminalUsername host="me" name="mint_duck" /> at <Tui.Link>duck.localhost:3000</Tui.Link>
      </Tui.Text>
      <Tui.Text class={page__bootText}>
        I sent a virtual hug to make you happy for the rest of the day, but not really sure it will reach you...
      </Tui.Text>
      <Tui.LineBreak />
      <TerminalUsername host="you" name="name" />
    </Tui.Box>
  )
}