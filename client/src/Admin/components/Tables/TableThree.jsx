import { Link } from 'react-router-dom';
import { useActivateAccountMutation } from '../../../Redux/api/adminApis';
import { useSelector } from 'react-redux';
import alerts from '../../../utils/alerts';
import Swal from 'sweetalert2';
const TableThree = ({ usersData }) => {
  console.log(usersData);

  const { confirmAlert, basicAlert } = alerts();

  const { user } = useSelector((s) => s.userReducer);
  const [activateAccount] = useActivateAccountMutation();

  const activateHandler = async (modal, userId) => {
    const result = await confirmAlert();

    if (result.isConfirmed) {
      const res = await activateAccount({
        id: user._id,
        userId: userId,
        modal,
      });

      if (res.data) {
        console.log('account activated successfully');
        basicAlert(
          'Activated!',
          'The User account has been activated.',
          'success',
        );
      } else if (res.error) {
        console.log(res.error.data.message);
        basicAlert('Failed!', res.error.data.message, 'error');
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      basicAlert('Cancelled', 'The Account in not activated.', 'error');
    }
  };
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>

              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Role
              </th>

              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Activate Account
              </th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {user.name ||
                      user.laboratoryName ||
                      user.pharmacyName ||
                      user.insuranceCompanyName}
                  </h5>
                  <p className="text-sm">{user.emailAddress}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.role}</p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      user.accountStatus === true
                        ? 'bg-success text-success'
                        : user.accountStatus === false
                        ? 'bg-danger text-danger'
                        : 'bg-warning text-warning'
                    }`}
                  >
                    {user.accountStatus === true
                      ? 'Active'
                      : user.AccountStatus === false
                      ? 'Inactive'
                      : 'Pending'}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Link
                      to={`/user-details/${user.role}/${user._id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      View details
                    </Link>
                  </div>
                </td>
                <td>
                  {user.accountStatus === false ? (
                    <button
                      onClick={() => activateHandler(user.role, user._id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Activate
                    </button>
                  ) : (
                    <button
                      disabled
                      className="bg-green-700  hover:bg-green-600 cursor-not-allowed  disabled: text-white font-bold py-2 px-4 rounded"
                    >
                      Activated
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
