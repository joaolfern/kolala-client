import React from 'react'
import { useAppDispatch } from '../store/hooks'
import { clearToken } from '../store/tokenSlice'
import { clearUser } from '../store/userSlice'
import { useSecureStore } from '../store/useSecureStore'

function useLogout() {
  const dispatch = useAppDispatch()

  async function logout() {
    const TokenSecureStore = useSecureStore()
    dispatch(clearUser({}))
    dispatch(clearToken({}))
    await TokenSecureStore.clear()
  }

  return logout
}

export default useLogout
