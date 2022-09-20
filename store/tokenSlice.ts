import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: string = ''

export const tokenSlice = createSlice({
  name: 'token',
  initialState: initialState,
  reducers: {
    storeToken: (state, action: PayloadAction<string>) => (
      state = action.payload
    ),
  },
})

export const { storeToken } = tokenSlice.actions

export const selectToken = (state: { token: string } ) => state

const tokenReducer = tokenSlice.reducer

export default tokenReducer
