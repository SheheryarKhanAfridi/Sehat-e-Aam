
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const TestBookingForm = () => {
    const query = new URLSearchParams(location.search);
    const id = query.get("id");
    const navigate = useNavigate();
    const [test, setTest] = useState({
        testName: '',
        testType: '',
        testPrice: '',
        owner: '',
        TestID: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await axios.get(`http://localhost:4040/booktests/${id}`, {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Pass owner as LabID
            await axios.post('http://localhost:4040/bookingtests', {
                ...test,
                LabID: test.owner,
                TestID: test._id,
            }, {
                withCredentials: true
            });
            alert('Booking Confirmed');
            navigate('/PatientTests');
        } catch (error) {
            console.error('Error booking test:', error);
            setError('Failed to book the test');
        }
    };

    return (
        <div>
            {/* <Header /> */}
            <h1 className='text-4xl font-bold text-center mt-7 text-black'>Book Test</h1>
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
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => setTest({ ...test, testName: e.target.value })}
                        readOnly
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
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => setTest({ ...test, testType: e.target.value })}
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testPrice">
                        Test Price
                    </label>
                    <input
                        type="number"
                        id="testPrice"
                        name="testPrice"
                        value={test.testPrice}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => setTest({ ...test, testPrice: e.target.value })}
                        readOnly
                    />
                </div>
               
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-[rgba(244,67,54)] inline-block px-6 py-2 rounded text-white font-bold"
                    >
                        Book Test
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TestBookingForm;





