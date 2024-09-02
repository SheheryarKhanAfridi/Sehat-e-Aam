
import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
const MedListing = () => {
    const [medName, setMedName] = useState('');
    const [medGrams, setMedGrams] = useState('');
    const [medPrice, setMedPrice] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4040/MedListing', {
                medName,
                medgrams: medGrams,
                medPrice,
            }, { withCredentials: true });

            if (response.status === 201) {
                setSuccess('Medicine added successfully!');
                setError(null);
                navigate('/MyMeds')
            }
        } catch (err) {
            setError('Failed to add medicine. Please try again.');
            setSuccess(null);
        }
    };

    return (
        <div>
            {/* <Header /> */}
            <h1 className="text-5xl font-bold text-black text-center mt-7 mb-7">Add Medicine</h1>
            <section className="relative flex flex-wrap lg:h-[70vh] lg:items-center">
                <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                    <div className="mx-auto max-w-lg text-center">
                        <h1 className="text-2xl font-bold sm:text-3xl">Welcome</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                        {error && <p className="text-red-500">{error}</p>}
                        {success && <p className="text-green-500">{success}</p>}
                        <div>
                            <label className="sr-only">Medicine Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-md shadow-sm"
                                    placeholder="Enter Medicine Name"
                                    value={medName}
                                    onChange={(e) => setMedName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="sr-only">Grams</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-md shadow-sm"
                                    placeholder="Enter Medicine Grams"
                                    value={medGrams}
                                    onChange={(e) => setMedGrams(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="sr-only">Medicine Price</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-md shadow-sm"
                                    placeholder="Enter Medicine Price"
                                    value={medPrice}
                                    onChange={(e) => setMedPrice(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                        >
                            Add Medicine
                        </button>
                    </form>
                </div>

                <div className="relative h-[50vh] w-full lg:w-1/2">
                    <img
                        alt=""
                        src="https://media.istockphoto.com/id/1041637696/vector/pharmacy-building-flat-design.jpg?b=1&s=612x612&w=0&k=20&c=3G8eYylVuc5PdH8FdqHNU169MfakTy9NLNsFZ6pHhac="
                        className="absolute inset-0 h-full  object-cover"
                    />
                </div>
            </section>
        </div>
    );
}

export default MedListing;

