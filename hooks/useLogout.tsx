import React from 'react'
import { useAppDispatch } from '../store/hooks'
import { clearToken } from '../store/tokenSlice'
import { clearUser } from '../store/userSlice'
import * as Google from 'expo-auth-session/providers/google'

function useLogout() {
  const dispatch = useAppDispatch()

  function logout() {
    dispatch(clearUser({}))
    dispatch(clearToken({}))
  }

  return logout
}

export default useLogout
