
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const LabBookingReservation = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:4040/lab/bookings', {
                    withCredentials: true
                });
                setBookings(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching lab bookings:', error);
                setError('Failed to fetch lab bookings');
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {/* <Header /> */}
            <h1 className="text-4xl font-bold text-center mt-7 text-black">Lab Bookings</h1>
            <div className="flex flex-col md:flex-row gap-7 ml-20 mt-5">
                {bookings.length === 0 ? (
                    <p>No bookings found.</p>
                ) : (
                    bookings.map((booking) => (
                        <div 
                            key={booking._id} 
                            className="w-[250px] flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl"
                        >
                            <div className="">
                                <div className="text-center p-3 flex-auto justify-center">
                                <svg
                                    version="1.0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xml:space="preserve"
                                    viewBox="0 0 100 100"
                                    width="2.5em"
                                    height="2.5em"
                                    fill="currentColor"
                                    className="ml-18 text-[rgba(244,67,54)]"
                                >
                                    <path d="M90 42.301 76.666 19.209l-13.334 7.699V10H36.667v16.908l-13.335-7.699L10 42.301 23.332 50 10 57.698l13.331 23.093 13.335-7.698V90h26.666V73.093l13.334 7.698L90 57.698 76.666 50 90 42.301zm-9.107 17.84-6.666 11.543-17.561-10.138v21.787H43.332V61.546L25.774 71.684l-6.666-11.543L36.667 50 19.108 39.863l6.666-11.549 17.558 10.14V16.667h13.334v21.787l17.561-10.14 6.666 11.549L63.332 50l17.561 10.141z" />
                                </svg>
                                    <h2 className="text-xl font-bold py-4 text-black">Test Booking</h2>
                                    <p className="text-sm font-bold text-black px-2">
                                        <strong>Test Name:</strong> {booking.testName}
                                    </p>
                                    <p className="text-sm font-bold text-black px-2">
                                        <strong>Test Type:</strong> {booking.testType}
                                    </p>
                                    <p className="text-sm font-bold text-black px-2">
                                        <strong>Test Price:</strong> {booking.testPrice}
                                    </p>
                                   
                                </div>
                                <div className="p-2 mt-2 text-center space-x-1 md:block">
                                   
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default LabBookingReservation;

