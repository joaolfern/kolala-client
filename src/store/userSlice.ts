import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'
import type { Region } from 'react-native-maps'

import type { IUser } from '../types/User'

interface IUserInitialState {
  user: IUser | null
  location: Region | null
}

const initialState: IUserInitialState = {
  user: null,
  location: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) =>
      (state = {
        ...state,
        user: action.payload,
      }),
    setUserProfile: (state, action: PayloadAction<IUser['profile']>) => {
      return {
        ...state,
        user: {
          ...state.user!,
          profile: action.payload,
        },
      }
    },
    clearUser: () => {
      SecureStore.deleteItemAsync('location')
      return initialState
    },
    setLocation: (state, action: PayloadAction<Region>) => {
      SecureStore.setItemAsync('location', JSON.stringify(action.payload))
      return {
        ...state,
        location: action.payload,
      }
    },
    clearLocation: (state) => {
      SecureStore.deleteItemAsync('location')
      return {
        ...state,
        location: null,
      }
    },
  },
})

export const {
  setUser,
  setUserProfile,
  clearUser,
  setLocation,
  clearLocation,
} = userSlice.actions

export const selectUser = (state: { user: IUserInitialState }) => state.user

const userReducer = userSlice.reducer
export default userReducer
