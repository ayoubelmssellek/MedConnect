import React, { useState } from 'react';
import { Shield, Bell, Globe, CreditCard, Users, Lock, Eye, EyeOff, Smartphone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const SettingsPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('security');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    appointments: true,
    reminders: true,
    marketing: false
  });

  const tabs = [
    { id: 'security', name: t('settings.security'), icon: Shield },
    { id: 'notifications', name: t('settings.notifications'), icon: Bell },
    { id: 'privacy', name: t('settings.privacy'), icon: Eye },
    ...(user?.role === 'provider' ? [{ id: 'billing', name: t('settings.billing'), icon: CreditCard }] : []),
    { id: 'preferences', name: t('settings.preferences'), icon: Globe }
  ];

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t('settings.title')}</h1>
          <p className="text-gray-600">{t('settings.description')}</p>
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
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('settings.security')} {t('settings.title')}</h2>
                  
                  {/* Change Password */}
                  <div className="mb-8">
                    <h3 className="text-md font-medium text-gray-900 mb-4">{t('settings.changePassword')}</h3>
                    <div className="space-y-4 max-w-md">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('settings.currentPassword')}
                        </label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('settings.newPassword')}
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
                        {t('settings.updatePassword')}
                      </button>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="mb-8">
                    <h3 className="text-md font-medium text-gray-900 mb-4">{t('settings.twoFactorAuth')}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg gap-4">
                      <div className="flex items-center">
                        <Smartphone className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{t('settings.smsAuth')}</p>
                          <p className="text-sm text-gray-600">{t('settings.smsAuthDesc')}</p>
                        </div>
                      </div>
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
                        {t('settings.enable2FA')}
                      </button>
                    </div>
                  </div>

                  {/* Active Sessions */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">{t('settings.activeSessions')}</h3>
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-200 rounded-lg gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{t('settings.currentSession')}</p>
                          <p className="text-sm text-gray-600">Chrome on MacOS • New York, NY</p>
                          <p className="text-xs text-gray-500">{t('settings.lastActive')}: Now</p>
                        </div>
                        <span className="px-2 py-1 bg-success-100 text-success-800 text-xs font-medium rounded-full w-fit">
                          {t('settings.current')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('settings.notificationPrefs')}</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-4">{t('settings.deliveryMethods')}</h3>
                      <div className="space-y-4">
                        {[
                          { key: 'email', label: t('settings.emailNotifications'), desc: t('settings.emailNotificationsDesc') },
                          { key: 'sms', label: t('settings.smsNotifications'), desc: t('settings.smsNotificationsDesc') },
                          { key: 'push', label: t('settings.pushNotifications'), desc: t('settings.pushNotificationsDesc') }
                        ].map((item) => (
                          <div key={item.key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-200 rounded-lg gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.label}</p>
                              <p className="text-sm text-gray-600">{item.desc}</p>
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

                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-4">{t('settings.notificationTypes')}</h3>
                      <div className="space-y-4">
                        {[
                          { key: 'appointments', label: t('settings.appointmentUpdates'), desc: t('settings.appointmentUpdatesDesc') },
                          { key: 'reminders', label: t('settings.appointmentReminders'), desc: t('settings.appointmentRemindersDesc') },
                          { key: 'marketing', label: t('settings.marketingComms'), desc: t('settings.marketingCommsDesc') }
                        ].map((item) => (
                          <div key={item.key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-200 rounded-lg gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.label}</p>
                              <p className="text-sm text-gray-600">{item.desc}</p>
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
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('settings.privacySettings')}</h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="text-md font-medium text-gray-900 mb-2">{t('settings.profileVisibility')}</h3>
                      <p className="text-sm text-gray-600 mb-4">{t('settings.profileVisibilityDesc')}</p>
                      <select className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base">
                        <option>{t('settings.public')}</option>
                        <option>{t('settings.providersOnly')}</option>
                        <option>{t('settings.private')}</option>
                      </select>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="text-md font-medium text-gray-900 mb-2">{t('settings.dataSharing')}</h3>
                      <p className="text-sm text-gray-600 mb-4">{t('settings.dataSharingDesc')}</p>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700">{t('settings.shareHistory')}</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                          <span className="ml-2 text-sm text-gray-700">{t('settings.allowAnalytics')}</span>
                        </label>
                      </div>
                    </div>

                    <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                      <h3 className="text-md font-medium text-red-900 mb-2">{t('settings.deleteAccount')}</h3>
                      <p className="text-sm text-red-700 mb-4">{t('settings.deleteAccountDesc')}</p>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                        {t('settings.deleteAccount')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'billing' && user?.role === 'provider' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('settings.billing')} & {t('profile.subscription')}</h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 sm:p-6 border border-gray-200 rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                        <div>
                          <h3 className="text-md font-medium text-gray-900">{t('settings.businessPlan')}</h3>
                          <p className="text-sm text-gray-600">{t('settings.businessPlanDesc')}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">$29</p>
                          <p className="text-sm text-gray-600">{t('settings.perMonth')}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
                          {t('settings.manageSubscription')}
                        </button>
                        <button className="bg-white text-gray-700 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors">
                          {t('settings.downloadInvoice')}
                        </button>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6 border border-gray-200 rounded-lg">
                      <h3 className="text-md font-medium text-gray-900 mb-4">{t('settings.paymentMethod')}</h3>
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-8 bg-gray-200 rounded mr-3 flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-600">{t('settings.expires')} 12/25</p>
                        </div>
                      </div>
                      <button className="bg-white text-primary-600 px-4 py-2 rounded-md border border-primary-600 hover:bg-primary-50 transition-colors">
                        {t('settings.updatePaymentMethod')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('settings.preferences')}</h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="text-md font-medium text-gray-900 mb-4">{t('settings.languageRegion')}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.language')}</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base">
                            <option>English (US)</option>
                            <option>Español</option>
                            <option>Français</option>
                            <option>Deutsch</option>
                            <option>Italiano</option>
                            <option>العربية</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.timeZone')}</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base">
                            <option>Eastern Time (ET)</option>
                            <option>Central Time (CT)</option>
                            <option>Mountain Time (MT)</option>
                            <option>Pacific Time (PT)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="text-md font-medium text-gray-900 mb-4">{t('settings.displayPreferences')}</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.theme')}</label>
                          <select className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base">
                            <option>{t('settings.light')}</option>
                            <option>{t('settings.dark')}</option>
                            <option>{t('settings.system')}</option>
                          </select>
                        </div>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700">{t('settings.showReminders')}</span>
                        </label>
                      </div>
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

export default SettingsPage;