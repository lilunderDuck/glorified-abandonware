import { scrollbar, scrollbar__invs, scrollbar__vertical } from "../components"
import { css } from "../libs/dumb_html5str_renderer"
import { PROJECT_REGISTRY } from "./data"
import GlobalNavBar from "./GlobalNavBar"
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
  padding-inline: 2rem;
  padding-top: 5px;
  padding-bottom: 15rem;
`

const page__title = css`
  text-align: center;
  font-size: 3.235rem;
`

const page__description = css`
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
    <div id="root" class={`${page__root} ${scrollbar} ${scrollbar__vertical} ${scrollbar__invs}`}>
      <header class={page__header}>
        <SkipToMainContent />
        <GlobalNavBar />
        <div></div>
        <div>
          <h1 class={page__title}>The duck's project index</h1>
          <p class={page__description}>
            What projects are <a href="https://github.com/lilunderDuck" target="_blank">mint_duck</a> currently doing? <span class={page__updateNote}>(As for {props.buildDate})</span>
          </p>
        </div>
      </header>
      <main class={page__mainContent} id="main_content_jump_to_here">
        <ul class={page__projectList}>
          {PROJECT_REGISTRY.map((it, index, _) => <ProjectItem {...it} index={index + 1} />)}
        </ul>
      </main>
    </div>
  )
}