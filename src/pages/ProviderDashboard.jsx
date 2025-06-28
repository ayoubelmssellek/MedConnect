import React, { useState } from 'react';
import { Calendar, Users, DollarSign, TrendingUp, Clock, Star, Settings, Plus, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: t('dashboard.totalAppointments'),
      value: '147',
      change: '+12%',
      icon: Calendar,
      color: 'text-primary-600'
    },
    {
      title: t('dashboard.activePatients'),
      value: '89',
      change: '+5%',
      icon: Users,
      color: 'text-success-600'
    },
    {
      title: t('dashboard.monthlyRevenue'),
      value: '$12,450',
      change: '+18%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: t('dashboard.averageRating'),
      value: '4.8',
      change: '+0.2',
      icon: Star,
      color: 'text-yellow-600'
    }
  ];

  const recentAppointments = [
    {
      id: 1,
      patient: 'Sarah Johnson',
      time: '10:00 AM',
      date: 'Today',
      type: t('quickActions.consultation'),
      status: 'confirmed'
    },
    {
      id: 2,
      patient: 'Michael Chen',
      time: '2:30 PM',
      date: 'Today',
      type: t('quickActions.followUp'),
      status: 'confirmed'
    },
    {
      id: 3,
      patient: 'Emma Davis',
      time: '9:00 AM',
      date: 'Tomorrow',
      type: t('quickActions.consultation'),
      status: 'pending'
    }
  ];

  const quickActions = [
    {
      title: 'Add Appointment',
      description: 'Schedule a new patient appointment',
      icon: Plus,
      color: 'bg-primary-100 text-primary-600',
      link: '/doctor/add-appointment'
    },
    {
      title: 'Manage Availability',
      description: 'Update your schedule and availability',
      icon: Calendar,
      color: 'bg-success-100 text-success-600',
      link: '/doctor/manage-availability'
    },
    {
      title: 'View Patient Records',
      description: 'Access and manage patient information',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      link: '/doctor/patient-records'
    },
    {
      title: 'Update Profile',
      description: 'Modify your professional profile',
      icon: Settings,
      color: 'bg-purple-100 text-purple-600',
      link: '/doctor/update-profile'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 sm:py-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {t('dashboard.welcomeBack', { name: user?.name })}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">{user?.specialty} • {user?.location}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6 sm:mb-8">
          <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
            {[
              { id: 'overview', name: t('dashboard.overview') },
              { id: 'appointments', name: t('dashboard.appointments') },
              { id: 'patients', name: t('dashboard.patients') },
              { id: 'settings', name: t('dashboard.settings') }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-success-600">{stat.change} {t('dashboard.fromLastMonth')}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-gray-50 flex-shrink-0`}>
                      <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.link}
                    className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-25 transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${action.color}`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                    <div className="mt-3 flex items-center text-primary-600 text-sm font-medium">
                      <span>Get started</span>
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.todaysSchedule')}</h2>
                  <Link
                    to="/doctor/add-appointment"
                    className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {t('dashboard.addAppointment')}
                  </Link>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {recentAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary-600" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{appointment.patient}</p>
                          <p className="text-sm text-gray-500">{appointment.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                          <p className="text-sm text-gray-500">{appointment.date}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          appointment.status === 'confirmed' 
                            ? 'bg-success-100 text-success-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 sm:p-6 border-t border-gray-100">
                <Link
                  to="/doctor/appointments"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                >
                  View all appointments
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('profile.quickActions')}</h3>
                <div className="space-y-3">
                  <Link
                    to="/doctor/manage-availability"
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <Calendar className="h-5 w-5 text-primary-600 mr-3" />
                    {t('dashboard.manageAvailability')}
                  </Link>
                  <Link
                    to="/doctor/patient-records"
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <Users className="h-5 w-5 text-primary-600 mr-3" />
                    {t('dashboard.viewPatientRecords')}
                  </Link>
                  <Link
                    to="/doctor/update-profile"
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <Settings className="h-5 w-5 text-primary-600 mr-3" />
                    {t('dashboard.updateProfile')}
                  </Link>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('quickActions.recentActivity')}</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                    {t('dashboard.newAppointmentBooked')} - 2 {t('dashboard.hoursAgo')}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 mr-2 flex-shrink-0" />
                    {t('dashboard.newReviewReceived')} - 1 {t('dashboard.dayAgo')}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4 mr-2 flex-shrink-0" />
                    {t('dashboard.revenueIncreased')} - 2 {t('dashboard.daysAgo')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.appointmentManagement')}</h2>
              <Link
                to="/doctor/appointments"
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center"
              >
                <Calendar className="h-4 w-4 mr-2" />
                View All Appointments
              </Link>
            </div>
            <p className="text-gray-600">{t('dashboard.appointmentFeatures')}</p>
          </div>
        )}

        {activeTab === 'patients' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.patientManagement')}</h2>
              <Link
                to="/doctor/patients"
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center"
              >
                <Users className="h-4 w-4 mr-2" />
                View All Patients
              </Link>
            </div>
            <p className="text-gray-600">{t('dashboard.patientFeatures')}</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.accountSettings')}</h2>
              <Link
                to="/doctor/settings"
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center"
              >
                <Settings className="h-4 w-4 mr-2" />
                Manage Settings
              </Link>
            </div>
            <p className="text-gray-600">{t('dashboard.settingsFeatures')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;