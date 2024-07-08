// api.js
const API_BASE_URL = 'http://localhost:5000'; // Ensure this matches your backend URL

export const api = {
  submitSpeakingAssessment: async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'audio.webm');
  
      console.log('Sending request to:', `${API_BASE_URL}/api/assessment/speech-to-text`);
      console.log('FormData:', formData);
      
      const response = await fetch(`${API_BASE_URL}/api/assessment/speech-to-text`, {
        method: 'POST',
        body: formData,
        // You might need to include credentials if you're using sessions
        // credentials: 'include',
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in submitSpeakingAssessment:', error);
      throw error;
    }
  },

  // Add other API methods here as needed
};

export default api;