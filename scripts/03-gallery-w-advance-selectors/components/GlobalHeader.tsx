import { SkipToMainContent } from "../../components"
import { css } from "../../libs/dumb_html5str_renderer"

const header__root = css`
  background-color: var(--mantle);
  padding: 15px;
  user-select: none;
  height: 26rem;
`

const header__nav = css`
  padding: 20px;
  /* req #4: Change the nav element to use inline-block and have a width of about 80%. */
  width: 80%;
  display: inline-block;
`

const header__navButton = css`
  padding-inline: 10px;
  padding-block: 5px;
  border-radius: 6px;
  opacity: 0.85;
  font-size: 1.5rem;
  &:hover {
    background-color: var(--surface0);
    opacity: 1;
  }

  &:not(:first-child) {
    margin-left: 20px;
  }
`

const header__titleWrap = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-inline: 6rem;
  /* req #5: Use a descendent selector to style only the image in the nav to have a width of about 10%. */
  & img {
    width: 16%;
    /* Fix: image overflow */
    height: 50%;
    /* Fix: image stretch */
    object-fit: contain;
    flex-shrink: 0;
  }
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
      <SkipToMainContent />
      <nav class={header__nav}>
        <a class={header__navButton} href="./index.html">Home</a>
        <a class={header__navButton} href="./neighborhood.html">Neighborhood Walks</a>
        <a class={header__navButton} href="./parks.html">Walks in the Park</a>
      </nav>
      <div class={header__titleWrap}>
        {/* NOTE: image is not optimized (4.98MB!!) */}
        <h1 class={header__header}>{props.header}</h1>
        <img src="../02-gallery/assets/BaconGallupPark.jpg" alt="Brown Labradoodle sitting next to a statue." draggable={false} />
      </div>
    </header>
  )
}