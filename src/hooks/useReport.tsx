import type { ICreateReportConfig, IUpdateReportConfig } from '../Models/Report'
import Report from '../Models/Report'
import { showToast } from '../utils/toast'

function useReport() {
  async function createReport(config: ICreateReportConfig) {
    try {
      await Report.createReport(config)
    } catch (err) {
      showToast(err.message)
    }
  }

  async function updateReport(config: IUpdateReportConfig) {
    try {
      await Report.updateReport(config)
    } catch (err) {
      showToast(err.message)
    }
  }

  return {
    createReport,
    updateReport,
  }
}

export default useReport
