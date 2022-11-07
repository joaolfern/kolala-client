import { combineReducers } from '@reduxjs/toolkit'
import replyReducer from './replySlice'
import filterReducer from './mapFilterSlice'
import tokenReducer from './tokenSlice'
import userReducer from './userSlice'
import markersReducer from './markersSlice'

export const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
  filter: filterReducer,
  reply: replyReducer,
  markers: markersReducer
})
export type RootState = ReturnType<typeof rootReducer>
