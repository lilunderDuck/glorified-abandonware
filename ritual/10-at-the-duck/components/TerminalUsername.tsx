import { css } from "../../../scripts/libs/dumb_html5str_renderer"

const terminal__root = css`
  display: flex;
  height: 30px;
  align-items: center;
  user-select: none;
  color: var(--surface2);
`

const terminal__segment = css`
  display: flex;
  align-items: center;
  padding-inline: 20px;
  height: 25px;
  position: relative;
  /* This creates the chevron/arrow point on the right side */
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%, 10px 50%);
  margin-right: -10px; /* Overlaps them slightly so the arrows nest into each other */
  text-align: center;
  font-weight: bold;
`

const terminal__segmentPurple = css`
  background-color: var(--mauve);
  z-index: 5;
`

const terminal__segmentPink   = css`
  background-color: var(--red);
  z-index: 4;
`

const terminal__segmentOrange = css`
  background-color: var(--peach); 
  width: 30px; 
  z-index: 3;
`

const terminal__segmentTeal   = css`
  background-color: var(--teal); 
  width: 30px; 
  z-index: 2;
`

const terminal__segmentBlue   = css`
  background-color: var(--blue); 
  z-index: 1; 
  padding-left: 20px;
`

export function TerminalUsername(props: { host: string, name: string }) {
  return (
    <div class={terminal__root}>
      <div class={`${terminal__segment} ${terminal__segmentPurple}`}>{props.host}</div>
      <div class={`${terminal__segment} ${terminal__segmentPink}`}>{props.name}</div>
      <div class={`${terminal__segment} ${terminal__segmentOrange}`}></div>
      <div class={`${terminal__segment} ${terminal__segmentTeal}`}></div>
      <div class={`${terminal__segment} ${terminal__segmentBlue}`}>
      </div>
    </div>
  )
}