import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Plus, Search, Filter, CheckCircle, X, Phone, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const ClientAppointments = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  const upcomingAppointments = [
    {
      id: 1,
      provider: 'Dr. Sarah Wilson',
      specialty: 'Cardiology',
      date: '2024-01-15',
      time: '10:00 AM',
      location: 'Heart Center, Downtown',
      type: 'Consultation',
      status: 'confirmed',
      avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      phone: '+1 (555) 123-4567',
      email: 'dr.wilson@medcenter.com',
      notes: 'Follow-up on recent cardiac screening results'
    },
    {
      id: 2,
      provider: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      date: '2024-01-20',
      time: '2:30 PM',
      location: 'Family Health Clinic',
      type: 'Follow-up',
      status: 'confirmed',
      avatar: 'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      phone: '+1 (555) 234-5678',
      email: 'dr.chen@familyhealth.com',
      notes: 'Annual physical examination'
    },
    {
      id: 3,
      provider: 'Dr. Emma Davis',
      specialty: 'Dermatology',
      date: '2024-01-22',
      time: '11:00 AM',
      location: 'Skin Care Center',
      type: 'Consultation',
      status: 'pending',
      avatar: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      phone: '+1 (555) 345-6789',
      email: 'dr.davis@skincare.com',
      notes: 'Skin examination for mole check'
    }
  ];

  const pastAppointments = [
    {
      id: 4,
      provider: 'Dr. Emma Davis',
      specialty: 'Dermatology',
      date: '2023-12-10',
      time: '9:00 AM',
      location: 'Skin Care Center',
      type: 'Consultation',
      status: 'completed',
      avatar: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      phone: '+1 (555) 345-6789',
      email: 'dr.davis@skincare.com',
      notes: 'Initial consultation for acne treatment'
    },
    {
      id: 5,
      provider: 'Dr. James Rodriguez',
      specialty: 'Pediatrics',
      date: '2023-11-15',
      time: '3:00 PM',
      location: 'Children\'s Health Center',
      type: 'Check-up',
      status: 'completed',
      avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      phone: '+1 (555) 456-7890',
      email: 'dr.rodriguez@childhealth.com',
      notes: 'Routine pediatric check-up'
    }
  ];

  const appointments = activeTab === 'upcoming' ? upcomingAppointments : pastAppointments;
  const filteredAppointments = appointments.filter(appointment =>
    appointment.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCancelAppointment = (appointmentId) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      alert(`Appointment ${appointmentId} has been cancelled. You will receive a confirmation email.`);
    }
  };

  const handleRescheduleAppointment = (appointmentId) => {
    alert(`Reschedule functionality for appointment ${appointmentId} would open the booking calendar here.`);
  };

  const handleBookAgain = (appointment) => {
    alert(`Booking again with ${appointment.provider}. This would open the appointment booking modal.`);
  };

  const handleLeaveReview = (appointment) => {
    alert(`Leave a review for ${appointment.provider}. This would open a review modal.`);
  };

  const handleContactProvider = (appointment, method) => {
    if (method === 'phone') {
      window.open(`tel:${appointment.phone}`);
    } else if (method === 'email') {
      window.open(`mailto:${appointment.email}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">My Appointments</h1>
          <p className="text-gray-600">Manage your healthcare appointments</p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button className="bg-primary-600 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center">
            <Plus className="h-4 w-4 mr-2" />
            Book New Appointment
          </button>
          
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
            />
          </div>
          
          <button className="bg-white text-gray-700 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
            {[
              { id: 'upcoming', name: 'Upcoming', count: upcomingAppointments.length },
              { id: 'past', name: 'Past', count: pastAppointments.length }
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
                {tab.name} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {activeTab} appointments
                {searchQuery && ' matching your search'}
              </h3>
              <p className="text-gray-600 mb-6">
                {activeTab === 'upcoming' 
                  ? searchQuery 
                    ? "Try adjusting your search terms."
                    : "You don't have any upcoming appointments scheduled."
                  : searchQuery
                    ? "Try adjusting your search terms."
                    : "You don't have any past appointments to show."
                }
              </p>
              {activeTab === 'upcoming' && !searchQuery && (
                <button className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors">
                  Book Your First Appointment
                </button>
              )}
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex-shrink-0">
                        <img
                          src={appointment.avatar}
                          alt={appointment.provider}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{appointment.provider}</h3>
                        <p className="text-sm text-gray-600">{appointment.specialty}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                        <span className="truncate">
                          {new Date(appointment.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                        {appointment.time}
                      </div>
                      <div className="flex items-center sm:col-span-2 lg:col-span-1">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{appointment.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                      <span className="text-sm text-gray-600">Type: {appointment.type}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full w-fit ${
                        appointment.status === 'confirmed' 
                          ? 'bg-success-100 text-success-800'
                          : appointment.status === 'completed'
                          ? 'bg-gray-100 text-gray-800'
                          : appointment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>

                    {appointment.notes && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Notes:</span> {appointment.notes}
                        </p>
                      </div>
                    )}

                    {/* Contact Options */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <button
                        onClick={() => handleContactProvider(appointment, 'phone')}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors flex items-center"
                        title={`Call ${appointment.provider}`}
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </button>
                      <button
                        onClick={() => handleContactProvider(appointment, 'email')}
                        className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full hover:bg-green-200 transition-colors flex items-center"
                        title={`Email ${appointment.provider}`}
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        Email
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-row lg:flex-col gap-2 lg:gap-2">
                    {activeTab === 'upcoming' ? (
                      <>
                        <button 
                          onClick={() => handleRescheduleAppointment(appointment.id)}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium px-3 py-1 rounded border border-primary-600 hover:bg-primary-50 transition-colors flex items-center justify-center"
                          title="Reschedule appointment"
                        >
                          <Calendar className="h-3 w-3 mr-1" />
                          Reschedule
                        </button>
                        <button 
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 rounded border border-red-600 hover:bg-red-50 transition-colors flex items-center justify-center"
                          title="Cancel appointment"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => handleBookAgain(appointment)}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium px-3 py-1 rounded border border-primary-600 hover:bg-primary-50 transition-colors flex items-center justify-center"
                          title="Book another appointment"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Book Again
                        </button>
                        <button 
                          onClick={() => handleLeaveReview(appointment)}
                          className="text-gray-600 hover:text-gray-700 text-sm font-medium px-3 py-1 rounded border border-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center"
                          title="Leave a review"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Review
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientAppointments;