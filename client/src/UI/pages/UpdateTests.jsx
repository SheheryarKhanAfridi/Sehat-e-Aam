
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const UpdateTests = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [test, setTest] = useState({
        testName: '',
        testType: '',
        testPrice: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await axios.get(`http://localhost:4040/tests/${id}`, {
                    withCredentials: true
                });
                setTest(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching test:', error);
                setError('Failed to fetch test details');
                setLoading(false);
            }
        };

        fetchTest();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTest(prevTest => ({
            ...prevTest,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4040/tests/${id}`, test);
            navigate('/MyLabTests'); 
        } catch (error) {
            console.error('Error updating test:', error);
            setError('Failed to update test details');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* <Header /> */}
            <div className="container mx-auto p-4">
                <h1 className='text-3xl font-bold text-center mt-7'>Update Test</h1>
                {error && <div className="text-red-500 text-center">{error}</div>}
                <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-5">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testName">
                            Test Name
                        </label>
                        <input
                            type="text"
                            id="testName"
                            name="testName"
                            value={test.testName}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testType">
                            Test Type
                        </label>
                        <input
                            type="text"
                            id="testType"
                            name="testType"
                            value={test.testType}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testPrice">
                            Test Price
                        </label>
                        <input
                            type="number"
                            id="testPrice"
                            name="testPrice"
                            value={test.testPrice}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-[rgba(244,67,54)] inline-block px-6 py-2 rounded text-white font-bold"
                        >
                            Update Test
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTests;
