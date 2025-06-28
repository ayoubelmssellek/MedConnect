import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, Plus, Search, AlertCircle, CheckCircle, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const AddAppointmentPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [appointmentData, setAppointmentData] = useState({
    patientType: 'existing', // 'existing' or 'new'
    patientId: '',
    patientInfo: {
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      emergencyContact: '',
      medicalHistory: ''
    },
    appointmentDetails: {
      date: '',
      time: '',
      duration: '30',
      type: 'consultation',
      reason: '',
      notes: '',
      priority: 'normal',
      location: 'office'
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Mock existing patients
  const existingPatients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1985-03-15',
      lastVisit: '2024-01-10',
      medicalHistory: 'Hypertension, Diabetes Type 2'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      dateOfBirth: '1978-07-22',
      lastVisit: '2024-01-05',
      medicalHistory: 'Asthma, Allergies'
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      phone: '+1 (555) 345-6789',
      dateOfBirth: '1992-11-08',
      lastVisit: '2023-12-20',
      medicalHistory: 'No significant history'
    }
  ];

  const appointmentTypes = [
    { value: 'consultation', label: 'Consultation', duration: 30 },
    { value: 'follow-up', label: 'Follow-up', duration: 15 },
    { value: 'physical', label: 'Physical Examination', duration: 45 },
    { value: 'procedure', label: 'Minor Procedure', duration: 60 },
    { value: 'emergency', label: 'Emergency', duration: 30 },
    { value: 'telemedicine', label: 'Telemedicine', duration: 20 }
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30'
  ];

  const filteredPatients = existingPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone.includes(searchQuery)
  );

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setAppointmentData(prev => ({
      ...prev,
      patientId: patient.id,
      patientInfo: {
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        dateOfBirth: patient.dateOfBirth,
        address: '',
        emergencyContact: '',
        medicalHistory: patient.medicalHistory
      }
    }));
  };

  const handleInputChange = (section, field, value) => {
    setAppointmentData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleAppointmentTypeChange = (type) => {
    const selectedType = appointmentTypes.find(t => t.value === type);
    setAppointmentData(prev => ({
      ...prev,
      appointmentDetails: {
        ...prev.appointmentDetails,
        type: type,
        duration: selectedType ? selectedType.duration.toString() : '30'
      }
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!appointmentData.patientInfo.name || !appointmentData.appointmentDetails.date || !appointmentData.appointmentDetails.time) {
      alert('Please fill in all required fields');
      return;
    }

    // Submit appointment
    alert('Appointment scheduled successfully!');
    console.log('Appointment Data:', appointmentData);
    
    // Reset form
    setStep(1);
    setAppointmentData({
      patientType: 'existing',
      patientId: '',
      patientInfo: {
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        emergencyContact: '',
        medicalHistory: ''
      },
      appointmentDetails: {
        date: '',
        time: '',
        duration: '30',
        type: 'consultation',
        reason: '',
        notes: '',
        priority: 'normal',
        location: 'office'
      }
    });
    setSelectedPatient(null);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Plus className="h-8 w-8 mr-3 text-primary-600" />
            Add New Appointment
          </h1>
          <p className="text-gray-600">Schedule a new appointment for a patient</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between">
            {[
              { number: 1, title: 'Select Patient', active: step >= 1, completed: step > 1 },
              { number: 2, title: 'Appointment Details', active: step >= 2, completed: step > 2 },
              { number: 3, title: 'Review & Confirm', active: step >= 3, completed: false }
            ].map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  stepItem.completed 
                    ? 'bg-success-600 border-success-600 text-white'
                    : stepItem.active
                    ? 'bg-primary-600 border-primary-600 text-white'
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {stepItem.completed ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    stepItem.number
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  stepItem.active ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {stepItem.title}
                </span>
                {index < 2 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    stepItem.completed ? 'bg-success-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Select Patient</h2>
              
              {/* Patient Type Selection */}
              <div className="mb-6">
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="patientType"
                      value="existing"
                      checked={appointmentData.patientType === 'existing'}
                      onChange={(e) => setAppointmentData(prev => ({ ...prev, patientType: e.target.value }))}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Existing Patient</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="patientType"
                      value="new"
                      checked={appointmentData.patientType === 'new'}
                      onChange={(e) => setAppointmentData(prev => ({ ...prev, patientType: e.target.value }))}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">New Patient</span>
                  </label>
                </div>
              </div>

              {appointmentData.patientType === 'existing' ? (
                <div>
                  {/* Search Existing Patients */}
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search patients by name, email, or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                      />
                    </div>
                  </div>

                  {/* Patient List */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredPatients.map((patient) => (
                      <div
                        key={patient.id}
                        onClick={() => handlePatientSelect(patient)}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedPatient?.id === patient.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{patient.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center">
                                <Mail className="h-3 w-3 mr-1" />
                                {patient.email}
                              </span>
                              <span className="flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {patient.phone}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                            </p>
                          </div>
                          {selectedPatient?.id === patient.id && (
                            <CheckCircle className="h-5 w-5 text-primary-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  {/* New Patient Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={appointmentData.patientInfo.name}
                        onChange={(e) => handleInputChange('patientInfo', 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={appointmentData.patientInfo.email}
                        onChange={(e) => handleInputChange('patientInfo', 'email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={appointmentData.patientInfo.phone}
                        onChange={(e) => handleInputChange('patientInfo', 'phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={appointmentData.patientInfo.dateOfBirth}
                        onChange={(e) => handleInputChange('patientInfo', 'dateOfBirth', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        value={appointmentData.patientInfo.address}
                        onChange={(e) => handleInputChange('patientInfo', 'address', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact
                      </label>
                      <input
                        type="text"
                        value={appointmentData.patientInfo.emergencyContact}
                        onChange={(e) => handleInputChange('patientInfo', 'emergencyContact', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Medical History
                      </label>
                      <textarea
                        value={appointmentData.patientInfo.medicalHistory}
                        onChange={(e) => handleInputChange('patientInfo', 'medicalHistory', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setStep(2)}
                  disabled={!appointmentData.patientInfo.name}
                  className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Appointment Details
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Appointment Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={appointmentData.appointmentDetails.date}
                    onChange={(e) => handleInputChange('appointmentDetails', 'date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <select
                    value={appointmentData.appointmentDetails.time}
                    onChange={(e) => handleInputChange('appointmentDetails', 'time', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                    required
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Type *
                  </label>
                  <select
                    value={appointmentData.appointmentDetails.type}
                    onChange={(e) => handleAppointmentTypeChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                    required
                  >
                    {appointmentTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label} ({type.duration} min)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={appointmentData.appointmentDetails.duration}
                    onChange={(e) => handleInputChange('appointmentDetails', 'duration', e.target.value)}
                    min="15"
                    max="120"
                    step="15"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={appointmentData.appointmentDetails.priority}
                    onChange={(e) => handleInputChange('appointmentDetails', 'priority', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={appointmentData.appointmentDetails.location}
                    onChange={(e) => handleInputChange('appointmentDetails', 'location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                  >
                    <option value="office">Office</option>
                    <option value="telemedicine">Telemedicine</option>
                    <option value="home">Home Visit</option>
                    <option value="hospital">Hospital</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Visit
                  </label>
                  <input
                    type="text"
                    value={appointmentData.appointmentDetails.reason}
                    onChange={(e) => handleInputChange('appointmentDetails', 'reason', e.target.value)}
                    placeholder="Brief description of the visit purpose"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={appointmentData.appointmentDetails.notes}
                    onChange={(e) => handleInputChange('appointmentDetails', 'notes', e.target.value)}
                    rows={3}
                    placeholder="Additional notes or special instructions"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!appointmentData.appointmentDetails.date || !appointmentData.appointmentDetails.time}
                  className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Review
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Review & Confirm</h2>
              
              <div className="space-y-6">
                {/* Patient Information */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Patient Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <span className="ml-2 font-medium">{appointmentData.patientInfo.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <span className="ml-2 font-medium">{appointmentData.patientInfo.email}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Phone:</span>
                      <span className="ml-2 font-medium">{appointmentData.patientInfo.phone}</span>
                    </div>
                    {appointmentData.patientInfo.dateOfBirth && (
                      <div>
                        <span className="text-gray-600">Date of Birth:</span>
                        <span className="ml-2 font-medium">{appointmentData.patientInfo.dateOfBirth}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Appointment Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Date:</span>
                      <span className="ml-2 font-medium">
                        {new Date(appointmentData.appointmentDetails.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Time:</span>
                      <span className="ml-2 font-medium">{appointmentData.appointmentDetails.time}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <span className="ml-2 font-medium">
                        {appointmentTypes.find(t => t.value === appointmentData.appointmentDetails.type)?.label}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Duration:</span>
                      <span className="ml-2 font-medium">{appointmentData.appointmentDetails.duration} minutes</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Priority:</span>
                      <span className={`ml-2 font-medium capitalize ${
                        appointmentData.appointmentDetails.priority === 'urgent' ? 'text-red-600' :
                        appointmentData.appointmentDetails.priority === 'high' ? 'text-orange-600' :
                        'text-gray-900'
                      }`}>
                        {appointmentData.appointmentDetails.priority}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Location:</span>
                      <span className="ml-2 font-medium capitalize">{appointmentData.appointmentDetails.location}</span>
                    </div>
                    {appointmentData.appointmentDetails.reason && (
                      <div className="md:col-span-2">
                        <span className="text-gray-600">Reason:</span>
                        <span className="ml-2 font-medium">{appointmentData.appointmentDetails.reason}</span>
                      </div>
                    )}
                    {appointmentData.appointmentDetails.notes && (
                      <div className="md:col-span-2">
                        <span className="text-gray-600">Notes:</span>
                        <span className="ml-2 font-medium">{appointmentData.appointmentDetails.notes}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Confirmation */}
                <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-primary-800">Confirm Appointment</h3>
                      <p className="text-sm text-primary-700 mt-1">
                        Please review all information carefully before confirming. The patient will receive a confirmation email with appointment details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-success-600 text-white px-6 py-2 rounded-md hover:bg-success-700 transition-colors flex items-center"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddAppointmentPage;