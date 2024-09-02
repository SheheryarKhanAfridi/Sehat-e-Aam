import Swal from 'sweetalert2';
const alerts = () => {
  const confirmAlert = () => {
    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton: 'ml-3 bg-green-500 text-white px-4 py-2 rounded',
        cancelButton: 'bg-red-500 text-white px-4 py-2 rounded',
      },
      buttonsStyling: false,
    });

    return swalWithTailwindButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Verify this user',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    });
  };

  const basicAlert = (title, message, type) => {
    Swal.fire({
      title: title,
      text: message,
      icon: type,
    });
  };

  return { confirmAlert, basicAlert };
};

export default alerts;
