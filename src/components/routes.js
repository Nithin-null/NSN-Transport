import React, { useState, useEffect } from "react";
import StarBorder from "./StarBorder";

const Routes = ({ routes }) => {
  const [expandedRoutes, setExpandedRoutes] = useState(new Set());
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Listen for theme changes
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDarkMode(isDark);
    };

    // Check initial theme
    checkTheme();

    // Create a mutation observer to watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "on-time": return "status-on-time";
      case "delayed": return "status-delayed";
      case "cancelled": return "status-cancelled";
      default: return "status-on-time";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "on-time": return "On Time";
      case "delayed": return "Delayed";
      case "cancelled": return "Cancelled";
      default: return "On Time";
    }
  };

  const getStarBorderColor = (status) => {
    switch (status) {
      case "on-time": return "#00ff88";
      case "delayed": return "#ff6b35";
      case "cancelled": return "#ff4757";
      default: return "#00ff88";
    }
  };

  const getStarBorderSpeed = (status) => {
    switch (status) {
      case "on-time": return "4s";
      case "delayed": return "3s";
      case "cancelled": return "2s";
      default: return "4s";
    }
  };

  const toggleRoute = (routeId) => {
    setExpandedRoutes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(routeId)) {
        newSet.delete(routeId);
      } else {
        newSet.add(routeId);
      }
      return newSet;
    });
  };

  if (routes.length === 0) {
    return (
      <div className="no-results">
        <h2>🚌 Bus Routes</h2>
        <p>No buses found for the selected shift.</p>
        <p>Please try selecting a different shift or check back later.</p>
      </div>
    );
  }

  const renderRouteCard = (route) => {
    const isExpanded = expandedRoutes.has(route.id);
    const routeCard = (
      <div className="route-card">
        <div 
          className="route-header clickable"
          onClick={() => toggleRoute(route.id)}
        >
          <div className="bus-number">
            Bus {route.busNumber}
            <span className="expand-icon">
              {isExpanded ? '▼' : '▶'}
            </span>
          </div>
          <div className="route-info">
            <div className="route-title">
              {route.origin} ➝ {route.destination}
            </div>
            <div className="route-subtitle">
              Shift {route.shift} • Capacity: {route.capacity} seats
            </div>
            <div className="route-status">
              <span className={`status-indicator ${getStatusColor(route.status)}`}></span>
              {getStatusText(route.status)}
            </div>
          </div>
        </div>
        
        {isExpanded && (
          <>
            <ul className="stops-list">
              {route.stops.map((stop, index) => (
                <li key={index} className="stop-item">
                  <div className="stop-name">{stop.name}</div>
                  <div className="stop-time">
                    {stop.arrivalTime}
                    {stop.departureTime && stop.departureTime !== stop.arrivalTime && (
                      <span> - {stop.departureTime}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="route-footer">
              <div className="route-duration">
                Duration: {route.stops.length > 1 ? 
                  `${Math.round((route.stops.length - 1) * 5)} minutes` : 
                  'Direct route'
                }
              </div>
              <div className="route-frequency">
                Frequency: Every 30 minutes
              </div>
            </div>
          </>
        )}
      </div>
    );

    // Only wrap with StarBorder in dark mode
    if (isDarkMode) {
      return (
        <StarBorder
          key={route.id}
          as="div"
          className="route-card-wrapper"
          color={getStarBorderColor(route.status)}
          speed={getStarBorderSpeed(route.status)}
          thickness={3}
        >
          {routeCard}
        </StarBorder>
      );
    }

    // In light mode, return normal card
    return (
      <div key={route.id} className="route-card-wrapper">
        {routeCard}
      </div>
    );
  };

  return (
    <div>
      <h2>🚌 Bus Routes ({routes.length} available)</h2>
      <div className="routes-container">
        {routes.map(renderRouteCard)}
      </div>
    </div>
  );
};

export default Routes;
