import api from '../../services/api'
import { Fetch } from '../../services/Fetch'
import { IProfile } from '../../types/Profile'

export const getProfile = async (id: number) => (
  await Fetch<IProfile>(
    () => api.post(`profile/${id}`)
  )
)
