import React from 'react'
import Navigation from '.'
import Login from '../screens/Login'
import { useAppSelector } from '../store/hooks'
import { selectToken } from '../store/tokenSlice'
import { selectUser } from '../store/userSlice'

function InitialWidget() {
  const { token } = useAppSelector(selectToken)
  const user = useAppSelector(selectUser)

  return token ? <Navigation /> : <Login />
}

export default InitialWidget
