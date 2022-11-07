import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IEvent } from '../Models/Event'
import { RootState } from './rootReducer'

type IInitialState = {
  markers: IEvent.IMarkers[]
}

const initialState: IInitialState = {
  markers: []
}

const markersSlice = createSlice({
  name: 'markers',
  initialState,
  reducers: {
    updateMarkers: (state, action: PayloadAction<IEvent.IMarkers[]>) => {
      return (
        state = {
          markers: action.payload
        }
      )
    }
  }
})

export const { updateMarkers } = markersSlice.actions

export const selectMarkers = (state: RootState) => state.markers

const markersReducer = markersSlice.reducer
export default markersReducer
