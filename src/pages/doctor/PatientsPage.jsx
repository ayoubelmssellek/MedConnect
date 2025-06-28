import React, { useState } from 'react';
import { Users, Search, Filter, Plus, Eye, Edit, Calendar, Phone, Mail, AlertCircle, Activity, FileText, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const PatientsPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Mock patients data
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
      riskLevel: 'medium',
      vitals: {
        bloodPressure: '130/85',
        heartRate: '72 bpm',
        temperature: '98.6°F',
        weight: '165 lbs',
        height: '5\'6"',
        bmi: '26.6'
      },
      labResults: [
        { test: 'HbA1c', value: '7.2%', date: '2024-01-10', status: 'elevated' },
        { test: 'Cholesterol', value: '180 mg/dL', date: '2024-01-10', status: 'normal' }
      ]
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
      riskLevel: 'low',
      vitals: {
        bloodPressure: '120/80',
        heartRate: '68 bpm',
        temperature: '98.4°F',
        weight: '180 lbs',
        height: '5\'10"',
        bmi: '25.8'
      },
      labResults: [
        { test: 'CBC', value: 'Normal', date: '2024-01-05', status: 'normal' },
        { test: 'Vitamin D', value: '32 ng/mL', date: '2024-01-05', status: 'normal' }
      ]
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
      riskLevel: 'low',
      vitals: {
        bloodPressure: '115/75',
        heartRate: '65 bmp',
        temperature: '98.2°F',
        weight: '140 lbs',
        height: '5\'4"',
        bmi: '24.0'
      },
      labResults: [
        { test: 'Lipid Panel', value: 'Normal', date: '2023-12-20', status: 'normal' },
        { test: 'TSH', value: '2.1 mIU/L', date: '2023-12-20', status: 'normal' }
      ]
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
      riskLevel: 'high',
      vitals: {
        bloodPressure: '140/90',
        heartRate: '75 bpm',
        temperature: '98.8°F',
        weight: '190 lbs',
        height: '5\'8"',
        bmi: '28.9'
      },
      labResults: [
        { test: 'LDL Cholesterol', value: '95 mg/dL', date: '2024-01-08', status: 'improved' },
        { test: 'Troponin', value: '<0.01 ng/mL', date: '2024-01-08', status: 'normal' }
      ]
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Patients' },
    { value: 'active', label: 'Active Patients' },
    { value: 'inactive', label: 'Inactive Patients' },
    { value: 'high-risk', label: 'High Risk' },
    { value: 'recent', label: 'Recent Visits' },
    { value: 'upcoming', label: 'Upcoming Appointments' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'lastVisit', label: 'Last Visit' },
    { value: 'nextAppointment', label: 'Next Appointment' },
    { value: 'riskLevel', label: 'Risk Level' },
    { value: 'totalVisits', label: 'Total Visits' }
  ];

  const filteredAndSortedPatients = patients
    .filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           patient.phone.includes(searchQuery);

      const matchesFilter = selectedFilter === 'all' ||
                           (selectedFilter === 'active' && patient.status === 'active') ||
                           (selectedFilter === 'inactive' && patient.status === 'inactive') ||
                           (selectedFilter === 'high-risk' && patient.riskLevel === 'high') ||
                           (selectedFilter === 'recent' && new Date(patient.lastVisit) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
                           (selectedFilter === 'upcoming' && patient.upcomingAppointments > 0);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'lastVisit':
          return new Date(b.lastVisit) - new Date(a.lastVisit);
        case 'nextAppointment':
          if (!a.nextAppointment && !b.nextAppointment) return 0;
          if (!a.nextAppointment) return 1;
          if (!b.nextAppointment) return -1;
          return new Date(a.nextAppointment) - new Date(b.nextAppointment);
        case 'riskLevel':
          const riskOrder = { high: 3, medium: 2, low: 1 };
          return riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
        case 'totalVisits':
          return b.totalVisits - a.totalVisits;
        default:
          return 0;
      }
    });

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

  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLabResultColor = (status) => {
    switch (status) {
      case 'elevated':
      case 'high':
        return 'text-red-600';
      case 'low':
        return 'text-orange-600';
      case 'improved':
        return 'text-green-600';
      case 'normal':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Users className="h-8 w-8 mr-3 text-primary-600" />
            Patients
          </h1>
          <p className="text-gray-600">Comprehensive patient management and records</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
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
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>Sort by {option.label}</option>
                ))}
              </select>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Patient
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-3 bg-primary-50 rounded-lg">
              <div className="text-xl font-bold text-primary-600">{patients.length}</div>
              <div className="text-sm text-primary-700">Total Patients</div>
            </div>
            <div className="text-center p-3 bg-success-50 rounded-lg">
              <div className="text-xl font-bold text-success-600">
                {patients.filter(p => p.status === 'active').length}
              </div>
              <div className="text-sm text-success-700">Active</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-xl font-bold text-red-600">
                {patients.filter(p => p.riskLevel === 'high').length}
              </div>
              <div className="text-sm text-red-700">High Risk</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-xl font-bold text-yellow-600">
                {patients.reduce((sum, p) => sum + p.upcomingAppointments, 0)}
              </div>
              <div className="text-sm text-yellow-700">Upcoming</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">
                {patients.filter(p => new Date(p.lastVisit) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
              </div>
              <div className="text-sm text-blue-700">Recent Visits</div>
            </div>
          </div>
        </div>

        {/* Patient Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredAndSortedPatients.length === 0 ? (
            <div className="xl:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or add a new patient.</p>
            </div>
          ) : (
            filteredAndSortedPatients.map((patient) => (
              <div key={patient.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-600">
                        Age: {calculateAge(patient.dateOfBirth)} • {patient.bloodType}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'active' 
                        ? 'bg-success-100 text-success-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {patient.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(patient.riskLevel)}`}>
                      {patient.riskLevel} risk
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
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
                    Last: {new Date(patient.lastVisit).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Activity className="h-4 w-4 mr-2 flex-shrink-0" />
                    {patient.totalVisits} visits
                  </div>
                </div>

                {/* Vitals Summary */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Latest Vitals
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-gray-600">BP:</span>
                      <span className="ml-1 font-medium">{patient.vitals.bloodPressure}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">HR:</span>
                      <span className="ml-1 font-medium">{patient.vitals.heartRate}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">BMI:</span>
                      <span className="ml-1 font-medium">{patient.vitals.bmi}</span>
                    </div>
                  </div>
                </div>

                {/* Lab Results */}
                {patient.labResults.length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      Recent Lab Results
                    </h4>
                    <div className="space-y-1">
                      {patient.labResults.slice(0, 2).map((result, index) => (
                        <div key={index} className="flex justify-between text-xs">
                          <span className="text-gray-600">{result.test}:</span>
                          <span className={`font-medium ${getLabResultColor(result.status)}`}>
                            {result.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Medical Alerts */}
                {patient.allergies && patient.allergies !== 'None known' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-red-800">Allergies</h4>
                        <p className="text-xs text-red-700">{patient.allergies}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Current Medications */}
                {patient.currentMedications && patient.currentMedications !== 'None' && (
                  <div className="bg-yellow-50 rounded-lg p-3 mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Current Medications</h4>
                    <p className="text-xs text-gray-700">{patient.currentMedications}</p>
                  </div>
                )}

                {/* Recent Notes */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Recent Notes</h4>
                  <p className="text-xs text-gray-700">{patient.recentNotes}</p>
                </div>

                {/* Next Appointment */}
                {patient.nextAppointment && (
                  <div className="bg-primary-50 rounded-lg p-3 mb-4">
                    <h4 className="text-sm font-medium text-primary-900 mb-1">Next Appointment</h4>
                    <p className="text-xs text-primary-700">
                      {new Date(patient.nextAppointment).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-primary-600 text-white px-3 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center text-sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </button>
                  <button className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center text-sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                  <button className="bg-success-600 text-white px-3 py-2 rounded-md hover:bg-success-700 transition-colors flex items-center justify-center text-sm">
                    <Calendar className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;