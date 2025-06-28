import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit, Save, X, Camera, Shield, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    specialty: user?.specialty || ''
  });

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
      bio: user?.bio || '',
      specialty: user?.specialty || ''
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const specialties = [
    t('specialty.generalMedicine'),
    t('specialty.cardiology'),
    t('specialty.dermatology'),
    t('specialty.pediatrics'),
    t('specialty.psychology'),
    t('specialty.dentistry')
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t('profile.title')}</h1>
          <p className="text-gray-600">{t('profile.description')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h2 className="text-lg font-semibold text-gray-900">{t('profile.personalInfo')}</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {t('profile.editProfile')}
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="bg-success-600 text-white px-4 py-2 rounded-md hover:bg-success-700 transition-colors flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {t('common.save')}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center"
                    >
                      <X className="h-4 w-4 mr-2" />
                      {t('common.cancel')}
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Photo */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6 pb-6 border-b border-gray-100">
                <div className="relative self-center sm:self-start">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 sm:h-10 sm:w-10 text-primary-600" />
                  </div>
                  {isEditing && (
                    <button className="absolute -bottom-2 -right-2 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors">
                      <Camera className="h-3 w-3" />
                    </button>
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-gray-900">{user?.name}</h3>
                  <p className="text-primary-600 font-medium">{user?.role === 'provider' ? user?.specialty : 'Patient'}</p>
                  {user?.role === 'provider' && (
                    <span className="inline-block mt-1 px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">
                      {t('profile.business')} {t('profile.accountType')}
                    </span>
                  )}
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.fullName')}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                      />
                    ) : (
                      <div className="flex items-center text-gray-900">
                        <User className="h-4 w-4 mr-2 text-gray-400" />
                        {user?.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.emailAddress')}
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                      />
                    ) : (
                      <div className="flex items-center text-gray-900">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {user?.email}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.phoneNumber')}
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                      />
                    ) : (
                      <div className="flex items-center text-gray-900">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {user?.phone || t('profile.notProvided')}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.location')}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                      />
                    ) : (
                      <div className="flex items-center text-gray-900">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        {user?.location || t('profile.notProvided')}
                      </div>
                    )}
                  </div>
                </div>

                {user?.role === 'provider' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('profile.medicalSpecialty')}
                      </label>
                      {isEditing ? (
                        <select
                          name="specialty"
                          value={formData.specialty}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                        >
                          <option value="">{t('common.select')} {t('specialty.allSpecialties').toLowerCase()}</option>
                          {specialties.map(specialty => (
                            <option key={specialty} value={specialty}>{specialty}</option>
                          ))}
                        </select>
                      ) : (
                        <div className="text-gray-900">{user?.specialty}</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('profile.professionalBio')}
                      </label>
                      {isEditing ? (
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                          placeholder={t('profile.bioPlaceholder')}
                        />
                      ) : (
                        <div className="text-gray-900">
                          {user?.bio || t('profile.noBio')}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('profile.accountStatus')}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{t('profile.accountType')}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user?.role === 'provider' 
                      ? 'bg-primary-100 text-primary-800' 
                      : 'bg-success-100 text-success-800'
                  }`}>
                    {user?.role === 'provider' ? t('profile.business') : t('profile.personal')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{t('profile.memberSince')}</span>
                  <span className="text-sm text-gray-900">Jan 2024</span>
                </div>
                {user?.role === 'provider' && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{t('profile.subscription')}</span>
                    <span className="text-sm text-success-600 font-medium">{t('profile.active')}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('profile.quickActions')}</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Shield className="h-4 w-4 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-700">{t('profile.securitySettings')}</span>
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Bell className="h-4 w-4 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-700">{t('profile.notificationPreferences')}</span>
                </button>
                {user?.role === 'client' && (
                  <button className="w-full text-left p-3 rounded-lg hover:bg-primary-50 transition-colors flex items-center text-primary-600">
                    <User className="h-4 w-4 mr-3" />
                    <span className="text-sm font-medium">{t('profile.upgradeToBusiness')}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;