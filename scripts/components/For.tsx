import { JSX } from "react"

interface IForProps<T extends any> {
  each: T[]
  children(it: T, index: number): JSX.Element
}

export function For<T extends any>(props: IForProps<T>): JSX.Element {
  return (
    <>
      {props.each.map((it, index) => props.children(it, index))}
    </>
  )
}