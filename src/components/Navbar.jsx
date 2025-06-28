import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, LogOut, User, Calendar, Settings, Menu, X, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu} title="MedConnect Home">
              <Heart className="h-8 w-8 text-primary-600" title="MedConnect Logo" />
              <span className="text-xl font-bold text-gray-900 hidden sm:block">MedConnect</span>
              <span className="text-lg font-bold text-gray-900 sm:hidden">Med</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            {user ? (
              <>
                <span className="text-sm text-gray-700 hidden xl:block">
                  {t('nav.welcome')}, {user.name}
                </span>
                <Link
                  to="/quick-actions"
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 transition-colors px-3 py-2 rounded-md"
                  title={t('nav.quickActions')}
                >
                  <Zap className="h-4 w-4" title={t('nav.quickActions')} />
                  <span className="text-sm">{t('nav.quickActions')}</span>
                </Link>
                {user.role === 'provider' && (
                  <Link
                    to="/provider/dashboard"
                    className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 transition-colors px-3 py-2 rounded-md"
                    title={t('nav.dashboard')}
                  >
                    <Settings className="h-4 w-4" title={t('nav.dashboard')} />
                    <span className="text-sm">{t('nav.dashboard')}</span>
                  </Link>
                )}
                {user.role === 'client' && (
                  <Link
                    to="/client/appointments"
                    className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 transition-colors px-3 py-2 rounded-md"
                    title={t('nav.appointments')}
                  >
                    <Calendar className="h-4 w-4" title={t('nav.appointments')} />
                    <span className="text-sm">{t('nav.appointments')}</span>
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 transition-colors px-3 py-2 rounded-md"
                  title={t('nav.profile')}
                >
                  <User className="h-4 w-4" title={t('nav.profile')} />
                  <span className="text-sm">{t('nav.profile')}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 transition-colors px-3 py-2 rounded-md"
                  title={t('nav.logout')}
                >
                  <LogOut className="h-4 w-4" title={t('nav.logout')} />
                  <span className="text-sm">{t('nav.logout')}</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-md"
                  title={t('nav.signIn')}
                >
                  {t('nav.signIn')}
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                  title={t('nav.getStarted')}
                >
                  {t('nav.getStarted')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
              title={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" title="Close menu" />
              ) : (
                <Menu className="h-6 w-6" title="Open menu" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="space-y-2">
              {user ? (
                <>
                  <div className="px-3 py-2 text-sm text-gray-700 border-b border-gray-100 mb-2">
                    {t('nav.welcome')}, {user.name}
                  </div>
                  <Link
                    to="/quick-actions"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 transition-colors px-3 py-2 rounded-md"
                    title={t('nav.quickActions')}
                  >
                    <Zap className="h-4 w-4" title={t('nav.quickActions')} />
                    <span>{t('nav.quickActions')}</span>
                  </Link>
                  {user.role === 'provider' && (
                    <Link
                      to="/provider/dashboard"
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors px-3 py-2 rounded-md"
                      title={t('nav.dashboard')}
                    >
                      <Settings className="h-4 w-4" title={t('nav.dashboard')} />
                      <span>{t('nav.dashboard')}</span>
                    </Link>
                  )}
                  {user.role === 'client' && (
                    <Link
                      to="/client/appointments"
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors px-3 py-2 rounded-md"
                      title={t('nav.myAppointments')}
                    >
                      <Calendar className="h-4 w-4" title={t('nav.myAppointments')} />
                      <span>{t('nav.myAppointments')}</span>
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 transition-colors px-3 py-2 rounded-md"
                    title={t('nav.profile')}
                  >
                    <User className="h-4 w-4" title={t('nav.profile')} />
                    <span>{t('nav.profile')}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 transition-colors px-3 py-2 rounded-md w-full text-left"
                    title={t('nav.logout')}
                  >
                    <LogOut className="h-4 w-4" title={t('nav.logout')} />
                    <span>{t('nav.logout')}</span>
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="block text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-md"
                    title={t('nav.signIn')}
                  >
                    {t('nav.signIn')}
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="block bg-primary-600 text-white px-3 py-2 rounded-md hover:bg-primary-700 transition-colors text-center"
                    title={t('nav.getStarted')}
                  >
                    {t('nav.getStarted')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;