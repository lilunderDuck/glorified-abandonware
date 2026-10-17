import { getBooleanAttribute, grabAllElement, grabElementById, setAttribute } from "../../scripts/libs/jquery_simulator"

console.log("hello world")

const imageList__root = grabElementById<"section">("imageList__root")
const imageList__showBtn = grabElementById<"button">("imageList__showBtn")
const gallery__navButtons = grabAllElement(".gallery__navBtnRef")

function shouldGrayOutGalleryNavButtons(shouldGrayOut: boolean) {
  for (const navButton of gallery__navButtons) {
    setAttribute(navButton, "data-gray-out", shouldGrayOut)
  }
}

imageList__showBtn.addEventListener("click", () => {
  const isShowing = getBooleanAttribute(imageList__root, "data-image-list-showing")
  setAttribute(imageList__root, "data-image-list-showing", !isShowing)
  shouldGrayOutGalleryNavButtons(!isShowing)
})