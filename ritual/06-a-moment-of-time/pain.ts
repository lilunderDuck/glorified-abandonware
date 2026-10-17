import { logStateTransition } from "../../scripts/libs/duck_this"
import { grabAllElement, grabElementById, setAttribute } from "../../scripts/libs/jquery_simulator"

let shouldUpdateImageByHovering = true

const imageList__imageRefs = grabAllElement<"img">(".imageList__imageRef")
const root = grabElementById("root")
const imageShowcaseView__imgRef = grabElementById<"img">("imageShowcaseView__imgRef")
const imageDescriptionRef = grabElementById<"div">("view__imageDescription")
// implementation note: of course, we can attach "tabindex" attribute ahead-of-time
// in our JSX, but... the instructions told us to manually attach that in the javascript code:
//   9. Add the new function for adding the tabfocus attribute
//    a) Add a console.log message to make sure that your event triggers
//    b) Write a for loop to loop through each image
//    c) Add the tabindex attributes
// And there's this one rating instruction:
//   The tabindex property was added using JavaScript, not hardcoded into the HTML.
// Well, that sucks.
function attachTabIndexWorkaround() {
  for (let i = 0; i < imageList__imageRefs.length; i++) {
    const imageRef = imageList__imageRefs[i]
    imageRef.addEventListener("focus", () => {
      // Hot patch: When the smaller image is in focus the large image is updated with the alt text.
      logStateTransition("IMAGE_FOCUS", "for", imageRef.src, "at index", i)
      updateImage(i)
    })

    
    // Hot patch:
    // - When the focus is removed from the smaller image (when it is in the blur state) 
    //   the large image is updated with the original text.  (Hardcoding is expected here.)
    // - When the focus is removed from the smaller image (when it is in the blur state) 
    //   the background for the large image is updated to an empty URL. (Hardcoding is expected here.) 
    imageRef.addEventListener("blur", () => {
      logStateTransition("IMAGE_UNFOCUS", "for", imageRef.src, "at index", i)
      updateImage(null)
    })

    imageRef.addEventListener("mouseenter", () => {
      if (shouldUpdateImageByHovering) updateImage(i)
    })

    // Hot patch:
    // - When the mouse is removed from a smaller image the large image is updated with 
    //   the original text. (Hardcoding is expected here.)
    // - When the mouse is removed from a smaller image the large image is updated with 
    //   the original text.  (Hardcoding is expected here.)
    imageRef.addEventListener("mouseleave", () => {
      updateImage(null)
    })

    imageRef.tabIndex = i + 1
  }
}

function toggleShowImageList(shouldShow: boolean) {
  setAttribute(root, "data-image-list-showing", shouldShow)
} 

function updateImage(currentIndex: number | null) {
  if (currentIndex === null) {
    // hot patch: when the mouse is removed from a smaller image the background 
    // for the large image is updated to an empty URL.
    imageShowcaseView__imgRef.src = ""
    imageShowcaseView__imgRef.alt = ""
    imageDescriptionRef.innerText = ""
    logStateTransition("RESTORE_EMPTY_VIEW")
    setAttribute(root, "data-image-is-currently-showing", false)
    return
  }
  const imgRef = imageList__imageRefs[currentIndex]
  imageShowcaseView__imgRef.src = imgRef.src
  imageShowcaseView__imgRef.alt = imageDescriptionRef.innerText = imgRef.alt
  setAttribute(root, "data-image-is-currently-showing", true)
  logStateTransition("UPDATE_IMAGE", "for", imgRef.src, "at index", currentIndex)
}

logStateTransition("RESYNC_STATE", "for everything")
attachTabIndexWorkaround()
toggleShowImageList(true)