
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const Patienttest = () => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await axios.get('http://localhost:4040/mypatienttests', {
                    withCredentials: true
                });
                setTests(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch tests');
                setLoading(false);
            }
        };

        fetchTests();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    return (
        <div>
            {/* <Header /> */}
            <h1 className="text-4xl font-bold text-center mt-7 text-black">Your Tests</h1>
            <div className="w-full max-w-lg mx-auto mt-5 gap-4">
                {tests.length > 0 ? (
                    tests.map((test) => (
                        <div
                            key={test._id}
                            className="m-2 group px-10 py-5 bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#000] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0"
                        >
                           <svg
                                version="1.0"
                                xmlns="http://www.w3.org/2000/svg"
                                xml:space="preserve"
                                viewBox="0 0 100 100"
                                width="2.5em"
                                height="2.5em"
                                fill="currentColor"
                                className="mr-1 text-[rgba(244,67,54)] group-hover:text-[#fff]"
                            >
                                <path d="M90 42.301 76.666 19.209l-13.334 7.699V10H36.667v16.908l-13.335-7.699L10 42.301 23.332 50 10 57.698l13.331 23.093 13.335-7.698V90h26.666V73.093l13.334 7.698L90 57.698 76.666 50 90 42.301zm-9.107 17.84-6.666 11.543-17.561-10.138v21.787H43.332V61.546L25.774 71.684l-6.666-11.543L36.667 50 19.108 39.863l6.666-11.549 17.558 10.14V16.667h13.334v21.787l17.561-10.14 6.666 11.549L63.332 50l17.561 10.141z" />
                            </svg>

                            <p className="font-semibold text-gray-200 tracking-wider group-hover:text-[#fff] text-xl">
                                {test.testName}
                            </p>
                            <p className="font-semibold text-gray-600 text-xl group-hover:text-[#fff]">
                                {test.testType}
                            </p>
                            <div className="flex flex-row justify-between items-center w-full">
                                <p className="text-[rgba(244,67,54)] font-semibold group-hover:text-[#fff] text-xl">
                                    {test.testPrice}
                                </p>
                               
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No tests found.</p>
                )}
            </div>
        </div>
    );
};

export default Patienttest;


