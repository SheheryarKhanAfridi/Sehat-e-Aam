import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom'; 
const PharmMeds = () => {
    const { medId } = useParams(); // Get the medId from the URL
    const [medicines, setMedicines] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await axios.get(`http://localhost:4040/api/meds/${medId}`, {
                    withCredentials: true
                });
                setMedicines(response.data);
            } catch (error) {
                console.error('Error fetching medicines:', error);
            }
        };

        fetchMedicines();
    }, [medId]);


    const handleMeds=(medicineID) =>{
        navigate(`/MedsBookingForm/${medicineID}`)
    }
    return (
        <>
        {/* <Header/> */}
        <h1 className='text-5xl font-bold text-center mt-7 text-black '>Medicines</h1>
        <div className="flex flex-wrap justify-center  bg-gray-100 p-4">
            {medicines.length > 0 ? (
                medicines.map((med) => (
                    <div key={med._id} className="w-64 m-4 rounded-lg border-2 border-[rgba(244,67,54)] bg-white p-4 text-center shadow-lg dark:bg-gray-800">
                        <h2 className="mt-4 text-xl font-bold text-[rgba(244,67,54)]">{med.medName}</h2>
                        <p className="text-black font-bold">Grams: {med.medgrams}</p>
                        <p className="text-black font-bold">Price: ${med.medPrice}</p>
                        <button className ='font-bold text-[rgba(244,67,54)]' onClick={() => handleMeds(med._id)}>Order</button>
                    </div>
                ))
            ) : (
                <p className="text-gray-600 dark:text-gray-300">No medicines found for this pharmacy.</p>
            )}
        </div>
        </>
    );
}

export default PharmMeds;
