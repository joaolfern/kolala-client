import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFilters } from '../screens/FiltersMenu/FiltersMenu'
import { useAppSelector } from './hooks'

type IFiltersStore = {
  filters: IFilters
  isGettingNewFilter: boolean
  shouldShowToast: boolean
  hasToastFinishedMinPresence: boolean
}


export const initialState: IFiltersStore = {
  filters: {
    distance: 30,
    datetype: 'week',
    maxDateRange: null,
    minDateRange: null
  },
  isGettingNewFilter: false,
  shouldShowToast: false,
  hasToastFinishedMinPresence: false
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
    },
    updateShouldShowToast: (state, action: PayloadAction<boolean>) => {
      return (
        state = {
          ...state,
          shouldShowToast: action.payload
        }
      )
    },
    updateToastPresence: (state, action :PayloadAction<boolean>) => {
      return (
        state = {
          ...state,
          hasToastFinishedMinPresence: action.payload
        }
      )
    },
    resetToast: (state) => {
      const { hasToastFinishedMinPresence, isGettingNewFilter, shouldShowToast } = initialState
      return (
        state = {
          ...state,
          hasToastFinishedMinPresence, isGettingNewFilter, shouldShowToast
        }
      )
    }
  }
})

export const { clearFilter, setFilter, updateIsGettingNewFilter, updateShouldShowToast, updateToastPresence, resetToast } = filterSlice.actions
export const selectFilter = (state: { filter: typeof initialState } ) => state

const filterReducer = filterSlice.reducer
export default filterReducer

export const useMapFilter = () => useAppSelector(selectFilter).filter