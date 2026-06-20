const { z } = require('zod');

const titleSchema = z.string().nonempty('Title is required').describe('The title of the job position the candidate is applying for, which helps to contextualize the report and tailor the preparation suggestions accordingly');

const matchScoreSchema = z.number().min(0, 'Match score must be at least 0').max(100, 'Match score must be at most 100').describe('The match score between the candidate\'s resume and the job description, represented as a percentage from 0 to 100');

const technicalQuestionSchema = z.array(z.object({
    question: z.string().nonempty('Technical question is required').describe('The technical question asked during the interview'),
    intention: z.string().nonempty('Intention is required').describe('Intention behind the technical question, such as assessing problem-solving skills, coding ability, or understanding of specific technologies'),
    answer: z.string().nonempty('Answer is required').describe('How to answer the technical question effectively, including key points to cover and common pitfalls to avoid')
})).describe('An array of technical questions, each with its intention and answer guidance');

const behavioralQuestionSchema = z.array(z.object({
    question: z.string().nonempty('Behavioral question is required').describe('The behavioral question asked during the interview'),
    intention: z.string().nonempty('Intention is required').describe('Intention behind the behavioral question, such as assessing cultural fit, teamwork, or leadership skills'),
    answer: z.string().nonempty('Answer is required').describe('how to answer the behavioral question effectively, including the STAR method (Situation, Task, Action, Result) and examples of strong responses')
})).describe('An array of behavioral questions, each with its intention and answer guidance');

const skillGapSchema = z.array(z.object({
    skill: z.string().nonempty('Skill is required').describe('The specific skill that the candidate needs to improve'),
    severity: z.enum(['low', 'medium', 'high'], 'Severity must be one of: low, medium, high').describe('The severity of the skill gap, indicating how critical it is for the candidate to address this gap before the interview')
})).describe('An array of skill gaps, each with its severity level indicating the urgency of addressing the gap');

const preparationSuggestionSchema = z.array(z.object({
    day: z.number().int().positive('Day must be a positive integer').describe   ('The day of the preparation timeline, indicating how many days before the interview the candidate should focus on this suggestion'),
    focusArea: z.string().nonempty('Focus area is required').describe('The specific area the candidate should focus on during their preparation, such as technical skills, behavioral questions, or mock interviews'),
    task: z.string().nonempty('Task is required').describe('The specific task or activity the candidate should complete on this day to prepare effectively for the interview')
})).describe('An array of preparation suggestions, each with a specific day, focus area, and task to help the candidate prepare effectively for the interview');


const reportSchema = z.object({
    title: titleSchema,
    matchScore: matchScoreSchema,
    technicalQuestions: technicalQuestionSchema,
    behavioralQuestions: behavioralQuestionSchema,
    skillGaps: skillGapSchema,
    preparationSuggestions: preparationSuggestionSchema
}).describe('The overall report schema, containing the match score, technical questions, behavioral questions, skill gaps, and preparation suggestions for the candidate based on their resume and the job description');


module.exports = reportSchema