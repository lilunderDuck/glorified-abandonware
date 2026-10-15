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
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 8px;
  height: 50rem;
`
    
const page__image1 = css`
  grid-column: span 2 / span 2;
  grid-row: span 3 / span 3;
`

const page__image2 = css`
  grid-row: span 3 / span 3;
  grid-column-start: 3;
`

const page__image3 = css`
  grid-row: span 3 / span 3;
  grid-column-start: 1;
  grid-row-start: 4;
`

const page__image4 = css`
  grid-column: span 2 / span 2;
  grid-row: span 3 / span 3;
  grid-column-start: 2;
  grid-row-start: 4;
`

const page__image5 = css`
  grid-column: span 2 / span 2;
  grid-row: span 2 / span 2;
  grid-column-start: 4;
  grid-row-start: 1;
`

const page__image6 = css`
  grid-row: span 4 / span 4;
  grid-column-start: 5;
  grid-row-start: 3;
`

const page__image7 = css`
  grid-row: span 2 / span 2;
  grid-column-start: 4;
  grid-row-start: 3;
`

const page__image8 = css`
  grid-row: span 2 / span 2;
  grid-column-start: 4;
  grid-row-start: 5;
`

const IMAGE_CLASSLIST = [
  page__image1,
  page__image2,
  page__image3,
  page__image4,
  page__image5,
  page__image6,
  page__image7,
  page__image8,
]

export default function ParksPage() {
  return (
    <>
      <GlobalHeader header="Michigan Parks" />
      <main class={page__main} id='main_content_jump_to_here'>
        <div class={page__imageGrid}>
          {IMAGE_LIST.map((it, index, _) => (
            <div class={IMAGE_CLASSLIST[index]}>
              <img 
                src={`../02-gallery/assets/${it.image}`}
                alt={it.description}
                class={page__images}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </main>
      <ShoutOutFooter />
    </>
  )
}