import api from '../../services/api'
import { Fetch } from '../../services/Fetch'
import { IEvent } from '../../types/Event'

const path = 'events'

export const listEvents = async () => {
  return await Fetch<IEvent.IEventSections[]>(() => api.get('auth/events'))
}
