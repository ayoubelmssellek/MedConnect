import React from 'react';
import { Star, Clock, MapPin, Navigation, Phone, Mail, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { formatDistance } from '../utils/locationUtils';

const ProviderCard = ({ provider, userLocation, onBookAppointment, onViewProfile }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        <div className="flex-shrink-0 self-center lg:self-start">
          <img
            src={provider.avatar}
            alt={provider.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{provider.name}</h3>
                {provider.distance !== undefined && (
                  <span className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">
                    <Navigation className="h-3 w-3 mr-1" />
                    {formatDistance(provider.distance)}
                  </span>
                )}
              </div>
              <p className="text-primary-600 font-medium mb-2">{provider.specialty}</p>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" title={t('location.location')} />
                <span className="truncate">{provider.location}</span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" title={t('location.rating')} />
                  <span className="ml-1 text-sm font-medium text-gray-700">{provider.rating}</span>
                </div>
                <span className="ml-2 text-sm text-gray-500">({provider.reviews} {t('providers.reviews')})</span>
              </div>
            </div>
            
            <div className="text-center lg:text-right">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{provider.price}</p>
              <p className="text-sm text-gray-600">{t('providers.perConsultation')}</p>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4 text-sm sm:text-base">{provider.bio}</p>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">{t('providers.services')}:</h4>
            <div className="flex flex-wrap gap-2">
              {provider.services.map((service, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1 flex-shrink-0" title={t('providers.nextAvailable')} />
              {t('providers.nextAvailable')}: {provider.nextAvailable}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => onViewProfile(provider)}
                className="bg-white text-primary-600 px-4 py-2 rounded-md border border-primary-600 hover:bg-primary-50 transition-colors flex items-center justify-center"
                title={t('providers.viewProfile')}
              >
                <Mail className="h-4 w-4 mr-2" />
                {t('providers.viewProfile')}
              </button>
              <button 
                onClick={() => onBookAppointment(provider)}
                className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center"
                title={t('providers.bookAppointment')}
              >
                <Calendar className="h-4 w-4 mr-2" />
                {t('providers.bookAppointment')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;