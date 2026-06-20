import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export const generateReport = async ({jobDescription,selfDescription,resume}) => {
  try {
    const formData = new FormData();
    formData.append('jobDescription', jobDescription);
    formData.append('selfDescription', selfDescription);
    formData.append('resume', resume);

    const response = await api.post('/api/interview', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.report;
  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
};

export const getReportById = async (reportId) => {
  try {
    const response = await api.get(`/api/interview/${reportId}`);
    return response.data.report;
  } catch (error) {
    console.error('Error fetching report by ID:', error);
    throw error;
  }
};

export const getAllReports = async () => {
  try {
    const response = await api.get('/api/interview');
    return response.data.reports;
  } catch (error) {
    console.error('Error fetching all reports:', error);
    throw error;
  }
};