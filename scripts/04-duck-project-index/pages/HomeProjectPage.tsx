import { scrollbar, scrollbar__invs, scrollbar__vertical, Tag } from "../../components"
import { css } from "../../libs/dumb_html5str_renderer"
import { GlobalNavBar, ImageItemView, ImageOneItemView, SkipToMainContent } from "../components"
import { IProjectStat, PROJECT_STATUS_REGISTRY, PROJECT_TYPE_COLOR_MAPPING } from "../data"

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

const page__headerImgBorder = css`
  border: 2px solid var(--overlay0);
`

// Fix w3c warning, incase someone deduct the point for no reason:
// Consider using the h1 element as a top-level heading only — or else use the headingoffset 
// attribute (otherwise, all h1 elements are treated as top-level headings by many screen readers 
// and other tools).
const page__headerProjectNameWorkaround = css`
  font-size: 2.3rem;
  font-weight: bold;
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

const page__table = css`
  width: 100%;
  font-size: 1.5rem;
  border-collapse: collapse;
`

const page__tableHead = css`
  background-color: var(--surface1);
`

const page__titleCateogry = css`
  width: 35%;
`

const page__tableBody = css`
  text-align: left;
  & [data-category] {
    padding-left: 2rem;
    vertical-align: baseline;
  }

  & > tr:nth-child(even) {
    background-color: var(--base);
  }
  
  & > tr:nth-child(odd) {
    background-color: var(--surface0);
  }

  & tr > th, & tr > td {
    padding-block: 5px;
  }
`

export default function HomeProjectPage(props: IProjectStat) {
  const NONE_TAG = <Tag bgColor="var(--red)">none</Tag>

  return (
    <div id="root" class={`${page__root} ${scrollbar} ${scrollbar__vertical} ${scrollbar__invs}`}>
      <SkipToMainContent />
      <header class={page__header}>
        {props.coverImage && <ImageOneItemView class={page__headerImgBorder} images={[props.coverImage]} />}
        <div class={page__headerShadow} />
        <div class={page__titleWrap}>
          <span class={page__headerProjectNameWorkaround}>{props.title}</span>
          {Bun.markdown.react(props.description)}
        </div>
        <GlobalNavBar />
      </header>
      <main id="main_content_jump_to_here" class={page__main}>
        <ProjectHeaderSection name="Basically">
          {Bun.markdown.react(props.longDescription.join('\n\n'), {
            a(props) {
              return <a href={props.href} target="_blank">{props.children}</a>
            },
          })}
        </ProjectHeaderSection>
        {props.previewImages && (
          <ProjectHeaderSection class={`${page__section} ${page__thisPreviewSection}`}>
            <div class={page__previewSection}>
              <ImageOneItemView images={props.previewImages} />
            </div>
          </ProjectHeaderSection>
        )}
        <ProjectHeaderSection name="Project stats" class={page__section}>
          <table class={page__table}>
            <thead class={page__tableHead}>
              <tr>
                <th scope="col" class={page__titleCateogry}>Category</th>
                <th scope="col">Stuff</th>
              </tr>
            </thead>
            <tbody class={page__tableBody}>
              <tr>
                <th scope="row" data-category>Kind of project</th>
                <td>
                  <Tag bgColor={PROJECT_TYPE_COLOR_MAPPING[props.type]}>{props.type}</Tag>
                </td>
              </tr>
              <tr>
                <th scope="row" data-category>Project status</th>
                <td>
                  <Tag bgColor={PROJECT_STATUS_REGISTRY[props.status].color}>{props.status}</Tag>
                  <p>{PROJECT_STATUS_REGISTRY[props.status].description}</p>
                </td>
              </tr>
              <tr>
                <th scope="row" data-category>Github url</th>
                <td>
                  {props.repoUrl ? <a href={props.repoUrl} target="_blank">{props.title}</a> : NONE_TAG}
                </td>
              </tr>
              <tr>
                <th scope="row" data-category>Total commit</th>
                <td>{props.totalCommits}</td>
              </tr>
              <tr>
                <th scope="row" data-category>Licence</th>
                <td>{props.licence?.map((it, index, _) => (
                  <p>
                    <a href={it.url} target="_blank">{it.name}</a> {it.why}
                    {index < props.licence!.length - 1 ? ", " : ""}
                  </p>
                )) ?? NONE_TAG}</td>
              </tr>
            </tbody>
          </table>
        </ProjectHeaderSection>
      </main>
    </div>
  )
}

const page__sectionHeaderWrap = css`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 15px;
`

const page__sectionHeader = css`
  padding-inline: 10px;
  padding-block: 5px;
  background-color: var(--sky);
  border-radius: 6px;
  color: var(--surface0);
  width: fit-content;
  flex-shrink: 0;
  font-size: 2rem;
  font-weight: bold;
`

const page__sectionHeaderDivider = css`
  width: 100%;
  height: 5px;
  border-radius: 6px;
  background-color: var(--surface0);
`

function ProjectHeaderSection(props: { children?: any, name?: string, class?: string }) {
  return (
    <section class={`${page__section} ${props.class ?? ""}`}>
      {props.name && (
        <div class={page__sectionHeaderWrap}>
          <span class={page__sectionHeader}>
            {props.name}
          </span>
          <div class={page__sectionHeaderDivider} />
        </div>
      )}
      {props.children}
    </section>
  )
}