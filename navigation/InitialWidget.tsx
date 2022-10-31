import React, { useEffect } from 'react'
import Navigation from '.'
import Login from '../screens/Login'
import socket from '../services/socket'
import { useAppSelector } from '../store/hooks'
import { selectToken } from '../store/tokenSlice'

function InitialWidget() {
  const { token } = useAppSelector(selectToken)

  useEffect(() => {
    if (token) {
      socket.connect()
    }

    return () => {
      socket.disconnect()
    }
  }, [token])

  return token ? <Navigation /> : <Login />
}

export default InitialWidget
