import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  useRegisterDoctorMutation,
  useRegisterInsuCompMutation,
  useRegisterLaboratoryMutation,
  useRegisterPatientsMutation,
  useRegisterPharmacyVendorMutation,
} from '../../Redux/api/apiServices';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

function RegisterForm({ fields }) {
  const [formData, setFormData] = useState({});

  //ALl apis calls
  const [registerDoctor] = useRegisterDoctorMutation();
  const [registerPatients] = useRegisterPatientsMutation();
  const [registerLaboratory] = useRegisterLaboratoryMutation();
  const [registerInsuranceComp] = useRegisterInsuCompMutation();
  const [registerPharmacyVendor] = useRegisterPharmacyVendorMutation();

  const location = useLocation();
  const { from } = location.state || { from: 'doctorReg' };
  console.log(from);
  const allowedImgsExt = ['png', 'jpg', 'jpeg'];
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    e.preventDefault();
    //dealing images in form
    if (e.target.type === 'file') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    console.log(formData);
  };

  function validateFileInput(formData, allowedExtensions, ignoreFields = []) {
    for (let [key, value] of formData.entries()) {
      if (value instanceof File && !ignoreFields.includes(key)) {
        const fileExtension = value.name.split('.').pop().toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
          return false;
        }
      }
    }

    return true;
  }

  const isStrongPassword = (password) => {
    const regex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );
    return regex.test(password);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Create a new FormData instance
    const data = new FormData();

    // Append all form data to it
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    for (let pair of data.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    if (!isStrongPassword(formData.password)) {
      toast.error(
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character and at least 8 characters long!',
      );
      return;
    }
    //checking if password and confirm password are same and some more vlaidaioons
    if (formData.password !== formData.confirmPassword) {
      toast.error('Password and confirm password must be same');
      return;
    }

    // Validate the business registration document it must be PDF
    if (data.has('businessRegistrationDocument')) {
      const businessRegDoc = data.get('businessRegistrationDocument');
      const businessRegDocExt = businessRegDoc.name
        .split('.')
        .pop()
        .toLowerCase();
      if (businessRegDocExt !== 'pdf') {
        toast.error(
          'Invalid file type for business registration document. Only PDF files are allowed.',
        );
        return;
      }
    }
    const ignoreFields = ['businessRegistrationDocument'];

    if (!validateFileInput(data, allowedImgsExt, ignoreFields)) {
      toast.error(
        'Invalid file type. Only .png, .jpg, and .jpeg files are allowed.',
      );
      return;
    }

    // validating the phone number here
    if (
      formData.mobileNumber ||
      formData.number ||
      formData.contactPersonNumber ||
      formData.mobileNumber ||
      formData.contactNumber
    ) {
      const phoneNumber =
        formData.mobileNumber ||
        formData.number ||
        formData.contactPersonNumber ||
        formData.mobileNumber ||
        formData.contactNumber;
      const regex = /^\+92\d{10}$/;
      if (!regex.test(phoneNumber)) {
        return toast.error(
          'The phone number must start with +92 followed by 10 digits without space!',
        );
      }
    }
    try {
      let res;

      if (from === 'doctorReg') {
        console.log('working');
        res = await registerDoctor({ body: data });
      } else if (from === 'patientReg') {
        res = await registerPatients({ body: data });
      } else if (from === 'laboratoryReg') {
        res = await registerLaboratory({ body: data });
      } else if (from === 'insuranceCompanyReg') {
        res = await registerInsuranceComp({ body: data });
      } else if (from === 'pharmacyVendorReg') {
        res = await registerPharmacyVendor({ body: data });
      }

      if (res.data) {
        Swal.fire({
          title: 'Good job!',
          text: 'Account Created Successfully!',
          icon: 'success',
        });
        navigate('/sign-in');
      } else {c
        Swal.fire({
          title: 'Oops!',
          text: 'Something went wrong!',
          icon: 'error',
        });
      }
      console.log(res);
    } catch (e) {
      Swal.fire({
        title: 'Oops!',
        text: 'Something went wrong!',
        icon: 'error',
      });
    }
  };
  return (
    <div className="rounded-sm min-h-screen flex items-center sm:justify-center px-[1rem] sm:px-0 bg-white">
      <div className="flex flex-wrap items-center py-10 w-full">
        <div className="w-full sm:w-[70rem] shadow-2xl mx-auto rounded-md">
          <div className="w-full p-4 sm:p-12.5 xl:p-10">
            <span className="mb-1.5 block font-medium">Start for free</span>{' '}
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign Up to Sehat E Aam
            </h2>
            <form onSubmit={submitHandler} encType="multipart/form-data">
              <div className="flex flex-wrap">
                {fields.map((field, index) => (
                  <div key={index} className="w-full md:w-1/2 pr-2 pl-2">
                    <label className="my-2 block font-medium text-black dark:text-white">
                      {field.label}
                    </label>
                    <div className="relative">
                      {field.type === 'select' ? (
                        <select
                          name={field.name}
                          required
                          onChange={onChangeHandler}
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        >
                          {/* map through your options here */}
                          {field.options.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          onChange={onChangeHandler}
                          required
                          placeholder={field.placeholder}
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-2 mt-5">
                <button
                  // disabled={loading}
                  className="flex items-center justify-center gap-2 py-1 px-5 h-12 tracking-wide align-middle duration-500 text-lg text-center font-medium bg-red-500 text-white rounded-md w-full cursor-pointer disabled:cursor-not-allowed"
                >
                  Create Account
                </button>
              </div>

              <div className="mt-6 text-center">
                <p>
                  Already have an account?{' '}
                  <Link to="/sign-in" className="text-primary">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RegisterForm;
