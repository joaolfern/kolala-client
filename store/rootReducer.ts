import { combineReducers } from '@reduxjs/toolkit'
import filterReducer from './mapFilterSlice'
import tokenReducer from './tokenSlice'
import userReducer from './userSlice'

export const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
  filter: filterReducer
})
export type RootState = ReturnType<typeof rootReducer>
