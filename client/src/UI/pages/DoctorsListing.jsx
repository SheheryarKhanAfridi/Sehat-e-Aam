import React, { useEffect, useState } from 'react';
import pic from './Pics.png'
import {Link} from 'react-router-dom'
import ReviewModal from '../components/ReviewModal '

const DoctorsListing = () => {
    const [data, setdata] = useState()
    const [showdata, setshowdata] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [Appointment, setAppointment] = useState();
    const [id, setid] = useState()
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [allReview, setallReview] = useState()

    const openReviewModal = () => setIsReviewModalOpen(true);
    const closeReviewModal = () => setIsReviewModalOpen(false);
  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleappointment=(data)=>{
    console.log(data)
    setAppointment(data);
  }
  const handleAppointment =(e)=>{
    const {value,name}=e.target;
    setAppointment({
      ...Appointment,
      [name]:value
    })
    console.log(Appointment);
  }
    const getData = async () => {
        const res = await fetch('http://localhost:4040/DoctorsDataAll', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        if (res.status == 200) {
            const alldata = await res.json();
            console.log(alldata)
            setdata(alldata.clinics)
            setid(alldata['User Id'])
            setshowdata(true)
        }
    }
    const BookAppointment=async(e)=>{
      e.preventDefault();

      const res = await fetch('http://localhost:4040/DoctorApointmentBookingData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Appointment),
        credentials:'include'
    });
    if(res.status==400){
      alert('empty data')
      return
    }
    else if(res.status==401){
      alert('cookie not found')
      return
    }
    else if(res.status==404){
      alert('User not found')
      return
    }
    else if(res.status==200){
      const data=await res.json()
      console.log(data)
      alert('Appointment Booked')
      setIsModalOpen(false)
      return
    }
      
    }
  const handleReview=(data)=>{ 
    setallReview(data) 
    openReviewModal()
  }
    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
         
          {id && id!=''?<section className='historybtnappointmnt'>
          <Link to={`/History?id=${id}`}>
          <button class="AppointmentHistoryBtn">
    <span class="icon">
        <svg viewBox="0 0 175 80" width="40" height="40">
            <rect width="80" height="15" fill="#f0f0f0" rx="10"></rect>
            <rect y="30" width="80" height="15" fill="#f0f0f0" rx="10"></rect>
            <rect y="60" width="80" height="15" fill="#f0f0f0" rx="10"></rect>
        </svg>
    </span>
    <span class="text">History</span>
</button>
          </Link>
          </section>:''}
            {showdata ?
               <div className='cardsparent_doctorslist'>
               {data && data.map((doctor, index) => (
                   <div key={index}>
                       {doctor.Clinic.map((clinic, indexx) => (
                           <div key={indexx} className="max-w-5xl mx-4 w-100 mt-16 bg-white shadow-xl rounded-lg text-gray-900">
                               <div className="rounded-t-lg h-32 overflow-hidden">
                                   <img
                                       className="object-cover  object-top w-full"
                                    //    src="https://cdn.imgbin.com/15/9/6/imgbin-medical-background-SpsHM5x72ex4pdWPxZCBbbwvf.jpg"
                                       alt="Background"
                                       src={pic}
                                   />
                               </div>
                               <div className="mx-auto mt-7 w-32 h-32 relative -mt-16 border-4 doctorlistshadow border-white rounded-full overflow-hidden">
                                   <img
                                       className="object-cover object-center h-32 "
                                       src="https://i.pinimg.com/736x/b7/20/7a/b7207af2e6078e81ce7ab484db59b0cf.jpg"
                                       alt="Doctor"
                                   />
                               </div>
                               <div className="text-center mt-2">
                                   <h2 className=""><b>Doctor name</b>: {clinic.DoctorName}</h2>
                                   <p className="text-gray-500"><b>Spezialization</b>: {clinic.SpecializationField}</p>
                                   <p className="text-gray-500"><b>Rating</b>: {clinic.TotalRating}</p>
                               </div>
                               <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
                                   <li className="flex flex-col items-center justify-around">
                                       <b>ClinicName</b>
                                       <div>{clinic.ClinicName}</div>
                                   </li>
                                   <li className="flex flex-col items-center justify-between">
                                       <b>Location</b>
                                       <div>{clinic.Location}</div>
                                   </li>
                                   <li className="flex flex-col items-center justify-around">
                                       <b>ClinicTime</b>
                                       <div>{clinic.ClinicTime}</div>
                                   </li>
                               </ul>
                               <div className="p-4 border-t mx-8 mt-2">
      
                                     <button className="w-2/2  bg-black block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"   onClick={()=>{
                                      openModal();  
                                      handleappointment(clinic)
                                     }}>
                                       Book Appointment
                                   </button>
                                   <button className="w-2/1  bg-black block mx-auto rounded-full bg-gray-500 hover:shadow-lg   text-white px-3 py-0 m-2" onClick={()=>{handleReview(clinic.Reviews)}}>
                                       View All Ratings
                                   </button>
                               </div>
                           </div>
                       ))}
                   </div>
               ))}



           </div>

                :


                <div role="status" class="loaderpara space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                    <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                        <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>
                    <div class="">
                        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    </div>
                    <span class="sr-only">Loading...</span>
                </div>



            }
<section >
<div>
   

      {/* Main modal */}
      {isModalOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="modelbackcustom fixed inset-0 flex items-center justify-center overflow-y-auto overflow-x-hidden z-50"
        >
          <div className="relative ">
            {/* Modal content */}
            <div className="relative  rounded-lg shadow dark:bg-gray-700">
             
              <section id="card1" class="bookappointment">
    <h4><b>Book</b> your appointment</h4>
 <img src="https://media.istockphoto.com/id/1285103851/vector/hand-drawn-doodle-folding-calendar-with-cartoon-art-style-vector-isolated.jpg?s=612x612&w=0&k=20&c=38hGkE4gAtLl-Uz3JD5TYPeln922BG5i4d_zQNqF41s=" alt="booking Appointment card" />
  <div class="card__content">
  <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>

    <p class="card__description">
    <form className="max-w-sm mx-auto ">
      <p className='pt-3 pb-3'>Appointment is booking to<b> {Appointment.ClinicName}</b></p>
  <div className="mb-5">
    <label
      htmlFor="date"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      Date
    </label>
    <input
      type="date"
      id="date"
      name='date'
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={handleAppointment}
      required=""
    />
  </div>
  <div className="mb-5">
    <label
      htmlFor="time"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      Time
    </label>
    <input
      type="time"
      id="time"
      name='time'
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      required=""
      onChange={handleAppointment}
    />
  </div>
  <div className="mb-5">
    <label
      htmlFor="desc"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      Describe your problem
    </label>
    <textarea
    name='Description'
      id="desc"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      required=""
      onChange={handleAppointment}
    />
  </div>
  <button
    type="submit"
    className="text-white bg-orange-500 px-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    onClick={BookAppointment}
  >
    Book
  </button>
</form>

    </p>
             
  </div>
  
</section>
              {/* Modal footer */}
             
            </div>
          </div>
        </div>
      )}
    </div>
</section>
<ReviewModal
        isOpen={isReviewModalOpen}
        onCloseReviewModal={closeReviewModal}
        reviews={allReview}
      >
        <h2 className="text-lg font-bold mb-4">Reviews</h2>
        <p>This is a review modal using Tailwind CSS.</p>



        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
          onClick={closeReviewModal}
        >
          Close Review Modal
        </button>
      </ReviewModal>
        </div>
    );
}

export default DoctorsListing;
