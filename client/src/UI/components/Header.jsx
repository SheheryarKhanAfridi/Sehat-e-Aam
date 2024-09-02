

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Header = () => {
  const { user } = useSelector((s) => s.userReducer);
  const [isOpen, setIsOpen] = useState(false);
console.log(user,'user data')
  const logoutHandler = (e) => {
    e.preventDefault();
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    Swal.fire({
      title: 'Logged out!',
      text: 'You have been logged out',
      icon: 'success',
    }).then(() => {
      window.location.href = '/';
    });
  };
  const navigate = useNavigate();

  const adminLogin = () => {
    navigate('/sign-in', { state: { from: 'adminLogin' } });
  };

  return (
    <header className="bg-white">
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-wrap -mx-4 items-center py-6 justify-between">
          <div className="px-4 py-1 space-x-1">
            <a
              href="#"
              className="font-bold font-serif hover:text-opacity-75 inline-flex items-center leading-none mr-4 space-x-1 text-black text-xl uppercase"
            >
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                xml:space="preserve"
                viewBox="0 0 100 100"
                width="2.5em"
                height="2.5em"
                fill="currentColor"
                className="mr-1 text-[rgba(244,67,54)]"
              >
                <path d="M90 42.301 76.666 19.209l-13.334 7.699V10H36.667v16.908l-13.335-7.699L10 42.301 23.332 50 10 57.698l13.331 23.093 13.335-7.698V90h26.666V73.093l13.334 7.698L90 57.698 76.666 50 90 42.301zm-9.107 17.84-6.666 11.543-17.561-10.138v21.787H43.332V61.546L25.774 71.684l-6.666-11.543L36.667 50 19.108 39.863l6.666-11.549 17.558 10.14V16.667h13.334v21.787l17.561-10.14 6.666 11.549L63.332 50l17.561 10.141z" />
              </svg>
              <span className="text-black">SEHAT E AAM</span>
            </a>
          </div>
          <div className="flex-wrap inline-flex px-4 py-1 space-x-2 lg:space-x-4">
            <a
              href="#"
              className="group hover:text-[rgba(244,67,54)] inline-flex items-center leading-tight text-gray-500"
            >
              <span className="bg-[rgba(244,67,54)] group hover:bg-[rgba(244,67,54)] p-2 rounded text-white lg:mr-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  height="1.25em"
                >
                  <path d="M21 16.42v3.536a1 1 0 0 1-.93.998c-.437.03-.794.046-1.07.046-8.837 0-16-7.163-16-16 0-.276.015-.633.046-1.07A1 1 0 0 1 4.044 3H7.58a.5.5 0 0 1 .498.45c.023.23.044.413.064.552A13.901 13.901 0 0 0 9.35 8.003c.095.2.033.439-.147.567l-2.158 1.542a13.047 13.047 0 0 0 6.844 6.844l1.54-2.154a.462.462 0 0 1 .573-.149 13.901 13.901 0 0 0 4 1.205c.139.02.322.042.55.064a.5.5 0 0 1 .449.498z"></path>
                </svg>
              </span>
              <div className="hidden lg:block">
                <div className="text-sm">Call Us</div>
                <div className="font-bold text-[rgba(244,67,54)]">
                  +92 23232323
                </div>
              </div>
            </a>
           
          </div>
        </div>
        <hr className="border-gray-400 border-opacity-50 mx-auto w-full" />
      </div>
      <div className="container mx-auto relative">
        <nav className="flex flex-wrap items-center px-4">
          <div className="flex-1 space-y-2 w-full lg:flex lg:items-center lg:space-x-4 lg:space-y-0 lg:w-auto">
            <div className="flex mr-auto py-1 gap-5">
              <Link
                to={'/'}
                className="hover:text-gray-400 lg:p-4 py-2 text-gray-500"
              >
                Home
              </Link>
              <a
                href="#about"
                className="hover:text-gray-400 lg:p-4 py-2 text-gray-500"
              >
                About
              </a>
              <a
                href="#departments"
                className="hover:text-gray-400 lg:p-4 py-2 text-gray-500"
              >
                Departments
              </a>
              <a
                href="#services"
                className="hover:text-gray-400 lg:p-4 py-2 text-gray-500"
              >
                Services
              </a>


              {user && user.role === 'Patient' && (
                <>
                  <Link
                    to={'/labtest'}
                    className="hover:text-gray-400 lg:p-4 py-2 text-gray-500"
                  >
                    Laboratory
                  </Link>

                  <Link
                    to={'/PatientTests'}
                    className="hover:text-gray-400 lg:p-4 py-2 text-gray-500"
                  >
                    My Tests
                  </Link>

                  <Link
                    to={'/Pharmacies'}
                    className="hover:text-gray-400 lg:p-4 py-2 text-gray-500"
                  >
                    Pharmacies
                  </Link>
                  <Link to='/DoctorsListingForUsers'>
                    <button
                      className="hover:text-gray-400 lg:p-4 py-2 text-gray-500"
                    >
                      Doctors
                    </button>
                  </Link>


                </>
              )}

              {user && user.role === 'Laboratory' && (
                <>

                  <Link
                    to={'/labtestReservations'}
                    className="hover:text-gray-400 lg:p-4 py-2 text-gray-500"
                  >
                    My Bookings
                  </Link>
                </>
              )}



              {!user && (
                <button
                  onClick={adminLogin}
                  className="hover:text-gray-400 lg:p-4 py-2 text-gray-500"
                >
                  Admin Login
                </button>
              )}
            </div>
            <div className="flex-wrap gap-2 inline-flex items-center py-1">
              {user ? (
                <>
                  <div className="flex">
                    {user.role === 'Admin' && (
                      <Link
                        to={'/dashboard'}
                        className="bg-[rgba(244,67,54)] inline-block px-6 py-2 rounded text-white font-bold"
                      >
                        Dashboard
                      </Link>
                    )}

                    {user.role === 'Laboratory' && (
                      <>
                        <Link
                          to={'/TestListing'}
                          className="bg-[rgba(244,67,54)] inline-block px-6 py-2 rounded text-white font-bold mr-3"
                        >
                          List Tests
                        </Link>


                        <Link
                          to={'/MyLabTests'}
                          className="bg-[rgba(244,67,54)] inline-block px-6 py-2 rounded text-white font-bold mr-3"
                        >
                          My lab tests
                        </Link>

                      </>



                    )}



                    {user.role === 'pharmacy' && (
                      <>
                        <Link
                          to={'/medlisting'}
                          className="bg-[rgba(244,67,54)] inline-block px-6 py-2 rounded text-white font-bold mr-3"
                        >
                          List Medicines
                        </Link>


                        <Link
                          to={'/MyMeds'}
                          className="bg-[rgba(244,67,54)] inline-block px-6 py-2 rounded text-white font-bold mr-3"
                        >
                          My Medicines
                        </Link>

                      </>
                    )}


                    {user.role == 'Doctor' ? <div>

                      <Link to={`/DoctorAppointments?id=${user._id}`}>
                      
                        <button
                          className="bg-[rgba(244,67,54)] inline-block px-6 py-2 rounded text-white font-bold mx-3 "
                        >
                          Appointments
                        </button>
                      </Link>
                      <Link to='/doctorform'>
                        <button
                          className="bg-[rgba(244,67,54)] inline-block px-6 py-2 rounded text-white font-bold mx-3 "
                        >
                          Your Clinic
                        </button>
                      </Link>
                    </div> : ''}


                    <button
                      onClick={logoutHandler}
                      className="bg-[rgba(244,67,54)] inline-block px-6 py-2 rounded text-white font-bold"
                    >
                      Logout
                    </button>

                    <img
                      onClick={() => setIsOpen(!isOpen)}
                      className="rounded-full ml-3 cursor-pointer"
                      width={40}
                      height={40}
                      src={`https://api.dicebear.com/5.x/initials/svg?seed=${user?.name}`}
                      alt=""
                    />
                  </div>
                </>
              ) : (
                <Link
                  to={'/sign-in'}
                  className="bg-[rgba(244,67,54)] inline-block px-6 py-2 rounded text-white font-bold"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;



