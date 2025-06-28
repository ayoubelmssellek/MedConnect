import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Users, Clock, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 to-medical-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              {t('home.title')}
              <span className="text-primary-600 block mt-2">{t('home.subtitle')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              {t('home.description')}
            </p>
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center"
                >
                  {t('home.getStartedFree')}
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
                <Link
                  to="/providers"
                  className="bg-white text-primary-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-colors"
                >
                  {t('home.findProviders')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.whyChoose')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              {t('home.builtFor')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('features.forPatients')}</h3>
              <p className="text-gray-600 mb-4">
                Find and book appointments with qualified healthcare professionals in your area. 
                Manage your health journey with ease.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2 flex-shrink-0" />
                  {t('features.freeForever')}
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2 flex-shrink-0" />
                  {t('features.easyBooking')}
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2 flex-shrink-0" />
                  {t('features.providerReviews')}
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('features.forProviders')}</h3>
              <p className="text-gray-600 mb-4">
                Grow your practice with our comprehensive business dashboard. 
                Manage appointments, patients, and services effortlessly.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2 flex-shrink-0" />
                  {t('features.professionalDashboard')}
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2 flex-shrink-0" />
                  {t('features.appointmentManagement')}
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2 flex-shrink-0" />
                  {t('features.revenueTracking')}
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-medical-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('features.secureReliable')}</h3>
              <p className="text-gray-600 mb-4">
                HIPAA-compliant platform with enterprise-grade security. 
                Your data and privacy are our top priorities.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2 flex-shrink-0" />
                  {t('features.hipaaCompliant')}
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2 flex-shrink-0" />
                  {t('features.encryption')}
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2 flex-shrink-0" />
                  {t('features.support247')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary-600 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-primary-100 text-sm sm:text-base">{t('stats.activePatients')}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-primary-100 text-sm sm:text-base">{t('stats.healthcareProviders')}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-primary-100 text-sm sm:text-base">{t('stats.appointmentsBooked')}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">4.9</div>
              <div className="text-primary-100 flex items-center justify-center text-sm sm:text-base">
                <Star className="h-4 w-4 mr-1" />
                {t('stats.averageRating')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t('cta.transformHealthcare')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
            {t('cta.joinThousands')}
          </p>
          {!user && (
            <Link
              to="/register"
              className="bg-primary-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center"
            >
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              {t('cta.startJourney')}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;