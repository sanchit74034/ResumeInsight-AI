import { useState } from "react";
import "../styles/interviewPlan.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../auth/services/auth.api";
import { useAuth } from "../../auth/hooks/useAuth";
import FullPageLoader from "../../../components/FullPageLoader/FullPageLoader"

const InterviewPlan = () => {
  const { generateInterviewReport, loading} = useInterview();
  const { setUser } = useAuth();
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [selfDescription, setSelfDescription] = useState("");
  const navigate = useNavigate();

  const handlelogoutUser = async () => {
    try {
      await logoutUser();

      setUser(null);

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handlegenerateReport = async () => {
    try {
      const data = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resume: resumeFile,
      });

      if (!data?._id) {
        return alert("Error generating report. Please try again.");
      }

      navigate(`/interview/${data._id}`);
    } catch (error) {
      console.error("Error generating report:", error);
      alert(
        error?.message ||
          "AI service is currently unavailable. Please try again later.",
      );
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleSelfDescriptionChange = (e) => {
    const text = e.target.value;
    setSelfDescription(text);
  };

  const handleJobDescriptionChange = (e) => {
    const text = e.target.value;
    setJobDescription(text);
  };

  const isFormValid =
    resumeFile && selfDescription.trim() && jobDescription.trim();

  return (
    <>
     {loading && <FullPageLoader text="Generating Interview Plan..." />}

    <div className="interview-plan-container">
      <div className="top-nav">
        <button type="button" className="btn-logout" onClick={handlelogoutUser}>
          LogOut
        </button>
        <button
          type="button"
          className="btn-history"
          onClick={() => navigate("/reports")}
        >
          View Reports
        </button>
      </div>

      {/* Header Section */}
      <section className="plan-header">
        <h1 className="plan-title">
          Create Your Custom <span className="highlight">Interview Plan</span>
        </h1>
        <p className="plan-subtitle">
          Let our AI analyze the job requirements and your unique profile to
          build a winning strategy.
        </p>
      </section>

      {/* Main Content */}
      <div className="plan-content">
        {/* Left Column - Job Description */}
        <div className="plan-column job-column">
          <div className="column-header">
            <span className="icon">📋</span>
            <h2>Target Job Description</h2>
            <span className="badge required-badge">REQUIRED</span>
          </div>

          <textarea
            id="job-description-input"
            className="job-textarea"
            placeholder="Paste the full job description here...
e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
            value={jobDescription}
            onChange={handleJobDescriptionChange}
            maxLength={5000}
          />

          <div className="char-count">{jobDescription.length} / 5000 chars</div>
        </div>

        {/* Right Column - User Profile */}
        <div className="plan-column profile-column">
          <div className="column-header">
            <span className="icon">👤</span>
            <h2>Your Profile</h2>
          </div>

          {/* Upload Resume Section */}
          <div className="profile-section">
            <div className="section-label">
              Upload Resume <span className="red-badge">Best Results</span>
            </div>

            <div className="upload-area">
              <input
                type="file"
                id="resume-input"
                className="resume-input"
                onChange={handleResumeUpload}
                accept=".pdf,.doc,.docx"
              />
              <label htmlFor="resume-input" className="upload-label">
                <svg className="upload-icon" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                    fill="currentColor"
                  />
                </svg>
                <p>Click to upload or drag & drop</p>
                <span className="file-hint">PDF or DOCX (Max 5MB)</span>
              </label>
              {resumeFile && (
                <div className="file-uploaded">✓ {resumeFile.name}</div>
              )}
            </div>
          </div>

          {/* OR Divider */}
          <div className="divider-section">
            <span className="divider-text">ALSO REQUIRED</span>
          </div>

          {/* Self Description Section */}
          <div className="profile-section">
            <div className="section-label">Quick Self-Description</div>

            <textarea
              id="self-description-input"
              className="self-description-textarea"
              placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              value={selfDescription}
              onChange={handleSelfDescriptionChange}
              maxLength={5000}
            />

            <div className="char-count">
              {selfDescription.length} / 5000 chars
            </div>
          </div>

          {/* Validation Message */}
          {!isFormValid && (
            <div className="error-message">
              <span className="error-icon">⚠</span>
              <span>
                A <strong>Resume</strong>, <strong>Self-Description</strong>,
                and <strong>Job Description</strong> are required to generate a
                personalized plan.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div className="plan-footer">
        <div className="footer-info">
          <span className="ai-badge">
            🤖 AI-Powered Strategy Generation • Approx 30s
          </span>
        </div>

        <button
          onClick={handlegenerateReport}
          className="btn-generate-strategy"
          disabled={!isFormValid || loading}
        >
          ✨ Generate My Interview Strategy
          
        </button>
      </div>

      {/* Page Footer */}
      <footer className="page-footer">
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
        <a href="#help">Help Center</a>
      </footer>
    </div>
    </>
  );
};

export default InterviewPlan;
