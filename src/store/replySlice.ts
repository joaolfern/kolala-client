import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { IMessage } from '../Models/Message'
import { useAppSelector } from './hooks'

type IInitialState = {
  replyTarget: IMessage | null
  updateReplyTarget(replyTarget: IMessage): void
  dismissReplyTarget(): void
}

const initialState: IInitialState = {
  replyTarget: null,
  updateReplyTarget: () => {},
  dismissReplyTarget: () => {},
}

const replySlice = createSlice({
  name: 'reply',
  initialState,
  reducers: {
    updateReplyTarget: (state, action: PayloadAction<IMessage>) => {
      return (state = {
        ...state,
        replyTarget: action.payload,
      })
    },
    dismissReplyTarget: (state) => {
      return (state = {
        ...state,
        replyTarget: null,
      })
    },
  },
})

export const { dismissReplyTarget, updateReplyTarget } = replySlice.actions

const selectReply = (state: { reply: IInitialState }) => state.reply
export const useReply = () => useAppSelector(selectReply)

const replyReducer = replySlice.reducer
export default replyReducer
