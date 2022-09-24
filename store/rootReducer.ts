import { combineReducers } from '@reduxjs/toolkit'
import tokenReducer from './tokenSlice'
import userReducer from './userSlice'

export const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer
})
export type RootState = ReturnType<typeof rootReducer>
