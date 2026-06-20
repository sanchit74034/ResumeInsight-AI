const { GoogleGenAI } = require("@google/genai");
const reportSchema = require("../schemas/report.schema");
const { z } = require("zod");
const { retryGemini } = require("../utils/retryGemini");

const aiClient = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

async function generateReport(jobDescription, resume, selfDescription) {
  try {
    const prompt = `You are a senior technical recruiter, hiring manager, career coach, ATS specialist, and interview preparation expert.

Your task is to analyze a candidate's Resume and Self Description against the provided Job Description and generate a highly personalized interview preparation report.

INPUT DATA

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}

ANALYSIS INSTRUCTIONS

Carefully compare the candidate's skills, projects, education, experience, achievements, and technologies with the requirements mentioned in the Job Description.

Do not make assumptions or invent qualifications that are not present in the Resume or Self Description.

Base all recommendations on the actual candidate profile.

REPORT REQUIREMENTS

1. TITLE

Generate a unique and professional title based on the role described in the Job Description.

Examples:

* React Developer
* Frontend Engineer
* Data Analyst
* Full Stack Developer 
* Java Backend Engineer 

Do not use generic titles such as:

* Interview Report
* Career Report
* Interview Preparation Report

The title should clearly indicate the target role.

2. MATCH SCORE

Provide a percentage score between 0 and 100 representing how closely the candidate matches the Job Description.

Consider:

* Technical skills
* Relevant projects
* Experience level
* Tools and technologies
* Educational background
* Domain knowledge

The score should be realistic and justified.

3. TECHNICAL QUESTIONS

Generate 10 highly relevant technical interview questions based on:

* Technologies mentioned in the Job Description
* Candidate's existing skills
* Candidate's projects
* Missing but important skills

For each question provide:

* Question
* Intention behind the question
* Detailed answer guidance

The intention should explain what the interviewer is evaluating.

The answer guidance should explain:

* Important concepts to discuss
* Common mistakes to avoid
* How to structure a strong answer

4. BEHAVIORAL QUESTIONS

Generate 8 behavioral interview questions.

Questions should assess:

* Teamwork
* Leadership
* Communication
* Problem Solving
* Ownership
* Conflict Resolution
* Adaptability
* Learning Ability

For each question provide:

* Question
* Intention
* Detailed answer guidance

Use STAR methodology (Situation, Task, Action, Result) in the answer guidance.

5. SKILL GAPS

Identify all important skill gaps between the candidate profile and the Job Description.

For each skill gap provide:

* Skill name
* Severity level (low, medium, high)

Severity Rules:

HIGH:
Required skill completely missing.

MEDIUM:
Partial knowledge or limited exposure.

LOW:
Minor improvement needed.

Focus on practical skills that can impact interview performance.

6. PREPARATION PLAN

Create a 7-day interview preparation roadmap.

For each day provide:

* Day number
* Focus area
* Specific task

The plan should gradually progress from:

Day 1:
Resume Review & Job Understanding

Day 2:
Core Technical Concepts

Day 3:
Project Deep Dive

Day 4:
Advanced Technical Preparation

Day 5:
Behavioral Interview Preparation

Day 6:
Mock Interviews

Day 7:
Final Revision & Confidence Building

Each task should be actionable and realistic.

QUALITY REQUIREMENTS

* Be specific and personalized.
* Reference the candidate's actual skills and projects when possible.
* Prioritize the most important interview topics.
* Focus on helping the candidate maximize interview success.
* Do not provide generic advice.
* Do not invent fake experience, certifications, projects, or skills.
* Ensure all recommendations align with the candidate's background.

Return ONLY valid JSON matching the provided schema.
`;

    const response = await retryGemini(async () => {
      return await aiClient.models.generateContent({
        model: "models/gemini-3.1-flash-lite",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: z.toJSONSchema(reportSchema),
        },
      });});
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating report:", error);
    throw error;
  }
}

module.exports = generateReport;
