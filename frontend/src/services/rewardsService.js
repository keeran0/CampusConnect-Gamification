import api from './api';

/**
 * Rewards-related API calls
 */
const rewardsService = {
  /**
   * Get all rewards with optional filters
   */
  getAllRewards: async (filters = {}) => {
    try {
      const response = await api.get('/rewards', { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get specific reward by ID
   */
  getRewardById: async (rewardId) => {
    try {
      const response = await api.get(`/rewards/${rewardId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Redeem a reward
   */
  redeemReward: async (userId, rewardId) => {
    try {
      const response = await api.post('/rewards/redeem', {
        userId,
        rewardId
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user's redemption history
   */
  getUserRedemptions: async (userId) => {
    try {
      const response = await api.get(`/rewards/user/${userId}/redemptions`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default rewardsService;