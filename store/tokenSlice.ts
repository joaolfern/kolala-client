import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: string = ''

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => (
      state = action.payload
    ),
    clearToken: (state, action) => (
      state = initialState
    ),
  }
})

export const { clearToken, setToken } = tokenSlice.actions
export const selectToken = (state: { token: string } ) => state

const tokenReducer = tokenSlice.reducer
export default tokenReducer
