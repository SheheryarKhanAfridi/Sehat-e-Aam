import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableThree from '../../components/Tables/TableThree';
import DefaultLayout from '../../layout/DefaultLayout';
import { useGetAllUsersQuery } from '../../../Redux/api/adminApis';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Loader from '../../common/Loader';

const AllUsers = () => {
  const { user, loading } = useSelector((s) => s.userReducer);
  console.log(user._id);
  const { data, error, isLoading, isError } = useGetAllUsersQuery({
    id: user._id,
  });
  if (isError) {
    console.log(isError);
    return toast.error(error.data.message);
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Users" />
      {isLoading ? <Loader /> : <TableThree usersData={data?.data.users} />}
    </DefaultLayout>
  );
};

export default AllUsers;
