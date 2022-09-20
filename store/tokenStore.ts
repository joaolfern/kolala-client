import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice'

export const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
