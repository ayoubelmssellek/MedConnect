import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, Smartphone, Key, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const SecuritySettingsPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [securityQuestions, setSecurityQuestions] = useState([
    { id: 1, question: 'What was your first pet\'s name?', answer: '', isSet: true },
    { id: 2, question: 'What city were you born in?', answer: '', isSet: false },
    { id: 3, question: 'What was your mother\'s maiden name?', answer: '', isSet: true }
  ]);

  const activeSessions = [
    {
      id: 1,
      device: 'Chrome on MacOS',
      location: 'New York, NY',
      lastActive: 'Now',
      current: true,
      ipAddress: '192.168.1.100'
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'New York, NY',
      lastActive: '2 hours ago',
      current: false,
      ipAddress: '192.168.1.101'
    },
    {
      id: 3,
      device: 'Chrome on Windows',
      location: 'Boston, MA',
      lastActive: '1 day ago',
      current: false,
      ipAddress: '10.0.0.50'
    }
  ];

  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Password updated successfully!');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleEnable2FA = () => {
    setShowQRCode(true);
  };

  const handleConfirm2FA = () => {
    setTwoFactorEnabled(true);
    setShowQRCode(false);
    alert('Two-factor authentication enabled successfully!');
  };

  const handleTerminateSession = (sessionId) => {
    if (confirm('Are you sure you want to terminate this session?')) {
      alert(`Session ${sessionId} terminated successfully`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Shield className="h-8 w-8 mr-3 text-primary-600" />
            {t('settings.security')} {t('settings.title')}
          </h1>
          <p className="text-gray-600">Manage your account security and authentication settings</p>
        </div>

        <div className="space-y-6">
          {/* Password Management */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-6">
              <Lock className="h-5 w-5 text-gray-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">{t('settings.changePassword')}</h2>
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('settings.currentPassword')}
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base pr-10"
                    required
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
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base pr-10"
                    required
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.confirmPassword')}
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center"
              >
                <Lock className="h-4 w-4 mr-2" />
                {t('settings.updatePassword')}
              </button>
            </form>
          </div>

          {/* Two-Factor Authentication */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Smartphone className="h-5 w-5 text-gray-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">{t('settings.twoFactorAuth')}</h2>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                twoFactorEnabled 
                  ? 'bg-success-100 text-success-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>

            {!twoFactorEnabled ? (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <button 
                  onClick={handleEnable2FA}
                  className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  {t('settings.enable2FA')}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center text-success-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Two-factor authentication is enabled and protecting your account</span>
                </div>
                <div className="flex gap-3">
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
                    View Recovery Codes
                  </button>
                  <button 
                    onClick={() => setTwoFactorEnabled(false)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Disable 2FA
                  </button>
                </div>
              </div>
            )}

            {showQRCode && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-4">Set up Two-Factor Authentication</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-4">
                      Scan this QR code with your authenticator app:
                    </p>
                    <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Key className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-sm">QR Code</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-4">
                      Or enter this code manually:
                    </p>
                    <code className="block p-3 bg-gray-100 rounded text-sm font-mono break-all">
                      JBSWY3DPEHPK3PXP
                    </code>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter verification code:
                      </label>
                      <input
                        type="text"
                        placeholder="000000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                      />
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button 
                        onClick={handleConfirm2FA}
                        className="bg-success-600 text-white px-4 py-2 rounded-md hover:bg-success-700 transition-colors"
                      >
                        Verify & Enable
                      </button>
                      <button 
                        onClick={() => setShowQRCode(false)}
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Security Questions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-6">
              <Key className="h-5 w-5 text-gray-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Security Questions</h2>
            </div>

            <div className="space-y-4">
              {securityQuestions.map((question) => (
                <div key={question.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{question.question}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      question.isSet 
                        ? 'bg-success-100 text-success-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {question.isSet ? 'Set' : 'Not Set'}
                    </span>
                  </div>
                  {!question.isSet && (
                    <div className="mt-3">
                      <input
                        type="text"
                        placeholder="Enter your answer"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                      />
                      <button className="mt-2 bg-primary-600 text-white px-4 py-1 rounded text-sm hover:bg-primary-700 transition-colors">
                        Save Answer
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-6">
              <AlertTriangle className="h-5 w-5 text-gray-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">{t('settings.activeSessions')}</h2>
            </div>

            <div className="space-y-4">
              {activeSessions.map((session) => (
                <div key={session.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-200 rounded-lg gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900">{session.device}</h3>
                      {session.current && (
                        <span className="px-2 py-1 bg-success-100 text-success-800 text-xs font-medium rounded-full">
                          {t('settings.current')}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{session.location}</p>
                    <p className="text-xs text-gray-500">
                      {t('settings.lastActive')}: {session.lastActive} • IP: {session.ipAddress}
                    </p>
                  </div>
                  {!session.current && (
                    <button 
                      onClick={() => handleTerminateSession(session.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Terminate
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-800">Security Tip</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    If you see any suspicious activity or unrecognized devices, terminate those sessions immediately and change your password.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettingsPage;