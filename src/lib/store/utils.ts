export function readonly<T>(source: T): Readonly<T> {
  const keys = Object.keys(source) as (keyof T & string)[]

  const props = keys.reduce<any>(
    (acc, key) => ({
      ...acc,
      [key]: {
        get() {
          return source[key]
        },
      },
    }),
    {},
  )

  return Object.defineProperties({}, props) as Readonly<T>
}
