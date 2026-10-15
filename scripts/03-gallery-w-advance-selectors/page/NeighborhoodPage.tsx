import { css } from "../../libs/dumb_html5str_renderer"
import { GlobalHeader, ShoutOutFooter } from "../components"

const page__main = css`
  padding: 15px;
`

const page__imageGrid = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 8px;
`

const page__images = css`
  object-fit: cover;
`
    
const page__image1 = css`
  grid-row: span 3 / span 3;
`

const page__image2 = css`
  grid-row: span 2 / span 2;
`

const page__image3 = css`
  grid-row: span 3 / span 3;
`

const page__image4 = css`
  grid-row: span 2 / span 2;
`

const page__image5 = css`
  grid-row: span 3 / span 3;
`

const page__image6 = css`
  grid-row: span 2 / span 2;
  grid-column-start: 1;
  grid-row-start: 4;
`

const page__image7 = css`
  grid-row: span 3 / span 3;
  grid-column-start: 2;
  grid-row-start: 3;
`

const page__image8 = css`
  grid-row: span 2 / span 2;
  grid-column-start: 3;
  grid-row-start: 4;
`

const page__image9 = css`
  grid-row: span 3 / span 3;
  grid-column-start: 4;
  grid-row-start: 3;
`

const page__image10 = css`
  grid-row: span 2 / span 2;
  grid-column-start: 5;
  grid-row-start: 4;
`

const IMAGE_LIST = [
  { image: "bend_in_the_road.png", description: "a purple tree stands in contrast to the green leaved trees along a bend in the road" },
  { image: "pink_blossoms.png", description: "small pink blossoms on an otherwise green leaved tree" },
  { image: "blooming_trees.png", description: "brown labradoodle sitting in front of white and purple blooming  trees" },
  { image: "falling_petals.png", description: "a purple tulip tree that is beginning to shed its petals" },
  { image: "hanging_plants.png", description: "red and green plants in a decorative hanging basket" },
  { image: "potted_plants.png", description: "a decorative planter with a variety of brightly colored plants " },
  { image: "red_maple.png", description: "a small Japanese maple tree in front of a putple door" },
  { image: "tree_with_white_blooms.png", description: "brown labradoodle sitting in front of tree blooming with white petals" },
  { image: "tulips.png", description: "bright red tulips in front of a garden light" },
  { image: "white_buds_on_tree.png", description: "artsy shot of white blooms on a green tree with a dark background" },
]

const IMAGE_CLASSLIST = [
  page__image1,
  page__image2,
  page__image3,
  page__image4,
  page__image5,
  page__image6,
  page__image7,
  page__image8,
  page__image9,
  page__image10,
]

export default function NeighborhoodPage() {
  if (IMAGE_LIST.length !== IMAGE_CLASSLIST.length) {
    throw new Error("There's not enough images or too much images to display, or there is a missing class.")
  }

  return (
    <>
      <GlobalHeader header="Neighborhood Walks" />
      <main class={page__main} id='main_content_jump_to_here'>
        <div class={page__imageGrid}>
          {IMAGE_LIST.map((it, index, _) => (
            <img 
              src={`../02-gallery/assets/${it.image}`}
              alt={it.description}
              class={`${IMAGE_CLASSLIST[index]} ${page__images}`}
              draggable={false}
            />
          ))}
        </div>
      </main>
      <ShoutOutFooter />
    </>
  )
}