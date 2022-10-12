import React from 'react'
import Navigation from '.'
import Login from '../screens/Login'
import { useAppSelector } from '../store/hooks'
import { selectToken } from '../store/tokenSlice'

function InitialWidget() {
  const { token } = useAppSelector(selectToken)

  return token ? <Navigation /> : <Login />
}

export default InitialWidget
