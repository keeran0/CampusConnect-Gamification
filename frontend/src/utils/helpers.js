/**
 * Format large numbers with commas
 */
export const formatNumber = (num) => {
  return num.toLocaleString();
};

/**
 * Format points with 'pts' suffix
 */
export const formatPoints = (points) => {
  return `${formatNumber(points)} pts`;
};

/**
 * Get category color class for Tailwind
 */
export const getCategoryColor = (categoryId) => {
  const colors = {
    academic: 'blue',
    social: 'purple',
    sports: 'green',
    community: 'yellow',
    cultural: 'pink'
  };
  return colors[categoryId] || 'gray';
};

/**
 * Calculate progress percentage
 */
export const calculateProgress = (current, total) => {
  if (total === 0) return 0;
  return Math.min(Math.round((current / total) * 100), 100);
};

/**
 * Truncate long text with ellipsis
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};