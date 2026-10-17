/**Basically `document.getElementById()` wrapper with a little bit
 * nicer way to type the element name, example:
 * ```
 * const divElement = grabElementById<"div">(".some_element")
 * // ... use it somewhere ...
 * ```
 * 
 * If it doesn't find the element it has to look for, it will yell.
 * @param element the element id name, not `#some_name`, just `some_name`
 * @throws `Error` if it could not find the provided id
 */
export function grabElementById<T extends keyof HTMLElementTagNameMap>(element: string) {
  const elementFound = document.getElementById(element) as HTMLElementTagNameMap[T]
  if (!elementFound) {
    throw new Error(`Could not find an element with id: ${element}, did you change the id name in the html?`)
  }

  return elementFound
}

/**Basically a `document.querySelectorAll` wrapper, with a little bit
 * nicer way to type the element name, e.g:
 * ```
 * grabAllElement<"div">(".some_element")
 * 
 * ```
 * Instead of
 * ```
 * document.querySelectorAll(".some_element") as NodeListOf<HTMLDivElement>
 * // note, you can do like this, but it will force you to put "div" as the argument, kinda sucks
 * document.querySelectorAll<"div">("div")
 * ```
 * 
 * Nothing to say much here.
 * 
 * See [`document.querySelectorAll()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll).
 */
export function grabAllElement<T extends keyof HTMLElementTagNameMap>(selector: string) {
  return document.querySelectorAll(selector) as NodeListOf<HTMLElementTagNameMap[T]>
}

/**Get a boolean value by the attribute name from the provided element.
 * @param element the target element, must not be `null` or `undefined`
 * @param name the attribute name you want to grab from
 * @returns a boolean value 
 * @throws `Error` if the target `name` attribute is not found.
 * @throws `Error` if the target `name` attribute is not a boolean attribute 
 * (either the attribute is not returning `"true"` or `"false"`)
 */
export function getBooleanAttribute<T extends Element>(element: T, name: string) {
  const value = element.getAttribute(name)
  if (!value) throw new Error(`Attribute "${name}" not found, did you change the attribute name in the html?`)

  if (value === "true") return true
  if (value === "false") return false

  throw new Error(`"${name}" is not a boolean attribute, did you accidentally mix up your attributes?`)
}

/**A `anyElement.setAttribute()` wrapper, but it will automatically convert the
 * value into string for you, that it.
 * @param element the target element, must not be `null` or `undefined`
 * @param name the attribute name you want set
 * @param value any value in here
 * @returns *nothing*
 */
export function setAttribute<T extends Element>(element: T, name: string, value: any) {
  element.setAttribute(name, JSON.stringify(value))
}