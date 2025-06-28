// Haversine formula to calculate distance between two points
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 3959; // Earth's radius in miles
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
};

const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

// Geocoding function to convert address to coordinates
export const geocodeAddress = async (address) => {
  try {
    // In a real application, you would use a geocoding service like Google Maps API
    // For demo purposes, we'll return mock coordinates for common cities
    const mockCoordinates = {
      'new york': { lat: 40.7128, lng: -74.0060 },
      'los angeles': { lat: 34.0522, lng: -118.2437 },
      'chicago': { lat: 41.8781, lng: -87.6298 },
      'houston': { lat: 29.7604, lng: -95.3698 },
      'phoenix': { lat: 33.4484, lng: -112.0740 },
      'philadelphia': { lat: 39.9526, lng: -75.1652 },
      'san antonio': { lat: 29.4241, lng: -98.4936 },
      'san diego': { lat: 32.7157, lng: -117.1611 },
      'dallas': { lat: 32.7767, lng: -96.7970 },
      'san jose': { lat: 37.3382, lng: -121.8863 }
    };

    const normalizedAddress = address.toLowerCase().trim();
    
    // Check if the address matches any of our mock cities
    for (const [city, coords] of Object.entries(mockCoordinates)) {
      if (normalizedAddress.includes(city)) {
        return coords;
      }
    }

    // If no match found, return a default location (New York)
    return mockCoordinates['new york'];
  } catch (error) {
    console.error('Geocoding error:', error);
    throw new Error('Unable to geocode address');
  }
};

// Format distance for display
export const formatDistance = (distance) => {
  if (distance < 1) {
    return `${(distance * 5280).toFixed(0)} ft`;
  }
  return `${distance} mi`;
};

// Sort providers by distance
export const sortProvidersByDistance = (providers, userLocation) => {
  if (!userLocation) return providers;

  return providers
    .map(provider => ({
      ...provider,
      distance: calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        provider.latitude,
        provider.longitude
      )
    }))
    .sort((a, b) => a.distance - b.distance);
};

// Filter providers within a certain radius
export const filterProvidersByRadius = (providers, userLocation, radiusMiles = 50) => {
  if (!userLocation) return providers;

  return providers.filter(provider => {
    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      provider.latitude,
      provider.longitude
    );
    return distance <= radiusMiles;
  });
};