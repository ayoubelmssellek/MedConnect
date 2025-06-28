import React, { useState } from 'react';
import { Users, Search, Filter, Eye, Edit, Plus, Calendar, Phone, Mail, MapPin, AlertCircle, FileText, Activity } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const ViewPatientRecordsPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientModal, setShowPatientModal] = useState(false);

  // Mock patient data
  const patients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1985-03-15',
      address: '123 Main St, New York, NY 10001',
      emergencyContact: 'John Johnson - +1 (555) 123-4568',
      registrationDate: '2023-01-15',
      lastVisit: '2024-01-10',
      nextAppointment: '2024-01-25',
      status: 'active',
      medicalHistory: 'Hypertension, Diabetes Type 2',
      allergies: 'Penicillin, Shellfish',
      currentMedications: 'Metformin 500mg, Lisinopril 10mg',
      bloodType: 'A+',
      insurance: 'Blue Cross Blue Shield',
      totalVisits: 12,
      upcomingAppointments: 2,
      recentNotes: 'Patient reports improved blood sugar levels. Continue current medication regimen.',
      vitals: {
        bloodPressure: '130/85',
        heartRate: '72 bpm',
        temperature: '98.6°F',
        weight: '165 lbs',
        height: '5\'6"'
      }
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      dateOfBirth: '1978-07-22',
      address: '456 Oak Ave, Brooklyn, NY 11201',
      emergencyContact: 'Lisa Chen - +1 (555) 234-5679',
      registrationDate: '2023-03-20',
      lastVisit: '2024-01-05',
      nextAppointment: '2024-02-15',
      status: 'active',
      medicalHistory: 'Asthma, Seasonal Allergies',
      allergies: 'Pollen, Dust mites',
      currentMedications: 'Albuterol inhaler, Claritin 10mg',
      bloodType: 'O-',
      insurance: 'Aetna',
      totalVisits: 8,
      upcomingAppointments: 1,
      recentNotes: 'Asthma well controlled. Patient using inhaler appropriately.',
      vitals: {
        bloodPressure: '120/80',
        heartRate: '68 bpm',
        temperature: '98.4°F',
        weight: '180 lbs',
        height: '5\'10"'
      }
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      phone: '+1 (555) 345-6789',
      dateOfBirth: '1992-11-08',
      address: '789 Pine St, Queens, NY 11375',
      emergencyContact: 'Robert Davis - +1 (555) 345-6790',
      registrationDate: '2023-06-10',
      lastVisit: '2023-12-20',
      nextAppointment: null,
      status: 'inactive',
      medicalHistory: 'No significant history',
      allergies: 'None known',
      currentMedications: 'None',
      bloodType: 'B+',
      insurance: 'United Healthcare',
      totalVisits: 3,
      upcomingAppointments: 0,
      recentNotes: 'Annual physical completed. All results normal.',
      vitals: {
        bloodPressure: '115/75',
        heartRate: '65 bpm',
        temperature: '98.2°F',
        weight: '140 lbs',
        height: '5\'4"'
      }
    },
    {
      id: 4,
      name: 'James Rodriguez',
      email: 'james.rodriguez@email.com',
      phone: '+1 (555) 456-7890',
      dateOfBirth: '1965-04-12',
      address: '321 Elm St, Manhattan, NY 10002',
      emergencyContact: 'Maria Rodriguez - +1 (555) 456-7891',
      registrationDate: '2022-11-05',
      lastVisit: '2024-01-08',
      nextAppointment: '2024-01-30',
      status: 'active',
      medicalHistory: 'Coronary artery disease, High cholesterol',
      allergies: 'Aspirin',
      currentMedications: 'Atorvastatin 40mg, Metoprolol 50mg',
      bloodType: 'AB+',
      insurance: 'Medicare',
      totalVisits: 15,
      upcomingAppointments: 1,
      recentNotes: 'Cholesterol levels improving. Continue current statin therapy.',
      vitals: {
        bloodPressure: '140/90',
        heartRate: '75 bpm',
        temperature: '98.8°F',
        weight: '190 lbs',
        height: '5\'8"'
      }
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Patients' },
    { value: 'active', label: 'Active Patients' },
    { value: 'inactive', label: 'Inactive Patients' },
    { value: 'recent', label: 'Recent Visits' },
    { value: 'upcoming', label: 'Upcoming Appointments' }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.phone.includes(searchQuery);

    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'active' && patient.status === 'active') ||
                         (selectedFilter === 'inactive' && patient.status === 'inactive') ||
                         (selectedFilter === 'recent' && new Date(patient.lastVisit) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
                         (selectedFilter === 'upcoming' && patient.upcomingAppointments > 0);

    return matchesSearch && matchesFilter;
  });

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setShowPatientModal(true);
  };

  const handleEditPatient = (patient) => {
    alert(`Edit patient functionality for ${patient.name} would open here`);
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Users className="h-8 w-8 mr-3 text-primary-600" />
            Patient Records
          </h1>
          <p className="text-gray-600">View and manage your patient information</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Patient
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-primary-50 rounded-lg">
              <div className="text-xl font-bold text-primary-600">{patients.length}</div>
              <div className="text-sm text-primary-700">Total Patients</div>
            </div>
            <div className="text-center p-3 bg-success-50 rounded-lg">
              <div className="text-xl font-bold text-success-600">
                {patients.filter(p => p.status === 'active').length}
              </div>
              <div className="text-sm text-success-700">Active Patients</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-xl font-bold text-yellow-600">
                {patients.reduce((sum, p) => sum + p.upcomingAppointments, 0)}
              </div>
              <div className="text-sm text-yellow-700">Upcoming Appointments</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">
                {patients.filter(p => new Date(p.lastVisit) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
              </div>
              <div className="text-sm text-blue-700">Recent Visits</div>
            </div>
          </div>
        </div>

        {/* Patient List */}
        <div className="space-y-4">
          {filteredPatients.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or add a new patient.</p>
            </div>
          ) : (
            filteredPatients.map((patient) => (
              <div key={patient.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                        <p className="text-sm text-gray-600">Age: {calculateAge(patient.dateOfBirth)} • {patient.bloodType}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        patient.status === 'active' 
                          ? 'bg-success-100 text-success-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {patient.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{patient.email}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                        Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Activity className="h-4 w-4 mr-2 flex-shrink-0" />
                        {patient.totalVisits} total visits
                      </div>
                    </div>

                    {patient.medicalHistory && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Medical History:</span> {patient.medicalHistory}
                        </p>
                      </div>
                    )}

                    {patient.nextAppointment && (
                      <div className="mt-3 p-3 bg-primary-50 rounded-lg">
                        <p className="text-sm text-primary-700">
                          <span className="font-medium">Next Appointment:</span> {new Date(patient.nextAppointment).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-row lg:flex-col gap-2">
                    <button
                      onClick={() => handleViewPatient(patient)}
                      className="flex-1 lg:flex-none bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </button>
                    <button
                      onClick={() => handleEditPatient(patient)}
                      className="flex-1 lg:flex-none bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Patient Detail Modal */}
        {showPatientModal && selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Patient Details</h2>
                  <button
                    onClick={() => setShowPatientModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Patient Info */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Full Name:</span>
                          <span className="ml-2 font-medium">{selectedPatient.name}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Age:</span>
                          <span className="ml-2 font-medium">{calculateAge(selectedPatient.dateOfBirth)} years</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Date of Birth:</span>
                          <span className="ml-2 font-medium">{new Date(selectedPatient.dateOfBirth).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Blood Type:</span>
                          <span className="ml-2 font-medium">{selectedPatient.bloodType}</span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-gray-600">Address:</span>
                          <span className="ml-2 font-medium">{selectedPatient.address}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Phone:</span>
                          <span className="ml-2 font-medium">{selectedPatient.phone}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Email:</span>
                          <span className="ml-2 font-medium">{selectedPatient.email}</span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-gray-600">Emergency Contact:</span>
                          <span className="ml-2 font-medium">{selectedPatient.emergencyContact}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Insurance:</span>
                          <span className="ml-2 font-medium">{selectedPatient.insurance}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Registration Date:</span>
                          <span className="ml-2 font-medium">{new Date(selectedPatient.registrationDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Medical Information
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-gray-600 font-medium">Medical History:</span>
                          <p className="mt-1 text-gray-900">{selectedPatient.medicalHistory}</p>
                        </div>
                        <div>
                          <span className="text-gray-600 font-medium">Allergies:</span>
                          <p className="mt-1 text-gray-900">{selectedPatient.allergies}</p>
                        </div>
                        <div>
                          <span className="text-gray-600 font-medium">Current Medications:</span>
                          <p className="mt-1 text-gray-900">{selectedPatient.currentMedications}</p>
                        </div>
                        <div>
                          <span className="text-gray-600 font-medium">Recent Notes:</span>
                          <p className="mt-1 text-gray-900">{selectedPatient.recentNotes}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                        <Activity className="h-4 w-4 mr-2" />
                        Latest Vitals
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Blood Pressure:</span>
                          <span className="ml-2 font-medium">{selectedPatient.vitals.bloodPressure}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Heart Rate:</span>
                          <span className="ml-2 font-medium">{selectedPatient.vitals.heartRate}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Temperature:</span>
                          <span className="ml-2 font-medium">{selectedPatient.vitals.temperature}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Weight:</span>
                          <span className="ml-2 font-medium">{selectedPatient.vitals.weight}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Height:</span>
                          <span className="ml-2 font-medium">{selectedPatient.vitals.height}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-4">
                    <div className="bg-primary-50 rounded-lg p-4">
                      <h3 className="font-medium text-primary-900 mb-3">Quick Actions</h3>
                      <div className="space-y-2">
                        <button className="w-full text-left p-2 text-sm text-primary-700 hover:bg-primary-100 rounded transition-colors">
                          Schedule Appointment
                        </button>
                        <button className="w-full text-left p-2 text-sm text-primary-700 hover:bg-primary-100 rounded transition-colors">
                          Add Medical Note
                        </button>
                        <button className="w-full text-left p-2 text-sm text-primary-700 hover:bg-primary-100 rounded transition-colors">
                          Update Vitals
                        </button>
                        <button className="w-full text-left p-2 text-sm text-primary-700 hover:bg-primary-100 rounded transition-colors">
                          View Appointment History
                        </button>
                        <button className="w-full text-left p-2 text-sm text-primary-700 hover:bg-primary-100 rounded transition-colors">
                          Send Message
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-3">Visit Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Visits:</span>
                          <span className="font-medium">{selectedPatient.totalVisits}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Visit:</span>
                          <span className="font-medium">{new Date(selectedPatient.lastVisit).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Upcoming:</span>
                          <span className="font-medium">{selectedPatient.upcomingAppointments}</span>
                        </div>
                        {selectedPatient.nextAppointment && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Next Visit:</span>
                            <span className="font-medium">{new Date(selectedPatient.nextAppointment).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {selectedPatient.allergies !== 'None known' && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-medium text-red-800">Allergies</h3>
                            <p className="text-sm text-red-700 mt-1">{selectedPatient.allergies}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowPatientModal(false)}
                    className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleEditPatient(selectedPatient)}
                    className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Patient
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

export default ViewPatientRecordsPage;