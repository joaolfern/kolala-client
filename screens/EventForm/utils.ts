export const asResource = <T = object>(value: T) =>
  Object.entries(value as keyof object).map(([key, value]) => ({
    label: key,
    value: value,
  }))


export const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
}
