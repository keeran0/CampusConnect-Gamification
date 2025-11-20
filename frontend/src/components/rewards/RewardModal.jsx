import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, Copy, Check } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';

const RewardModal = ({ 
  reward, 
  isOpen, 
  onClose, 
  onConfirm,
  userPoints 
}) => {
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redemptionSuccess, setRedemptionSuccess] = useState(false);
  const [redemptionData, setRedemptionData] = useState(null);
  const [codeCopied, setCodeCopied] = useState(false);
  
  if (!isOpen || !reward) return null;
  
  const handleRedeem = async () => {
    setIsRedeeming(true);
    try {
      const result = await onConfirm(reward);
      setRedemptionData(result);
      setRedemptionSuccess(true);
    } catch (error) {
      alert(error.error || 'Failed to redeem reward. Please try again.');
      setIsRedeeming(false);
    }
  };
  
  const handleCopyCode = () => {
    if (redemptionData?.redemptionCode) {
      navigator.clipboard.writeText(redemptionData.redemptionCode);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };
  
  const handleClose = () => {
    setIsRedeeming(false);
    setRedemptionSuccess(false);
    setRedemptionData(null);
    setCodeCopied(false);
    onClose();
  };
  
  const remainingPoints = userPoints - reward.pointsCost;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {redemptionSuccess ? 'Redemption Successful!' : 'Confirm Redemption'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {!redemptionSuccess ? (
            // Confirmation view
            <>
              <img 
                src={reward.imageUrl} 
                alt={reward.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              
              <Badge variant="primary" className="mb-3">
                {reward.category}
              </Badge>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {reward.title}
              </h3>
              <p className="text-gray-600 mb-6">{reward.description}</p>
              
              {/* Points breakdown */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cost</span>
                  <span className="font-semibold text-gray-900">
                    {reward.pointsCost.toLocaleString()} pts
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Your Balance</span>
                  <span className="font-semibold text-gray-900">
                    {userPoints.toLocaleString()} pts
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="font-semibold text-gray-900">Remaining</span>
                  <span className={`font-bold ${remainingPoints >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {remainingPoints.toLocaleString()} pts
                  </span>
                </div>
              </div>
              
              {/* Warning if this will use most points */}
              {remainingPoints < 50 && remainingPoints >= 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-6 flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-orange-800">
                    This will use most of your points. You'll have {remainingPoints} points remaining.
                  </p>
                </div>
              )}
              
              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  fullWidth
                  disabled={isRedeeming}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleRedeem}
                  variant="success"
                  fullWidth
                  disabled={isRedeeming}
                >
                  {isRedeeming ? 'Processing...' : 'Confirm Redemption'}
                </Button>
              </div>
            </>
          ) : (
            // Success view
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Reward Redeemed!
                </h3>
                <p className="text-gray-600">
                  Your redemption code has been generated below
                </p>
              </div>
              
              {/* Reward details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={reward.imageUrl} 
                    alt={reward.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{reward.title}</h4>
                    <p className="text-sm text-gray-600">
                      {reward.pointsCost.toLocaleString()} points
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Redemption code */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Redemption Code
                </label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-white px-4 py-3 rounded border border-blue-300 font-mono text-lg font-bold text-blue-600">
                    {redemptionData?.redemptionCode}
                  </code>
                  <Button
                    onClick={handleCopyCode}
                    variant={codeCopied ? 'success' : 'primary'}
                    size="sm"
                  >
                    {codeCopied ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              {/* Instructions */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Next Steps:</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Save or screenshot your redemption code</li>
                  <li>Present this code at the redemption location</li>
                  <li>Check your email for additional instructions</li>
                  <li>Redemption codes expire in 30 days</li>
                </ul>
              </div>
              
              <Button onClick={handleClose} variant="primary" fullWidth>
                Done
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardModal;