import type { ReactNode } from "react"

export function Show<T extends any>(props: { 
  when: T | null | undefined, 
  childern: (value: NonNullable<T>) => ReactNode
}) {
  return props.when ? props.childern(props.when) : null
}