export function grabElementById<T extends keyof HTMLElementTagNameMap>(element: string) {
  const elementFound = document.getElementById(element) as HTMLElementTagNameMap[T]
  if (!elementFound) {
    throw new Error(`Could not find an element with id: ${element}, did you change the id name in the html?`)
  }

  return elementFound
}