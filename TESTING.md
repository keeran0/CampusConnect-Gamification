# TESTING.md

# Testing Guide for CampusConnect Gamification

## Overview

This project uses Jest for backend testing and Vitest for frontend testing. We aim for at least 70% code coverage.

## Backend Testing

### Running Tests
```bash
cd backend

# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Run in watch mode (development)
npm run test:watch

# Run specific test file
npm test -- pointsController.test.js

# Run tests matching pattern
npm test -- --testNamePattern="should award points"
```

### Test Structure
```
backend/
├── __tests__/
│   ├── controllers/
│   │   ├── pointsController.test.js
│   │   ├── rewardsController.test.js
│   │   └── leaderboardController.test.js
│   └── utils/
│       └── pointsCalculator.test.js
```

### Writing Backend Tests
```javascript
const request = require('supertest');
const app = require('../server');

describe('Your Feature', () => {
  test('should do something', async () => {
    const response = await request(app)
      .get('/api/endpoint')
      .expect(200);
    
    expect(response.body).toHaveProperty('success', true);
  });
});
```

## Frontend Testing

### Running Tests
```bash
cd campusconnect-gamification

# Run all tests
npm test

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage

# Run specific test file
npm test Button.test.jsx
```

### Test Structure
```
frontend/src/
├── components/
│   └── common/
│       ├── __tests__/
│       │   ├── Button.test.jsx
│       │   ├── Card.test.jsx
│       │   └── Badge.test.jsx
│       ├── Button.jsx
│       ├── Card.jsx
│       └── Badge.jsx
├── pages/
│   └── __tests__/
│       ├── Dashboard.test.jsx
│       └── Rewards.test.jsx
└── services/
    └── __tests__/
        └── pointsService.test.js
```

### Writing Frontend Tests
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import YourComponent from '../YourComponent';

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
  
  it('handles user interaction', () => {
    render(<YourComponent />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Updated Text')).toBeInTheDocument();
  });
});
```

## Test Coverage Goals

| Category | Minimum Coverage |
|----------|------------------|
| Statements | 70% |
| Branches | 60% |
| Functions | 70% |
| Lines | 70% |

## Best Practices

### 1. Test Behavior, Not Implementation
❌ Bad:
```javascript
expect(component.state.count).toBe(1);
```

✅ Good:
```javascript
expect(screen.getByText('Count: 1')).toBeInTheDocument();
```

### 2. Use Descriptive Test Names
❌ Bad:
```javascript
test('test1', () => { ... });
```

✅ Good:
```javascript
test('should award 15 points for new category event', () => { ... });
```

### 3. Arrange-Act-Assert Pattern
```javascript
test('should calculate points correctly', () => {
  // Arrange
  const category = 'academic';
  const attended = ['social'];
  
  // Act
  const points = calculatePoints(category, attended, false);
  
  // Assert
  expect(points).toBe(15);
});
```

### 4. Mock External Dependencies
```javascript
vi.mock('../api', () => ({
  get: vi.fn(),
  post: vi.fn()
}));
```

### 5. Clean Up After Tests
```javascript
afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});
```

## Common Testing Patterns

### Testing Async Operations
```javascript
test('fetches data', async () => {
  render(<Component />);
  
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
```

### Testing Forms
```javascript
test('submits form', async () => {
  render(<Form />);
  
  fireEvent.change(screen.getByLabelText('Name'), {
    target: { value: 'John' }
  });
  
  fireEvent.click(screen.getByText('Submit'));
  
  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalledWith({ name: 'John' });
  });
});
```

### Testing Error States
```javascript
test('displays error message', async () => {
  api.get.mockRejectedValue(new Error('API Error'));
  
  render(<Component />);
  
  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
```

## Continuous Integration

Tests run automatically on:
- Every push to main branch
- Every pull request
- Before deployment

View test results in GitHub Actions tab.

## Troubleshooting

### Tests Failing Locally

1. Clear test cache:
```bash
# Backend
npm test -- --clearCache

# Frontend
npx vitest --clearCache
```

2. Reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Coverage Not Updating

1. Delete coverage folder:
```bash
rm -rf coverage
```

2. Run tests again:
```bash
npm run test:coverage
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)