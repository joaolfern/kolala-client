import React, { createContext, ReactNode, useContext, useState } from 'react'
import { IMessage } from '../../../Models/Message'

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

const ReplyContext = createContext(initialState)

function ReplyProvider({ children }: { children: ReactNode }) {
  const [replyTarget, setReplyTarget] =
    useState<IInitialState['replyTarget']>(null)

  function updateReplyTarget(replyTarget: IMessage) {
    setReplyTarget(replyTarget)
  }

  function dismissReplyTarget() {
    setReplyTarget(null)
  }

  const context = {
    replyTarget,
    updateReplyTarget,
    dismissReplyTarget,
  }

  return (
    <ReplyContext.Provider value={context}>{children}</ReplyContext.Provider>
  )
}

export default ReplyProvider

export const useReply = () => useContext(ReplyContext)
