import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, Users } from 'lucide-react';
import PointsDisplay from '../components/points/PointsDisplay';
import PointsHistory from '../components/points/PointsHistory';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import pointsService from '../services/pointsService';
import leaderboardService from '../services/leaderboardService';

const Dashboard = () => {
  const [userPoints, setUserPoints] = useState(null);
  const [pointsHistory, setPointsHistory] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const userId = 'user_123';
  
  useEffect(() => {
    loadDashboardData();
  }, []);
  
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [pointsData, historyData, rankData] = await Promise.all([
        pointsService.getUserPoints(userId),
        pointsService.getPointsHistory(userId, 5, 0),
        leaderboardService.getUserRank(userId, 2)
      ]);
      
      setUserPoints(pointsData);
      setPointsHistory(historyData.history);
      setUserRank(rankData);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      alert('Failed to load dashboard data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return <LoadingSpinner fullScreen message="Loading your dashboard..." />;
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-gray-600">
              Here's your gamification progress and recent activities
            </p>
          </div>
          
          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Points Display */}
            <div className="lg:col-span-2">
              <PointsDisplay
                totalPoints={userPoints?.totalPoints || 0}
                availablePoints={userPoints?.availablePoints || 0}
                rank={userRank?.rank}
              />
            </div>
            
            {/* Quick Stats */}
            <Card title="Quick Stats">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Award className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Categories</p>
                      <p className="font-bold text-gray-900">
                        {userPoints?.categoriesAttended?.length || 0}/5
                      </p>
                    </div>
                  </div>
                  <Badge variant="primary">
                    {Math.round(((userPoints?.categoriesAttended?.length || 0) / 5) * 100)}%
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Your Rank</p>
                      <p className="font-bold text-gray-900">
                        #{userRank?.rank || '—'}
                      </p>
                    </div>
                  </div>
                  <Badge variant="gold">
                    Top {Math.round((userRank?.rank / userRank?.totalUsers) * 100)}%
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Events Attended</p>
                      <p className="font-bold text-gray-900">
                        {pointsHistory.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Points History */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PointsHistory history={pointsHistory} />
            </div>
            
            {/* Nearby Competitors */}
            <Card title="Nearby Competitors" subtitle="Users close to your rank">
              <div className="space-y-3">
                {userRank?.surrounding?.map((user) => (
                  <div 
                    key={user.userId}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      user.userId === userId 
                        ? 'bg-blue-50 border-2 border-blue-200' 
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        user.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                        user.rank === 2 ? 'bg-gray-200 text-gray-700' :
                        user.rank === 3 ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        #{user.rank}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {user.name}
                          {user.userId === userId && (
                            <span className="text-blue-600 text-sm ml-2">(You)</span>
                          )}
                        </p>
                        <p className="text-xs text-gray-600">
                          {user.eventsAttended} events
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        {user.totalPoints.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;