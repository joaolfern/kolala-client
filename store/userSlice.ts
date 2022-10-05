import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProfile } from '../types/Profile'
import { IAccount } from '../types/User'

interface IUserInitialState {
  account: IAccount | null
  profile: IProfile | null
}

const initialState: IUserInitialState = {
  account: null,
  profile: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserInitialState>) => (
      state = action.payload
    ),
    clearUser: (state, action) => (
      state = initialState
    )
  }
})


export const { setUser, clearUser } = userSlice.actions

export const selectUser = (state: { user: IUserInitialState } ) => state.user

const userReducer = userSlice.reducer
export default userReducer

