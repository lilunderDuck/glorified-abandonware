import { For, scrollbar, scrollbar__vertical } from "../../../scripts/components"
import { css } from "../../../scripts/libs/dumb_html5str_renderer"
import { MockWebBroswer, TerminalCmd, TerminalUsername, Tui } from "../components"

const page__root = css`
  height: calc(100% - 20px);
`

const page__bootText = css`
  opacity: 0.7;
`

const page__name = css`
  color: var(--mauve);
  font-weight: bold;
`

const page__cmdLine = css`
  display: flex;
  gap: 2ch;
  margin-bottom: 1ch;
`

const page__content = css`
  width: 100%;
  height: calc(100% - 25px);
  margin-bottom: 10px;
`

const page__commandOutput = css`
  padding-inline: 1ch;
`

export default function HomePage() {
  const COMMAND_LIST = [
    {
      command: <TerminalCmd rootCmd="cat" flags={[{ name: "app_stack.wth" }]} />,
      description: "How the hell I can make all of the coursera projects with a bunch of character? (TL:DR: black magic)"
    },
    {
      command: <TerminalCmd rootCmd="./browser" flags={[
        { name: "-use-default" },
        { name: "-url=\"lilunderduck.github.io/projects\"" },
        { name: "-embedded" }
      ]} />,
      description: "List of my project I'm doing with my spare time (on my university), powered by Duck's project index."
    },
    {
      command: <TerminalCmd rootCmd="curl" flags={[{ name: "duck.spin" }]} />,
      description: "Spinning ascii duck (a reference to curl parrot.live), could have memory leak."
    },
    {
      command: <TerminalCmd rootCmd="neofetch" flags={[]} />,
      description: "Personal info, or almost accurate system spec, whatever you prefer."
    }
  ]

  return (
    <Tui.Box class={`${page__root}`}>
      <div class={`${page__content} ${scrollbar} ${scrollbar__vertical}`}>
        <Tui.Text class={page__bootText}>
          Local human connection opened to <span class={page__name}>me@mint_duck</span> at <Tui.Link>duck.localhost:3000</Tui.Link>
        </Tui.Text>
        <Tui.Text class={page__bootText}>
          I sent a virtual hug to make you happy for the rest of the day, but not really sure it will reach you...
        </Tui.Text>
        <Tui.LineBreak />
        <div class={page__cmdLine}>
          <TerminalUsername host="you" name="name" />
          <TerminalCmd rootCmd="./intro" flags={[
            { name: "me@mint_duck" },
            { name: "-short" },
            { name: "-with-banner" },
          ]} />
        </div>
        <Tui.Text class={page__commandOutput}>
          <div>
            <div></div>
            <div></div>
          </div>
          Hello, I'm <span class={page__name}>me@mint_duck</span>.
          <Tui.LineBreak />
          I love programming, and programming brought me joy and pain at the same time, while also be fascinated by random topics at the same time.
          <Tui.LineBreak />
          <i>(You tired of reading just that, don't you? I'm watching you *stares*)</i>.
          <Tui.LineBreak />
          <Tui.Heading>Help me! I'm stuck!</Tui.Heading>
          <Tui.LineBreak />
          You don't need to type the command, just click the command name listed below :)
          <Tui.LineBreak />
          <For each={COMMAND_LIST}>
            {it => (
              <div>
                <div>{it.command}</div>
                <Tui.Box>
                  <p>{it.description}</p>
                </Tui.Box>
              </div>
            )}
          </For>
        </Tui.Text>
      </div>
    </Tui.Box>
  )
}