import * as React from 'react'
import * as SecureStore from 'expo-secure-store'

export function useSecureStore() {
  const get = async () => {
    return await SecureStore.getItemAsync('token')
  }

  const clear = async () => {
    return await SecureStore.deleteItemAsync('token')
  }

  const save = async (token: string) => {
    return await SecureStore.setItemAsync('token', token)
  }

  const checkForAvailability = async () => {
    const result = await SecureStore.isAvailableAsync()
    if (!result) console.log('SecureStore unavailable')
    return result
  }

  return { get, clear, save }
}
