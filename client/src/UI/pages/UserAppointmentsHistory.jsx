import React, { useState, useEffect } from 'react';

const UserAppointmentsHistory = () => {
    const [Appointments, setAppointments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [review, setReview] = useState({ stars: 0, description: '' ,appointmenDetails:{} });

    // Function to fetch appointment data
    const getdata = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const res = await fetch('http://localhost:4040/ApointmentHistoryOfUser', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
            credentials: 'include'
        });
        if (res.status === 400) {
            alert('User ID is required');
        } else if (res.status === 401) {
            console.log('Zero appointments');
        } else if (res.status === 200) {
            const data = await res.json();
            setAppointments(data);
            console.log('Appointments found', data);
        }
    };

    // Function to format date
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    // Function to handle cancellation of appointment
    const handleCancellationofAppointment = async (data) => {
        const appointmentDetails = data;
        const id = appointmentDetails._id;
        const res = await fetch('http://localhost:4040/CancellationDoctorAppointment', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
            credentials: 'include'
        });
        if (res.status === 400) {
            console.log('Empty data');
        } else if (res.status === 400) {
            alert('Appointment not found in database');
        } else if (res.status === 200) {
            console.log('Appointment updated');
            getdata();
        }
    };

    // Toggle modal visibility
    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const [rating, setRating] = useState(0);  

    // Handle review submission
    const handleReviewSubmit = async(data) => {
        setReview({
            ...review,
            appointmenDetails:data
        })
        console.log('Review Submitted:', review); 
        toggleModal();
        const res=await fetch('http://localhost:4040/sendReviewForClinic',{
            method:'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(review)
        })
    };

    // Function to handle star click
    const handleRatingClick = (value) => {
        setReview({
            ...review,
            stars:value
        })
        setRating(value);  

    };

    // Handle input change for review
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    useEffect(() => {
        getdata();
    }, []);

    return (
        <div className='parent'>
            <div className='cardparenthistory'>
                {Appointments && Appointments.map((key, index) => (
                    <div className="appointmentCardHistory" key={index}>
                        <div className="historycard1">
                            <p className='mb-1'>Clinic Name: {key.ClinicName} </p>
                            <p className="small">Doctor Name: {key.DoctorName}</p>
                            <p className="small">Doctor Phone: {key.DoctorPhone}</p>
                            <p className="small">Doctor Location: {key.DoctorEmail}</p>
                            <hr className='m-2' />
                            <p className="small">User Email: {key.UserEmail}</p>
                            <p className="small">User Phone: {key.UserPhone}</p>
                            <p className="large mt-5 text-center">
                                Appointment Status: <b>
                                    {key.BookingStatus === 0 ? 'Pending' :
                                        key.BookingStatus === 1 ? 'Approved' :
                                            key.BookingStatus === 2 ? 'Cancel by User' :
                                                key.BookingStatus === 3 ? 'Cancel by Doctor' :
                                                    key.BookingStatus === 4 ? 'Completed' :
                                                        'Unknown Status'}
                                </b>
                            </p>
                            <p className='text-center small dtaecolorsblack'>Date: {formatDate(key.date)} </p>
                            <p className='text-center small dtaecolorsblack'>Time: {key.time} </p>
                            <div className="go-corner">
                                <div className="go-arrow">
                                    →
                                </div>
                            </div>
                            <p className="large mt-5 text-center">
                                {key.BookingStatus === 0 ?
                                    <button className="CancelAppointmentButton" onClick={() => {
                                        handleCancellationofAppointment(key);
                                    }}>
                                        Cancel Appointment
                                    </button> :
                                    key.BookingStatus === 1 ? <div>
                                        After <b>approval</b> you cannot cancel your appointment
                                    </div> :
                                        key.BookingStatus === 2 ? <div>
                                            Cancel by <b>User</b>
                                        </div> :
                                            key.BookingStatus === 3 ? <div>
                                                Cancel by <b>Doctor</b>
                                            </div> :
                                                key.BookingStatus === 4 ? <div>
                                                    <p>Completed</p>
                                                    <button
                                                        className='bg-white text-black px-6 py-2 m-2 rounded border'
                                                        onClick={() => { 
                                                            toggleModal();
                                                            handleReviewSubmit(key)
                                                        }}
                                                    >
                                                        Give Review
                                                    </button>
                                                </div> :
                                                    'Unknown Status'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-bold mb-4">Give Your Review</h2>
                        <label className="block mb-2">
                            <div className="flex space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        onClick={() => handleRatingClick(star)}
                                        className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'
                                            }`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <p>Selected Rating: {rating}</p>
                        </label>
                        <label className="block mb-4">
                            Description:
                            <textarea
                                name="description"
                                value={review.description}
                                onChange={handleInputChange}
                                className="mt-1 block w-full p-2 border rounded"
                            />
                        </label>
                        <div className="flex justify-end">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                onClick={handleReviewSubmit}
                            >
                                Submit
                            </button>
                            <button
                                className="bg-gray-500 text-black px-4 py-2 rounded"
                                onClick={toggleModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserAppointmentsHistory;
