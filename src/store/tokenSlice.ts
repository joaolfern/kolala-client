import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'

export enum CustomTokenEnum {
  guest = 'guest',
}

const initialState: string = CustomTokenEnum.guest

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (_, action: PayloadAction<string>) => {
      SecureStore.setItemAsync('token', action.payload)
      return action.payload
    },
    clearToken: () => {
      SecureStore.deleteItemAsync('token')
      return initialState
    },
  },
})

export const { clearToken, setToken } = tokenSlice.actions
export const selectToken = (state: { token: string }) => state.token

const tokenReducer = tokenSlice.reducer
export default tokenReducer
