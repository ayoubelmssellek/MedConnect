import React, { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationHistory, setLocationHistory] = useState([]);

  useEffect(() => {
    // Load saved location from localStorage
    const savedLocation = localStorage.getItem('medconnect_location');
    if (savedLocation) {
      try {
        setUserLocation(JSON.parse(savedLocation));
      } catch (error) {
        console.error('Error parsing saved location:', error);
      }
    }
  }, []);

  const updateLocation = (location) => {
    setUserLocation(location);
    
    if (location) {
      // Save to localStorage
      localStorage.setItem('medconnect_location', JSON.stringify(location));
      
      // Add to history (keep last 5 locations)
      setLocationHistory(prev => {
        const newHistory = [location, ...prev.filter(loc => 
          loc.latitude !== location.latitude || loc.longitude !== location.longitude
        )].slice(0, 5);
        return newHistory;
      });
    } else {
      localStorage.removeItem('medconnect_location');
    }
  };

  const clearLocation = () => {
    setUserLocation(null);
    localStorage.removeItem('medconnect_location');
  };

  return (
    <LocationContext.Provider value={{
      userLocation,
      locationHistory,
      updateLocation,
      clearLocation
    }}>
      {children}
    </LocationContext.Provider>
  );
};