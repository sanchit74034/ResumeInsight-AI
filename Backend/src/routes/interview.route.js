const express = require('express');
const { authuser } = require('../middleware/auth.middleware');
const { generateReportController, getReportByIdController, getAllReportsController } = require('../controllers/interview.controller');
const upload = require('../middleware/file.middleware');

const reportrouter = express.Router();

/*
* Route: POST /api/interview
* Description: This route handles the generation of a comprehensive interview report for a candidate based on their resume, self-description, and a job description for a Software Development Engineer (SDE-1) position. The report includes a match score, technical questions, behavioral questions, skill gaps, and preparation suggestions to help the candidate prepare effectively for their interview.
* Access: Private (requires authentication)
*/ 
reportrouter.post('/', authuser, upload.single('resume'), generateReportController);

/*
* Route: GET /api/interview
* Description: This route retrieves all reports associated with the authenticated user. It returns a list of reports that the user has generated.
* Access: Private (requires authentication)
*/
reportrouter.get('/', authuser,
 getAllReportsController);



/*
* Route: GET /api/interview/:id
* Description: This route retrieves a specific report by its ID. It checks if the report exists and if the authenticated user has access to it before returning the report details.
* Access: Private (requires authentication)
*/
reportrouter.get('/:id', authuser, getReportByIdController);



module.exports = reportrouter;