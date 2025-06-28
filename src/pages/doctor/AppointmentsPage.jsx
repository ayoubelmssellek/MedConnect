import React, { useState } from 'react';
import { Calendar, Clock, User, Search, Filter, Plus, Eye, Edit, X, CheckCircle, AlertCircle, Phone, Mail } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const AppointmentsPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      patientName: 'Sarah Johnson',
      patientEmail: 'sarah.johnson@email.com',
      patientPhone: '+1 (555) 123-4567',
      date: '2024-01-15',
      time: '09:00',
      duration: 30,
      type: 'Consultation',
      status: 'confirmed',
      reason: 'Follow-up on cardiac screening results',
      notes: 'Patient reports improved symptoms',
      priority: 'normal',
      location: 'Office',
      patientAge: 39,
      medicalHistory: 'Hypertension, Diabetes Type 2',
      allergies: 'Penicillin',
      lastVisit: '2024-01-01'
    },
    {
      id: 2,
      patientName: 'Michael Chen',
      patientEmail: 'michael.chen@email.com',
      patientPhone: '+1 (555) 234-5678',
      date: '2024-01-15',
      time: '10:30',
      duration: 45,
      type: 'Physical Examination',
      status: 'confirmed',
      reason: 'Annual physical examination',
      notes: 'Routine check-up',
      priority: 'normal',
      location: 'Office',
      patientAge: 45,
      medicalHistory: 'Asthma, Allergies',
      allergies: 'Pollen, Dust mites',
      lastVisit: '2023-12-15'
    },
    {
      id: 3,
      patientName: 'Emma Davis',
      patientEmail: 'emma.davis@email.com',
      patientPhone: '+1 (555) 345-6789',
      date: '2024-01-15',
      time: '14:00',
      duration: 30,
      type: 'Follow-up',
      status: 'pending',
      reason: 'Review test results',
      notes: 'Lab results discussion',
      priority: 'high',
      location: 'Telemedicine',
      patientAge: 31,
      medicalHistory: 'No significant history',
      allergies: 'None known',
      lastVisit: '2024-01-08'
    },
    {
      id: 4,
      patientName: 'James Rodriguez',
      patientEmail: 'james.rodriguez@email.com',
      patientPhone: '+1 (555) 456-7890',
      date: '2024-01-16',
      time: '11:00',
      duration: 60,
      type: 'Procedure',
      status: 'confirmed',
      reason: 'Minor cardiac procedure',
      notes: 'Pre-procedure consultation completed',
      priority: 'high',
      location: 'Office',
      patientAge: 58,
      medicalHistory: 'Coronary artery disease, High cholesterol',
      allergies: 'Aspirin',
      lastVisit: '2024-01-10'
    },
    {
      id: 5,
      patientName: 'Lisa Thompson',
      patientEmail: 'lisa.thompson@email.com',
      patientPhone: '+1 (555) 567-8901',
      date: '2024-01-14',
      time: '15:30',
      duration: 30,
      type: 'Consultation',
      status: 'completed',
      reason: 'Chest pain evaluation',
      notes: 'EKG normal, symptoms resolved',
      priority: 'urgent',
      location: 'Office',
      patientAge: 42,
      medicalHistory: 'Anxiety, Migraines',
      allergies: 'Latex',
      lastVisit: '2024-01-14'
    }
  ];

  const tabs = [
    { id: 'today', name: 'Today', count: appointments.filter(apt => apt.date === '2024-01-15').length },
    { id: 'upcoming', name: 'Upcoming', count: appointments.filter(apt => new Date(apt.date) > new Date('2024-01-15')).length },
    { id: 'past', name: 'Past', count: appointments.filter(apt => new Date(apt.date) < new Date('2024-01-15')).length },
    { id: 'all', name: 'All', count: appointments.length }
  ];

  const getFilteredAppointments = () => {
    let filtered = appointments;

    // Filter by tab
    const today = '2024-01-15';
    switch (activeTab) {
      case 'today':
        filtered = filtered.filter(apt => apt.date === today);
        break;
      case 'upcoming':
        filtered = filtered.filter(apt => new Date(apt.date) > new Date(today));
        break;
      case 'past':
        filtered = filtered.filter(apt => new Date(apt.date) < new Date(today));
        break;
      default:
        break;
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(apt =>
        apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.reason.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA - dateB;
    });
  };

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentModal(true);
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    alert(`Appointment ${appointmentId} status changed to ${newStatus}`);
  };

  const handleCancelAppointment = (appointmentId) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      alert(`Appointment ${appointmentId} has been cancelled`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success-100 text-success-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600';
      case 'high':
        return 'text-orange-600';
      case 'normal':
        return 'text-gray-600';
      case 'low':
        return 'text-gray-400';
      default:
        return 'text-gray-600';
    }
  };

  const filteredAppointments = getFilteredAppointments();

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Calendar className="h-8 w-8 mr-3 text-primary-600" />
            Appointments
          </h1>
          <p className="text-gray-600">Manage your patient appointments and schedule</p>
        </div>

        {/* Header Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments by patient name, type, or reason..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
              />
            </div>
            <div className="flex gap-3">
              <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Appointment
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
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
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-600">
                {searchQuery ? 'Try adjusting your search criteria.' : 'No appointments scheduled for this period.'}
              </p>
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{appointment.patientName}</h3>
                        <p className="text-sm text-gray-600">Age: {appointment.patientAge}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(appointment.priority)}`}>
                          {appointment.priority}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                        {new Date(appointment.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                        {appointment.time} ({appointment.duration} min)
                      </div>
                      <div className="flex items-center text-gray-600">
                        <User className="h-4 w-4 mr-2 flex-shrink-0" />
                        {appointment.type}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {appointment.location}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Reason:</span> {appointment.reason}
                      </p>
                      {appointment.notes && (
                        <p className="text-sm text-gray-700 mt-1">
                          <span className="font-medium">Notes:</span> {appointment.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => window.open(`tel:${appointment.patientPhone}`)}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors flex items-center"
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </button>
                      <button
                        onClick={() => window.open(`mailto:${appointment.patientEmail}`)}
                        className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full hover:bg-green-200 transition-colors flex items-center"
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        Email
                      </button>
                      {appointment.medicalHistory && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          Medical History
                        </span>
                      )}
                      {appointment.allergies && appointment.allergies !== 'None known' && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                          <AlertCircle className="h-3 w-3 mr-1 inline" />
                          Allergies
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col gap-2">
                    <button
                      onClick={() => handleViewAppointment(appointment)}
                      className="flex-1 lg:flex-none bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </button>
                    {appointment.status === 'pending' && (
                      <button
                        onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                        className="flex-1 lg:flex-none bg-success-600 text-white px-4 py-2 rounded-md hover:bg-success-700 transition-colors flex items-center justify-center"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Confirm
                      </button>
                    )}
                    {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="flex-1 lg:flex-none bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Appointment Detail Modal */}
        {showAppointmentModal && selectedAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Appointment Details</h2>
                  <button
                    onClick={() => setShowAppointmentModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    {/* Patient Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Patient Information
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Name:</span>
                          <span className="ml-2 font-medium">{selectedAppointment.patientName}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Age:</span>
                          <span className="ml-2 font-medium">{selectedAppointment.patientAge} years</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Phone:</span>
                          <span className="ml-2 font-medium">{selectedAppointment.patientPhone}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Email:</span>
                          <span className="ml-2 font-medium">{selectedAppointment.patientEmail}</span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-gray-600">Medical History:</span>
                          <span className="ml-2 font-medium">{selectedAppointment.medicalHistory}</span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-gray-600">Allergies:</span>
                          <span className={`ml-2 font-medium ${selectedAppointment.allergies !== 'None known' ? 'text-red-600' : ''}`}>
                            {selectedAppointment.allergies}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Appointment Details
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Date:</span>
                          <span className="ml-2 font-medium">
                            {new Date(selectedAppointment.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Time:</span>
                          <span className="ml-2 font-medium">{selectedAppointment.time}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Duration:</span>
                          <span className="ml-2 font-medium">{selectedAppointment.duration} minutes</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Type:</span>
                          <span className="ml-2 font-medium">{selectedAppointment.type}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Location:</span>
                          <span className="ml-2 font-medium">{selectedAppointment.location}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Priority:</span>
                          <span className={`ml-2 font-medium capitalize ${getPriorityColor(selectedAppointment.priority)}`}>
                            {selectedAppointment.priority}
                          </span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-gray-600">Reason:</span>
                          <span className="ml-2 font-medium">{selectedAppointment.reason}</span>
                        </div>
                        {selectedAppointment.notes && (
                          <div className="sm:col-span-2">
                            <span className="text-gray-600">Notes:</span>
                            <span className="ml-2 font-medium">{selectedAppointment.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-4">
                    <div className="bg-primary-50 rounded-lg p-4">
                      <h3 className="font-medium text-primary-900 mb-3">Quick Actions</h3>
                      <div className="space-y-2">
                        <button className="w-full text-left p-2 text-sm text-primary-700 hover:bg-primary-100 rounded transition-colors">
                          Start Consultation
                        </button>
                        <button className="w-full text-left p-2 text-sm text-primary-700 hover:bg-primary-100 rounded transition-colors">
                          Add Clinical Notes
                        </button>
                        <button className="w-full text-left p-2 text-sm text-primary-700 hover:bg-primary-100 rounded transition-colors">
                          Prescribe Medication
                        </button>
                        <button className="w-full text-left p-2 text-sm text-primary-700 hover:bg-primary-100 rounded transition-colors">
                          Schedule Follow-up
                        </button>
                        <button className="w-full text-left p-2 text-sm text-primary-700 hover:bg-primary-100 rounded transition-colors">
                          Send Message
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-3">Status</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Current Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAppointment.status)}`}>
                            {selectedAppointment.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Last Visit:</span>
                          <span className="text-sm font-medium">{new Date(selectedAppointment.lastVisit).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {selectedAppointment.allergies !== 'None known' && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-medium text-red-800">Allergies Alert</h3>
                            <p className="text-sm text-red-700 mt-1">{selectedAppointment.allergies}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowAppointmentModal(false)}
                    className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                  <button className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;