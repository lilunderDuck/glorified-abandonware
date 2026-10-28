import type { JSX } from "react";
import { css } from "../../../scripts/libs/dumb_html5str_renderer";

const tui__box = css`
  position: relative;
  padding-inline: 15px;
  padding-block: 5px;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    width: calc(100% - 1ch - 2px);
    height: calc(100% - 1lh - 2px);
    border: solid 2px var(--surface2);
    z-index: -1;
  }
`

const tui__boxLineHide = css`
  background-color: var(--crust);
`

export namespace Tui {
  export function Box(props: JSX.IntrinsicElements["div"]) {
    return <div {...props} class={`${tui__box} ${props.class ?? ""}`.trim()}>{props.children}</div>
  }

  export function BoxLineHidden(props: JSX.IntrinsicElements["div"]) {
    return <div {...props} class={`${tui__boxLineHide} ${props.class ?? ""}`.trim()}>{props.children}</div>
  }
}