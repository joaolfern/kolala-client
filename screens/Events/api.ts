import api from '../../services/api'
import { Fetch } from '../../services/Fetch'
import { IEvent } from '../../types/Event'

const path = 'events'

export const listEvents = async () => {
  return await Fetch<{
    organizingEvents: IEvent.ListItem[]
    participatingEvents: IEvent.ListItem[]
  }>(() => api.get('auth/events'))
}
