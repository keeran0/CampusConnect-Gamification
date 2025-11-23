import { describe, it, expect } from 'vitest';
import { formatNumber, formatPoints, getCategoryColor, calculateProgress, truncateText } from '../helpers';

describe('Helper Functions', () => {
  describe('formatNumber', () => {
    it('formats numbers with commas', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1000000)).toBe('1,000,000');
      expect(formatNumber(100)).toBe('100');
      expect(formatNumber(0)).toBe('0');
    });

    it('handles negative numbers', () => {
      expect(formatNumber(-1000)).toBe('-1,000');
    });

    it('handles decimal numbers', () => {
      expect(formatNumber(1234.56)).toBe('1,234.56');
    });
  });

  describe('formatPoints', () => {
    it('formats points with suffix', () => {
      expect(formatPoints(100)).toBe('100 pts');
      expect(formatPoints(1000)).toBe('1,000 pts');
    });

    it('handles zero points', () => {
      expect(formatPoints(0)).toBe('0 pts');
    });
  });

  describe('getCategoryColor', () => {
    it('returns correct color for each category', () => {
      expect(getCategoryColor('academic')).toBe('blue');
      expect(getCategoryColor('social')).toBe('purple');
      expect(getCategoryColor('sports')).toBe('green');
      expect(getCategoryColor('community')).toBe('yellow');
      expect(getCategoryColor('cultural')).toBe('pink');
    });

    it('returns gray for unknown category', () => {
      expect(getCategoryColor('unknown')).toBe('gray');
      expect(getCategoryColor('')).toBe('gray');
      expect(getCategoryColor(null)).toBe('gray');
    });
  });

  describe('calculateProgress', () => {
    it('calculates progress percentage correctly', () => {
      expect(calculateProgress(50, 100)).toBe(50);
      expect(calculateProgress(25, 100)).toBe(25);
      expect(calculateProgress(100, 100)).toBe(100);
    });

    it('handles zero total', () => {
      expect(calculateProgress(50, 0)).toBe(0);
    });

    it('caps progress at 100%', () => {
      expect(calculateProgress(150, 100)).toBe(100);
    });

    it('rounds to nearest integer', () => {
      expect(calculateProgress(33, 100)).toBe(33);
      expect(calculateProgress(66.7, 100)).toBe(67);
    });
  });

  describe('truncateText', () => {
    it('truncates long text', () => {
      const longText = 'a'.repeat(150);
      const result = truncateText(longText, 100);
      
      expect(result.length).toBe(103); // 100 chars + '...'
      expect(result.endsWith('...')).toBe(true);
    });

    it('does not truncate short text', () => {
      const shortText = 'Short text';
      expect(truncateText(shortText, 100)).toBe(shortText);
    });

    it('uses default max length of 100', () => {
      const text = 'a'.repeat(150);
      const result = truncateText(text);
      
      expect(result.length).toBe(103);
    });

    it('handles empty string', () => {
      expect(truncateText('')).toBe('');
    });
  });
});