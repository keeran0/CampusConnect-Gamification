import api from './api';

/**
 * Leaderboard-related API calls
 */
const leaderboardService = {
  /**
   * Get global leaderboard
   */
  getGlobalLeaderboard: async (limit = 50, offset = 0, period = 'all-time') => {
    try {
      const response = await api.get('/leaderboard', {
        params: { limit, offset, period }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user's rank and nearby competitors
   */
  getUserRank: async (userId, context = 5) => {
    try {
      const response = await api.get(`/leaderboard/user/${userId}`, {
        params: { context }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get top N users
   */
  getTopUsers: async (limit = 10) => {
    try {
      const response = await api.get('/leaderboard/top', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Trigger leaderboard refresh
   */
  refreshLeaderboard: async () => {
    try {
      const response = await api.post('/leaderboard/refresh');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default leaderboardService;