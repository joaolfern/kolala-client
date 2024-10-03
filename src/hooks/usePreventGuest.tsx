import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { CustomTokenEnum, selectToken, setToken } from '@/store/tokenSlice'

export function usePreventGuest() {
  const token = useAppSelector(selectToken)
  const dispatch = useAppDispatch()

  function preventGuest() {
    if (token === CustomTokenEnum.guest) {
      dispatch(setToken(''))
    }
  }

  return { preventGuest }
}
