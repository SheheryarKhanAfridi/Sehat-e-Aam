
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom'; 
const MedsbookingForm = () => {
    const { id } = useParams(); // Get the medicine ID from the URL
    const [medicine, setMedicine] = useState(null); // Initialize state for storing medicine details
    const [isBooking, setIsBooking] = useState(false); // State to manage booking status
    const navigate = useNavigate();
    useEffect(() => {
        const fetchMedicineDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4040/PharmacyMeds/${id}`);
                setMedicine(response.data); // Store the fetched medicine details in state
            } catch (error) {
                console.error('Error fetching medicine details:', error);
            }
        };

        fetchMedicineDetails();
    }, [id]);

    const handleBooking = async () => {
        try {
            setIsBooking(true); // Set booking status to true to indicate loading
            const bookingData = {
                medName: medicine.medName,
                medgrams: medicine.medgrams,
                medPrice: medicine.medPrice,
                Pharmacyowner: medicine.Pharmacyowner,
                MedID: medicine._id,
            };

            const response = await axios.post('http://localhost:4040/bookingmeds', bookingData, { withCredentials: true });

            if (response.status === 201) {
                alert('Medicine booked successfully!');
                navigate('/')
            }
        } catch (error) {
            console.error('Error booking medicine:', error);
            alert('Failed to book the medicine.');
        } finally {
            setIsBooking(false); 
        }
    };

    if (!medicine) {
        return <p>Loading...</p>; 
    }

    return (
        <div>
            {/* <Header /> */}
            <h1 className='text-3xl font-bold text-center mt-7'>Medicine Details</h1>
            <div className="flex justify-center mt-10">
                <form className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Medicine Name:</label>
                        <input
                            type="text"
                            value={medicine.medName}
                            readOnly
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(244,67,54)]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Grams:</label>
                        <input
                            type="text"
                            value={medicine.medgrams}
                            readOnly
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(244,67,54)]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Price:</label>
                        <input
                            type="text"
                            value={medicine.medPrice}
                            readOnly
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(244,67,54)]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Pharmacy Owner ID:</label>
                        <input
                            type="text"
                            value={medicine.Pharmacyowner}
                            readOnly
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(244,67,54)]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Medicine ID:</label>
                        <input
                            type="text"
                            value={medicine._id}
                            readOnly
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(244,67,54)]"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleBooking}
                        disabled={isBooking} 
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[rgba(244,67,54)]"
                    >
                        {isBooking ? 'Booking...' : 'Order'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default MedsbookingForm;
