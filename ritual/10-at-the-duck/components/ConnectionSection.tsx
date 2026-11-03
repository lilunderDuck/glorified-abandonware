import { BsDiscord, BsGithub, For, Show } from "../../../scripts/components"
import { css } from "../../../scripts/libs/dumb_html5str_renderer"
import { PageWaveyBackground1 } from "./PageWaveyBackground"

const section__root = css`
  padding-top: 1.5rem; /* from profile offset */
  padding-inline: 3rem;
  margin-top: 15px;
  margin-bottom: 12rem;
  position: relative;
  & p {
    text-align: center;
  }
`

const section__briefWrap = css`
  width: 100%;
  display: flex;
  justify-content: center;
`

const section__brief = css`
  user-select: none;
  width: 80%;
`

const section__myName = css`color:var(--sapphire);`

const section__briefConnectionContainer = css`
  margin-inline: 3rem;
  margin-top: 3.5rem;
  display: flex;
  justify-content: center;
  position: relative;
`

const section__briefConnectionText = css`
  padding-inline: 10px;
  padding-block: 5px;
  background-color: #5f3e69;
  border-radius: 6px;
  position: absolute;
  font-size: 1.4rem;
  left: 50%;
  top: -12px;
  transform: translate(-50%, -50%);
  color: var(--subtext1);
  user-select: none;
`

const section__briefConnectionWrap = css`
  width: fit-content;
  display: flex;
  justify-content: center;
  gap: 30px;
  padding-inline: 10px;
  padding-top: 9px;
  padding-bottom: 5px;
  background-color: #5f3e69;
  border-radius: 6px;
`

const section__briefConnection = css`
  display: inline-flex;
  gap: 20px;
`

const section__connectionHaveLink = css`
  user-select: none;
`

const section__connectionNoLink = css`
  color: var(--sky);
`

const section__background = css`
  width: 100%;
  height: 150%;
  position: fixed;
  left: 0;
  top: -12rem;
  z-index: -1;
  & > svg {
    max-height: 100%;
  }
`

export function ConnectionSection() {
  const CONNECTION = [
    {
      icon: BsDiscord,
      name: "lazyyy_duck#0"
    },
    {
      icon: BsGithub,
      name: "lilunderDuck",
      url: "https://github.com/lilunderDuck"
    }
  ]
  
  return (
    <section class={section__root}>
      <div class={section__background}>
        <PageWaveyBackground1 />
      </div>
      <div class={section__briefWrap}>
        <p class={section__brief}>Hello, I'm <span class={section__myName}>mint_duck</span>, and I do something with computer. I also like cats (and minecraft) :)</p>
      </div>
      <div class={section__briefConnectionContainer}>
        <div class={section__briefConnectionText}>
          (Spy me on)
        </div>
        <div class={section__briefConnectionWrap}>
          <For each={CONNECTION}>
            {it => (
              <div class={section__briefConnection}>
                <it.icon />
                <Show when={it.url} fallback={
                  <span class={section__connectionNoLink}>{it.name}</span>
                }>
                  <a class={section__connectionHaveLink} href={it.url} target="_blank">
                    {it.name}
                  </a>
                </Show>
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  )
}