import { css } from "../../libs/dumb_html5str_renderer"

const header__navButton = css`
  list-style: none;
  & > a {
    padding-inline: 10px;
    padding-block: 5px;
    border-radius: 6px;
    opacity: 0.85;
    &:hover {
      background-color: var(--surface0);
      opacity: 1;
    }
  }
`

export function GlobalHeader(props: { header: string }) {
  return (
    <header>
      <nav>
        <ul>
          <li class={header__navButton}><a href="./index.html">Home</a></li>
          <li class={header__navButton}><a href="./neighborhood.html">Neighborhood Walks</a></li>
          <li class={header__navButton}><a href="./parks.html">Walks in the Park</a></li>
        </ul>
      </nav>
      <img src="./assets/BaconGallupPark.jpg" width="200" alt="Brown Labradoodle sitting next to a statue." />
      <h1>{props.header}</h1>
    </header>
  )
}