# 🚍 Company Transport Portal

A modern, mobile-responsive bus tracking and route information system designed for company employees to easily find and track bus routes, arrival times, and stop information.

## ✨ Features

### 🚌 Bus Route Management
- **Complete Route Information**: View all bus routes with detailed stop-wise arrival and departure times
- **Real-time Status Updates**: Live status indicators (On Time, Delayed, Cancelled) with auto-refresh every 30 seconds
- **Shift-based Filtering**: Filter routes by shift (A: 6:00 AM, B: 7:30 AM, C: 2:00 PM)
- **Capacity Information**: See bus capacity and route duration for better planning

### 🔍 Smart Stop Search
- **Real-time Search**: Instant search results as you type
- **Auto-suggestions**: Smart suggestions for stop names
- **Comprehensive Results**: Find all buses serving a specific stop with arrival times
- **Route Details**: View complete route information for each result

### 📱 Mobile-First Design
- **Responsive Layout**: Optimized for all screen sizes (mobile, tablet, desktop)
- **Touch-Friendly**: Large buttons and touch targets for mobile users
- **Progressive Web App Ready**: Can be installed on mobile devices
- **Offline Capable**: Works without internet connection (with cached data)

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Modern glass-like interface with backdrop blur effects
- **Smooth Animations**: Subtle animations and transitions for better user experience
- **Accessibility**: WCAG compliant with proper focus states and screen reader support
- **Dark Mode Ready**: Prepared for future dark mode implementation

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd company-bus-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📱 Usage Guide

### Viewing Bus Routes
1. Click on "📍 Bus Routes" in the navigation
2. Use the shift selector to filter routes by time
3. View detailed information including:
   - Bus number and route
   - Real-time status
   - Complete stop list with times
   - Route duration and frequency

### Searching by Stop
1. Click on "🔍 Search by Stop" in the navigation
2. Type the name of any bus stop
3. Select from auto-suggestions or continue typing
4. View all buses that serve that stop with arrival times

### Understanding Status Indicators
- 🟢 **Green**: On Time
- 🟠 **Orange**: Delayed
- 🔴 **Red**: Cancelled

## 🏗️ Architecture

### Frontend Stack
- **React 18**: Modern React with hooks and functional components
- **CSS3**: Custom CSS with modern features (Grid, Flexbox, CSS Variables)
- **JavaScript ES6+**: Modern JavaScript features and async/await

### Component Structure
```
src/
├── app.js              # Main application component
├── app.css             # Global styles and responsive design
├── index.js            # Application entry point
└── components/
    ├── header.js       # Navigation and shift selector
    ├── routes.js       # Bus routes display
    ├── searchstop.js   # Stop search functionality
    └── footer.js       # Application footer
```

### Data Structure
```javascript
{
  id: "101",
  busNumber: "101",
  origin: "Main Gate",
  destination: "Admin Block",
  shift: "A",
  capacity: 45,
  status: "on-time",
  stops: [
    {
      name: "Main Gate",
      arrivalTime: "06:00 AM",
      departureTime: "06:05 AM"
    }
  ]
}
```

## 🔧 Configuration

### Adding New Routes
Edit the `mockRoutes` array in `src/app.js` to add new bus routes:

```javascript
{
  id: "107",
  busNumber: "107",
  origin: "New Location",
  destination: "Another Location",
  shift: "A",
  capacity: 40,
  status: "on-time",
  stops: [
    // Add stops here
  ]
}
```

### Customizing Styling
- Modify `src/app.css` for visual changes
- CSS variables are used for consistent theming
- Responsive breakpoints: 768px (tablet), 1024px (desktop)

## 🚀 Future Enhancements

### Backend Integration
- **Node.js API**: RESTful API for dynamic route management
- **MongoDB Database**: Store route data and real-time updates
- **WebSocket Support**: Real-time bus location tracking
- **Authentication**: Employee login and personalized preferences

### Advanced Features
- **GPS Tracking**: Real-time bus location on map
- **Push Notifications**: Alerts for delays or cancellations
- **Favorites**: Save frequently used routes
- **Route Planning**: Multi-stop journey planning
- **Analytics Dashboard**: Usage statistics and route optimization

### Mobile App
- **React Native**: Native mobile application
- **Offline Sync**: Work without internet connection
- **Location Services**: Find nearest bus stops
- **QR Code Scanning**: Quick route access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For technical support or questions:
- Email: transport@company.com
- Emergency: Extension 911
- Office Hours: Monday-Friday, 8:00 AM - 6:00 PM

---

**Built with ❤️ for Company Employees** 