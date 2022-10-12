import * as React from 'react'
import * as SecureStore from 'expo-secure-store'

export function useSecureStore() {
  const get = async () => {
    return await SecureStore.getItemAsync('token')
  }

  return { get }
}
