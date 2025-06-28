import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Loader, AlertCircle, X } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';
import { geocodeAddress } from '../utils/locationUtils';

const LocationSelector = ({ onLocationChange, currentLocation }) => {
  const [manualAddress, setManualAddress] = useState('');
  const [isManualMode, setIsManualMode] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const { location, error, loading, getCurrentLocation, clearLocation } = useGeolocation();

  useEffect(() => {
    if (location) {
      onLocationChange({
        latitude: location.latitude,
        longitude: location.longitude,
        source: 'gps'
      });
    }
  }, [location, onLocationChange]);

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!manualAddress.trim()) return;

    setGeocoding(true);
    try {
      const coords = await geocodeAddress(manualAddress);
      onLocationChange({
        latitude: coords.lat,
        longitude: coords.lng,
        address: manualAddress,
        source: 'manual'
      });
      setIsManualMode(false);
    } catch (error) {
      console.error('Geocoding failed:', error);
    } finally {
      setGeocoding(false);
    }
  };

  const handleClearLocation = () => {
    clearLocation();
    setManualAddress('');
    setIsManualMode(false);
    onLocationChange(null);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Your Location</h3>
        {currentLocation && (
          <button
            onClick={handleClearLocation}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {currentLocation ? (
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-2 text-success-500" />
          <span>
            {currentLocation.address || 'Current location detected'}
            {currentLocation.source === 'gps' && ' (GPS)'}
          </span>
        </div>
      ) : (
        <div className="space-y-4">
          {!isManualMode ? (
            <div className="space-y-3">
              <button
                onClick={getCurrentLocation}
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Navigation className="h-4 w-4 mr-2" />
                )}
                {loading ? 'Getting Location...' : 'Use Current Location'}
              </button>

              {error && (
                <div className="flex items-center text-sm text-red-600 bg-red-50 p-3 rounded-md">
                  <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="text-center">
                <span className="text-sm text-gray-500">or</span>
              </div>

              <button
                onClick={() => setIsManualMode(true)}
                className="w-full flex items-center justify-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Enter Address Manually
              </button>
            </div>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your address or city
                </label>
                <input
                  type="text"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  placeholder="e.g., New York, NY or 123 Main St, City, State"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={geocoding || !manualAddress.trim()}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {geocoding ? (
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <MapPin className="h-4 w-4 mr-2" />
                  )}
                  {geocoding ? 'Finding...' : 'Set Location'}
                </button>
                
                <button
                  type="button"
                  onClick={() => setIsManualMode(false)}
                  className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {currentLocation && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Providers will be sorted by distance from your location. 
            Location data is only used for finding nearby healthcare providers.
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;