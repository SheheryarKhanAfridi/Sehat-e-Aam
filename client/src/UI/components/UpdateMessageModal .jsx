import React from 'react';

const UpdateMessageModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const updateMessageHandleSubmit = () => {
    // Function to handle submission
    console.log('Update submitted');
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Update Clinic Details</h2> 
        <p>Clinic Details are successfully updated</p>
        <div className='flex justify-center m-2'>
        <img src="https://i.pinimg.com/originals/35/f3/23/35f323bc5b41dc4269001529e3ff1278.gif" alt="" style={{width:'100px'}} />

        </div>
      <button className='btn mt-6 border rounded px-6 py-1' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};



export default UpdateMessageModal;
