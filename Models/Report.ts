import api from '../services/api'
import { Fetch } from '../services/Fetch'

export namespace IReport {
  export type CreateReportConfig = {
    body: {
      category: number
      description?: string
      targetId: number
    }
  }

  export type UpdateReportConfig = {
    body: { status: number }
    targetId: number
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

  async updateReport ({ body, targetId }: IReport.UpdateReportConfig) {
    return (
      await Fetch(
        () => api.patch(`${this.path}/${targetId}`, body)
      )
    )
  }
}



export default new Report()
