import { css } from "../../libs/dumb_html5str_renderer"
import { GlobalHeader, ShoutOutFooter } from "../components"

const page__main = css`
  padding: 15px;
`

const page__imageGrid = css`
  gap: 8px;
  display: grid;
  grid-template-columns: 40% 40%;
  justify-content: space-between;
  row-gap: 30px;
  gap: 20px;
  justify-content: center;
  & img {
    width: 100%;
    align-items: center;
  }
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

export default function NeighborhoodPage() {
  return (
    <>
      <GlobalHeader header="Neighborhood Walks" />
      <main class={page__main} id='main_content_jump_to_here'>
        <div class={page__imageGrid}>
          {IMAGE_LIST.map((it, index, _) => (
            <img 
              src={`../02-gallery/assets/${it.image}`}
              alt={it.description}
              draggable={false}
            />
          ))}
        </div>
      </main>
      <ShoutOutFooter />
    </>
  )
}