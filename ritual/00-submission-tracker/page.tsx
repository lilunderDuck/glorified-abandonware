import { For } from "../../scripts/components"
import { css } from "../../scripts/libs/dumb_html5str_renderer"
import { SUBMISSION_DATA } from "./data"
import ProjectName from "./ProjectName"

const page__headerRoot = css`
  width: 100%;
  height: 7.5rem;
  background-color: var(--mantle);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  user-select: none;
`

const page__mainRoot = css`
  padding-inline: 10%;
  padding-top: 20px;
  padding-bottom: 7rem;
  width: 100%;
  user-select: none;
  & > section:not(:last-child) {
    margin-bottom: 20px;
  }
`

const page__section = css`
  padding-inline: 20px;
  padding-block: 15px;
  border-radius: 6px;
  background-color: var(--mantle);
  & > h1 {
    margin-bottom: 5px;
  }
`

export default function Page() {
  return (
    <>
      <header class={page__headerRoot}>
        <h1>Submission scores</h1>
        <p>Every project inside Glorified Abandonware and how peer-rated it.</p>
      </header>
      <main class={page__mainRoot}>
        <For each={SUBMISSION_DATA}>
          {(it, index) => (
            <section class={page__section}>
              <h1>
                {`${index + 1}`}. <a href={it.link} target="_blank">{it.name}</a>
              </h1>

              <For each={it.projects}>
                {(it) => <ProjectName {...it} />}
              </For>
            </section>
          )}
        </For>
      </main>
    </>
  )
}