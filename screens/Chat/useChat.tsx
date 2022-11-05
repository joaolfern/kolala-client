import { useContext } from 'react'
import { ChatContext } from './Chat'

export const useChat = () => useContext(ChatContext)
