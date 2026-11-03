import { BsDiscord, BsGithub, For, Show } from "../../../scripts/components";
import { css } from "../../../scripts/libs/dumb_html5str_renderer";

const page__sectionBrief = css`
  padding-top: 7.5rem; /* from profile offset */
  padding-inline: 3rem;
  margin-top: 15px;
  & p {
    text-align: center;
  }
`

const page__briefWrap = css`
  width: 100%;
  display: flex;
  justify-content: center;
`

const page__brief = css`
  user-select: none;
  width: 80%;
`

const page__briefName = css`color:var(--sapphire);`

const page__briefConnectionContainer = css`
  margin-inline: 3rem;
  margin-top: 3.5rem;
  display: flex;
  justify-content: center;
  position: relative;
`

const page__briefConnectionText = css`
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

const page__briefConnectionWrap = css`
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

const page__briefConnection = css`
  display: inline-flex;
  gap: 20px;
`

const page__connectionHaveLink = css`
  user-select: none;
`

const page__connectionNoLink = css`
  color: var(--sky);
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
    <section class={page__sectionBrief}>
      <div class={page__briefWrap}>
        <p class={page__brief}>Hello, I'm <span class={page__briefName}>mint_duck</span>, and I do something with computer. If I found something interesting, I would do some research and have some mess around.</p>
      </div>
      <div class={page__briefConnectionContainer}>
        <div class={page__briefConnectionText}>
          (Spy me on)
        </div>
        <div class={page__briefConnectionWrap}>
          <For each={CONNECTION}>
            {it => (
              <div class={page__briefConnection}>
                <it.icon />
                <Show when={it.url} fallback={
                  <span class={page__connectionNoLink}>{it.name}</span>
                }>
                  <a class={page__connectionHaveLink} href={it.url} target="_blank">
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