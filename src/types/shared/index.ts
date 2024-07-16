export type Dictionary<T = any> = {
  [key: string]: T
}

export type PickUnion<T> = { [K in keyof T]: Pick<T, K> }[keyof T]
