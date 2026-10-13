import { scrollbar, scrollbar__invs, scrollbar__vertical } from "../components"
import { css } from "../libs/dumb_html5str_renderer"
import { PROJECT_REGISTRY } from "./data"
import { ProjectItem } from "./ProjectItem"
import { SkipToMainContent } from "./SkipToMainContent"

const page__root = css`
  user-select: none;
  overflow-y: auto;
`

const page__header = css`
  width: 100%;
  height: 18rem;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--mantle);
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  margin-bottom: 10px;
`

const page__mainContent = css`
  width: 100%;
  padding-inline: 10px;
  padding-top: 5px;
  padding-bottom: 15rem;
`

const page__title = css`
  text-align: center;
`

const page__updateNote = css`
  color: var(--subtext0);
`

const page__projectList = css`
  padding-left: 0;
`

export function HomePage(props: { buildDate: string }) {
  return (
    <>
      <SkipToMainContent />
      <div id="root" class={`${page__root} ${scrollbar} ${scrollbar__vertical} ${scrollbar__invs}`}>
        <header class={page__header}>
          <div>
            <h1 class={page__title}>Duck's project index</h1>
            <p>
              What projects are <a href="https://github.com/lilunderDuck" target="_blank">mint_duck</a> currently doing? <span class={page__updateNote}>(As for {props.buildDate})</span>
            </p>
          </div>
          <div></div>
        </header>
        <main class={page__mainContent} id="main_content_jump_to_here">
          <ul class={page__projectList}>
            {PROJECT_REGISTRY.map(it => <ProjectItem {...it} />)}
          </ul>
        </main>
      </div>
    </>
  )
}