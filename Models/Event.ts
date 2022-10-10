import api from '../services/api'
import { Fetch } from '../services/Fetch'
import { IEvent } from '../types/Event'

class Event {
  private path = 'auth/events'

  async getDetails (id: number) {
    return await Fetch<IEvent.Details>(() => api.get(`${this.path}/${id}` ))
  }

  async getList () {
    return await Fetch<IEvent.IEventSections[]>(() => api.get(this.path))
  }

  async getParticipants (id: number) {
    return await Fetch<IEvent.IEventSections[]>(() => api.get(`${this.path}/${id}/participants`))
  }
}

export default new Event()
