import { describe, it, expect, beforeEach, vi } from 'vitest';
import pointsService from '../pointsService';
import api from '../api';

// Mock the api module
vi.mock('../api');

describe('Points Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUserPoints', () => {
    it('should fetch user points successfully', async () => {
      const mockData = {
        data: {
          userId: 'user_123',
          totalPoints: 500,
          availablePoints: 300,
          categoriesAttended: ['academic', 'social']
        }
      };

      api.get.mockResolvedValue(mockData);

      const result = await pointsService.getUserPoints('user_123');

      expect(api.get).toHaveBeenCalledWith('/points/user_123');
      expect(result).toEqual(mockData.data);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      api.get.mockRejectedValue(error);

      await expect(pointsService.getUserPoints('user_123')).rejects.toThrow('Network error');
    });
  });

  describe('getPointsHistory', () => {
    it('should fetch points history with pagination', async () => {
      const mockData = {
        data: {
          history: [],
          total: 10,
          hasMore: true
        }
      };

      api.get.mockResolvedValue(mockData);

      const result = await pointsService.getPointsHistory('user_123', 20, 0);

      expect(api.get).toHaveBeenCalledWith('/points/user_123/history', {
        params: { limit: 20, offset: 0 }
      });
      expect(result).toEqual(mockData.data);
    });
  });

  describe('awardPoints', () => {
    it('should award points successfully', async () => {
      const pointsData = {
        userId: 'user_123',
        eventId: 'event_1',
        eventCategory: 'academic'
      };

      const mockResponse = {
        data: {
          pointsEarned: 12,
          bonusType: null
        }
      };

      api.post.mockResolvedValue(mockResponse);

      const result = await pointsService.awardPoints(pointsData);

      expect(api.post).toHaveBeenCalledWith('/points/award', pointsData);
      expect(result).toEqual(mockResponse.data);
    });
  });
});