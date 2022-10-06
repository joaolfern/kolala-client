import React from 'react'
import { useEffect } from 'react'
import Navigation from '.'
import Login from '../screens/Login'
import { useAppSelector } from '../store/hooks'
import { selectToken } from '../store/tokenSlice'
import { selectUser } from '../store/userSlice'
import { useSecureStore } from '../store/useSecureStore'

function InitialWidget() {
  const { token } = useAppSelector(selectToken)
  const TokenSecureStore = useSecureStore()

  useEffect(() => {
    async function handleSecureStore(token: string) {
      const result = await TokenSecureStore.get()

      if (!result) TokenSecureStore.save(token)
    }

    if (token) handleSecureStore(token)
  }, [token])

  return token ? <Navigation /> : <Login />
}

export default InitialWidget
