
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const UpdateMeds = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [med, setMed] = useState({
        medName: '',
        medgrams: '',
        medPrice: ''
    });

    useEffect(() => {
        const fetchMedDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4040/mymeds/${id}`, {
                    withCredentials: true
                });
                setMed(response.data);
            } catch (error) {
                console.error('Error fetching medicine details:', error);
            }
        };

        fetchMedDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMed({ ...med, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4040/mymed/${id}`, med);
            navigate('/MyMeds'); 
        } catch (error) {
            console.error('Error updating medicine:', error);
        }
    };

    return (
        <>
        {/* <Header/> */}
        <h1 className='text-5xl font-bold text-center mt-5 mb-6 text-black'>Update Medicines</h1>
        <div className="flex items-center justify-center bg-gray-900 p-4">
            <div className="w-full max-w-3xl h-100 rounded-2xl bg-slate-900 p-8">
            <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                xml:space="preserve"
                viewBox="0 0 100 100"
                width="5.5em"
                height="4.5em"
                fill="currentColor"
                className="ml-75 mb-2 text-[rgba(244,67,54)]"
              >
                <path d="M90 42.301 76.666 19.209l-13.334 7.699V10H36.667v16.908l-13.335-7.699L10 42.301 23.332 50 10 57.698l13.331 23.093 13.335-7.698V90h26.666V73.093l13.334 7.698L90 57.698 76.666 50 90 42.301zm-9.107 17.84-6.666 11.543-17.561-10.138v21.787H43.332V61.546L25.774 71.684l-6.666-11.543L36.667 50 19.108 39.863l6.666-11.549 17.558 10.14V16.667h13.334v21.787l17.561-10.14 6.666 11.549L63.332 50l17.561 10.141z" />
              </svg>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="medName"
                        value={med.medName}
                        onChange={handleChange}
                        placeholder="Medicine Name"
                        className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-900"
                    />
                    <input
                        type="number"
                        name="medgrams"
                        value={med.medgrams}
                        onChange={handleChange}
                        placeholder="Grams"
                        className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-900"
                    />
                    <input
                        type="number"
                        name="medPrice"
                        value={med.medPrice}
                        onChange={handleChange}
                        placeholder="Price"
                        className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-900"
                    />
                    <button
                        type="submit"
                        className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 active:scale-95"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
        </>
    );
};

export default UpdateMeds;
