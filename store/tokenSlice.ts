import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'

const initialState: string = ''

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      SecureStore.setItemAsync('token', action.payload)
      return (
        state = action.payload
      )
    } ,
    clearToken: (state) => {
      SecureStore.deleteItemAsync('token')
      return (
        state = initialState
      )
    }  ,
  }
})

export const { clearToken, setToken } = tokenSlice.actions
export const selectToken = (state: { token: string } ) => state

const tokenReducer = tokenSlice.reducer
export default tokenReducer
