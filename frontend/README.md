# CampusConnect Gamification Module - Frontend

A modern, responsive React application for student engagement and rewards management.

## 🚀 Features

- **Dashboard**: Personal points overview and activity tracking
- **Rewards Catalog**: Browse and redeem rewards with points
- **Leaderboard**: Competitive rankings and user statistics
- **Responsive Design**: Optimized for desktop, tablet, and mobile

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **date-fns** - Date formatting

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on `http://localhost:5000`

## 🏃 Getting Started

### Installation
```bash
# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory (optional):
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Development
```bash
# Start development server
npm run dev

# App will be available at http://localhost:5173
```

### Build for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── common/         # Generic components (Button, Card, etc.)
│   ├── points/         # Points-related components
│   ├── rewards/        # Rewards-related components
│   └── leaderboard/    # Leaderboard components
├── pages/              # Main page components
│   ├── Dashboard.jsx
│   ├── Rewards.jsx
│   └── Leaderboard.jsx
├── services/           # API service layer
│   ├── api.js
│   ├── pointsService.js
│   ├── rewardsService.js
│   └── leaderboardService.js
├── utils/              # Utility functions
│   ├── constants.js
│   └── helpers.js
├── App.jsx             # Main app component
└── main.jsx            # Entry point
```

## 🎨 Key Components

### Common Components
- **Button**: Flexible button with variants and sizes
- **Card**: Container component with header/footer
- **Badge**: Status and category indicators
- **LoadingSpinner**: Loading states
- **EmptyState**: No-data placeholders

### Feature Components
- **PointsDisplay**: User points balance card
- **PointsHistory**: Transaction history list
- **RewardCard**: Individual reward display
- **RewardModal**: Redemption confirmation dialog
- **RewardsFilter**: Filter and sort controls

## 🔌 API Integration

All API calls go through service layers:
```javascript
import pointsService from './services/pointsService';

// Get user points
const points = await pointsService.getUserPoints(userId);

// Award points
const result = await pointsService.awardPoints({
  userId,
  eventId,
  eventCategory,
  eventTitle
});
```

## 🎯 Coding Standards

- **Component naming**: PascalCase for components
- **File naming**: Match component name
- **Props**: Destructured with defaults
- **State**: useState for local, Context for global
- **Styling**: Tailwind utility classes
- **Error handling**: Try-catch with user feedback

## 🐛 Common Issues

### Port already in use
```bash
# Kill process on port 5173
npx kill-port 5173
```

### API connection errors
- Ensure backend is running on port 5000
- Check CORS settings in backend

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 👥 Team

Gamification Team - Team 6

## 🔗 Related Projects

- [Backend API](../backend/README.md)