import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useLayoutEffect, useRef } from 'react'
import Message from '../../Models/Message'
import ws, { ISendMessageArgs } from '../../services/socket'
import { useAppSelector } from '../../store/hooks'
import { selectToken } from '../../store/tokenSlice'

function useChat(eventId: number) {
  const { token } = useAppSelector(selectToken)

  async function sendMessage(args: ISendMessageArgs) {
    try {
      ws.sendMessage(args)
    } catch (err) {
      console.error(err)
    }
  }

  useFocusEffect(
    useCallback(() => {
      ws.initialize(token)
      ws.joinChat(eventId)

      return () => {
        ws.disconnect()
      }
    }, [eventId, token])
  )

  const onNewMessage = ws.onNewMessage

  return {
    sendMessage,
    onNewMessage,
  }
}

export default useChat
