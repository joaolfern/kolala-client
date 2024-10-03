import * as SecureStore from 'expo-secure-store'

export function useSecureStore() {
  const get = async () => {
    return SecureStore.getItemAsync('token')
  }

  return { get }
}
