import { scrollbar, scrollbar__invs, scrollbar__vertical } from "../components"
import { css } from "../libs/dumb_html5str_renderer"
import { IProjectStat } from "./data"
import { ImageItemView, ImageOneItemView } from "./ImageItemsView"
import { SkipToMainContent } from "./SkipToMainContent"

const page__root = css`
  user-select: none;
  overflow-y: auto;
  & p {
    font-size: 1.5rem;
  }

  & h2 {
    font-size: 2.3rem;
  }

  & h1 {
    font-size: 2.375rem;
  }
`

const page__header = css`
  width: 100%;
  height: 24rem;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--mantle);
  margin-bottom: 10px;
  position: relative;
`

const page__headerShadow = css`
  width: 100%;
  height: 24rem;
  background: linear-gradient(to top, var(--crust) 0%, transparent 100%);
  position: absolute;
  bottom: 0;
  padding-inline: 20px;
  padding-top: 5px;
`

const page__titleWrap = css`
  position: absolute;
  bottom: 0;
  left: 0;
  padding-inline: 4rem;
  padding-bottom: 30px;
`

const page__main = css`
  padding-inline: 4rem;
  padding-bottom: 15rem;
`

const page__section = css`
  margin-bottom: 20px;
  & > p:not(:last-child) {
    margin-bottom: 20px;
  }
`

const page__thisPreviewSection = css`
  padding-block: 20px;
  background-color: var(--mantle);
  border-radius: 6px;
`

const page__previewSection = css`
  height: 30rem;
  margin-inline: 20px;
  position: relative;
`

export function HomeProjectPage(props: IProjectStat) {
  return (
    <>
      <SkipToMainContent />
      <div id="root" class={`${page__root} ${scrollbar} ${scrollbar__vertical} ${scrollbar__invs}`}>
        <header class={page__header}>
          <ImageOneItemView images={props.coverImages} />
          <div class={page__headerShadow} />
          <div class={page__titleWrap}>
            <h1>{props.title}</h1>
            {Bun.markdown.react(props.description)}
          </div>
        </header>
        <main id="main_content_jump_to_here" class={page__main}>
          <section class={page__section}>
            <h2>Basically...</h2>
            {Bun.markdown.react(props.longDescription.join('\n\n'))}
          </section>
          {props.previewImages && (
            <section class={`${page__section} ${page__thisPreviewSection}`}>
              <div class={page__previewSection}>
                <ImageItemView coverImages={props.previewImages} />
              </div>
            </section>
          )}
          <section class={page__section}>
            <h2>Project status</h2>
          </section>
        </main>
      </div>
    </>
  )
}