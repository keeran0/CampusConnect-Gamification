import api from './api';

/**
 * Points-related API calls
 */
const pointsService = {
  /**
   * Get user's points summary
   */
  getUserPoints: async (userId) => {
    try {
      const response = await api.get(`/points/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user's points history with pagination
   */
  getPointsHistory: async (userId, limit = 20, offset = 0) => {
    try {
      const response = await api.get(`/points/${userId}/history`, {
        params: { limit, offset }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Award points to a user (admin/organizer function)
   */
  awardPoints: async (pointsData) => {
    try {
      const response = await api.post('/points/award', pointsData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default pointsService;