import React, { useState } from 'react';
import { Calendar, Users, Clock, MapPin, Plus, Search, Filter, Star, Phone, Mail, Zap, Heart, Settings, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const QuickActionsPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeAction, setActiveAction] = useState(null);

  const clientActions = [
    {
      id: 'book-appointment',
      title: t('quickActions.bookNewAppointment'),
      description: 'Find and book an appointment with a healthcare provider',
      icon: Calendar,
      color: 'bg-primary-100 text-primary-600',
      action: () => navigate('/providers')
    },
    {
      id: 'find-providers',
      title: t('quickActions.findProviders'),
      description: 'Search for healthcare providers in your area',
      icon: Search,
      color: 'bg-success-100 text-success-600',
      action: () => navigate('/providers')
    },
    {
      id: 'emergency-contacts',
      title: t('quickActions.emergencyContacts'),
      description: 'Quick access to emergency healthcare contacts',
      icon: Phone,
      color: 'bg-red-100 text-red-600',
      action: () => setActiveAction('emergency-contacts')
    },
    {
      id: 'health-records',
      title: t('quickActions.healthRecords'),
      description: 'View and manage your health records',
      icon: Users,
      color: 'bg-medical-100 text-medical-600',
      action: () => alert('Health Records feature coming soon!')
    }
  ];

  const providerActions = [
    {
      id: 'add-appointment',
      title: t('quickActions.addAppointment'),
      description: 'Schedule a new appointment for a patient',
      icon: Plus,
      color: 'bg-primary-100 text-primary-600',
      action: () => setActiveAction('add-appointment')
    },
    {
      id: 'manage-schedule',
      title: t('quickActions.manageSchedule'),
      description: 'Update your availability and time slots',
      icon: Clock,
      color: 'bg-success-100 text-success-600',
      action: () => setActiveAction('manage-schedule')
    },
    {
      id: 'patient-records',
      title: t('quickActions.patientRecords'),
      description: 'Access and update patient information',
      icon: Users,
      color: 'bg-medical-100 text-medical-600',
      action: () => alert('Patient Records feature coming soon!')
    },
    {
      id: 'update-profile',
      title: t('quickActions.updateProfile'),
      description: 'Modify your professional profile and services',
      icon: Star,
      color: 'bg-yellow-100 text-yellow-600',
      action: () => navigate('/profile')
    }
  ];

  const actions = user?.role === 'provider' ? providerActions : clientActions;

  const emergencyContacts = [
    { name: 'Emergency Services', number: '911', type: 'Emergency' },
    { name: 'Poison Control', number: '1-800-222-1222', type: 'Poison' },
    { name: 'Mental Health Crisis', number: '988', type: 'Mental Health' },
    { name: 'Your Primary Care', number: '+1 (555) 123-4567', type: 'Primary Care' }
  ];

  const quickBookProviders = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      specialty: 'Cardiology',
      nextAvailable: 'Today 3:00 PM',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      nextAvailable: 'Tomorrow 10:00 AM',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    }
  ];

  const handleActionClick = (action) => {
    if (action.action) {
      action.action();
    } else {
      setActiveAction(action.id);
    }
  };

  const renderActionContent = () => {
    switch (activeAction) {
      case 'emergency-contacts':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Phone className="h-5 w-5 mr-2 text-red-600" />
              {t('quickActions.emergencyContacts')}
            </h3>
            
            <div className="grid gap-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{contact.name}</h4>
                    <p className="text-sm text-gray-600">{contact.type}</p>
                  </div>
                  <a
                    href={`tel:${contact.number}`}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center"
                    title={`Call ${contact.name}`}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </a>
                </div>
              ))}
            </div>
          </div>
        );

      case 'add-appointment':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Plus className="h-5 w-5 mr-2 text-primary-600" />
              {t('quickActions.addAppointment')}
            </h3>
            
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              alert('Appointment added successfully!');
            }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-1" />
                    Patient Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                    placeholder="Enter patient name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Heart className="h-4 w-4 inline mr-1" />
                    Appointment Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base">
                    <option>Consultation</option>
                    <option>Follow-up</option>
                    <option>Emergency</option>
                    <option>Routine Check-up</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Time
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Notes
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                  placeholder="Additional notes or symptoms"
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Appointment
              </button>
            </form>
          </div>
        );

      case 'manage-schedule':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-success-600" />
              {t('quickActions.manageSchedule')}
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Today's Availability
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time) => (
                    <button
                      key={time}
                      className="p-2 text-sm border border-gray-300 rounded hover:border-primary-500 hover:bg-primary-50 transition-colors"
                      title={`Manage ${time} slot`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  Quick Actions
                </h4>
                <div className="space-y-2">
                  <button 
                    className="w-full text-left p-2 rounded hover:bg-gray-50 transition-colors flex items-center"
                    onClick={() => alert('Lunch break blocked for 12:00 PM - 1:00 PM')}
                  >
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    Block time for lunch (12:00 PM - 1:00 PM)
                  </button>
                  <button 
                    className="w-full text-left p-2 rounded hover:bg-gray-50 transition-colors flex items-center"
                    onClick={() => alert('Emergency slot added for today')}
                  >
                    <Plus className="h-4 w-4 mr-2 text-gray-400" />
                    Add emergency slot
                  </button>
                  <button 
                    className="w-full text-left p-2 rounded hover:bg-gray-50 transition-colors flex items-center"
                    onClick={() => alert('Out of office status set')}
                  >
                    <Settings className="h-4 w-4 mr-2 text-gray-400" />
                    Set out of office
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Select an action to get started</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Zap className="h-8 w-8 mr-3 text-primary-600" />
            {t('quickActions.title')}
          </h1>
          <p className="text-gray-600">
            {user?.role === 'provider' 
              ? t('quickActions.providerDescription')
              : t('quickActions.clientDescription')
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Actions Grid */}
          <div className="lg:col-span-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleActionClick(action)}
                  className={`p-4 sm:p-6 rounded-lg border-2 transition-all text-left ${
                    activeAction === action.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-25'
                  }`}
                  title={action.title}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${action.color}`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Action Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
              {renderActionContent()}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-gray-600" />
              {t('quickActions.recentActivity')}
            </h2>
            <div className="space-y-3">
              {user?.role === 'provider' ? (
                <>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-3 text-gray-400" />
                    New appointment booked with Sarah Johnson - 2 hours ago
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-3 text-gray-400" />
                    Updated patient record for Michael Chen - 4 hours ago
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-3 text-gray-400" />
                    Modified schedule for next week - 1 day ago
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-3 text-gray-400" />
                    Appointment confirmed with Dr. Wilson - 1 hour ago
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Search className="h-4 w-4 mr-3 text-gray-400" />
                    Searched for dermatologists in your area - 3 hours ago
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 mr-3 text-gray-400" />
                    Left review for Dr. Chen - 2 days ago
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPage;