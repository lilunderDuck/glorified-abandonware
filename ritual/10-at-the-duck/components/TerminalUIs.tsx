import type { JSX } from "react";
import { css } from "../../../scripts/libs/dumb_html5str_renderer";

const tui__box = css`
  position: relative;
  padding-inline: 15px;
  padding-block: 5px;
  margin-block: 10px;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    min-height: 2ch;
    translate: -50% -50%;
    width: calc(100% - 1ch - 2px);
    height: calc(100% - 1lh - 2px);
    border: solid 2px var(--surface2);
    z-index: -1;
  }

  & > :first-child {
    margin-top: 1ch;
  }

  & > :last-child {
    margin-bottom: 1ch;
  }
`

const tui__boxLineHide = css`
  background-color: var(--crust);
`

const tui__text = css`
`

const tui__heading = css`
  color: var(--peach);
  font-weight: bold;
`

const tui__lineBreak = css`
  opacity: 0;
  user-select: none;
`

export namespace Tui {
  export function Box(props: JSX.IntrinsicElements["div"]) {
    return <div {...props} class={`${tui__box} ${props.class ?? ""}`.trim()}>{props.children}</div>
  }

  export function BoxLineHidden(props: JSX.IntrinsicElements["div"]) {
    return <div {...props} class={`${tui__boxLineHide} ${props.class ?? ""}`.trim()}>{props.children}</div>
  }

  export function Text(props: JSX.IntrinsicElements["div"]) {
    return <div tab-index={0} {...props} class={`${tui__text} ${props.class ?? ""}`.trim()}>{props.children}</div>
  }

  export function LineBreak() {
    return <div class={tui__lineBreak}>\n</div>
  }

  export function Link(props: JSX.IntrinsicElements["a"]) {
    return <a tab-index={0} {...props}>{props.children}</a>
  }

  export function Heading(props: JSX.IntrinsicElements["div"]) {
    return <div tab-index={0} {...props} class={`${tui__text} ${tui__heading} ${props.class ?? ""}`.trim()}># {props.children}</div>
  }
}