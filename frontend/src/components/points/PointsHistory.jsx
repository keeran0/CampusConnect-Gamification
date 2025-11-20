import React from 'react';
import { Calendar, Award, Star } from 'lucide-react';
import { format } from 'date-fns';
import Card from '../common/Card';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';

const PointsHistory = ({ history = [], loading = false }) => {
  // Determine badge variant based on bonus type
  const getBonusBadge = (bonusType) => {
    if (!bonusType) return null;
    
    const bonusConfig = {
      first_monthly: { label: 'First of Month', variant: 'success' },
      new_category: { label: 'New Category', variant: 'primary' }
    };
    
    const config = bonusConfig[bonusType];
    return config ? (
      <Badge variant={config.variant} size="sm">
        <Star className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    ) : null;
  };
  
  if (loading) {
    return (
      <Card title="Points History">
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }
  
  if (history.length === 0) {
    return (
      <Card title="Points History">
        <EmptyState
          title="No points history yet"
          description="Attend events to start earning points and see your history here!"
        />
      </Card>
    );
  }
  
  return (
    <Card title="Points History" subtitle="Your recent point-earning activities">
      <div className="space-y-4">
        {history.map((transaction) => (
          <div 
            key={transaction.id} 
            className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{transaction.eventTitle}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="default" size="sm">
                      {transaction.eventCategory}
                    </Badge>
                    {getBonusBadge(transaction.bonusType)}
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(transaction.timestamp), 'MMM dd, yyyy • h:mm a')}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right ml-4">
              <div className="text-2xl font-bold text-green-600">
                +{transaction.pointsEarned}
              </div>
              <div className="text-xs text-gray-600">points</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PointsHistory;