import axios from 'axios';

const api = axios.create({
  baseURL: `/api/interview`,
  withCredentials: true,
});

export const generateReport = async ({jobDescription,selfDescription,resume}) => {
  try {
    const formData = new FormData();
    formData.append('jobDescription', jobDescription);
    formData.append('selfDescription', selfDescription);
    formData.append('resume', resume);

    const response = await api.post('', formData, {
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
    const response = await api.get(`/${reportId}`);
    return response.data.report;
  } catch (error) {
    console.error('Error fetching report by ID:', error);
    throw error;
  }
};

export const getAllReports = async () => {
  try {
    const response = await api.get('');
    return response.data.reports;
  } catch (error) {
    console.error('Error fetching all reports:', error);
    throw error;
  }
};