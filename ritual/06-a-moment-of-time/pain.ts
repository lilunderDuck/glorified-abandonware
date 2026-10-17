import { logStateTransition } from "../../scripts/libs/duck_this"
import { getBooleanAttribute, grabAllElement, grabElementById, setAttribute } from "../../scripts/libs/jquery_simulator"

let shouldUpdateImageByHovering = true

const imageList__imageRefs = grabAllElement<"img">(".imageList__imageRef")
const root = grabElementById("root")
const imageShowcaseView__imgRef = grabElementById<"img">("imageShowcaseView__imgRef")
const imageDescriptionRef = grabElementById<"div">("view__imageDescription")
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
      logStateTransition("IMAGE_FOCUS", "for", imageRef.src, "at index", i)
    })

    imageRef.addEventListener("blur", () => {
      logStateTransition("IMAGE_UNFOCUS", "for", imageRef.src, "at index", i)
    })

    imageRef.addEventListener("mouseenter", () => {
      if (shouldUpdateImageByHovering) updateImage(i)
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

function dontUpdateImageByMouseHoverRightAway() {
  logStateTransition("LOCK_IMAGE_UPDATE")
  shouldUpdateImageByHovering = false
  const timeoutId = setTimeout(() => {
    logStateTransition("UNLOCK_IMAGE_UPDATE")
    shouldUpdateImageByHovering = true
    clearTimeout(timeoutId)
  }, 500)
}

const imageList__showBtn = grabElementById<"button">("imageList__showBtn")
imageList__showBtn.addEventListener("click", () => {
  const isShowing = !getBooleanAttribute(root, "data-image-list-showing")
  if (isShowing) {
    dontUpdateImageByMouseHoverRightAway()
  }
  toggleShowImageList(isShowing)
})

function updateImage(currentIndex: number) {
  const imgRef = imageList__imageRefs[currentIndex]
  imageShowcaseView__imgRef.src = imgRef.src
  imageDescriptionRef.innerText = imgRef.alt
  logStateTransition("UPDATE_IMAGE", "for", imgRef.src, "at index", currentIndex)
}

logStateTransition("RESYNC_STATE", "for everything")
updateImage(0)
attachTabIndexWorkaround()
forceToFocusFirstImage()
toggleShowImageList(true)