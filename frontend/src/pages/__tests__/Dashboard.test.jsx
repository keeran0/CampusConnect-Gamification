import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../Dashboard';
import * as pointsService from '../../services/pointsService';
import * as leaderboardService from '../../services/leaderboardService';

vi.mock('../../services/pointsService');
vi.mock('../../services/leaderboardService');

const mockUserPoints = {
  userId: 'user_123',
  totalPoints: 450,
  availablePoints: 280,
  categoriesAttended: ['academic', 'social', 'sports']
};

const mockPointsHistory = [
  {
    id: 'trans_1',
    eventTitle: 'Career Fair 2024',
    eventCategory: 'academic',
    pointsEarned: 15,
    timestamp: new Date('2024-11-10'),
    bonusType: 'first_monthly'
  }
];

const mockUserRank = {
  rank: 12,
  totalPoints: 450,
  eventsAttended: 15,
  surrounding: [
    { rank: 11, userId: 'user_011', name: 'Test User', totalPoints: 580, eventsAttended: 19 },
    { rank: 12, userId: 'user_123', name: 'Alex Johnson', totalPoints: 450, eventsAttended: 15 }
  ],
  totalUsers: 100
};

describe('Dashboard Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    pointsService.getUserPoints.mockResolvedValue(mockUserPoints);
    pointsService.getPointsHistory.mockResolvedValue({
      history: mockPointsHistory,
      total: 1
    });
    leaderboardService.getUserRank.mockResolvedValue(mockUserRank);
  });

  const renderDashboard = () => {
    return render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  };

  it('displays loading state initially', () => {
    renderDashboard();
    expect(screen.getByText(/loading your dashboard/i)).toBeInTheDocument();
  });

  it('displays user points after loading', async () => {
    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText(/280/)).toBeInTheDocument(); // Available points
      expect(screen.getByText(/450/)).toBeInTheDocument(); // Total points
    });
  });

  it('displays user rank', async () => {
    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText(/#12/)).toBeInTheDocument();
    });
  });

  it('displays categories attended', async () => {
    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText(/3\/5/)).toBeInTheDocument();
    });
  });

  it('displays points history', async () => {
    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText('Career Fair 2024')).toBeInTheDocument();
    });
  });

  it('displays nearby competitors', async () => {
    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('Alex Johnson')).toBeInTheDocument();
    });
  });

  it('highlights current user in competitors list', async () => {
    renderDashboard();

    await waitFor(() => {
      const currentUser = screen.getByText(/\(You\)/i);
      expect(currentUser).toBeInTheDocument();
    });
  });

  it('displays welcome message', async () => {
    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    pointsService.getUserPoints.mockRejectedValue(new Error('API Error'));
    
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    renderDashboard();

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('Failed to load'));
    });

    alertSpy.mockRestore();
  });
});