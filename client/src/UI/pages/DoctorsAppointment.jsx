import React, { useState, useEffect } from 'react';
import AppointmentModal from '../components/AppointmentModal';
import ConfirmationModal from '../components/ConfirmationModal ';

const DoctorsAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [updatedDataform, setUpdatedDataform] = useState({
    status: '',
    id: ''
  });

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);
  const toggleConfirmationModal = () => setIsConfirmationOpen(!isConfirmationOpen);

  const getAppointments = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const res = await fetch('http://localhost:4040/AppointmentsforDoctor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
      credentials: 'include',
    });

    if (res.status == 400) {
      console.log('Empty data');
    } else if (res.status == 200) {
      const data = await res.json();
      console.log(data)
      setAppointments(data);
    }

  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  
  const handleEditModal = (appointment) => {
    setModalData(appointment);
    toggleModal();
  };

  const handleSaveChanges = async (updatedData) => {
    setUpdatedDataform({
      status: updatedData.BookingStatus,
      id: modalData._id
    });
    toggleConfirmationModal(); // Open confirmation modal
  };

  const handleConfirmAction = async () => {
    console.log('Action confirmed');
    toggleConfirmationModal(); // Close confirmation modal

    const res = await fetch('http://localhost:4040/updateStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDataform),
    });

    if (res.ok) {
      // Optionally: Reload appointments or update state
      getAppointments();
    } else {
      console.error('Failed to update status');
    }
  };

  const handleCancelAction = () => {
    console.log('Action canceled');
    toggleConfirmationModal(); // Close confirmation modal
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div>
      <div className="m-5 h-100 p-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Client Email</th>
                <th scope="col" className="px-6 py-3">Client Phone</th>
                <th scope="col" className="px-6 py-3">Appointment Date</th>
                <th scope="col" className="px-6 py-3">Appointment Time</th>
                <th scope="col" className="px-6 py-3">Booking Status</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
             
              {appointments.map((appointment, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {appointment.UserEmail}
                  </th>
                  <td className="px-6 py-4">{appointment.UserPhone}</td>
                  <td className="px-6 py-4">{formatDate(appointment.date)}</td>
                  <td className="px-6 py-4">{appointment.time}</td>
                  <td className="px-6 py-4">
                    {appointment.BookingStatus === 0 ? 'Pending' :
                      appointment.BookingStatus === 1 ? 'Approved' :
                        appointment.BookingStatus === 2 ? 'Cancelled by User' :
                          appointment.BookingStatus === 3 ? 'Cancelled by Doctor' :
                            appointment.BookingStatus === 4 ? 'Completed' :
                              'Unknown Status'}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleEditModal(appointment)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       

       
        <AppointmentModal
          appointment={modalData}
          isOpen={isOpen}
          onClose={toggleModal}
          onSave={handleSaveChanges}
          currentStatus={setCurrentStatus}
        />

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          onConfirm={handleConfirmAction}
          onClose={handleCancelAction}
        />
      </div>
    </div>
  );
};

export default DoctorsAppointment;
