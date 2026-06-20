import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import "../styles/report.scss";
import { useInterview } from "../hooks/useInterview";
import FullPageLoader from "../../../components/FullPageLoader/FullPageLoader";

const Report = () => {
  const { reportId } = useParams();
  const [activeSection, setActiveSection] = useState("technical");
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const { report, fetchReportById, loading } = useInterview();

  useEffect(() => {
    if (reportId) {
      fetchReportById(reportId);
    }
  }, [reportId, fetchReportById]);

  if (loading || !report) {
    return <FullPageLoader text="Fetching AI Report..."/>;
  }


  const currentQuestions =
    activeSection === "technical"
      ? report.technicalQuestions
      : report.behavioralQuestions;
  const currentQuestion = currentQuestions[selectedQuestionIndex];

  return (
    <div className="report-container">
      <div className="report-content">
        {/* Left Sidebar */}
        <aside className="report-sidebar left-sidebar">
          <nav className="sidebar-nav">
            <button
              className={`nav-item ${activeSection === "technical" ? "active" : ""}`}
              onClick={() => {
                setActiveSection("technical");
                setSelectedQuestionIndex(0);
              }}
            >
              Technical questions
            </button>
            <button
              className={`nav-item ${activeSection === "behavioral" ? "active" : ""}`}
              onClick={() => {
                setActiveSection("behavioral");
                setSelectedQuestionIndex(0);
              }}
            >
              Behavioral questions
            </button>
            <button
              className="nav-item"
              onClick={() => setActiveSection("roadmap")}
            >
              Road Map
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="report-main">
          {activeSection === "roadmap" ? (
            <div className="roadmap-content">
              <h2>Preparation Roadmap</h2>
              <div className="roadmap-grid">
                {report.preparationSuggestions.map((item) => (
                  <div key={item.day} className="roadmap-card">
                    <div className="day-badge">Day {item.day}</div>
                    <h3>{item.focusArea}</h3>
                    <p>{item.task}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="question-content">
              {currentQuestion && (
                <>
                  <div className="question-header">
                    <h2>Question {selectedQuestionIndex + 1}</h2>
                    <span className="question-count">
                      {selectedQuestionIndex + 1} / {currentQuestions.length}
                    </span>
                  </div>

                  <div className="question-section">
                    <h3 className="section-title">Question</h3>
                    <p className="question-text">{currentQuestion.question}</p>
                  </div>

                  <div className="question-section">
                    <h3 className="section-title">Intention</h3>
                    <p className="intention-text">
                      {currentQuestion.intention}
                    </p>
                  </div>

                  <div className="question-section">
                    <h3 className="section-title">Answer</h3>
                    <p className="answer-text">{currentQuestion.answer}</p>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="question-navigation">
                    <button
                      className="nav-btn prev"
                      onClick={() =>
                        setSelectedQuestionIndex(
                          Math.max(0, selectedQuestionIndex - 1),
                        )
                      }
                      disabled={selectedQuestionIndex === 0}
                    >
                      ← Previous
                    </button>
                    <button
                      className="nav-btn next"
                      onClick={() =>
                        setSelectedQuestionIndex(
                          Math.min(
                            currentQuestions.length - 1,
                            selectedQuestionIndex + 1,
                          ),
                        )
                      }
                      disabled={
                        selectedQuestionIndex === currentQuestions.length - 1
                      }
                    >
                      Next →
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="report-sidebar right-sidebar">
          {/* Match Score */}
          <div className="match-score-container">
            <div className="score-circle">
              <svg className="score-svg" viewBox="0 0 120 120">
                <circle className="score-bg" cx="60" cy="60" r="55" />
                <circle
                  className="score-progress"
                  cx="60"
                  cy="60"
                  r="55"
                  style={{
                    strokeDasharray: `${(report.matchScore / 100) * 345.575} 345.575`,
                  }}
                />
              </svg>
              <div className="score-text" id="score-input">
                <span className="score-value">{report.matchScore}%</span>
                <span className="score-label">Match Score</span>
              </div>
            </div>
          </div>

          <div className="skill-gaps-container" id="skill-input">
            <h3 className="sidebar-title">Skill Gaps</h3>
            <div className="skills-grid">
              {report.skillGaps.map((item, index) => (
                <span key={index} className={`skill-tag ${item.severity}`}>
                  {item.skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Report;
