import React from "react";
import logo from '../assets/Nokia-Logo.png';

const Header = ({ 
  currentView, 
  selectedShift, 
  onShiftChange, 
  onShowRoutes, 
  onShowStopSearch,
  currentTime,
  isDarkMode,
  onToggleTheme
}) => {
  return (
    <header className="header">
      <div className="header-brand">
        <img 
          src={logo} 
          alt="Nokia Logo" 
          className="header-logo" 
          style={{ cursor: 'pointer' }}
          onClick={() => window.location.reload()} 
        />
        <h1 className="header-title">Transport</h1>
      </div>
      
      <nav>
        <div className="nav-buttons">
          <button 
            className={currentView === "routes" ? "active" : ""}
            onClick={onShowRoutes}
          >
            📍 Bus Routes
          </button>
          <button 
            className={currentView === "stop" ? "active" : ""}
            onClick={onShowStopSearch}
          >
            🔍 Search by Stop
          </button>
        </div>
        
        <div className="shift-selector">
          <label htmlFor="shift">Select Shift:</label>
          <select 
            id="shift" 
            value={selectedShift}
            onChange={(e) => onShiftChange(e.target.value)}
          >
            <option value="">-- All Shifts --</option>
            <option value="A">🕕 Shift A (6:00 AM)</option>
            <option value="B">🕖 Shift B (7:30 AM)</option>
            <option value="C">🕑 Shift C (2:00 PM)</option>
          </select>
        </div>
        
        <div className="current-time">
          <span>🕐 {currentTime}</span>
        </div>
        
        <button 
          className="theme-toggle"
          onClick={onToggleTheme}
        >
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </nav>
    </header>
  );
};

export default Header;
