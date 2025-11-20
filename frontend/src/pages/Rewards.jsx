// src/pages/Rewards.jsx
import React, { useState, useEffect } from 'react';
import { Gift, Search } from 'lucide-react';
import RewardCard from '../components/rewards/RewardCard';
import RewardModal from '../components/rewards/RewardModal';
import RewardsFilter from '../components/rewards/RewardsFilter';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import pointsService from '../services/pointsService';
import rewardsService from '../services/rewardsService';

const Rewards = () => {
  const [rewards, setRewards] = useState([]);
  const [filteredRewards, setFilteredRewards] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('points-asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedReward, setSelectedReward] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const userId = 'user_123';
  
  useEffect(() => {
    loadData();
  }, []);
  
  useEffect(() => {
    filterAndSortRewards();
  }, [rewards, selectedCategory, sortBy, searchQuery]);
  
  const loadData = async () => {
    setLoading(true);
    try {
      const [rewardsData, pointsData] = await Promise.all([
        rewardsService.getAllRewards(),
        pointsService.getUserPoints(userId)
      ]);
      
      setRewards(rewardsData.rewards);
      setUserPoints(pointsData.availablePoints);
    } catch (error) {
      console.error('Failed to load rewards:', error);
      alert('Failed to load rewards. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };
  
  const filterAndSortRewards = () => {
    let filtered = [...rewards];
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(r => r.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query)
      );
    }
    
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'points-asc':
          return a.pointsCost - b.pointsCost;
        case 'points-desc':
          return b.pointsCost - a.pointsCost;
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
    
    setFilteredRewards(filtered);
  };
  
  const handleRedeemClick = (reward) => {
    setSelectedReward(reward);
    setIsModalOpen(true);
  };
  
  const handleConfirmRedeem = async (reward) => {
    try {
      const result = await rewardsService.redeemReward(userId, reward.id);
      setUserPoints(prev => prev - reward.pointsCost);
      setRewards(prev => prev.map(r => 
        r.id === reward.id ? { ...r, stock: r.stock - 1 } : r
      ));
      return result;
    } catch (error) {
      throw error;
    }
  };
  
  if (loading) {
    return <LoadingSpinner fullScreen message="Loading rewards catalog..." />;
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Rewards Catalog 🎁
                </h1>
                <p className="text-gray-600">
                  Redeem your points for exclusive rewards
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Available Balance</p>
                <p className="text-3xl font-bold text-blue-600">
                  {userPoints.toLocaleString()} <span className="text-lg">pts</span>
                </p>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search rewards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {/* Filters */}
          <RewardsFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
          
          {/* Results count */}
          <div className="mb-4">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredRewards.length}</span> reward{filteredRewards.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          {/* Rewards Grid */}
          {filteredRewards.length === 0 ? (
            <EmptyState
              icon={Gift}
              title="No rewards found"
              description={searchQuery ? 
                "Try adjusting your search or filters" : 
                "Check back later for new rewards!"
              }
              actionLabel={searchQuery || selectedCategory !== 'all' ? "Clear Filters" : undefined}
              onAction={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRewards.map(reward => (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  userPoints={userPoints}
                  onRedeem={handleRedeemClick}
                />
              ))}
            </div>
          )}
          
          {/* Redemption Modal */}
          <RewardModal
            reward={selectedReward}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmRedeem}
            userPoints={userPoints}
          />
        </div>
      </div>
    </div>
  );
};

export default Rewards;