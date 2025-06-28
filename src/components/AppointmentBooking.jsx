import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, CheckCircle, X, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const AppointmentBooking = ({ provider, onClose, onConfirm }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointmentType, setAppointmentType] = useState('Consultation');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);

  // Mock provider availability data
  const providerSchedule = {
    workingDays: [1, 2, 3, 4, 5], // Monday to Friday
    workingHours: { start: 9, end: 17 }, // 9 AM to 5 PM
    slotDuration: 30, // 30 minutes per slot
    bookedSlots: {
      '2024-01-15': ['10:00', '14:30', '15:00'],
      '2024-01-16': ['09:00', '11:30', '16:00'],
      '2024-01-17': ['10:30', '13:00', '15:30']
    },
    unavailableDates: ['2024-01-18'] // Provider unavailable
  };

  const appointmentTypes = [
    'Consultation',
    'Follow-up',
    'Check-up',
    'Emergency',
    'Routine Examination',
    'Specialist Consultation'
  ];

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDateObj = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDateObj));
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }

    return days;
  };

  // Check if a date is available for booking
  const isDateAvailable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Can't book past dates
    if (date < today) return false;
    
    // Check if it's a working day
    if (!providerSchedule.workingDays.includes(date.getDay())) return false;
    
    // Check if provider is unavailable on this date
    const dateString = date.toISOString().split('T')[0];
    if (providerSchedule.unavailableDates.includes(dateString)) return false;
    
    // Check if date is within current month view
    if (date.getMonth() !== currentDate.getMonth()) return false;
    
    return true;
  };

  // Generate available time slots for selected date
  const generateTimeSlots = (date) => {
    if (!date) return [];

    const slots = [];
    const dateString = date.toISOString().split('T')[0];
    const bookedSlots = providerSchedule.bookedSlots[dateString] || [];
    
    const { start, end } = providerSchedule.workingHours;
    const slotDuration = providerSchedule.slotDuration;
    
    for (let hour = start; hour < end; hour++) {
      for (let minute = 0; minute < 60; minute += slotDuration) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = formatTime(hour, minute);
        
        if (!bookedSlots.includes(timeString)) {
          slots.push({
            value: timeString,
            display: displayTime,
            available: true
          });
        }
      }
    }
    
    return slots;
  };

  // Format time for display
  const formatTime = (hour, minute) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  // Update available slots when date changes
  useEffect(() => {
    if (selectedDate) {
      const slots = generateTimeSlots(selectedDate);
      setAvailableSlots(slots);
      setSelectedTime(null);
    }
  }, [selectedDate]);

  const handleDateSelect = (date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
    }
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const appointmentData = {
        providerId: provider.id,
        providerName: provider.name,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        type: appointmentType,
        notes: notes,
        clientId: user?.id,
        clientName: user?.name,
        status: 'confirmed'
      };
      
      onConfirm(appointmentData);
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Book Appointment</h2>
              <p className="text-sm text-gray-600">Select date and time for your appointment</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Provider Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-gray-900">{provider.name}</h3>
                <p className="text-sm text-gray-600">{provider.specialty}</p>
                <p className="text-sm text-primary-600 font-medium">{provider.price} per consultation</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calendar */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Select Date
              </h3>
              
              {/* Calendar Header */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={handlePreviousMonth}
                    className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                    title="Previous month"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <h4 className="text-lg font-medium text-gray-900">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h4>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                    title="Next month"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((date, index) => {
                    const isAvailable = isDateAvailable(date);
                    const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                    const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleDateSelect(date)}
                        disabled={!isAvailable}
                        className={`p-2 text-sm rounded-md transition-colors ${
                          isSelected
                            ? 'bg-primary-600 text-white'
                            : isAvailable
                            ? 'hover:bg-primary-50 text-gray-900'
                            : 'text-gray-300 cursor-not-allowed'
                        } ${!isCurrentMonth ? 'text-gray-400' : ''}`}
                        title={isAvailable ? 'Available' : 'Not available'}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-600">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary-600 rounded mr-2"></div>
                    Selected
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded mr-2"></div>
                    Available
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-200 rounded mr-2"></div>
                    Unavailable
                  </div>
                </div>
              </div>
            </div>

            {/* Time Slots and Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Select Time
              </h3>

              {selectedDate ? (
                <div className="space-y-4">
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
                    <p className="text-sm text-primary-800">
                      Selected Date: <span className="font-medium">
                        {selectedDate.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </p>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-3">Available Times</h4>
                    {availableSlots.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot.value}
                            onClick={() => setSelectedTime(slot.value)}
                            className={`p-2 text-sm rounded-md border transition-colors ${
                              selectedTime === slot.value
                                ? 'bg-primary-600 text-white border-primary-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500 hover:bg-primary-50'
                            }`}
                          >
                            {slot.display}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p>No available time slots for this date</p>
                      </div>
                    )}
                  </div>

                  {/* Appointment Details */}
                  {selectedTime && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Appointment Type
                        </label>
                        <select
                          value={appointmentType}
                          onChange={(e) => setAppointmentType(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        >
                          {appointmentTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Notes (Optional)
                        </label>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={3}
                          placeholder="Any specific concerns or symptoms you'd like to mention..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>Please select a date to view available times</p>
                </div>
              )}
            </div>
          </div>

          {/* Booking Summary and Actions */}
          {selectedDate && selectedTime && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="text-md font-medium text-gray-900 mb-3">Booking Summary</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Provider:</span>
                    <span className="ml-2 font-medium">{provider.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Specialty:</span>
                    <span className="ml-2 font-medium">{provider.specialty}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Date:</span>
                    <span className="ml-2 font-medium">
                      {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Time:</span>
                    <span className="ml-2 font-medium">
                      {availableSlots.find(slot => slot.value === selectedTime)?.display}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Type:</span>
                    <span className="ml-2 font-medium">{appointmentType}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Fee:</span>
                    <span className="ml-2 font-medium text-primary-600">{provider.price}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 bg-white text-gray-700 border border-gray-300 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={isLoading}
                  className="flex-1 bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Booking...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Confirm Booking
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;