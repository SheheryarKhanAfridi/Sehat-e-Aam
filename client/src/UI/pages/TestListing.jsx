
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const TestListing = () => {
  const [message, setMessage] = useState('');
  const [data, setdata] = useState({});
  const navigate = useNavigate();

  const handleinput = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
    console.log(data);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const res = await fetch('http://localhost:4040/TestListing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      if (res.ok) {
        const responseData = await res.json();
        console.log('Test added:', responseData);
        setMessage('Test added successfully!');
        navigate('/MyLabTests'); // Navigate to /labtest after successful submission
      } else {
        console.error('Error adding test:', res.statusText);
        setMessage('Error adding test. Please try again.');
      }
    } catch (error) {
      console.error('Error adding test:', error);
      setMessage('Error adding test. Please try again.');
    }
  };

  return (
    <>
    {/* <Header/> */}
    <div className="container mx-auto px-4">
      <h1 className='text-5xl font-bold text-black text-center mt-7'>Add Laboratory Tests</h1>

      <section className="flex flex-wrap items-center mt-12">
        <div className="w-full lg:w-1/2 lg:pr-8 mb-8">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl text-black">Welcome!</h1>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md space-y-4">
            <div>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Test Name"
                  onChange={handleinput}
                  name='name'
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Test Type"
                  onChange={handleinput}
                  name='TestType'
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <input
                  type="number"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Test Price"
                  onChange={handleinput}
                  name='TestPrice'
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="inline-block rounded-lg bg-orange-500 px-5 py-3 text-sm font-medium text-white"
              >
                Submit
              </button>
            </div>
          </form>
          {message && <p className="text-center mt-4">{message}</p>}
        </div>
        <div className="w-full lg:w-1/2 mb-8">
          <img
            alt=""
            src="https://static.vecteezy.com/system/resources/previews/012/740/876/original/female-doctor-or-scientific-researcher-using-microscope-in-a-laboratory-vector.jpg"
            className="object-cover w-full h-auto"
          />
        </div>
      </section>
    </div>
    </>
  );
};

export default TestListing;



