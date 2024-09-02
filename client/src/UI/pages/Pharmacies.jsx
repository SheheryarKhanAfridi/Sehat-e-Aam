
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom'; 
const Pharmacies = () => {
    const [pharmacies, setPharmacies] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchPharmacies = async () => {
            try {
                const response = await axios.get('http://localhost:4040/Pharms');
                setPharmacies(response.data);
            } catch (error) {
                console.error('Error fetching pharmacies:', error);
            }
        };

        fetchPharmacies();
    }, []);


    const handleMeds=(medId)=>{
        navigate(`/PharmMeds/${medId}`)
    }
    return (
        <>
        {/* <Header/> */}
        <h1 className='text-5xl font-bold text-center mt-7 text-black '>Pharmacies  </h1>
        <div className="flex flex-wrap justify-center  bg-gray-100 p-4">
            {pharmacies.map((pharmacy) => (
                <div key={pharmacy._id} className="w-64 m-4 rounded-lg border-2 border-[rgba(244,67,54)] bg-white p-4 text-center shadow-lg dark:bg-gray-800">
                    <figure className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ">
                    <svg
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                        xml:space="preserve"
                        viewBox="0 0 100 100"
                        width="3.5em"
                        height="4.5em"
                        fill="currentColor"
                        className="mr-1 text-[rgba(244,67,54)]"
                    >
                        <path d="M90 42.301 76.666 19.209l-13.334 7.699V10H36.667v16.908l-13.335-7.699L10 42.301 23.332 50 10 57.698l13.331 23.093 13.335-7.698V90h26.666V73.093l13.334 7.698L90 57.698 76.666 50 90 42.301zm-9.107 17.84-6.666 11.543-17.561-10.138v21.787H43.332V61.546L25.774 71.684l-6.666-11.543L36.667 50 19.108 39.863l6.666-11.549 17.558 10.14V16.667h13.334v21.787l17.561-10.14 6.666 11.549L63.332 50l17.561 10.141z" />
                    </svg>
                    </figure>
                    <h2 className="mt-4 text-xl font-bold text-[rgba(244,67,54)]">{pharmacy. pharmacyName}</h2>
                    <p className="text-black">{pharmacy.city}</p>
                    <p className=" text-black">{pharmacy.address}</p>
                    <p className="text-black">{pharmacy.contactNumber}</p>
                   <button onClick={() => handleMeds(pharmacy._id)}>Medicines</button>
                </div>
            ))}
        </div>
        </>
    );
}

export default Pharmacies;

