import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card Component', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<Card title="Card Title">Content</Card>);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<Card subtitle="Card Subtitle">Content</Card>);
    expect(screen.getByText('Card Subtitle')).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(<Card footer={<div>Footer content</div>}>Content</Card>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('applies hover styles when hover prop is true', () => {
    const { container } = render(<Card hover>Content</Card>);
    const card = container.firstChild;
    
    expect(card).toHaveClass('hover:shadow-xl');
  });

  it('applies correct padding classes', () => {
    const { container, rerender } = render(<Card padding="sm">Content</Card>);
    expect(container.querySelector('.p-3')).toBeInTheDocument();
    
    rerender(<Card padding="lg">Content</Card>);
    expect(container.querySelector('.p-8')).toBeInTheDocument();
  });
});