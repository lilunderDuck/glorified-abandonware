import { JSX, ReactNode } from "react"

interface IForProps<T extends any> {
  each: T[]
  children(it: T, index: number): ReactNode
}

export function For<T extends any>(props: IForProps<T>): JSX.Element {
  return (
    <>
      {props.each.map((it, index) => props.children(it, index))}
    </>
  )
}