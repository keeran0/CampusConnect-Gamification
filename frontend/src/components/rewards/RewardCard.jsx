// src/components/rewards/RewardCard.jsx
import React from 'react';
import { ShoppingCart, Package, AlertCircle } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';

const RewardCard = ({ 
  reward, 
  userPoints = 0,
  onRedeem,
  loading = false 
}) => {
  const canAfford = userPoints >= reward.pointsCost;
  const isOutOfStock = reward.stock <= 0;
  const isUnavailable = !reward.isActive || isOutOfStock;
  
  // Category badge variant mapping
  const categoryVariants = {
    merchandise: 'primary',
    food: 'warning',
    services: 'success',
    digital: 'purple'
  };
  
  return (
    <Card hover={!isUnavailable} className={isUnavailable ? 'opacity-60' : ''}>
      {/* Image */}
      <div className="relative mb-4">
        <img 
          src={reward.imageUrl} 
          alt={reward.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        
        {/* Stock badge */}
        {reward.stock <= 5 && reward.stock > 0 && (
          <Badge 
            variant="warning" 
            className="absolute top-2 right-2"
          >
            <AlertCircle className="w-3 h-3 mr-1" />
            Only {reward.stock} left
          </Badge>
        )}
        
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
            <Badge variant="danger" size="lg">
              OUT OF STOCK
            </Badge>
          </div>
        )}
      </div>
      
      {/* Category badge */}
      <Badge variant={categoryVariants[reward.category]} size="sm" className="mb-2">
        {reward.category}
      </Badge>
      
      {/* Title & Description */}
      <h3 className="text-lg font-bold text-gray-900 mb-2">{reward.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
      
      {/* Points & Action */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <div>
          <div className="text-2xl font-bold text-blue-600">
            {reward.pointsCost.toLocaleString()}
          </div>
          <div className="text-xs text-gray-600">points</div>
        </div>
        
        <Button
          onClick={() => onRedeem(reward)}
          disabled={isUnavailable || !canAfford || loading}
          variant={canAfford ? 'primary' : 'outline'}
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-1" />
          {isUnavailable ? 'Unavailable' : canAfford ? 'Redeem' : 'Need More'}
        </Button>
      </div>
      
      {/* Insufficient points message */}
      {!canAfford && !isUnavailable && (
        <div className="mt-3 text-sm text-orange-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          Need {(reward.pointsCost - userPoints).toLocaleString()} more points
        </div>
      )}
    </Card>
  );
};

export default RewardCard;