import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, TrendingUp, Users, Crown } from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import leaderboardService from '../services/leaderboardService';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [period, setPeriod] = useState('all-time');
  const [loading, setLoading] = useState(true);
  
  const userId = 'user_123';
  
  useEffect(() => {
    loadLeaderboard();
  }, [period]);
  
  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      const [leaderboardData, rankData] = await Promise.all([
        leaderboardService.getGlobalLeaderboard(50, 0, period),
        leaderboardService.getUserRank(userId, 5)
      ]);
      
      setLeaderboard(leaderboardData.leaderboard);
      setUserRank(rankData);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
      alert('Failed to load leaderboard. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return <LoadingSpinner fullScreen message="Loading leaderboard..." />;
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-10 h-10 text-yellow-500" />
              <h1 className="text-4xl font-bold text-gray-900">
                Leaderboard
              </h1>
            </div>
            <p className="text-gray-600">
              Compete with fellow students and climb the ranks!
            </p>
          </div>
          
          {/* Period selector */}
          <div className="mb-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Time Period:</span>
                <div className="flex gap-2">
                  {[
                    { id: 'all-time', label: 'All Time' },
                    { id: 'monthly', label: 'This Month' },
                    { id: 'weekly', label: 'This Week' }
                  ].map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setPeriod(id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        period === id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Leaderboard */}
            <div className="lg:col-span-2">
              <Card title="Top Students" subtitle={`${period.replace('-', ' ')} rankings`}>
                {/* Top 3 Podium */}
                {leaderboard.length >= 3 && (
                  <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
                    {/* 2nd Place */}
                    <div className="flex flex-col items-center pt-8">
                      <div className="relative mb-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">2</span>
                        </div>
                        <div className="absolute -top-2 -right-2">
                          <Medal className="w-8 h-8 text-gray-400" />
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 text-center text-sm">
                        {leaderboard[1]?.name}
                      </h4>
                      <p className="text-lg font-bold text-gray-600 mt-1">
                        {leaderboard[1]?.totalPoints.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">points</p>
                    </div>
                    
                    {/* 1st Place */}
                    <div className="flex flex-col items-center">
                      <div className="relative mb-3">
                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-3xl font-bold text-white">1</span>
                        </div>
                        <div className="absolute -top-3 -right-3">
                          <Crown className="w-10 h-10 text-yellow-500" />
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 text-center">
                        {leaderboard[0]?.name}
                      </h4>
                      <p className="text-2xl font-bold text-yellow-600 mt-1">
                        {leaderboard[0]?.totalPoints.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">points</p>
                    </div>
                    
                    {/* 3rd Place */}
                    <div className="flex flex-col items-center pt-12">
                      <div className="relative mb-3">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full flex items-center justify-center">
                          <span className="text-xl font-bold text-white">3</span>
                        </div>
                        <div className="absolute -top-2 -right-2">
                          <Medal className="w-7 h-7 text-orange-400" />
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 text-center text-sm">
                        {leaderboard[2]?.name}
                      </h4>
                      <p className="text-lg font-bold text-gray-600 mt-1">
                        {leaderboard[2]?.totalPoints.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">points</p>
                    </div>
                  </div>
                )}
                
                {/* Full Rankings List */}
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {leaderboard.slice(3).map((user, index) => {
                    const isCurrentUser = user.userId === userId;
                    const actualRank = index + 4;
                    
                    return (
                      <div
                        key={user.userId}
                        className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                          isCurrentUser
                            ? 'bg-blue-50 border-2 border-blue-200'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                            {actualRank}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-gray-900">
                                {user.name}
                              </h4>
                              {isCurrentUser && (
                                <Badge variant="primary" size="sm">You</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {user.eventsAttended} events attended
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">
                            {user.totalPoints.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-600">points</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
            
            {/* Sidebar Stats */}
            <div className="space-y-6">
              {/* Your Rank Card */}
              <Card title="Your Position">
                <div className="text-center py-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4">
                    <span className="text-3xl font-bold text-white">
                      #{userRank?.rank || '—'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {userRank?.totalPoints.toLocaleString() || 0} points
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Out of {userRank?.totalUsers.toLocaleString() || 0} students
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600 mb-1">Top Percentile</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {Math.round((userRank?.rank / userRank?.totalUsers) * 100)}%
                    </p>
                  </div>
                </div>
              </Card>
              
              {/* Stats Card */}
              <Card title="Leaderboard Stats">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Top Score
                      </span>
                    </div>
                    <span className="font-bold text-gray-900">
                      {leaderboard[0]?.totalPoints.toLocaleString() || 0}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Your Events
                      </span>
                    </div>
                    <span className="font-bold text-gray-900">
                      {userRank?.eventsAttended || 0}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Active Students
                      </span>
                    </div>
                    <span className="font-bold text-gray-900">
                      {leaderboard.length}
                    </span>
                  </div>
                </div>
              </Card>
              
              {/* Motivational Card */}
              <Card>
                <div className="text-center py-4">
                  <Award className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">
                    Keep Going! 💪
                  </h3>
                  <p className="text-sm text-gray-600">
                    Attend more events and earn points to climb the leaderboard!
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;