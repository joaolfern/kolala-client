import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Region } from 'react-native-maps'
import { IUser } from '../types/User'
import * as SecureStore from 'expo-secure-store'


interface IUserInitialState {
  user: IUser | null
  location: Region | null
}

const initialState: IUserInitialState = {
  user: null,
  location: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => (
      state = {
        ...state,
        user: action.payload
      }
    ),
    clearUser: (state, action) => {
      SecureStore.deleteItemAsync('location')
      return state = initialState
    },
    setLocation: (state, action: PayloadAction<Region>) => {
      SecureStore.setItemAsync('location', JSON.stringify(action.payload))
      return (
        state = {
          ...state,
          location: action.payload
        }
      )
    },
    clearLocation: (state) => {
      SecureStore.deleteItemAsync('location')
      return (
        state = {
          ...state,
          location: null
        }
      )
    }
  },
})


export const { setUser, clearUser, setLocation, clearLocation } = userSlice.actions

export const selectUser = (state: { user: IUserInitialState } ) => state.user

const userReducer = userSlice.reducer
export default userReducer

