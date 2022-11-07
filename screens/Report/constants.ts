import { Item } from 'react-native-picker-select'
import { ISelect } from '../../types'

export const REPORT_CATEGORY_RESOURCE: ISelect<number>[] = [
  {
    value: 0,
    label: 'Spam'
  },
  {
    value: 1,
    label: 'Assédio moral'
  },
  {
    value: 2,
    label: 'Golpe'
  },
  {
    value: 3,
    label: 'Conteúdo ilegal'
  },
  {
    value: 4,
    label: 'Outro motivo'
  }
]

export const REPORT_STATUS_RESOURCE: ISelect<number>[] = [
  {
    value: 1,
    label: 'Pendente'
  },
  {
    value: 0,
    label: 'Aprovado'
  },
  {
    value: 2,
    label: 'Descartado'
  }
]
