import { grabElementById } from "../../scripts/libs/jquery_simulator"

const imagePreviewText = grabElementById<"div">("image_preview_text_hint")
const imagePreview = grabElementById<"div">("image_preview")

const imagesElement = [
  grabElementById<"img">("image_1"),
  grabElementById<"img">("image_2"),
  grabElementById<"img">("image_3"),
]

for (const element of imagesElement) {
  element.addEventListener("mouseover", (mouseEvent) => whenMouseIsHoverThisImage(mouseEvent, element))
  element.addEventListener("mouseout", (mouseEvent) => whenMouseIsNotHoverThisImage(mouseEvent, element))
}

const ORIGINAL_TEXT = "Hover over an image below to display here."

function whenMouseIsHoverThisImage(_: MouseEvent, thisElement: HTMLImageElement) {
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/hidden
  // it does have a wide support, so completely valid
  imagePreviewText.innerText = thisElement.alt
  const imagePath = thisElement.getAttribute("data-image-src")
  if (!imagePath) {
    throw new Error("Could not get the value from 'data-image-src', did you change the attribute name?")
  }
  imagePreview.style.setProperty("--current-image-url", `url('${imagePath}')`)
}

function whenMouseIsNotHoverThisImage(_: MouseEvent, thisElement: HTMLImageElement) {
  imagePreviewText.innerText = ORIGINAL_TEXT
  imagePreview.style.setProperty("--current-image-url", "")
}