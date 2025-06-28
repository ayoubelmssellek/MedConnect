import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, Briefcase, CreditCard, CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const AccountSetupPage = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [showProviderForm, setShowProviderForm] = useState(false);
  const [providerData, setProviderData] = useState({
    specialty: '',
    location: '',
    bio: '',
    services: []
  });
  const { user, upgradeToProvider, isLoading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleContinueAsClient = () => {
    navigate('/');
  };

  const handleUpgradeToProvider = () => {
    setShowProviderForm(true);
  };

  const handleProviderSubmit = async (e) => {
    e.preventDefault();
    try {
      await upgradeToProvider(providerData);
      navigate('/provider/dashboard');
    } catch (error) {
      console.error('Upgrade failed:', error);
    }
  };

  const specialties = [
    t('specialty.generalMedicine'),
    t('specialty.cardiology'),
    t('specialty.dermatology'),
    t('specialty.pediatrics'),
    t('specialty.psychology'),
    t('specialty.dentistry'),
    t('specialty.physicalTherapy'),
    t('specialty.nutrition'),
    t('specialty.other')
  ];

  const servicesList = [
    t('quickActions.consultation'),
    'Diagnosis',
    'Treatment',
    t('quickActions.followUp'),
    'Preventive Care',
    'Emergency Care',
    'Telemedicine',
    'Home Visits'
  ];

  if (showProviderForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <Heart className="h-10 w-10 sm:h-12 sm:w-12 text-primary-600 mx-auto mb-4" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('accountSetup.setupProfile')}</h1>
            <p className="text-gray-600 mt-2">{t('accountSetup.practiceInfo')}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleProviderSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profile.medicalSpecialty')}
                </label>
                <select
                  value={providerData.specialty}
                  onChange={(e) => setProviderData({ ...providerData, specialty: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                >
                  <option value="">{t('accountSetup.selectSpecialty')}</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('accountSetup.practiceLocation')}
                </label>
                <input
                  type="text"
                  value={providerData.location}
                  onChange={(e) => setProviderData({ ...providerData, location: e.target.value })}
                  required
                  placeholder={t('accountSetup.cityState')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profile.professionalBio')}
                </label>
                <textarea
                  value={providerData.bio}
                  onChange={(e) => setProviderData({ ...providerData, bio: e.target.value })}
                  rows={4}
                  placeholder={t('profile.bioPlaceholder')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('accountSetup.servicesOffered')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {servicesList.map(service => (
                    <label key={service} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={providerData.services.includes(service)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setProviderData({
                              ...providerData,
                              services: [...providerData.services, service]
                            });
                          } else {
                            setProviderData({
                              ...providerData,
                              services: providerData.services.filter(s => s !== service)
                            });
                          }
                        }}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-primary-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-primary-600 mr-2" />
                  <span className="text-sm font-medium text-primary-900">{t('accountSetup.businessAccount')} - $29/{t('settings.perMonth')}</span>
                </div>
                <p className="text-sm text-primary-700 mt-1">
                  {t('accountSetup.fullAccess')}
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t('accountSetup.processing') : t('accountSetup.activateBusiness')}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <Heart className="h-10 w-10 sm:h-12 sm:w-12 text-primary-600 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('accountSetup.welcome', { name: user?.name })}</h1>
          <p className="text-gray-600 mt-2">{t('accountSetup.howToUse')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Client Option */}
          <div className="bg-white rounded-lg shadow-sm border-2 border-gray-100 hover:border-primary-200 transition-colors p-6 sm:p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-success-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{t('accountSetup.patient')}</h2>
              <p className="text-gray-600 mb-6">
                {t('accountSetup.patientDesc')}
              </p>
              
              <div className="space-y-3 mb-6 sm:mb-8">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2 flex-shrink-0" />
                  {t('features.freeForever')}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2 flex-shrink-0" />
                  {t('features.easyBooking')}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2 flex-shrink-0" />
                  {t('features.providerReviews')}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2 flex-shrink-0" />
                  {t('features.appointmentManagement')}
                </div>
              </div>

              <button
                onClick={handleContinueAsClient}
                className="w-full bg-success-600 text-white py-3 px-4 rounded-md hover:bg-success-700 transition-colors flex items-center justify-center"
              >
                {t('accountSetup.continueAsPatient')}
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>

          {/* Provider Option */}
          <div className="bg-white rounded-lg shadow-sm border-2 border-gray-100 hover:border-primary-200 transition-colors p-6 sm:p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-primary-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{t('accountSetup.provider')}</h2>
              <p className="text-gray-600 mb-6">
                {t('accountSetup.providerDesc')}
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2 flex-shrink-0" />
                  {t('features.professionalDashboard')}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2 flex-shrink-0" />
                  {t('features.appointmentManagement')}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2 flex-shrink-0" />
                  Patient communication tools
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2 flex-shrink-0" />
                  {t('features.revenueTracking')}
                </div>
              </div>

              <div className="bg-primary-50 p-3 rounded-lg mb-6">
                <div className="flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-primary-600 mr-2" />
                  <span className="text-sm font-medium text-primary-900">$29/{t('settings.perMonth')}</span>
                </div>
              </div>

              <button
                onClick={handleUpgradeToProvider}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center"
              >
                {t('accountSetup.startBusiness')}
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <p className="text-sm text-gray-500">
            {t('accountSetup.upgradeNote')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountSetupPage;