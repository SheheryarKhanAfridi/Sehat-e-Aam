import React, { useState, useEffect } from 'react';
import './Doctor.css'
import UpdateMessageModal from '../components/UpdateMessageModal '

const DoctorForm = () => {
  
  const [data, setdata] = useState();
  const [clinic, setclinic] = useState()
  const [showclinic, setshowclinic] = useState(true)
  const [editClinic, setEditClinic] = useState({});
  const [showEditForm, setshowEditForm] = useState(false)  
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const handleCloseModal = () => setIsModalOpen(false);
  const handleInputs = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setdata({
      ...data,
      [name]: value
    })
  }
  const handleregForm = async (e) => {
    e.preventDefault();
    console.log(data)
    const res = await fetch('http://localhost:4040/doctorform', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include'
    });
    if (res.status == 400) {
      return alert('user is not login')
    }
    else if (res.status == 401) {
      return alert('data not found try again later or Contact us')
    }
    else if (res.status == 403) {
      alert('Clinic already registered')
    }
    else if (res.status == 200) {
      alert('Clinic registered')
      getClinic()
    }
  }
  const getClinic = async () => {
    const res = await fetch('http://localhost:4040/getClinic', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    const data = await res.json();
    if (res.status == 403) {
      setshowclinic(true);
      setclinic(data.Clinic)  
      const object=data.Clinic[0] 
      setEditClinic(
        object
      )
      console.log(object)
    }
    else if (res.status == 404) {
      alert('user not found')
    }
    else if (res.status == 200) {
      setshowclinic(false);
    }

}

const handleEditClinic = (e) => {
    const { name, value } = e.target;
    setEditClinic(prevState => ({
      ...prevState,
      [name]: value
    }));
};

const updateClinicDetails=async()=>{ 
  console.log(editClinic)
   
    const res=await fetch('http://localhost:4040/updateClinicDetailss',{
      method:'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(editClinic)
    })
    if(res.status==200){
      setIsModalOpen(true)
      setshowEditForm(false)
    getClinic()

    }
    else if(res.status==500){
      alert('Server Error')
    }
    else if(res.status==404){
      alert('Doctor not found')
    }
    else if(res.status==500){
      alert('Clininc not found')
    }
}


  useEffect(() => {
    getClinic()
  }, [])

  return (
    <div className='doc'>
       
      <UpdateMessageModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <div className=' mx-auto max-w-7xl'>
        <div className="flex m-8 justify-center items-center">
          <div className="w-1/2  docform ">
            <h6 className='text-center '>{showclinic ? '' : <b>Register Your Clinic</b>} </h6>
            <form className="max-w-md mx-auto" >

              {clinic ?

                <div className={`card max-w-4xl mx-auto font-sans ${showEditForm?'bg-slate-100':''}`}>
                 
                  <div >
                    {showEditForm ?

                      <div className=''> 
                        {clinic && clinic.map((key, index) => (
                          <form key={index} >
                            <div className="grid sm:grid-cols-2 gap-8 clinicform">
                              <div>
                                <label className="text-gray-800 text-sm mb-2 block">Name</label>
                                <input
                                  name="DoctorName"
                                  type="text"
                                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                  placeholder="Enter name"
                                  value={editClinic.DoctorName || key.DoctorName}
                                  onChange={handleEditClinic}
                                />
                              </div>
                              <div>
                                <label className="text-gray-800 text-sm mb-2 block">Clinic Name</label>
                                <input
                                  name="ClinicName"
                                  type="text"
                                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                  placeholder="Enter clinic name"
                                  value={editClinic.ClinicName }
                                  onChange={handleEditClinic}
                                />
                              </div>
                              <div>
                                <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                                <input
                                  name="DoctorEmail"
                                  type="text"
                                  className="bg-gray-100 w-full text-gray-900 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                  placeholder="Enter email id"
                                  value={editClinic.DoctorEmail  }
                                  onChange={handleEditClinic}
                                />
                              </div> 
                              <div>
                                <label className="text-gray-800 text-sm mb-2 block">Specialization</label>
                                <input
                                  name="SpecializationField"
                                  type="text"
                                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                  placeholder="Enter specialization"
                                  value={editClinic.SpecializationField }
                                  onChange={handleEditClinic}
                                />
                              </div>
                              <div>
                                <label className="text-gray-800 text-sm mb-2 block">Location</label>
                                <input
                                  name="Location"
                                  type="text"
                                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                  placeholder="Enter location"
                                  value={editClinic.Location  }
                                  onChange={handleEditClinic}
                                />
                              </div>
                              <div>
                                <label className="text-gray-800 text-sm mb-2 block">Medical Registration Number</label>
                                <input
                                  name="MedRegNum"
                                  type="tel"
                                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                  placeholder="Enter registration number"
                                  value={editClinic.MedRegNum  }
                                  onChange={handleEditClinic}
                                />
                              </div>
                              <div>
                                <label className="text-gray-800 text-sm mb-2 block">Clinic Time</label>
                                <input
                                  name="ClinicTime"
                                  type="time"
                                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                  placeholder="Enter clinic time"
                                  value={editClinic.ClinicTime }
                                  onChange={handleEditClinic}
                                />
                              </div>
                            </div>
                            <div className="mt-12">
                              <button
                                type="button"
                                onClick={() => setshowEditForm(prevState => !prevState)}
                                className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-black border  hover:bg-blue-700 hover:text-white focus:outline-none"
                              >
                                {showEditForm ? 'Cancel' : 'Edit Clinic'}
                              </button>
                              {showEditForm?
                              <button
                              type="button" 
                              onClick={updateClinicDetails}
                              className="ml-5 py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-#F44336 bg-[#F44336] hover:bg-blue-700 focus:outline-none"
                            >
                              Save
                            </button>:''}
                            </div>
                          </form>
                        ))}
                      </div>


                      :
                      <div>

                        {clinic && clinic.map((key, index) => (
                          <form key={index}>
                            <div className="grid sm:grid-cols-2 gap-8 clinicform">
                              <div>

                                <label className="text-gray-800 text-sm mb-2 block"> Name</label>
                                <input
                                  name="name"
                                  type="text"
                                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                  placeholder="Enter name"
                                  readOnly
                                  value={key.DoctorName}
                                />
                              </div>
                              <div>
                                <label className="text-gray-800 text-sm mb-2 block">Clinic Name</label>
                                <input
                                  name="lname"
                                  type="text"
                                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                  readOnly
                                  value={key.ClinicName}
                                  placeholder="Enter last name"
                                />
                              </div>
                              <div>
                                <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                                <input
                                  name="email"
                                  type="text"
                                  className="bg-gray-100 w-full text-gray-900 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                  readOnly
                                  value={key.DoctorEmail}
                                  placeholder="Enter email"
                                />
                              </div> 
                              <div>
                                <label className="text-gray-800 text-sm mb-2 block">Specialization</label>
                                <input
                                  name="test"
                                  type="test"
                                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                  value={key.SpecializationField}
                                  readOnly
                                  placeholder="Enter password"
                                />
                              </div><div>
                                <label className="text-gray-800 text-sm mb-2 block">Location</label>
                                <input
                                  name="test"
                                  type="test"
                                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                  value={key.Location}
                                  readOnly

                                  placeholder="Enter password"
                                />
                              </div>
                              <div>
                                <label className="text-gray-800 text-sm mb-2 block">Medical Registration Number</label>
                                <input
                                  name="cpassword"
                                  type="tel"
                                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                  value={key.MedRegNum}
                                  readOnly

                                  placeholder="Enter confirm password"
                                />
                              </div><div>
                                <label className="text-gray-800 text-sm mb-2 block">Clinic Time</label>
                                <input
                                  name="cpassword"
                                  type="tel"
                                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                  value={key.ClinicTime}
                                  readOnly
                                  placeholder="Enter confirm password"
                                />
                              </div>
                            </div>

                            <div className="mt-12">
                              <button
                                type="button"
                                onClick={() => setshowEditForm(prevState => !prevState)}
                                className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                              >
                                {showEditForm ? 'Cancel' : 'Edit Clinic'}
                              </button>
                             

                            </div>
                          </form>
                        ))}
                      </div>}
                  </div>

                </div> :
                <div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="email"
                      name="email"
                      id="floating_email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      onChange={handleInputs}
                    />
                    <label
                      htmlFor="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Email address
                    </label>
                  </div>

                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="name"
                        id='name'
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                        onChange={handleInputs}

                      />
                      <label
                        htmlFor=" name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        First name
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="ClinicName"
                        id="ClinicName"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                        onChange={handleInputs}

                      />
                      <label
                        htmlFor="ClinicName"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Clinic name
                      </label>
                    </div>
                  </div>

                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="Specialization"
                      id="Specialization"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      onChange={handleInputs}
                      required
                    />
                    <label
                      htmlFor="Specialization"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Specialization
                    </label>
                  </div>

                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="Location"
                      id="Location"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      onChange={handleInputs}
                      required
                    />
                    <label
                      htmlFor="Location"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Location
                    </label>
                  </div>

                  <div className="grid md:grid-cols-2 md:gap-6 mt-9">
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="MedRegNum"
                        id="RegNum "
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        onChange={handleInputs}
                        required
                      />
                      <label
                        htmlFor="RegNum"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Medical Registration Number
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group ">
                      <input
                        type="time"
                        name="ClinicTime"
                        id="ClinicTime"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        onChange={handleInputs}
                        required
                      />
                      <label
                        htmlFor="ClinicTime"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Cliic time
                      </label>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        onChange={handleInputs}
                        required
                      />
                      <label
                        htmlFor="phone"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Phone number (0300)1234567
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleregForm}
                  >
                    Submit
                  </button>
                </div>
              }
            </form>
          </div>
          <div className="w-1/2 p-6 docimageicon ">
          <div className="text-center flex">
                    {/* <a href="javascript:void(0)">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfmmelcqEmjs--WO3avt2ZBR4cPjpOUGg-6g&s" alt="logo" className="homeicons" />
                    </a> */}
                    <h4 className="text-gray-800 text-base font-semibold mt-6 ml-10"> {showEditForm?'Update clinic functionality is now active':'Click on Edit button to Update you Shop Details'} </h4>
                  </div>
            <img src="https://media4.giphy.com/media/S939Fgf1n6ayQSCqVw/giphy.gif" alt="" />
            {/* <img src="https://i.pinimg.com/originals/b4/3d/b7/b43db78f64c8e26fb580bb7f00b66222.gif" alt="" className=''/> */}
          </div>
        </div>
      </div>




    </div>
  );
}

export default DoctorForm;
