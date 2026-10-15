import { css } from "../../libs/dumb_html5str_renderer"

const header__root = css`
  background-color: var(--mantle);
  padding: 15px;
  user-select: none;
`

const header__nav = css`
  padding: 20px;
  width: 100%;
`

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

const header__navItemList = css`
  display: flex;
  gap: 15px;
  padding-left: 0;
`

const header__titleWrap = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-inline: 6rem;
`

const header__header = css`
  color: var(--sky);
  font-size: 3rem;
  text-align: center;
  width: 100%;
`

export function GlobalHeader(props: { header: string }) {
  return (
    <header class={header__root}>
      <nav class={header__nav}>
        <ul class={header__navItemList}>
          <li class={header__navButton}><a href="./index.html">Home</a></li>
          <li class={header__navButton}><a href="./neighborhood.html">Neighborhood Walks</a></li>
          <li class={header__navButton}><a href="./parks.html">Walks in the Park</a></li>
        </ul>
      </nav>
      <div class={header__titleWrap}>
        {/* NOTE: image is not optimized (4.98MB!!) */}
        <h1 class={header__header}>{props.header}</h1>
        <img src="../02-gallery/assets/BaconGallupPark.jpg" width="200" alt="Brown Labradoodle sitting next to a statue." draggable={false} />
      </div>
    </header>
  )
}