import type { IReport } from "../Models/Report";
import Report from "../Models/Report";
import { showToast } from "../utils/toast";

function useReport() {
  async function createReport(config: IReport.CreateReportConfig) {
    try {
      await Report.createReport(config);
    } catch (err: any) {
      showToast(err.message);
    }
  }

  async function updateReport(config: IReport.UpdateReportConfig) {
    try {
      await Report.updateReport(config);
    } catch (err: any) {
      showToast(err.message);
    }
  }

  return {
    createReport,
    updateReport,
  };
}

export default useReport;
