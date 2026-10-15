import { Tag } from "../../components"
import { css } from "../../libs/dumb_html5str_renderer"
import { IProjectStat, PROJECT_STATUS_REGISTRY, PROJECT_TYPE_COLOR_MAPPING } from "../data"

const item__root = css`
  list-style: none;
  padding-inline: 10px;
  padding-block: 5px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
  border-radius: 6px;
  &:hover {
    background-color: var(--surface0);
  }
`

const item__disabled = css`
  opacity: 0.75;

  &:hover {
    background-color: transparent;
  }
`

const item__index = css`
  font-size: 2rem;
  width: 30px;
  flex-shrink: 0;
`

const item__icon = css`
  width: 4.25rem;
  height: 4.25rem;
  flex-shrink: 0;
  border-radius: 6px;
  border: 4px solid var(--surface2);
`

const item__titleWrap = css`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
`

const item__fakeLink = css`
  color: var(--sapphire);
`

export function ProjectItem(props: IProjectStat & { index: number }) {
  return (
    <li class={`${item__root} ${props.disabled ? item__disabled : ""}`.trim()}>
      <div class={item__index}>
        {props.index}
      </div>
      <img class={item__icon} draggable={false} src={`./assets/icons/${props.icon}`} alt="">
        {/* ... */}
      </img>
      <div>
        <div class={item__titleWrap}>
          <h2>
            {props.disabled ? (
              <span class={item__fakeLink}>{props.title}</span>
            ) : (
              <a href={props.disabled ? undefined : `./${props.id}.html`}>
                {props.title}
              </a>
            )}
          </h2>
          <Tag bgColor={PROJECT_TYPE_COLOR_MAPPING[props.type]}>
            {props.type}
          </Tag>
          <Tag bgColor={PROJECT_STATUS_REGISTRY[props.status].color}>
            {props.status}
          </Tag>
          {props.id.includes("toast") && (
            <Tag bgColor={'var(--yellow)'}>
              Baguette ecosystem
            </Tag>
          )}
        </div>
        {Bun.markdown.react(props.description)}
      </div>
    </li>
  )
}