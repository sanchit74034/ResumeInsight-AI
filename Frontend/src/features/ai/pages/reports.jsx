import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../hooks/useInterview";
import "../styles/reports.scss";

const Reports = () => {
  const navigate = useNavigate();
  const { reports, fetchAllReports, loading } = useInterview();

  useEffect(() => {
    fetchAllReports();
  }, [fetchAllReports]);

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));

  return (
    <div className="reports-container">
      <div className="reports-topbar">
        <button className="btn-back" onClick={() => navigate("/")}>
          Back to Plan
        </button>
      </div>

      <section className="reports-header">
        <h1>Interview Reports</h1>
        <p>Open a previous strategy report and continue your preparation.</p>
      </section>

      {loading ? (
        <div className="reports-status">Loading reports...</div>
      ) : reports.length === 0 ? (
        <div className="reports-status">No reports found.</div>
      ) : (
        <div className="reports-list">
          {reports.map((report) => (
            <button
              key={report._id}
              className="report-list-item"
              onClick={() => navigate(`/interview/${report._id}`)}
            >
              <div>
                <h2>{report.title || "Untitled Interview Report"}</h2>
                <span>{formatDate(report.createdAt)}</span>
              </div>

              <strong>
                {typeof report.matchScore === "number"
                  ? `${report.matchScore}%`
                  : "N/A"}
              </strong>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;
