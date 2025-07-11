import React, { useState, useEffect } from "react";
import "./app.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Routes from "./components/routes";
import StopSearch from "./components/searchstop";

// Enhanced mock data with more realistic bus routes
const mockRoutes = [
  {
    id: "101",
    busNumber: "101",
    origin: "Main Gate",
    destination: "Admin Block",
    shift: "A",
    capacity: 45,
    status: "on-time",
    stops: [
      { name: "Main Gate", arrivalTime: "06:00 AM", departureTime: "06:05 AM" },
      { name: "Security Checkpoint", arrivalTime: "06:08 AM", departureTime: "06:10 AM" },
      { name: "Canteen", arrivalTime: "06:12 AM", departureTime: "06:15 AM" },
      { name: "Parking Lot A", arrivalTime: "06:18 AM", departureTime: "06:20 AM" },
      { name: "Admin Block", arrivalTime: "06:25 AM", departureTime: "06:30 AM" },
    ],
  },
  {
    id: "102",
    busNumber: "102",
    origin: "Back Gate",
    destination: "Tech Park",
    shift: "B",
    capacity: 40,
    status: "on-time",
    stops: [
      { name: "Back Gate", arrivalTime: "07:30 AM", departureTime: "07:35 AM" },
      { name: "Employee Housing", arrivalTime: "07:38 AM", departureTime: "07:40 AM" },
      { name: "Library", arrivalTime: "07:45 AM", departureTime: "07:50 AM" },
      { name: "Research Center", arrivalTime: "07:55 AM", departureTime: "08:00 AM" },
      { name: "Tech Park", arrivalTime: "08:05 AM", departureTime: "08:10 AM" },
    ],
  },
  {
    id: "103",
    busNumber: "103",
    origin: "East Zone",
    destination: "Main Lobby",
    shift: "C",
    capacity: 35,
    status: "delayed",
    stops: [
      { name: "East Zone", arrivalTime: "02:00 PM", departureTime: "02:05 PM" },
      { name: "Block E", arrivalTime: "02:08 PM", departureTime: "02:10 PM" },
      { name: "Conference Center", arrivalTime: "02:15 PM", departureTime: "02:20 PM" },
      { name: "Main Lobby", arrivalTime: "02:25 PM", departureTime: "02:30 PM" },
    ],
  },
  {
    id: "104",
    busNumber: "104",
    origin: "West Campus",
    destination: "Production Unit",
    shift: "A",
    capacity: 50,
    status: "on-time",
    stops: [
      { name: "West Campus", arrivalTime: "06:15 AM", departureTime: "06:20 AM" },
      { name: "Student Center", arrivalTime: "06:25 AM", departureTime: "06:30 AM" },
      { name: "Sports Complex", arrivalTime: "06:35 AM", departureTime: "06:40 AM" },
      { name: "Production Unit", arrivalTime: "06:50 AM", departureTime: "06:55 AM" },
    ],
  },
  {
    id: "105",
    busNumber: "105",
    origin: "North Gate",
    destination: "Warehouse",
    shift: "B",
    capacity: 30,
    status: "on-time",
    stops: [
      { name: "North Gate", arrivalTime: "07:45 AM", departureTime: "07:50 AM" },
      { name: "Loading Bay", arrivalTime: "07:55 AM", departureTime: "08:00 AM" },
      { name: "Warehouse", arrivalTime: "08:10 AM", departureTime: "08:15 AM" },
    ],
  },
  {
    id: "106",
    busNumber: "106",
    origin: "South Entrance",
    destination: "Training Center",
    shift: "C",
    capacity: 25,
    status: "cancelled",
    stops: [
      { name: "South Entrance", arrivalTime: "02:30 PM", departureTime: "02:35 PM" },
      { name: "Auditorium", arrivalTime: "02:40 PM", departureTime: "02:45 PM" },
      { name: "Training Center", arrivalTime: "02:55 PM", departureTime: "03:00 PM" },
    ],
  },
];

function App() {
  const [view, setView] = useState("routes");
  const [filteredRoutes, setFilteredRoutes] = useState(mockRoutes);
  const [selectedShift, setSelectedShift] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update bus statuses randomly to simulate real-time tracking
      setFilteredRoutes(prevRoutes => 
        prevRoutes.map(route => ({
          ...route,
          status: Math.random() > 0.8 ? 
            ['on-time', 'delayed', 'cancelled'][Math.floor(Math.random() * 3)] : 
            route.status
        }))
      );
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleShiftChange = (shift) => {
    setSelectedShift(shift);
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (!shift) {
        setFilteredRoutes(mockRoutes);
      } else {
        const filtered = mockRoutes.filter((route) => route.shift === shift);
        setFilteredRoutes(filtered);
      }
      setLoading(false);
    }, 500);
  };

  const handleViewChange = (newView) => {
    setView(newView);
    // Reset shift filter when switching views
    if (selectedShift) {
      setSelectedShift("");
      setFilteredRoutes(mockRoutes);
    }
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="App">
      <Header
        currentView={view}
        selectedShift={selectedShift}
        onShiftChange={handleShiftChange}
        onShowRoutes={() => handleViewChange("routes")}
        onShowStopSearch={() => handleViewChange("stop")}
        currentTime={getCurrentTime()}
        isDarkMode={isDarkMode}
        onToggleTheme={handleThemeToggle}
      />
      <main className="main">
        {loading ? (
          <div className="loading">
            <div>🔄 Loading routes...</div>
          </div>
        ) : view === "routes" ? (
          <Routes routes={filteredRoutes} />
        ) : (
          <StopSearch routes={mockRoutes} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
