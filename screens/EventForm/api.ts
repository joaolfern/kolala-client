import api from '../../services/api'
import { Fetch } from '../../services/Fetch'

const path = 'events'

export const createEvent = async (data: FormData) => {
  return (
    await Fetch<{}>(
      () => api.post('auth/events', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
    )
  )
}
