import { useContext } from 'react'

import { ChatContext } from '../providers/ChatProvider'

export const useChat = () => useContext(ChatContext)
