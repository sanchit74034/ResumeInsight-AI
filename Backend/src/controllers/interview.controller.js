const generateReport = require("../services/ai.service");
const reportModel = require("../models/report.model");
const { extractText } = require("../utils/pdfparse");
const { getResumeContext } = require("../services/rag.service");

async function generateReportController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Resume file is required" });
    }

    const resumecontent = await extractText(req.file.buffer);
    const { jobDescription, selfDescription } = req.body;

    if (!jobDescription || !selfDescription) {
      return res.status(400).json({
        error: "jobDescription and selfDescription are required",
      });
    }

    const resumeContext = await getResumeContext(
      resumecontent,
      req.user.userId,
      jobDescription,
    );

    const reportbyai = await generateReport(
      jobDescription,
      resumeContext,
      selfDescription,
    );

    const interviewreport = await reportModel.create({
      user: req.user.userId,
      resume: resumecontent,
      jobdescription: jobDescription,
      selfdescription: selfDescription,
      ...reportbyai,
    });

    return res.status(200).json({ report: interviewreport });
  } catch (error) {
    console.error("Error generating report:", error);

    const status = error?.status || error?.error?.code;

    if (status === 503) {
      return res.status(503).json({
        error:
          "AI service is currently experiencing high demand. Please try again in a few minutes.",
      });
    }

    return res.status(500).json({
      error: "Failed to generate report",
    });
  }
}

async function getReportByIdController(req, res) {
  try {
    const reportId = req.params.id;
    const report = await reportModel.findById(reportId);

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    if (report.user.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    return res.status(200).json({ report });
  } catch (error) {
    console.error("Error fetching report:", error);
    return res.status(500).json({ error: "Failed to fetch report" });
  }
}

async function getAllReportsController(req, res) {
  try {
    const reports = await reportModel
      .find({ user: req.user.userId })
      .sort({ createdAt: -1 })
      .select(
        "-resume -jobdescription -selfdescription -technicalQuestions -behavioralQuestions -skillGaps -preparationSuggestions",
      ); // Exclude large fields for listing

    return res.status(200).json({ reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return res.status(500).json({ error: "Failed to fetch reports" });
  }
}

module.exports = {
  generateReportController,
  getReportByIdController,
  getAllReportsController,
};
