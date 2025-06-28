import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LocationProvider } from './contexts/LocationContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountSetupPage from './pages/AccountSetupPage';
import ProviderDashboard from './pages/ProviderDashboard';
import ClientAppointments from './pages/ClientAppointments';
import ProvidersPage from './pages/ProvidersPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import QuickActionsPage from './pages/QuickActionsPage';

// Doctor Interface Pages
import SecuritySettingsPage from './pages/doctor/SecuritySettingsPage';
import NotificationPreferencesPage from './pages/doctor/NotificationPreferencesPage';
import AddAppointmentPage from './pages/doctor/AddAppointmentPage';
import ManageAvailabilityPage from './pages/doctor/ManageAvailabilityPage';
import ViewPatientRecordsPage from './pages/doctor/ViewPatientRecordsPage';
import UpdateProfilePage from './pages/doctor/UpdateProfilePage';
import AppointmentsPage from './pages/doctor/AppointmentsPage';
import PatientsPage from './pages/doctor/PatientsPage';
import DoctorSettingsPage from './pages/doctor/SettingsPage';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <LocationProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/providers" element={<ProvidersPage />} />
                <Route 
                  path="/account-setup" 
                  element={
                    <ProtectedRoute>
                      <AccountSetupPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <SettingsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/quick-actions" 
                  element={
                    <ProtectedRoute>
                      <QuickActionsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/provider/dashboard" 
                  element={
                    <ProtectedRoute requiredRole="provider">
                      <ProviderDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/client/appointments" 
                  element={
                    <ProtectedRoute requiredRole="client">
                      <ClientAppointments />
                    </ProtectedRoute>
                  } 
                />

                {/* Doctor Interface Routes */}
                <Route 
                  path="/doctor/security-settings" 
                  element={
                    <ProtectedRoute requiredRole="provider">
                      <SecuritySettingsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/doctor/notification-preferences" 
                  element={
                    <ProtectedRoute requiredRole="provider">
                      <NotificationPreferencesPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/doctor/add-appointment" 
                  element={
                    <ProtectedRoute requiredRole="provider">
                      <AddAppointmentPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/doctor/manage-availability" 
                  element={
                    <ProtectedRoute requiredRole="provider">
                      <ManageAvailabilityPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/doctor/patient-records" 
                  element={
                    <ProtectedRoute requiredRole="provider">
                      <ViewPatientRecordsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/doctor/update-profile" 
                  element={
                    <ProtectedRoute requiredRole="provider">
                      <UpdateProfilePage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/doctor/appointments" 
                  element={
                    <ProtectedRoute requiredRole="provider">
                      <AppointmentsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/doctor/patients" 
                  element={
                    <ProtectedRoute requiredRole="provider">
                      <PatientsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/doctor/settings" 
                  element={
                    <ProtectedRoute requiredRole="provider">
                      <DoctorSettingsPage />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </div>
          </Router>
        </LocationProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;