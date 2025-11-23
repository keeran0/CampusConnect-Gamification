import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Badge from '../Badge';

describe('Badge Component', () => {
  it('renders with children', () => {
    render(<Badge>Badge text</Badge>);
    expect(screen.getByText('Badge text')).toBeInTheDocument();
  });

  it('applies correct variant styles', () => {
    const { rerender } = render(<Badge variant="primary">Primary</Badge>);
    expect(screen.getByText('Primary')).toHaveClass('bg-blue-100', 'text-blue-800');
    
    rerender(<Badge variant="success">Success</Badge>);
    expect(screen.getByText('Success')).toHaveClass('bg-green-100', 'text-green-800');
    
    rerender(<Badge variant="danger">Danger</Badge>);
    expect(screen.getByText('Danger')).toHaveClass('bg-red-100', 'text-red-800');
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Badge size="sm">Small</Badge>);
    expect(screen.getByText('Small')).toHaveClass('text-xs');
    
    rerender(<Badge size="lg">Large</Badge>);
    expect(screen.getByText('Large')).toHaveClass('text-base');
  });

  it('applies rounded-full when rounded is true', () => {
    render(<Badge rounded>Rounded</Badge>);
    expect(screen.getByText('Rounded')).toHaveClass('rounded-full');
  });

  it('applies rounded when rounded is false', () => {
    render(<Badge rounded={false}>Not Rounded</Badge>);
    const badge = screen.getByText('Not Rounded');
    expect(badge).toHaveClass('rounded');
    expect(badge).not.toHaveClass('rounded-full');
  });
});