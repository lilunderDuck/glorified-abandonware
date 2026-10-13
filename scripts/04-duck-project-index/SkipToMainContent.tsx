import { Kbd } from "../components"
import { css } from "../libs/dumb_html5str_renderer"

const skipToMainContent__root = css`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  display: block;
  padding-inline: 30px;
  padding-block: 5px;
  text-align: center;
  border-radius: 6px;
  background-color: var(--surface0);
  display: flex;
  align-items: center;
  gap: 15px;
  transition: 0.25s ease-out;
  &:focus {
    top: 30px;
  }
`

export function SkipToMainContent() {
  return (
    <a 
      aria-label="Skip directly to main content" 
      href="#main_content_jump_to_here" 
      class={skipToMainContent__root}
    >
      Skip To Main Content
      <Kbd>Enter</Kbd>
    </a>
  )
}