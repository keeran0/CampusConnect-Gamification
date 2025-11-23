import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Rewards from '../Rewards';
import * as rewardsService from '../../services/rewardsService';
import * as pointsService from '../../services/pointsService';

// Mock services
vi.mock('../../services/rewardsService');
vi.mock('../../services/pointsService');

const mockRewards = [
  {
    id: 'reward_1',
    title: 'TMU Hoodie',
    description: 'Official hoodie',
    pointsCost: 500,
    category: 'merchandise',
    imageUrl: 'https://example.com/hoodie.jpg',
    stock: 25,
    isActive: true
  },
  {
    id: 'reward_2',
    title: 'Starbucks Gift Card',
    description: '$10 gift card',
    pointsCost: 200,
    category: 'food',
    imageUrl: 'https://example.com/starbucks.jpg',
    stock: 50,
    isActive: true
  }
];

const mockUserPoints = {
  availablePoints: 300
};

describe('Rewards Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    rewardsService.getAllRewards.mockResolvedValue({
      rewards: mockRewards,
      total: 2
    });
    pointsService.getUserPoints.mockResolvedValue(mockUserPoints);
  });

  const renderRewards = () => {
    return render(
      <BrowserRouter>
        <Rewards />
      </BrowserRouter>
    );
  };

  it('displays loading state initially', () => {
    renderRewards();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays rewards after loading', async () => {
    renderRewards();

    await waitFor(() => {
      expect(screen.getByText('TMU Hoodie')).toBeInTheDocument();
      expect(screen.getByText('Starbucks Gift Card')).toBeInTheDocument();
    });
  });

  it('displays user points balance', async () => {
    renderRewards();

    await waitFor(() => {
      expect(screen.getByText(/300/)).toBeInTheDocument();
    });
  });

  it('filters rewards by search query', async () => {
    renderRewards();

    await waitFor(() => {
      expect(screen.getByText('TMU Hoodie')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search rewards/i);
    fireEvent.change(searchInput, { target: { value: 'starbucks' } });

    await waitFor(() => {
      expect(screen.queryByText('TMU Hoodie')).not.toBeInTheDocument();
      expect(screen.getByText('Starbucks Gift Card')).toBeInTheDocument();
    });
  });

  it('filters rewards by category', async () => {
    renderRewards();

    await waitFor(() => {
      expect(screen.getByText('TMU Hoodie')).toBeInTheDocument();
    });

    const foodButton = screen.getByText(/food & beverages/i);
    fireEvent.click(foodButton);

    await waitFor(() => {
      expect(screen.queryByText('TMU Hoodie')).not.toBeInTheDocument();
      expect(screen.getByText('Starbucks Gift Card')).toBeInTheDocument();
    });
  });

  it('shows empty state when no rewards match filters', async () => {
    renderRewards();

    await waitFor(() => {
      expect(screen.getByText('TMU Hoodie')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search rewards/i);
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    await waitFor(() => {
      expect(screen.getByText(/no rewards found/i)).toBeInTheDocument();
    });
  });

  it('opens redemption modal when clicking redeem', async () => {
    renderRewards();

    await waitFor(() => {
      expect(screen.getByText('Starbucks Gift Card')).toBeInTheDocument();
    });

    const redeemButtons = screen.getAllByText(/redeem/i);
    fireEvent.click(redeemButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/confirm redemption/i)).toBeInTheDocument();
    });
  });

  it('displays correct reward count', async () => {
    renderRewards();

    await waitFor(() => {
      expect(screen.getByText(/showing 2 rewards/i)).toBeInTheDocument();
    });
  });
});