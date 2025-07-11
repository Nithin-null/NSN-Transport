import React, { useState, useEffect } from "react";

const StopSearch = ({ routes }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [allStops, setAllStops] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Extract all unique stops from routes
  useEffect(() => {
    const stops = new Set();
    routes.forEach((route) => {
      route.stops.forEach((stop) => {
        stops.add(stop.name);
      });
    });
    setAllStops(Array.from(stops).sort());
  }, [routes]);

  // Real-time search as user types
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay for better UX
    const timeoutId = setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const found = [];

      routes.forEach((route) => {
        route.stops.forEach((stop) => {
          if (stop.name.toLowerCase().includes(lowerQuery)) {
            found.push({
              busNumber: route.busNumber,
              stopName: stop.name,
              arrivalTime: stop.arrivalTime,
              departureTime: stop.departureTime,
              origin: route.origin,
              destination: route.destination,
              shift: route.shift,
              status: route.status,
              routeId: route.id,
            });
          }
        });
      });

      setResults(found);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, routes]);

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

  const handleStopSelect = (stopName) => {
    setQuery(stopName);
  };

  return (
    <div>
      <h2>🔍 Search by Stop</h2>
      
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Enter stop name (e.g., Main Gate, Canteen)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        
        {query && (
          <div className="suggestions">
            {allStops
              .filter(stop => 
                stop.toLowerCase().includes(query.toLowerCase()) && 
                stop.toLowerCase() !== query.toLowerCase()
              )
              .slice(0, 5)
              .map((stop, index) => (
                <button
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleStopSelect(stop)}
                >
                  📍 {stop}
                </button>
              ))}
          </div>
        )}
      </div>

      <div className="results-container">
        {isSearching && (
          <div className="loading">
            <div>🔍 Searching...</div>
          </div>
        )}
        
        {!isSearching && query && results.length === 0 && (
          <div className="no-results">
            <p>No buses found for "{query}"</p>
            <p>Try searching for a different stop or check the spelling.</p>
          </div>
        )}
        
        {!isSearching && results.length > 0 && (
          <div>
            <h3>🚌 Found {results.length} bus(es) for "{query}"</h3>
            <div className="routes-container">
              {results.map((result, index) => (
                <div className="route-card" key={`${result.routeId}-${index}`}>
                  <div className="route-header">
                    <div className="bus-number">Bus {result.busNumber}</div>
                    <div className="route-info">
                      <div className="route-title">
                        Arrives at {result.stopName}
                      </div>
                      <div className="route-subtitle">
                        Route: {result.origin} ➝ {result.destination}
                      </div>
                      <div className="route-status">
                        <span className={`status-indicator ${getStatusColor(result.status)}`}></span>
                        {getStatusText(result.status)} • Shift {result.shift}
                      </div>
                    </div>
                  </div>
                  
                  <div className="stop-details">
                    <div className="stop-time-info">
                      <strong>Arrival:</strong> {result.arrivalTime}
                      {result.departureTime && result.departureTime !== result.arrivalTime && (
                        <span> • <strong>Departure:</strong> {result.departureTime}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {!query && (
          <div className="search-tips">
            <h3>💡 Search Tips</h3>
            <ul>
              <li>Type the name of any bus stop to find buses that serve it</li>
              <li>Popular stops: Main Gate, Canteen, Admin Block, Tech Park</li>
              <li>Results show arrival times and route information</li>
              <li>Use the shift filter to narrow down results by time</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StopSearch;
