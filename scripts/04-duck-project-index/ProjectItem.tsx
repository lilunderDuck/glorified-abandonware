import { Tag } from "../components"
import { css } from "../libs/dumb_html5str_renderer"
import { IProjectStat, PROJECT_STATUS_REGISTRY, PROJECT_TYPE_COLOR_MAPPING } from "./data"

const item__root = css`
  list-style: none;
  padding-inline: 10px;
  padding-block: 5px;
  margin-bottom: 10px;
`

const item__titleWrap = css`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
`

export function ProjectItem(props: IProjectStat) {
  return (
    <li class={item__root}>
      <div class={item__titleWrap}>
        <h2>
          <a href={`./${props.projectNameId}.html`}>
            {props.title}
          </a>
        </h2>
        <Tag bgColor={PROJECT_TYPE_COLOR_MAPPING[props.type]}>{props.type}</Tag>
        <Tag bgColor={PROJECT_STATUS_REGISTRY[props.status]}>Status: {props.status}</Tag>
      </div>
      {Bun.markdown.react(props.description)}
    </li>
  )
}