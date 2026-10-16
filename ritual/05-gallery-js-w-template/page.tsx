import { For } from "../../scripts/components"
import { css } from "../../scripts/libs/dumb_html5str_renderer"

const page__root = css`
  user-select: none;
  padding: 20px;
`

const page__imagePreview = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  border-radius: 20px;
  height: 20rem;
  margin:0 auto;
  outline: 6px solid var(--surface0);
  background: center center no-repeat var(--current-image-url);
  background-size: contain;
  color:#FFFFFF;
  text-align: center;
  margin-bottom: 25px;
  font-size: 150%;
  position: relative;
  &[data-has-image=true] #image_preview_text_hint {
    position: absolute;
    bottom: 0;
    margin: 20px;
  }
`

const page__imageListSection = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  padding-bottom: 7rem;
`

const page__image = css`
  width: 30%;
  outline: 6px solid transparent;
  opacity: 0.75;
  border-radius: 6px;
  &:hover {
    opacity: 1;
    outline-color: var(--sapphire);
  }
`

const page__imagePreviewAltText = css`
  background-color: var(--crust);
  padding-inline: 10px;
  padding-block: 5px;
  border-radius: 6px;
`

export default function Page() {
  const IMAGE_LIST = [
    {
      imageName: "bacon_1.png",
      description: "Styling with a Bandana"
    },
    {
      imageName: "bacon_2.png",
      // not really... the author's boy, I think
      description: "With My Boy",
    },
    {
      imageName: "bacon_3.png",
      description: "Young Puppy",
    }
  ]

  return (
    <>
      <script src="./pain.js" defer />
      <div id="root" class={`${page__root} must_preserve_root`}>
        <div id="image_preview" class={page__imagePreview} data-has-image={false} data-image-src="" style={`--current-image-url:""`}>
          <div class={page__imagePreviewAltText} id="image_preview_text_hint">Hover over an image below to display here.</div>
        </div>

        <section class={page__imageListSection}>
          <For each={IMAGE_LIST}>
            {(it, index) => <img id={`image_${index + 1}`} class={page__image} alt={it.description} src={`./assets/${it.imageName}`} data-image-src={`./assets/${it.imageName}`} />}
          </For>
        </section>
      </div>
    </>
  )
}