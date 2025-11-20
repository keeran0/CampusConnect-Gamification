// src/components/points/PointsDisplay.jsx
import React from 'react';
import { Trophy, TrendingUp } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';

const PointsDisplay = ({ 
  totalPoints = 0, 
  availablePoints = 0,
  rank,
  loading = false 
}) => {
  const pointsSpent = totalPoints - availablePoints;
  
  return (
    <Card hover className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-blue-100 text-sm font-medium mb-1">Your Points</p>
          <div className="flex items-baseline gap-2 mb-4">
            <h2 className="text-5xl font-bold">{availablePoints.toLocaleString()}</h2>
            <span className="text-xl text-blue-100">pts</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span className="text-blue-100">Total Earned:</span>
              <span className="font-semibold">{totalPoints.toLocaleString()}</span>
            </div>
            
            {pointsSpent > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <Trophy className="w-4 h-4" />
                <span className="text-blue-100">Points Spent:</span>
                <span className="font-semibold">{pointsSpent.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
        
        {rank && (
          <div className="text-center">
            <Badge variant="gold" size="lg" className="mb-2">
              Rank #{rank}
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PointsDisplay;