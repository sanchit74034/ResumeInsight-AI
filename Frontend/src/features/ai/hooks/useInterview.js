import {
  generateReport,
  getReportById,
  getAllReports,
} from "../services/interview.api";
import { interviewContext } from "../interview.context";
import { useCallback, useContext } from "react";

export const useInterview = () => {
  const { loading, reports, report, setReport, setReports, setLoading } =
    useContext(interviewContext);

  const generateInterviewReport = useCallback(
    async ({ jobDescription, selfDescription, resume }) => {
      setLoading(true);
      try {
        const response = await generateReport({
          jobDescription,
          selfDescription,
          resume,
        });
        setReport(response);
        return response;
      } catch (error) {
        console.error("Error generating interview report:", error);
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to generate report";
        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setReport],
  );

  const fetchReportById = useCallback(
    async (reportId) => {
      setLoading(true);
      try {
        const response = await getReportById(reportId);
        setReport(response);
      } catch (error) {
        console.error("Error fetching report:", error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setReport],
  );

  const fetchAllReports = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllReports();
      setReports(response);
    } catch (error) {
      console.error("Error fetching all reports:", error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setReports]);
  return {
    generateInterviewReport,
    fetchReportById,
    fetchAllReports,
    loading,
    report,
    reports,
  };
};
