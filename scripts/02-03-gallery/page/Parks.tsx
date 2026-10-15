import { GlobalHeader, ShoutOutFooter } from "../components"

const IMAGE_LIST = [
  {
    image: "bacon_in_the_woods.png",
    description: "brown labradoodle sitting near a stream in a wooded setting"
  },
  {
    image: "images/bacon_near_the_fort.png",
    description: "brown labradoodle posing in front of a makeshift fort made of branches"
  },
  {
    image: "images/downed_tree.png",
    description: "a downed tree crossign a stream" 
  },
  {
    image: "images/fort_in_woods.png",
    description: "a small fort made of branches" 
  },
  {
    image: "images/huron_river_cascades.JPG",
    description: " two people on a kayak approaching some small rapids"
  },
  {
    image: "images/mist_over_huron_river.JPG",
    description: "the mist rising over a river in the morning"
  },
  {
    image: "images/munising.jpg",
    description: "small waterfall"
  },
  {
    image: "images/reflected_tree.JPG",
    description: "reflection of a lake and trees"
  }
]

export default function ParksPage() {
  return (
    <>
      <GlobalHeader header="Michigan Parks" />
      <main>
        <div>
          {IMAGE_LIST.map(it => (
            <img src={`./assets/${it.image}`} alt={it.description} width="100" />
          ))}
        </div>
      </main>
      <ShoutOutFooter />
    </>
  )
}