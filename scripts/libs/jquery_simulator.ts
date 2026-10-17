export function grabElementById<T extends keyof HTMLElementTagNameMap>(element: string) {
  const elementFound = document.getElementById(element) as HTMLElementTagNameMap[T]
  if (!elementFound) {
    throw new Error(`Could not find an element with id: ${element}, did you change the id name in the html?`)
  }

  return elementFound
}

export function grabAllElement<T extends keyof HTMLElementTagNameMap>(selector: string) {
  return document.querySelectorAll(selector) as NodeListOf<HTMLElementTagNameMap[T]>
}

export function getBooleanAttribute<T extends Element>(element: T, name: string) {
  const value = element.getAttribute(name)
  if (!value) throw new Error(`Attribute "${name}" not found, did you change the attribute name in the html?`)

  if (value === "true") return true
  if (value === "false") return false

  throw new Error(`"${name}" is not a boolean attribute, did you accidentally mix up your attributes?`)
}

export function setAttribute<T extends Element>(element: T, name: string, value: any) {
  if (typeof value === "object") throw new Error(`object as value for attributes is currently not accepted`)
  element.setAttribute(name, `${value}`)
}