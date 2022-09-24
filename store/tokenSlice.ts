import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: string = ''

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => (
      state = action.payload
    ),
  },
})

export const { setToken } = tokenSlice.actions

export const selectToken = (state: { token: string } ) => state

const tokenReducer = tokenSlice.reducer
export default tokenReducer
