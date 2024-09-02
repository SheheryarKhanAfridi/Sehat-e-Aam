
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const LabTests = () => {
    const [labs, setLabs] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLabs = async () => {
            try {
                const response = await fetch('http://localhost:4040/labs');
                const data = await response.json();
                setLabs(data);
            } catch (error) {
                console.error('Error fetching labs:', error);
            }
        };

        fetchLabs();
    }, []);

   
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    
    const filteredLabs = labs.filter(lab =>
        lab.laboratoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.laboratoryAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.contactPersonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.emailAddress.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleTests = (labId) => {
        navigate(`/laboratoryTests/${labId}`);
    };

    return (
        <>
            {/* <Header /> */}
            <style>
                {`
                    .card {
                        width: 400px;
                        height: 350px;
                        padding: 20px;
                        background: #fff;
                        border: 6px solid #000;
                        box-shadow: 12px 12px 0 #000;
                        transition: transform 0.3s, box-shadow 0.3s;
                        margin: 20px;
                        margin-left: 2px;
                    }

                    .card:hover {
                        transform: translate(-5px, -5px);
                        box-shadow: 17px 17px 0 #000;
                    }

                    .card__title {
                        font-size: 32px;
                        font-weight: 1000;
                        color: #000;
                        text-transform: uppercase;
                        margin-bottom: 15px;
                        display: block;
                        position: relative;
                        overflow: hidden;
                        text-align: center;
                    }

                    .card__title::after {
                        content: "";
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 90%;
                        height: 3px;
                        background-color: rgba(244, 67, 54);
                        transform: translateX(-100%);
                        transition: transform 0.3s;
                    }

                    .card:hover .card__title::after {
                        transform: translateX(0);
                    }

                    .card__content {
                        font-size: 16px;
                        line-height: 1.4;
                        color: #000;
                        margin-bottom: 20px;
                        font-weight: 1000;
                    }

                    .card__button {
                        border: 3px solid #000;
                        background: #000;
                        color: #fff;
                        padding: 10px;
                        font-size: 18px;
                        font-weight: bold;
                        text-transform: uppercase;
                        cursor: pointer;
                        position: relative;
                        overflow: hidden;
                        transition: transform 0.3s;
                        width: 100%;
                        text-align: center;
                    }

                    .card__button::before {
                        content: "Sure?";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 105%;
                        background-color: rgba(244, 67, 54);
                        color: white;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transform: translateY(100%);
                        transition: transform 0.3s;
                    }

                    .card__button:hover::before {
                        transform: translateY(0);
                    }

                    .card__button:active {
                        transform: scale(0.95);
                    }

                    .flex-container {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-around;
                    }

                    .search-box {
                        margin: 20px;
                        padding: 10px;
                        width: 100%;
                        max-width: 400px;
                        font-size: 18px;
                        border: 2px solid #000;
                        border-radius: 5px;
                    }
                `}
            </style>
            <h1 className='text-5xl font-bold text-center mt-7 text-black '>Laboratories </h1>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search"
                    className="search-box"
                    value={searchQuery}
                    onChange={handleSearch}
                    
                />
            </div>
            <div className='flex-container'>
                
                {filteredLabs.map((lab) => (
                    <div className="card" key={lab._id}>
                                    <svg
                                        version="1.0"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlSpace="preserve"
                                        viewBox="0 0 100 100"
                                        width="3.5em"
                                        height="4.5em"
                                        fill="currentColor"
                                        className="ml-35 text-[rgba(244,67,54)]"
                                    >
                                     <path d="M90 42.301 76.666 19.209l-13.334 7.699V10H36.667v16.908l-13.335-7.699L10 42.301 23.332 50 10 57.698l13.331 23.093 13.335-7.698V90h26.666V73.093l13.334 7.698L90 57.698 76.666 50 90 42.301zm-9.107 17.84-6.666 11.543-17.561-10.138v21.787H43.332V61.546L25.774 71.684l-6.666-11.543L36.667 50 19.108 39.863l6.666-11.549 17.558 10.14V16.667h13.334v21.787l17.561-10.14 6.666 11.549L63.332 50l17.561 10.141z" />
                                    </svg>
                        <div className="card__title">{lab.laboratoryName}</div>
                        <div className="card__content">
                            <p>Address: {lab.laboratoryAddress}</p>
                            <p>Owner: {lab.contactPersonName}</p>
                            <p>Email: {lab.emailAddress}</p>
                        </div>
                        <button className="card__button" onClick={() => handleTests(lab._id)}>
                            Tests
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default LabTests;



