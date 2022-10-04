export const asResource = <T = unknown>(value: object) =>
  Object.entries(value).map(([key, value]) => ({
    name: key as T,
    text: value,
  }))
