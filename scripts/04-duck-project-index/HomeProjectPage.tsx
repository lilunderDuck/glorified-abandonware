import { css } from "../libs/dumb_html5str_renderer"
import { SkipToMainContent } from "./SkipToMainContent"

const page__headerShadow = css`
  width: 100%;
  height: 18rem;
  background: linear-gradient(to top, var(--crust) 0%, transparent 100%);
  bottom: 0;
  padding-inline: 20px;
  padding-top: 5px;
  position: relative;
`

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

const page__title = css``

export function HomeProjectPage() {
  return (
    <>
      <SkipToMainContent />
      <div id="root" class={page__root}>
        <header class={page__header}>
          <div class={page__headerShadow}>
            <h1 class={page__title}>Duck's project index</h1>
          </div>
        </header>
      </div>
    </>
  )
}