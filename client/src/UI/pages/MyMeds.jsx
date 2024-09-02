


import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
const MyMeds = () => {
    const [medicines, setMedicines] = useState([]);
    const navigate = useNavigate();
    // Fetch the medicines when the component mounts
    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await axios.get('http://localhost:4040/mymeds', {
                    withCredentials: true
                });
                setMedicines(response.data);
            } catch (error) {
                console.error('Error fetching medicines:', error);
            }
        };

        fetchMedicines();
    }, []);

    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4040/mymeds/${id}`, {
                withCredentials: true
            });
            // Remove the deleted medicine from state
            setMedicines(medicines.filter(med => med._id !== id));
        } catch (error) {
            console.error('Error deleting medicine:', error);
        }
    };

    const handleUpdate = (medID)=> {
        navigate(`/UpdateMeds/${medID}`)
    }

    return (
        <div>
            {/* <Header /> */}
            <h1 className='text-5xl font-bold text-black text-center mt-7'>My Medicines</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {medicines.length > 0 ? (
                    medicines.map((med) => (
                        <div key={med._id} className="flex justify-center mt-10 m-5">
                            <div className="flex flex-col bg-black rounded-3xl max-w-md w-full p-6">
                                <h2 className="text-lg font-medium tracking-tighter text-white lg:text-3xl mb-4">{med.medName}</h2>
                                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                                    <h3 className="text-xl font-bold text-white">Grams: {med.medgrams}g</h3>
                                    <h3 className="text-xl font-bold text-white">Price: ${med.medPrice}</h3>
                                    <div className="mt-4 flex space-x-4">
                                        <button
                                        onClick={()=> handleUpdate(med._id)}
                                            className="w-full px-4 py-2 text-center text-black bg-white border-2 border-white rounded-full inline-flex justify-center hover:bg-transparent hover:border-white hover:text-white"
                                            href="#"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(med._id)}
                                            className="w-full px-4 py-2 text-center text-black bg-white border-2  rounded-full inline-flex justify-center hover:bg-transparent hover:text-white"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white">No medicines found.</p>
                )}
            </div>
        </div>
    );
};

export default MyMeds;





