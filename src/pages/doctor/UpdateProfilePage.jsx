import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit, Save, X, Camera, Shield, Bell, Star, Award, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const UpdateProfilePage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  
  const [profileData, setProfileData] = useState({
    // Personal Information
    name: user?.name || 'Dr. Sarah Wilson',
    email: user?.email || 'dr.wilson@medcenter.com',
    phone: user?.phone || '+1 (555) 123-4567',
    dateOfBirth: '1985-03-15',
    gender: 'Female',
    address: '123 Medical Plaza, New York, NY 10001',
    
    // Professional Information
    specialty: user?.specialty || 'Cardiology',
    subSpecialty: 'Interventional Cardiology',
    licenseNumber: 'MD123456789',
    yearsOfExperience: '15',
    education: 'Harvard Medical School, MD',
    certifications: ['Board Certified in Cardiology', 'Advanced Cardiac Life Support (ACLS)', 'Interventional Cardiology Fellowship'],
    
    // Practice Information
    practiceName: 'Heart Center of Excellence',
    practiceAddress: '456 Healthcare Blvd, New York, NY 10002',
    practicePhone: '+1 (555) 987-6543',
    practiceWebsite: 'www.heartcenternyc.com',
    
    // Bio and Services
    bio: 'Board-certified cardiologist with over 15 years of experience in interventional cardiology. Specializing in complex coronary interventions, structural heart disease, and preventive cardiology. Committed to providing compassionate, evidence-based care to all patients.',
    services: ['Cardiac Consultation', 'Echocardiography', 'Stress Testing', 'Cardiac Catheterization', 'Angioplasty', 'Preventive Cardiology'],
    languages: ['English', 'Spanish', 'French'],
    
    // Availability and Pricing
    consultationFee: '250',
    followUpFee: '150',
    emergencyFee: '400',
    acceptsInsurance: true,
    insuranceProviders: ['Blue Cross Blue Shield', 'Aetna', 'United Healthcare', 'Medicare', 'Medicaid'],
    
    // Contact Preferences
    preferredContactMethod: 'email',
    availableForEmergencies: true,
    telemedicineAvailable: true
  });

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'professional', name: 'Professional', icon: Award },
    { id: 'practice', name: 'Practice Info', icon: MapPin },
    { id: 'services', name: 'Services & Fees', icon: Star },
    { id: 'preferences', name: 'Preferences', icon: Bell }
  ];

  const specialties = [
    'Cardiology', 'Dermatology', 'Emergency Medicine', 'Family Medicine',
    'Internal Medicine', 'Neurology', 'Obstetrics & Gynecology', 'Oncology',
    'Ophthalmology', 'Orthopedics', 'Pediatrics', 'Psychiatry', 'Radiology',
    'Surgery', 'Urology'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Mandarin', 'Arabic', 'Russian', 'Japanese', 'Korean'
  ];

  const insuranceProviders = [
    'Blue Cross Blue Shield', 'Aetna', 'United Healthcare', 'Cigna',
    'Humana', 'Medicare', 'Medicaid', 'Kaiser Permanente', 'Anthem'
  ];

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, value, checked) => {
    setProfileData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const handleSave = () => {
    // Simulate API call
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <User className="h-8 w-8 mr-3 text-primary-600" />
            Update Profile
          </h1>
          <p className="text-gray-600">Manage your professional profile and practice information</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Profile Photo */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Photo</h3>
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-12 w-12 text-primary-600" />
                  </div>
                  <button className="absolute -bottom-2 -right-2 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors">
                    <Camera className="h-3 w-3" />
                  </button>
                </div>
                <button className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
                  Change Photo
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  {tabs.find(tab => tab.id === activeTab)?.name}
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="bg-success-600 text-white px-4 py-2 rounded-md hover:bg-success-700 transition-colors flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Personal Information Tab */}
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900">{new Date(profileData.dateOfBirth).toLocaleDateString()}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      {isEditing ? (
                        <select
                          value={profileData.gender}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      ) : (
                        <p className="text-gray-900">{profileData.gender}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    {isEditing ? (
                      <textarea
                        value={profileData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.address}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Professional Information Tab */}
              {activeTab === 'professional' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Primary Specialty</label>
                      {isEditing ? (
                        <select
                          value={profileData.specialty}
                          onChange={(e) => handleInputChange('specialty', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        >
                          {specialties.map(specialty => (
                            <option key={specialty} value={specialty}>{specialty}</option>
                          ))}
                        </select>
                      ) : (
                        <p className="text-gray-900">{profileData.specialty}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sub-specialty</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.subSpecialty}
                          onChange={(e) => handleInputChange('subSpecialty', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.subSpecialty}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.licenseNumber}
                          onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.licenseNumber}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={profileData.yearsOfExperience}
                          onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.yearsOfExperience} years</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                    {isEditing ? (
                      <textarea
                        value={profileData.education}
                        onChange={(e) => handleInputChange('education', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.education}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                    {isEditing ? (
                      <div className="space-y-2">
                        {profileData.certifications.map((cert, index) => (
                          <input
                            key={index}
                            type="text"
                            value={cert}
                            onChange={(e) => {
                              const newCerts = [...profileData.certifications];
                              newCerts[index] = e.target.value;
                              handleInputChange('certifications', newCerts);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                        ))}
                        <button
                          onClick={() => handleInputChange('certifications', [...profileData.certifications, ''])}
                          className="text-primary-600 hover:text-primary-700 text-sm"
                        >
                          + Add Certification
                        </button>
                      </div>
                    ) : (
                      <ul className="list-disc list-inside text-gray-900 space-y-1">
                        {profileData.certifications.map((cert, index) => (
                          <li key={index}>{cert}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}

              {/* Practice Information Tab */}
              {activeTab === 'practice' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Practice Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.practiceName}
                          onChange={(e) => handleInputChange('practiceName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.practiceName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Practice Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={profileData.practicePhone}
                          onChange={(e) => handleInputChange('practicePhone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.practicePhone}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Practice Address</label>
                    {isEditing ? (
                      <textarea
                        value={profileData.practiceAddress}
                        onChange={(e) => handleInputChange('practiceAddress', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.practiceAddress}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Practice Website</label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={profileData.practiceWebsite}
                        onChange={(e) => handleInputChange('practiceWebsite', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.practiceWebsite}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
                    {isEditing ? (
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.bio}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Services & Fees Tab */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Services Offered</label>
                    {isEditing ? (
                      <div className="space-y-2">
                        {profileData.services.map((service, index) => (
                          <input
                            key={index}
                            type="text"
                            value={service}
                            onChange={(e) => {
                              const newServices = [...profileData.services];
                              newServices[index] = e.target.value;
                              handleInputChange('services', newServices);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                        ))}
                        <button
                          onClick={() => handleInputChange('services', [...profileData.services, ''])}
                          className="text-primary-600 hover:text-primary-700 text-sm"
                        >
                          + Add Service
                        </button>
                      </div>
                    ) : (
                      <ul className="list-disc list-inside text-gray-900 space-y-1">
                        {profileData.services.map((service, index) => (
                          <li key={index}>{service}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee</label>
                      {isEditing ? (
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                          <input
                            type="number"
                            value={profileData.consultationFee}
                            onChange={(e) => handleInputChange('consultationFee', e.target.value)}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                      ) : (
                        <p className="text-gray-900">${profileData.consultationFee}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Fee</label>
                      {isEditing ? (
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                          <input
                            type="number"
                            value={profileData.followUpFee}
                            onChange={(e) => handleInputChange('followUpFee', e.target.value)}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                      ) : (
                        <p className="text-gray-900">${profileData.followUpFee}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Fee</label>
                      {isEditing ? (
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                          <input
                            type="number"
                            value={profileData.emergencyFee}
                            onChange={(e) => handleInputChange('emergencyFee', e.target.value)}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                      ) : (
                        <p className="text-gray-900">${profileData.emergencyFee}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Languages Spoken</label>
                    {isEditing ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {languages.map(language => (
                          <label key={language} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={profileData.languages.includes(language)}
                              onChange={(e) => handleArrayChange('languages', language, e.target.checked)}
                              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{language}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-900">{profileData.languages.join(', ')}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={profileData.acceptsInsurance}
                        onChange={(e) => handleInputChange('acceptsInsurance', e.target.checked)}
                        disabled={!isEditing}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-700">Accepts Insurance</label>
                    </div>
                    {profileData.acceptsInsurance && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Providers</label>
                        {isEditing ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {insuranceProviders.map(provider => (
                              <label key={provider} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={profileData.insuranceProviders.includes(provider)}
                                  onChange={(e) => handleArrayChange('insuranceProviders', provider, e.target.checked)}
                                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">{provider}</span>
                              </label>
                            ))}
                          </div>
                        ) : (
                          <ul className="list-disc list-inside text-gray-900 space-y-1">
                            {profileData.insuranceProviders.map((provider, index) => (
                              <li key={index}>{provider}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact Method</label>
                    {isEditing ? (
                      <select
                        value={profileData.preferredContactMethod}
                        onChange={(e) => handleInputChange('preferredContactMethod', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="sms">SMS</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 capitalize">{profileData.preferredContactMethod}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profileData.availableForEmergencies}
                        onChange={(e) => handleInputChange('availableForEmergencies', e.target.checked)}
                        disabled={!isEditing}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-700">Available for Emergency Consultations</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profileData.telemedicineAvailable}
                        onChange={(e) => handleInputChange('telemedicineAvailable', e.target.checked)}
                        disabled={!isEditing}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-700">Offer Telemedicine Consultations</label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePage;