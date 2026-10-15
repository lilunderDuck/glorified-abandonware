import { css } from "../../libs/dumb_html5str_renderer"
import { GlobalHeader, ShoutOutFooter } from "../components"

const IMAGE_LIST = [
  {
    image: "bacon_in_the_woods.png",
    description: "brown labradoodle sitting near a stream in a wooded setting"
  },
  {
    image: "bacon_near_the_fort.png",
    description: "brown labradoodle posing in front of a makeshift fort made of branches"
  },
  {
    image: "downed_tree.png",
    description: "a downed tree crossign a stream" 
  },
  {
    image: "fort_in_woods.png",
    description: "a small fort made of branches" 
  },
  {
    image: "huron_river_cascades.JPG",
    description: " two people on a kayak approaching some small rapids"
  },
  {
    image: "mist_over_huron_river.JPG",
    description: "the mist rising over a river in the morning"
  },
  {
    image: "munising.jpg",
    description: "small waterfall"
  },
  {
    image: "reflected_tree.JPG",
    description: "reflection of a lake and trees"
  }
]

const page__main = css`
  padding: 15px;
`

const page__images = css`
  object-fit: cover;
  width: 100%;
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

export default function ParksPage() {
  return (
    <>
      <GlobalHeader header="Michigan Parks" />
      <main class={page__main} id='main_content_jump_to_here'>
        <div class={page__imageGrid}>
          {IMAGE_LIST.map((it, index, _) => (
            <img 
              src={`../02-gallery/assets/${it.image}`}
              alt={it.description}
              class={page__images}
              draggable={false}
            />
          ))}
        </div>
      </main>
      <ShoutOutFooter />
    </>
  )
}