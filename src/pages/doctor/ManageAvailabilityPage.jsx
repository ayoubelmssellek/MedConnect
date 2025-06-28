import React, { useState } from 'react';
import { Calendar, Clock, Plus, Edit, Trash2, Save, X, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const ManageAvailabilityPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [editingSlot, setEditingSlot] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [availability, setAvailability] = useState({
    monday: [
      { id: 1, startTime: '09:00', endTime: '12:00', type: 'available' },
      { id: 2, startTime: '14:00', endTime: '17:00', type: 'available' }
    ],
    tuesday: [
      { id: 3, startTime: '09:00', endTime: '12:00', type: 'available' },
      { id: 4, startTime: '14:00', endTime: '17:00', type: 'available' }
    ],
    wednesday: [
      { id: 5, startTime: '09:00', endTime: '12:00', type: 'available' },
      { id: 6, startTime: '12:00', endTime: '13:00', type: 'break' },
      { id: 7, startTime: '14:00', endTime: '17:00', type: 'available' }
    ],
    thursday: [
      { id: 8, startTime: '09:00', endTime: '12:00', type: 'available' },
      { id: 9, startTime: '14:00', endTime: '17:00', type: 'available' }
    ],
    friday: [
      { id: 10, startTime: '09:00', endTime: '12:00', type: 'available' },
      { id: 11, startTime: '14:00', endTime: '16:00', type: 'available' }
    ],
    saturday: [
      { id: 12, startTime: '10:00', endTime: '14:00', type: 'available' }
    ],
    sunday: []
  });

  const [newSlot, setNewSlot] = useState({
    day: 'monday',
    startTime: '09:00',
    endTime: '10:00',
    type: 'available'
  });

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  const slotTypes = [
    { value: 'available', label: 'Available', color: 'bg-success-100 text-success-800 border-success-200' },
    { value: 'break', label: 'Break', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { value: 'blocked', label: 'Blocked', color: 'bg-red-100 text-red-800 border-red-200' },
    { value: 'meeting', label: 'Meeting', color: 'bg-blue-100 text-blue-800 border-blue-200' }
  ];

  const timeSlots = [];
  for (let hour = 6; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeSlots.push(time);
    }
  }

  const getWeekDates = (date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      week.push(currentDate);
    }
    return week;
  };

  const weekDates = getWeekDates(selectedWeek);

  const handleAddSlot = () => {
    const id = Math.max(...Object.values(availability).flat().map(slot => slot.id), 0) + 1;
    const slot = { ...newSlot, id };
    
    setAvailability(prev => ({
      ...prev,
      [newSlot.day]: [...prev[newSlot.day], slot].sort((a, b) => a.startTime.localeCompare(b.startTime))
    }));
    
    setNewSlot({
      day: 'monday',
      startTime: '09:00',
      endTime: '10:00',
      type: 'available'
    });
    setShowAddForm(false);
  };

  const handleEditSlot = (day, slot) => {
    setEditingSlot({ day, ...slot });
  };

  const handleSaveEdit = () => {
    const { day, id, ...slotData } = editingSlot;
    setAvailability(prev => ({
      ...prev,
      [day]: prev[day].map(slot => 
        slot.id === id ? { id, ...slotData } : slot
      ).sort((a, b) => a.startTime.localeCompare(b.startTime))
    }));
    setEditingSlot(null);
  };

  const handleDeleteSlot = (day, slotId) => {
    if (confirm('Are you sure you want to delete this time slot?')) {
      setAvailability(prev => ({
        ...prev,
        [day]: prev[day].filter(slot => slot.id !== slotId)
      }));
    }
  };

  const handleCopyWeek = () => {
    if (confirm('Copy this week\'s schedule to next week?')) {
      alert('Schedule copied to next week successfully!');
    }
  };

  const handleClearDay = (day) => {
    if (confirm(`Clear all time slots for ${day}?`)) {
      setAvailability(prev => ({
        ...prev,
        [day]: []
      }));
    }
  };

  const getSlotTypeConfig = (type) => {
    return slotTypes.find(t => t.value === type) || slotTypes[0];
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setSelectedWeek(newDate);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Calendar className="h-8 w-8 mr-3 text-primary-600" />
            Manage Availability
          </h1>
          <p className="text-gray-600">Set your working hours and availability schedule</p>
        </div>

        {/* Week Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateWeek(-1)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                title="Previous week"
              >
                <Calendar className="h-5 w-5" />
              </button>
              <h2 className="text-lg font-semibold text-gray-900">
                Week of {weekDates[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {weekDates[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </h2>
              <button
                onClick={() => navigateWeek(1)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                title="Next week"
              >
                <Calendar className="h-5 w-5" />
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Time Slot
              </button>
              <button
                onClick={handleCopyWeek}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Copy Week
              </button>
            </div>
          </div>

          {/* Week Overview */}
          <div className="grid grid-cols-7 gap-2">
            {daysOfWeek.map((day, index) => (
              <div key={day.key} className="text-center">
                <div className="font-medium text-gray-900 mb-1">{day.label}</div>
                <div className="text-sm text-gray-600">
                  {weekDates[index].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="mt-2 text-xs">
                  {availability[day.key].length > 0 ? (
                    <span className="text-success-600 font-medium">
                      {availability[day.key].filter(slot => slot.type === 'available').length} slots
                    </span>
                  ) : (
                    <span className="text-gray-400">No availability</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {daysOfWeek.map((day, index) => (
            <div key={day.key} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{day.label}</h3>
                  <p className="text-sm text-gray-600">
                    {weekDates[index].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <button
                  onClick={() => handleClearDay(day.key)}
                  className="text-red-600 hover:text-red-700 text-sm"
                  title="Clear all slots"
                >
                  Clear Day
                </button>
              </div>

              <div className="space-y-3">
                {availability[day.key].length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p>No availability set</p>
                  </div>
                ) : (
                  availability[day.key].map((slot) => {
                    const typeConfig = getSlotTypeConfig(slot.type);
                    const isEditing = editingSlot && editingSlot.id === slot.id;

                    return (
                      <div key={slot.id} className={`p-3 border rounded-lg ${typeConfig.color}`}>
                        {isEditing ? (
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Start Time</label>
                                <select
                                  value={editingSlot.startTime}
                                  onChange={(e) => setEditingSlot(prev => ({ ...prev, startTime: e.target.value }))}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                >
                                  {timeSlots.map(time => (
                                    <option key={time} value={time}>{time}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">End Time</label>
                                <select
                                  value={editingSlot.endTime}
                                  onChange={(e) => setEditingSlot(prev => ({ ...prev, endTime: e.target.value }))}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                >
                                  {timeSlots.map(time => (
                                    <option key={time} value={time}>{time}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                              <select
                                value={editingSlot.type}
                                onChange={(e) => setEditingSlot(prev => ({ ...prev, type: e.target.value }))}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              >
                                {slotTypes.map(type => (
                                  <option key={type.value} value={type.value}>{type.label}</option>
                                ))}
                              </select>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={handleSaveEdit}
                                className="bg-success-600 text-white px-3 py-1 rounded text-sm hover:bg-success-700 transition-colors flex items-center"
                              >
                                <Save className="h-3 w-3 mr-1" />
                                Save
                              </button>
                              <button
                                onClick={() => setEditingSlot(null)}
                                className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors flex items-center"
                              >
                                <X className="h-3 w-3 mr-1" />
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-sm">
                                {slot.startTime} - {slot.endTime}
                              </div>
                              <div className="text-xs opacity-75 capitalize">{slot.type}</div>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleEditSlot(day.key, slot)}
                                className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
                                title="Edit slot"
                              >
                                <Edit className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteSlot(day.key, slot.id)}
                                className="p-1 text-red-600 hover:text-red-700 transition-colors"
                                title="Delete slot"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Time Slot Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Add Time Slot</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
                  <select
                    value={newSlot.day}
                    onChange={(e) => setNewSlot(prev => ({ ...prev, day: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    {daysOfWeek.map(day => (
                      <option key={day.key} value={day.key}>{day.label}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                    <select
                      value={newSlot.startTime}
                      onChange={(e) => setNewSlot(prev => ({ ...prev, startTime: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                    <select
                      value={newSlot.endTime}
                      onChange={(e) => setNewSlot(prev => ({ ...prev, endTime: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={newSlot.type}
                    onChange={(e) => setNewSlot(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    {slotTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddSlot}
                  className="flex-1 bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Slot
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-success-50 rounded-lg">
              <div className="text-2xl font-bold text-success-600">
                {Object.values(availability).flat().filter(slot => slot.type === 'available').length}
              </div>
              <div className="text-sm text-success-700">Available Slots</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {Object.values(availability).flat().filter(slot => slot.type === 'break').length}
              </div>
              <div className="text-sm text-yellow-700">Break Slots</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {Object.values(availability).flat().filter(slot => slot.type === 'blocked').length}
              </div>
              <div className="text-sm text-red-700">Blocked Slots</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Object.values(availability).flat().filter(slot => slot.type === 'meeting').length}
              </div>
              <div className="text-sm text-blue-700">Meeting Slots</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAvailabilityPage;