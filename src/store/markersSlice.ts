import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { IMarkers } from '../Models/Event'
import type { RootState } from './rootReducer'

type IInitialState = {
  markers: IMarkers[]
}

const initialState: IInitialState = {
  markers: [],
}

const markersSlice = createSlice({
  name: 'markers',
  initialState,
  reducers: {
    updateMarkers: (state, action: PayloadAction<IMarkers[]>) => {
      return (state = {
        markers: action.payload,
      })
    },
  },
})

export const { updateMarkers } = markersSlice.actions

export const selectMarkers = (state: RootState) => state.markers

const markersReducer = markersSlice.reducer
export default markersReducer
