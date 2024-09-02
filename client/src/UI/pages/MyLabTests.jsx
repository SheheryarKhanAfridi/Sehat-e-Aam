
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom'; 

const MyLabTests = () => {
    const [tests, setTests] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState(''); // State for the selected price range
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await axios.get('http://localhost:4040/mytests', {
                    withCredentials: true
                });
                setTests(response.data);
            } catch (error) {
                console.error('Error fetching tests:', error);
            }
        };

        fetchTests();
    }, []);

    const handleDelete = async (testId) => {
        try {
            await axios.delete(`http://localhost:4040/test/${testId}`, {
                withCredentials: true
            });
            setTests(tests.filter(test => test._id !== testId));
        } catch (error) {
            console.error('Error deleting test:', error);
        }
    };

    const handleUpdate = (testId) => {
        navigate(`/UpdateTest/${testId}`);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handlePriceRangeChange = (e) => {
        setSelectedPriceRange(e.target.value);
    };

    const filterByPrice = (test) => {
        const price = test.testPrice;
        if (selectedPriceRange === '1000-5000') {
            return price >= 1000 && price <= 5000;
        } else if (selectedPriceRange === '6000-15000') {
            return price >= 6000 && price <= 15000;
        } else if (selectedPriceRange === '16000-50000') {
            return price >= 16000 && price <= 50000;
        } else if (selectedPriceRange === '51000-250000') {
            return price >= 51000 && price <= 250000;
        } else {
            return true; // If no range is selected, return all tests
        }
    };

    const filteredTests = tests.filter(test =>
        (test.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.testType.toLowerCase().includes(searchQuery.toLowerCase())) &&
        filterByPrice(test)
    );

    return (
        <div>
            {/* <Header /> */}
            <h1 className='text-5xl font-bold text-black text-center mt-7'>My Laboratory Tests</h1>
            
            <style>{`
                .card {
                    width: 350px;
                    height: 200px;
                    transition: all .5s;
                    box-shadow: 15px 15px 30px rgba(25, 25, 25, 0.11), -15px -15px 30px rgba(60, 60, 60, 0.082);
                    text-align: center;
                    overflow: hidden;
                    margin: 10px;
                    display: inline-block;
                }

                .card:hover {
                    height: 300px;
                    background: linear-gradient(360deg, #edededc5 60%, hsla(0, 0%, 13%, 1) 70%);
                }

                .card .header {
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: #212121;
                    margin-bottom: 16px;
                }

                .card .header .img-box {
                    width: 50px;
                }

                .card .header .title {
                    font-size: 1em;
                    letter-spacing: .1em;
                    font-weight: 900;
                    text-transform: uppercase;
                    padding: 4px 0 14px 0;
                    transition: all .5s;
                    color: #edededc5;
                }

                .card:hover .header {
                    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 96%);
                }

                .card:hover .card .header .title {
                    padding: 0;
                }

                .card .content {
                    display: block;
                    text-align: left;
                    color: #212121;
                    margin: 0 18px;
                }

                .card .content p {
                    transition: all .5s;
                    font-size: 1em;
                    margin-bottom: 8px;
                }

                .card .content .btn  {
                    color: white;
                    background-color: rgba(244, 67, 54);
                    border: none;
                    padding: 5px 10px;
                    margin: 5px;
                    cursor: pointer;
                    transition: all .3s;
                    border-radius: 3px;
                }

                .card .content .btn:hover {
                    background-color: darkorange;
                }
            `}</style>

            <form className="flex flex-col md:flex-row gap-3">
                <div className="ml-95 mt-7 flex">
                    <input 
                        type="text" 
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full md:w-80 px-3 h-10 rounded-l border-2 border-orange-500 focus:outline-none "
                    />
                    <button type="submit" className="bg-orange-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1">Search</button>
                </div>
                <div className="ml-90 mt-7 flex">
                    <select 
                        value={selectedPriceRange}
                        onChange={handlePriceRangeChange}
                        className="w-full md:w-80 px-3 h-10 rounded border-2 border-orange-500 focus:outline-none "
                    >
                        <option value="">Select Price Range</option>
                        <option value="1000-5000">1000-6000</option>
                        <option value="6000-15000">6000-15000</option>
                        <option value="16000-50000">16000-50000</option>
                        <option value="51000-250000">51000-250000</option>
                    </select>
                </div>
            </form>

            <div className="flex flex-wrap justify-center">
                {filteredTests.map(test => (
                    <div key={test._id} className="card">
                        <div className="header">
                            <div className="img-box">
                                <svg
                                    version="1.0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlSpace="preserve"
                                    viewBox="0 0 100 100"
                                    width="2.5em"
                                    height="2.5em"
                                    fill="currentColor"
                                    className="mr-1 text-[rgba(244,67,54)]"
                                >
                                    <path d="M90 42.301 76.666 19.209l-13.334 7.699V10H36.667v16.908l-13.335-7.699L10 42.301 23.332 50 10 57.698l13.331 23.093 13.335-7.698V90h26.666V73.093l13.334 7.698L90 57.698 76.666 50 90 42.301zm-9.107 17.84-6.666 11.543-17.561-10.138v21.787H43.332V61.546L25.774 71.684l-6.666-11.543L36.667 50 19.108 39.863l6.666-11.549 17.558 10.14V16.667h13.334v21.787l17.561-10.14 6.666 11.549L63.332 50l17.561 10.141z" />
                                </svg>
                            </div>
                            <span className="title">{test.testName}</span>
                        </div>
                        <div className="content">
                            <p>Type: {test.testType}</p>
                            <p>Price: ${test.testPrice}</p>
                            <button className="btn" onClick={() => handleUpdate(test._id)}>Update</button>
                            <button className="btn" onClick={() => handleDelete(test._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyLabTests;
