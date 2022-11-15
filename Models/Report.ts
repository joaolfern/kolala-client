import api from '../services/api'
import { Fetch } from '../services/Fetch'
import { IProfile } from '../types/Profile'

export namespace IReport {
  export type Model = {
    id: number
    status: number
    authorId: number
    targetId: number
    target: IProfile
    category: number
    description: string
    createdAt: string
  }

  export type CreateReportConfig = {
    body: {
      category: number
      description?: string
      targetId: number
    }
  }

  export type UpdateReportConfig = {
    body: { status: number }
    reportId: number
  }
}

class Report {
  private path = 'auth/reports'

  async createReport ({ body }: IReport.CreateReportConfig) {
    return (
      await Fetch(
        () => api.post(`${this.path}`, body)
      )
    )
  }

  async updateReport ({ body, reportId }: IReport.UpdateReportConfig) {
    return (
      await Fetch(
        () => api.patch(`${this.path}/${reportId}`, body)
      )
    )
  }

  async list () {
    return (
      await Fetch<IReport.Model[]>(
        () => api.get(this.path)
      )
    )
  }
}



export default new Report()
