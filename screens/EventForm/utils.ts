export const asResource = <T = object>(value: T) =>
  Object.entries(value as keyof object).map(([key, value]) => ({
    label: key,
    value: value,
  }))
