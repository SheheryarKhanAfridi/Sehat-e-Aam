import React, { useState, useEffect } from "react";

const AppointmentModal = ({ appointment, isOpen, onClose, onSave, currentStatus }) => {
  
  const formatDateForInput = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    UserEmail: appointment?.UserEmail || '',
    UserPhone: appointment?.UserPhone || '',
    Date: appointment?.date ? formatDateForInput(appointment.date) : '',
    Time: appointment?.time || '',
    BookingStatus: appointment?.BookingStatus || 0,
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        UserEmail: appointment.UserEmail,
        UserPhone: appointment.UserPhone,
        Date: appointment.date ? formatDateForInput(appointment.date) : '',
        Time: appointment.time,
        BookingStatus: appointment.BookingStatus,
      });
    }
  }, [appointment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // If changing BookingStatus, update the current status using the passed function
    if (name === "BookingStatus") {
      currentStatus(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the updated form data to the onSave function
    onSave(formData);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Edit Appointment</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">User Email</label>
                <input
                  type="email"
                  name="UserEmail"
                  value={formData.UserEmail} 
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">User Phone</label>
                <input
                  type="tel"
                  name="UserPhone"
                  value={formData.UserPhone} 
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  name="Date"
                  value={formData.Date} 
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Time</label>
                <input
                  type="time"
                  name="Time"
                  value={formData.Time} 
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Booking Status</label>
                <select
                  name="BookingStatus"
                  value={formData.BookingStatus}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {formData.BookingStatus == 0 ? (
                    <>
                      <option value={0}>Pending</option>
                      <option value={1}>Approved</option>
                      <option value={3}>Cancelled by Doctor</option>
                    </>
                  ) : formData.BookingStatus == 1 ? (
                    <>
                      <option value={1}>Approved</option>
                      <option value={4}>Completed</option>
                    </>
                  ) : formData.BookingStatus == 3 ? (
                    <option value={3}>Cancelled by Doctor</option>
                  ) : formData.BookingStatus == 4 ? (
                    <option value={4}>Completed</option>
                  ) : (
                    ''
                  )}
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentModal;
