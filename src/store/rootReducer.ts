import { combineReducers } from '@reduxjs/toolkit'

import filterReducer from './mapFilterSlice'
import markersReducer from './markersSlice'
import replyReducer from './replySlice'
import tokenReducer from './tokenSlice'
import userReducer from './userSlice'

export const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
  filter: filterReducer,
  reply: replyReducer,
  markers: markersReducer,
})
export type RootState = ReturnType<typeof rootReducer>
