export interface ICategory {
  label: string
  value: string
}

export interface IEventRegistry {
  title: string
  img: string
  date: string
  time: string
  categories: ICategory[]
  members: string[]
}
