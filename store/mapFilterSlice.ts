import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFilters } from '../screens/FiltersMenu/FiltersMenu'
import { useAppSelector } from './hooks'

type IFiltersStore = {
  filters: IFilters
  isGettingNewFilter: boolean
}

const initialState: IFiltersStore = {
  filters: {
    distance: 30
  },
  isGettingNewFilter: false
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<IFilters>>) => {
      return (
        state = {
          ...state,
          filters: {
            ...state.filters,
            ...action.payload
          },
          isGettingNewFilter: false
        }
      )
    },
    updateIsGettingNewFilter: (state, action: PayloadAction<boolean>) => {
      return (
        state = {
          ...state,
          isGettingNewFilter: action.payload
        }
      )
    },
    clearFilter: (state) => {
      return (
        state = initialState
      )
    } ,
  }
})

export const { clearFilter, setFilter, updateIsGettingNewFilter } = filterSlice.actions
export const selectFilter = (state: { filter: typeof initialState } ) => state

const filterReducer = filterSlice.reducer
export default filterReducer

export const useMapFilter = () => useAppSelector(selectFilter).filter