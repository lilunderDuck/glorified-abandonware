import { css } from "../../../scripts/libs/dumb_html5str_renderer"

const nav__root = css`
  position: fixed;
  top: 0;
  padding-block: 20px;
  padding-inline: 45px;
  display: flex;
  font-size: 20px;
  width: 100%;
  gap: 20px;
`

// It's not really targeting "button" elements, it's just trying to counter this w3c error:
// The element a with the attribute href must not appear as a descendant of the button element. 
const nav__button = css`
  padding-inline: 10px;
  padding-block: 5px;
  border-radius: 6px;
  opacity: 0.85;
  &:hover {
    background-color: var(--surface0);
    opacity: 1;
  }
`

export function GlobalNavBar() {
  return (
    <nav class={nav__root}>
      <a href="./index.html" class={nav__button}>
        Home
      </a>
      <a href="./about.html" class={nav__button}>
        About this mess
      </a>
    </nav>
  )
}