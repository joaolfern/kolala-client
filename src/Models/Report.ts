import api from '../services/api'
import { Fetch } from '../services/Fetch'
import type { IProfile } from '../types/Profile'

export interface IReportModel {
  id: number
  status: number
  authorId: number
  targetId: number
  target: IProfile
  category: number
  description: string
  createdAt: string
}

export interface ICreateReportConfig {
  body: {
    category: number
    description?: string
    targetId: number
  }
}

export interface IUpdateReportConfig {
  body: { status: number }
  reportId: number
}

class Report {
  private path = 'auth/reports'

  async createReport({ body }: ICreateReportConfig) {
    return Fetch(() => api.post(`${this.path}`, body))
  }

  async updateReport({ body, reportId }: IUpdateReportConfig) {
    return Fetch(() => api.patch(`${this.path}/${reportId}`, body))
  }

  async list() {
    return Fetch<IReportModel[]>(() => api.get(this.path))
  }
}

export default new Report()
