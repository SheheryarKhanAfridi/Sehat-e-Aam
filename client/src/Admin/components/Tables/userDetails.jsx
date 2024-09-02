import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  server,
  useGetUserDetailsMutation,
} from '../../../Redux/api/adminApis';
import { useSelector } from 'react-redux';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';

const UserDetails = () => {
  const [userData, setUserData] = useState(null);

  const { userId, modal } = useParams();
  const { user } = useSelector((s) => s.userReducer);

  const [getUserDetails] = useGetUserDetailsMutation();
  useEffect(() => {
    const getData = async () => {
      const res = await getUserDetails({ modal, userId, id: user._id });
      setUserData(res?.data.user);
    };
    getData();
  }, [userId]);
  console.log(userData);

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="User Details" />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
          <div className="w-[100%]  p-8 bg-white shadow-lg rounded-lg dark:border-strokedark dark:bg-boxdark">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              User Details
            </h2>
            <div className=" grid grid-cols-2 gap-4">
              {userData &&
                Object.entries(userData).map(([key, value]) => {
                  if (key === 'contactPerson' && typeof value === 'object') {
                    return Object.entries(value).map(([subKey, subValue]) => (
                      <>
                        <div className="text-gray-600 dark:text-white">
                          {`${key} ${subKey}`}:
                        </div>
                        <div className="text-gray-800 dark:text-white">
                          {subKey === 'employeeCardPicture' ? (
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() =>
                                window.open(server + '/' + subValue, '_blank')
                              }
                            >
                              Show Image
                            </button>
                          ) : (
                            String(subValue)
                          )}
                        </div>
                      </>
                    ));
                  } else if (
                    key === 'laboratoryRegistrationDocument' ||
                    key === 'cnicBack' ||
                    key === 'cnicFront' ||
                    key === 'businessRegistrationDocument' ||
                    key === 'contactPersonEmployeeCard' ||
                    key === 'businessRegistrationCertificatePicture' ||
                    key === 'pharmacistLicence' ||
                    key === 'medicalLicencePicture'
                  ) {
                    return (
                      <>
                        <div className="text-gray-600 dark:text-white">
                          {key}:
                        </div>
                        <div className="text-gray-800 dark:text-white">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 dark:text-white text-white font-bold py-2 px-4 rounded"
                            onClick={() =>
                              window.open(server + '/' + value, '_blank')
                            }
                          >
                            Show Image
                          </button>
                        </div>
                      </>
                    );
                  } else if (key === 'createdAt') {
                    return (
                      <>
                        <div className="text-gray-600 dark:text-white">
                          {key}:
                        </div>
                        <div className="text-gray-800 dark:text-white">
                          {new Date(value).toLocaleDateString()}
                        </div>
                      </>
                    );
                  } else if (
                    key !== 'updatedAt' &&
                    key !== '__v' &&
                    key !== '_id'
                  ) {
                    return (
                      <>
                        <div className="text-gray-600 dark:text-white">
                          {key}:
                        </div>
                        <div className="text-gray-800 dark:text-white">
                          {String(value)}
                        </div>
                      </>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
    
  );
};

export default UserDetails;
