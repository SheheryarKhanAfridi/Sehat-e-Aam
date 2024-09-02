
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';

const LaboratoryTests = () => {
    const { labId } = useParams(); 
    const [tests, setTests] = useState([]);
    const [filteredTests, setFilteredTests] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await fetch(`http://localhost:4040/api/tests/${labId}`);
                const data = await response.json();
                
                if (response.status === 200) {
                    setTests(data);
                    setFilteredTests(data); // Initialize filtered tests with all tests
                } else {
                    setError(data.message || 'Error fetching tests');
                }
            } catch (error) {
                setError('An error occurred while fetching the tests.');
            }
        };

        fetchTests();
    }, [labId]);

    useEffect(() => {
        filterTests();
    }, [searchQuery, priceRange]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handlePriceRangeChange = (e) => {
        setPriceRange(e.target.value);
    };

    const filterTests = () => {
        let filtered = tests;

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(test => 
                test.testName.toLowerCase().includes(searchQuery) ||
                test.testType.toLowerCase().includes(searchQuery)
            );
        }

        // Filter by price range
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            filtered = filtered.filter(test => 
                test.testPrice >= min && test.testPrice <= max
            );
        }

        setFilteredTests(filtered);
    };

    return (
        <div>
            {/* <Header /> */}
            <style>
                {`
                .card-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                    justify-content: center;
                    padding: 20px;
                }

                .card {
                    --font-color: #323232;
                    --font-color-sub: #666;
                    --bg-color: #fff;
                    --main-color: #323232;
                    --main-focus: #2d8cf0;
                    width: 230px;
                    height: 300px;
                    background: var(--bg-color);
                    border: 2px solid var(--main-color);
                    box-shadow: 4px 4px var(--main-color);
                    border-radius: 5px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    padding: 20px;
                    gap: 10px;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                }

                .card-title {
                    font-size: 20px;
                    font-weight: 1000;
                    text-align: center;
                    color: var(--font-color);
                }

                .card-subtitle {
                    font-size: 20px;
                    font-weight: 800;
                    color: var(--font-color-sub);
                    text-align: center;
                }

                .card-divider {
                    width: 100%;
                    border: 1px solid var(--main-color);
                    border-radius: 50px;
                }

                .card-footer {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }

                .card-price {
                    font-size: 20px;
                    font-weight: 500;
                    color: var(--font-color);
                }

                .card-price span {
                    font-size: 20px;
                    font-weight: 500;
                    color: var(--font-color-sub);
                }

                .card-btn {
                    height: 35px;
                    background: var(--bg-color);
                    border: 2px solid var(--main-color);
                    border-radius: 5px;
                    padding: 0 15px;
                    transition: all 0.3s;
                    font-weight: 500;
                }

                .card-btn:hover {
                    border: 2px solid var(--main-focus);
                }

                .card-btn:hover svg {
                    fill: var(--main-focus);
                }

                .card-btn:active {
                    transform: translateY(3px);
                }
                `}
            </style>
            <div className='flex flex-col md:flex-row gap-3'>
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
                        value={priceRange}
                        onChange={handlePriceRangeChange}
                        className="w-full md:w-80 px-3 h-10 rounded border-2 border-orange-500 focus:outline-none"
                        // value={pricerange}
                        // onChange={handlePriceRangeChange}
                        // className="w-full md:w-80 px-3 h-10 rounded border-2 border-orange-500 focus:outline-none "
                    >
                        <option value="">Select Price Range</option>
                        <option value="1000-5000">1000-6000</option>
                        <option value="6000-15000">6000-15000</option>
                        <option value="16000-50000">16000-50000</option>
                        <option value="51000-250000">51000-250000</option>
                    </select>
                </div>
            </div>
            {error ? (
                <p>{error}</p> 
            ) : (
                <div className="card-container">
                    {filteredTests.length > 0 ? (
                        filteredTests.map((test) => (
                            <div className="card" key={test._id}>
                                    <svg
                                        version="1.0"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlSpace="preserve"
                                        viewBox="0 0 100 100"
                                        width="3.5em"
                                        height="5.5em"
                                        fill="currentColor"
                                        className="ml-15 mt-1 text-[rgba(244,67,54)]"
                                    >
                                     <path d="M90 42.301 76.666 19.209l-13.334 7.699V10H36.667v16.908l-13.335-7.699L10 42.301 23.332 50 10 57.698l13.331 23.093 13.335-7.698V90h26.666V73.093l13.334 7.698L90 57.698 76.666 50 90 42.301zm-9.107 17.84-6.666 11.543-17.561-10.138v21.787H43.332V61.546L25.774 71.684l-6.666-11.543L36.667 50 19.108 39.863l6.666-11.549 17.558 10.14V16.667h13.334v21.787l17.561-10.14 6.666 11.549L63.332 50l17.561 10.141z" />
                                    </svg>

                                <div className="card-title">{test.testName}</div>
                                <div className="card-subtitle">Type: {test.testType}</div>
                                <hr className="card-divider" />
                                <div className="card-footer">
                                    <div className="card-price"><span>Rs</span> {test.testPrice}</div>
                                    <Link to={`/TestBooking?id=${test._id}`}>
                                    <button className="card-btn" >
                                        Book
                                    </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No tests available</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default LaboratoryTests;


