import { logStateTransition } from "../../scripts/libs/duck_this"
import { getBooleanAttribute, grabAllElement, grabElementById, setAttribute } from "../../scripts/libs/jquery_simulator"
import { IMAGE_LIST } from "./components/image_list"

const imageList__imageRefs = grabAllElement<"img">(".imageList__imageRef")
const root = grabElementById("root")
const imageShowcaseView__imgRef = grabElementById<"img">("imageShowcaseView__imgRef")
// implementation note: of course, we can attach "tabindex" attribute ahead-of-time,
// in our JSX, but... the instructions told us to manually attach that in the javascript code:
//   9. Add the new function for adding the tabfocus attribute
//    a) Add a console.log message to make sure that your event triggers
//    b) Write a for loop to loop through each image
//    c) Add the tabindex attributes
// Well, that sucks.
function attachTabIndexWorkaround() {
  for (let i = 0; i < imageList__imageRefs.length; i++) {
    const imageRef = imageList__imageRefs[i]
    imageRef.addEventListener("focus", () => {
      logStateTransition("IMAGE_TAB_FOCUSED", "for", imageRef.src)
    })

    imageRef.tabIndex = i + 1
  }
}

function toggleShowImageList(shouldShow: boolean) {
  setAttribute(root, "data-image-list-showing", shouldShow)
} 

function forceToFocusFirstImage() {
  imageList__imageRefs[0].click() // focus the first element
}

const imageList__showBtn = grabElementById<"button">("imageList__showBtn")

imageList__showBtn.addEventListener("click", () => {
  const isShowing = getBooleanAttribute(root, "data-image-list-showing")
  toggleShowImageList(!isShowing)
})

let currentImageIndex = 0
const gallery__navLeftBtn = grabElementById<"button">("gallery__navLeftBtn")
const gallery__navRightBtn = grabElementById<"button">("gallery__navRightBtn")

gallery__navLeftBtn.addEventListener("click", goToPreviousItem)
gallery__navRightBtn.addEventListener("click", goToNextItem)

function goToNextItem() {
  logStateTransition("GALLERY_GO_NEXT", "for image at index", currentImageIndex)
  currentImageIndex += 1
  updateGalleryButtonsNav()
  if (currentImageIndex > IMAGE_LIST.length - 1) {
    currentImageIndex = IMAGE_LIST.length - 1
    return
  }
  
  updateImage(currentImageIndex)
}

function goToPreviousItem() {
  logStateTransition("GALLERY_GO_PREVIOUS", "for image at index", currentImageIndex)
  currentImageIndex -= 1
  updateGalleryButtonsNav()
  if (currentImageIndex < 0) {
    currentImageIndex = 0
    return
  }

  updateImage(currentImageIndex)
}

function updateGalleryButtonsNav() {
  gallery__navRightBtn.disabled = currentImageIndex >= IMAGE_LIST.length - 1
  gallery__navLeftBtn.disabled = currentImageIndex <= 0
}

function updateImage(currentIndex: number) {
  logStateTransition("UPDATE_IMAGE", "at image index", currentIndex)
  const imgRef = imageList__imageRefs[currentIndex]
  imageShowcaseView__imgRef.src = imgRef.src
}

logStateTransition("RESYNC_STATE", "for everything")
updateImage(0)
updateGalleryButtonsNav()
attachTabIndexWorkaround()
forceToFocusFirstImage()
toggleShowImageList(true)