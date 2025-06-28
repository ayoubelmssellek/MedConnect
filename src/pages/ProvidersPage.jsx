import React, { useState, useEffect } from 'react';
import { Search, Filter, User, Sliders, MapPin, Calendar, Star, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LocationSelector from '../components/LocationSelector';
import ProviderCard from '../components/ProviderCard';
import AppointmentBooking from '../components/AppointmentBooking';
import { sortProvidersByDistance, filterProvidersByRadius } from '../utils/locationUtils';

const ProvidersPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [maxDistance, setMaxDistance] = useState(50);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('distance');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  // Mock provider data with coordinates
  const mockProviders = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      specialty: 'Cardiology',
      location: 'Downtown Medical Center',
      latitude: 40.7589,
      longitude: -73.9851,
      rating: 4.9,
      reviews: 127,
      avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      nextAvailable: 'Tomorrow 10:00 AM',
      bio: 'Board-certified cardiologist with 15+ years of experience in interventional cardiology.',
      services: ['Consultation', 'Cardiac Screening', 'Follow-up Care'],
      price: '$150',
      phone: '+1 (555) 123-4567',
      email: 'dr.wilson@medcenter.com'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      location: 'Family Health Clinic',
      latitude: 40.7505,
      longitude: -73.9934,
      rating: 4.8,
      reviews: 89,
      avatar: 'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      nextAvailable: 'Today 3:00 PM',
      bio: 'Family medicine physician focused on preventive care and chronic disease management.',
      services: ['Annual Physical', 'Preventive Care', 'Chronic Disease Management'],
      price: '$120',
      phone: '+1 (555) 234-5678',
      email: 'dr.chen@familyhealth.com'
    },
    {
      id: 3,
      name: 'Dr. Emma Davis',
      specialty: 'Dermatology',
      location: 'Skin Care Center',
      latitude: 40.7282,
      longitude: -74.0776,
      rating: 4.9,
      reviews: 156,
      avatar: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      nextAvailable: 'Next week',
      bio: 'Dermatologist specializing in cosmetic and medical dermatology treatments.',
      services: ['Skin Examination', 'Cosmetic Procedures', 'Acne Treatment'],
      price: '$180',
      phone: '+1 (555) 345-6789',
      email: 'dr.davis@skincare.com'
    },
    {
      id: 4,
      name: 'Dr. James Rodriguez',
      specialty: 'Pediatrics',
      location: 'Children\'s Health Center',
      latitude: 40.7831,
      longitude: -73.9712,
      rating: 4.7,
      reviews: 203,
      avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      nextAvailable: 'Tomorrow 2:00 PM',
      bio: 'Pediatrician with expertise in child development and preventive care.',
      services: ['Well-child Visits', 'Vaccinations', 'Developmental Screening'],
      price: '$140',
      phone: '+1 (555) 456-7890',
      email: 'dr.rodriguez@childhealth.com'
    },
    {
      id: 5,
      name: 'Dr. Lisa Thompson',
      specialty: 'Psychology',
      location: 'Mental Wellness Center',
      latitude: 40.7614,
      longitude: -73.9776,
      rating: 4.8,
      reviews: 94,
      avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      nextAvailable: 'This week',
      bio: 'Licensed psychologist specializing in anxiety, depression, and cognitive behavioral therapy.',
      services: ['Individual Therapy', 'Cognitive Behavioral Therapy', 'Anxiety Treatment'],
      price: '$160',
      phone: '+1 (555) 567-8901',
      email: 'dr.thompson@mentalwellness.com'
    }
  ];

  const specialties = [
    t('specialty.allSpecialties'),
    t('specialty.generalMedicine'),
    t('specialty.cardiology'),
    t('specialty.dermatology'),
    t('specialty.pediatrics'),
    t('specialty.psychology'),
    t('specialty.dentistry')
  ];

  const [filteredProviders, setFilteredProviders] = useState(mockProviders);

  useEffect(() => {
    let providers = [...mockProviders];

    // Filter by search query
    if (searchQuery) {
      providers = providers.filter(provider => 
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by specialty
    if (selectedSpecialty && selectedSpecialty !== t('specialty.allSpecialties')) {
      providers = providers.filter(provider => provider.specialty === selectedSpecialty);
    }

    // Filter by distance if location is available
    if (userLocation) {
      providers = filterProvidersByRadius(providers, userLocation, maxDistance);
      
      if (sortBy === 'distance') {
        providers = sortProvidersByDistance(providers, userLocation);
      }
    }

    // Sort by other criteria
    if (sortBy === 'rating') {
      providers.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price') {
      providers.sort((a, b) => {
        const priceA = parseInt(a.price.replace('$', ''));
        const priceB = parseInt(b.price.replace('$', ''));
        return priceA - priceB;
      });
    }

    setFilteredProviders(providers);
  }, [searchQuery, selectedSpecialty, userLocation, maxDistance, sortBy, t]);

  const handleLocationChange = (location) => {
    setUserLocation(location);
    if (location && sortBy !== 'distance') {
      setSortBy('distance');
    }
  };

  const handleBookAppointment = (provider) => {
    setSelectedProvider(provider);
    setShowBookingModal(true);
  };

  const handleViewProfile = (provider) => {
    console.log('Viewing profile of:', provider.name);
    // Implement profile view logic
    alert(`Viewing profile of ${provider.name}\n\nPhone: ${provider.phone}\nEmail: ${provider.email}\n\nThis would open a detailed profile page.`);
  };

  const handleConfirmBooking = (appointmentData) => {
    console.log('Booking confirmed:', appointmentData);
    alert(`Appointment booked successfully!\n\nProvider: ${selectedProvider.name}\nDate: ${appointmentData.date}\nTime: ${appointmentData.time}\nType: ${appointmentData.type}\n\nYou will receive a confirmation email shortly.`);
    setShowBookingModal(false);
    setSelectedProvider(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t('providers.title')}</h1>
          <p className="text-gray-600">{t('providers.description')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Location Selector */}
            <LocationSelector 
              onLocationChange={handleLocationChange}
              currentLocation={userLocation}
            />

            {/* Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{t('common.filter')}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialty
                  </label>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                  >
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>

                {userLocation && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('location.maxDistance')}: {maxDistance} {t('location.miles')}
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      value={maxDistance}
                      onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5 mi</span>
                      <span>100 mi</span>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('location.sortBy')}
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                  >
                    {userLocation && <option value="distance">{t('location.distance')}</option>}
                    <option value="rating">{t('location.rating')}</option>
                    <option value="price">{t('location.price')}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Results Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('providers.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                  />
                </div>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                  title={t('common.filter')}
                >
                  <Sliders className="h-4 w-4 mr-2" />
                  {t('common.filter')}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-gray-600">
                  {t('providers.showing')} {filteredProviders.length} {filteredProviders.length !== 1 ? t('providers.providers') : t('providers.provider')}
                  {userLocation && sortBy === 'distance' && ` ${t('providers.sortedByDistance')}`}
                </p>
                
                {userLocation && (
                  <div className="flex items-center text-sm text-success-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {t('providers.locationBasedResults')}
                  </div>
                )}
              </div>
            </div>

            {/* Provider Cards */}
            <div className="space-y-6">
              {filteredProviders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{t('providers.noProvidersFound')}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('providers.adjustCriteria')}
                  </p>
                  {userLocation && (
                    <button
                      onClick={() => setMaxDistance(100)}
                      className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                    >
                      {t('providers.expandRadius')}
                    </button>
                  )}
                </div>
              ) : (
                filteredProviders.map((provider) => (
                  <ProviderCard
                    key={provider.id}
                    provider={provider}
                    userLocation={userLocation}
                    onBookAppointment={handleBookAppointment}
                    onViewProfile={handleViewProfile}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedProvider && (
        <AppointmentBooking
          provider={selectedProvider}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedProvider(null);
          }}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
};

export default ProvidersPage;