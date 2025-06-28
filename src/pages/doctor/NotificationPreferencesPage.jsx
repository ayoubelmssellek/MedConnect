import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Clock, Users, Calendar, AlertCircle, CheckCircle, Volume2, VolumeX } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const NotificationPreferencesPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState({
    // Delivery Methods
    email: true,
    sms: false,
    push: true,
    inApp: true,
    
    // Appointment Notifications
    newAppointments: true,
    appointmentReminders: true,
    appointmentCancellations: true,
    appointmentRescheduling: true,
    
    // Patient Notifications
    newPatientRegistrations: true,
    patientMessages: true,
    emergencyAlerts: true,
    
    // System Notifications
    systemUpdates: false,
    maintenanceAlerts: true,
    securityAlerts: true,
    
    // Marketing
    promotionalEmails: false,
    newsletterUpdates: false,
    featureAnnouncements: true,
    
    // Schedule Notifications
    scheduleChanges: true,
    availabilityReminders: true,
    
    // Financial
    paymentNotifications: true,
    invoiceReminders: true,
    revenueReports: true
  });

  const [quietHours, setQuietHours] = useState({
    enabled: true,
    startTime: '22:00',
    endTime: '07:00',
    weekendsOnly: false
  });

  const [notificationSound, setNotificationSound] = useState({
    enabled: true,
    volume: 75,
    sound: 'default'
  });

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleQuietHoursChange = (key, value) => {
    setQuietHours(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSoundChange = (key, value) => {
    setNotificationSound(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const notificationCategories = [
    {
      title: 'Delivery Methods',
      description: 'Choose how you want to receive notifications',
      icon: Bell,
      items: [
        { key: 'email', label: t('settings.emailNotifications'), desc: 'Receive notifications via email', icon: Mail },
        { key: 'sms', label: t('settings.smsNotifications'), desc: 'Receive notifications via text message', icon: Smartphone },
        { key: 'push', label: t('settings.pushNotifications'), desc: 'Receive browser push notifications', icon: Bell },
        { key: 'inApp', label: 'In-App Notifications', desc: 'Show notifications within the application', icon: AlertCircle }
      ]
    },
    {
      title: 'Appointment Notifications',
      description: 'Manage appointment-related notifications',
      icon: Calendar,
      items: [
        { key: 'newAppointments', label: 'New Appointments', desc: 'When patients book new appointments' },
        { key: 'appointmentReminders', label: 'Appointment Reminders', desc: 'Reminders before upcoming appointments' },
        { key: 'appointmentCancellations', label: 'Cancellations', desc: 'When patients cancel appointments' },
        { key: 'appointmentRescheduling', label: 'Rescheduling', desc: 'When patients reschedule appointments' }
      ]
    },
    {
      title: 'Patient Communications',
      description: 'Notifications about patient interactions',
      icon: Users,
      items: [
        { key: 'newPatientRegistrations', label: 'New Patient Registrations', desc: 'When new patients register with your practice' },
        { key: 'patientMessages', label: 'Patient Messages', desc: 'Direct messages from patients' },
        { key: 'emergencyAlerts', label: 'Emergency Alerts', desc: 'Urgent patient-related notifications' }
      ]
    },
    {
      title: 'Schedule & Availability',
      description: 'Notifications about your schedule',
      icon: Clock,
      items: [
        { key: 'scheduleChanges', label: 'Schedule Changes', desc: 'When your schedule is modified' },
        { key: 'availabilityReminders', label: 'Availability Reminders', desc: 'Reminders to update your availability' }
      ]
    },
    {
      title: 'Financial Notifications',
      description: 'Payment and revenue notifications',
      icon: CheckCircle,
      items: [
        { key: 'paymentNotifications', label: 'Payment Notifications', desc: 'When payments are received' },
        { key: 'invoiceReminders', label: 'Invoice Reminders', desc: 'Reminders about pending invoices' },
        { key: 'revenueReports', label: 'Revenue Reports', desc: 'Monthly revenue and financial reports' }
      ]
    },
    {
      title: 'System & Updates',
      description: 'Platform and security notifications',
      icon: AlertCircle,
      items: [
        { key: 'systemUpdates', label: 'System Updates', desc: 'Platform updates and new features' },
        { key: 'maintenanceAlerts', label: 'Maintenance Alerts', desc: 'Scheduled maintenance notifications' },
        { key: 'securityAlerts', label: 'Security Alerts', desc: 'Important security notifications' },
        { key: 'featureAnnouncements', label: 'Feature Announcements', desc: 'New feature releases and improvements' }
      ]
    }
  ];

  const soundOptions = [
    { value: 'default', label: 'Default' },
    { value: 'chime', label: 'Chime' },
    { value: 'bell', label: 'Bell' },
    { value: 'notification', label: 'Notification' },
    { value: 'none', label: 'Silent' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Bell className="h-8 w-8 mr-3 text-primary-600" />
            {t('settings.notificationPrefs')}
          </h1>
          <p className="text-gray-600">Customize how and when you receive notifications</p>
        </div>

        <div className="space-y-6">
          {/* Quick Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quiet Hours */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-600 mr-2" />
                    <h3 className="font-medium text-gray-900">Quiet Hours</h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={quietHours.enabled}
                      onChange={(e) => handleQuietHoursChange('enabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                {quietHours.enabled && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                        <input
                          type="time"
                          value={quietHours.startTime}
                          onChange={(e) => handleQuietHoursChange('startTime', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                        <input
                          type="time"
                          value={quietHours.endTime}
                          onChange={(e) => handleQuietHoursChange('endTime', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
                        />
                      </div>
                    </div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={quietHours.weekendsOnly}
                        onChange={(e) => handleQuietHoursChange('weekendsOnly', e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Weekends only</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Sound Settings */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {notificationSound.enabled ? (
                      <Volume2 className="h-5 w-5 text-gray-600 mr-2" />
                    ) : (
                      <VolumeX className="h-5 w-5 text-gray-600 mr-2" />
                    )}
                    <h3 className="font-medium text-gray-900">Sound Settings</h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSound.enabled}
                      onChange={(e) => handleSoundChange('enabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                {notificationSound.enabled && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sound</label>
                      <select
                        value={notificationSound.sound}
                        onChange={(e) => handleSoundChange('sound', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
                      >
                        {soundOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Volume: {notificationSound.volume}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={notificationSound.volume}
                        onChange={(e) => handleSoundChange('volume', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notification Categories */}
          {notificationCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-4">
                <category.icon className="h-5 w-5 text-gray-600 mr-2" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{category.title}</h2>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {category.items.map((item) => (
                  <div key={item.key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-200 rounded-lg gap-4">
                    <div className="flex items-start">
                      {item.icon && <item.icon className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications[item.key]}
                        onChange={() => handleNotificationChange(item.key)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Save Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Save Preferences
              </button>
              <button className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors">
                Reset to Defaults
              </button>
              <button className="bg-white text-gray-700 px-6 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors">
                Test Notifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferencesPage;