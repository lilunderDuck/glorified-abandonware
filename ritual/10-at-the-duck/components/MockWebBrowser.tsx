import { BsCaretLeftFill, BsCaretRightFill, BsX, For } from "../../../scripts/components"
import { css } from "../../../scripts/libs/dumb_html5str_renderer"

const browser__root = css`
  user-select: none;
  height: 30rem;
`

const browser__tabList = css`
  display: flex;
  align-items: center;
`

const browser__tabMacWindowControls = css`
  display: flex;
  align-items: center;
  gap: 5px;
  padding-right: 10px;
  padding-left: 5px;
`

const browser__tabMacCircle = css`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--color);
`

const browser__tabMacCircleClose = css`
  background-color: var(--red);
`

const browser__tabMacCircleMaximize = css`
  background-color: var(--yellow);
`

const browser__tabMacCircleMinimize = css`
  background-color: var(--green);
`

const browser__searchBarWrapper = css`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-inline: 10px;
  padding-block: 5px;
  background-color: var(--surface0);
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`

const browser__searchBar = css`
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  width: 100%;
  margin-left: 15px;
`

const browser__contentWrap = css`
  height: 83%; /* HARDCODED, I have no idea why iframe keep overflowing */
`

const browser__content = css`
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  overflow-y: hidden;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`

const browser__tabName = css`
  background-color: var(--surface0);
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-inline: 15px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`

const browser__searchBarUrlProtocol = css`
  color: var(--overlay1);
`

export function MockWebBroswer(props: { pageUrl: string, name: string }) {
  const [urlProtocol, urlRest] = props.pageUrl.split("//")

  return (
    <div class={browser__root}>
      <div class={browser__tabList}>
        <div class={browser__tabMacWindowControls}>
          <For each={[browser__tabMacCircleClose, browser__tabMacCircleMaximize, browser__tabMacCircleMinimize]}>
            {it => <div class={`${browser__tabMacCircle} ${it}`} />}
          </For>
        </div>

        <div class={browser__tabName}>
          <div>{props.name}</div>
          <BsX />
        </div>
      </div>
      <div class={browser__searchBarWrapper}>
        <BsCaretLeftFill />
        <BsCaretRightFill />
        <div class={browser__searchBar}>
          <span class={browser__searchBarUrlProtocol}>
            {urlProtocol}//
          </span>
          <span>
            {urlRest}
          </span>
        </div>
      </div>

      <div class={browser__contentWrap}>
        <iframe width="1200" height="800" src={props.pageUrl} class={browser__content}></iframe>
      </div>
    </div>
  )
}