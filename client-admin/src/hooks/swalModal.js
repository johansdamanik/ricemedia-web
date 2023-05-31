import Swal from 'sweetalert2';

export const showError = (error) => {
  let title = error.message;
  if (error.message === 'You are not authorized') {
    title = 'You can only edit/delete posts that you created';
  }

  return Swal.fire({
    title: title,
    icon: 'error',
    confirmButtonText: 'Back',
  });
};

export const showSuccess = (message) => {
  const Toast = Swal.mixin({
    icon: 'success',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  let title;
  switch (message) {
    case 'addCategory':
      title = 'Success add new Category';
      break;

    case 'editCategory':
      title = 'Success update Category';
      break;

    case 'addPost':
      title = 'Success add new Post';
      break;

    case 'editPost':
      title = 'Success update Post';
      break;

    case 'deletePost':
      title = 'Success delete Post';
      break;

    case 'deleteCategory':
      title = 'Success delete Category';
      break;

    case 'login':
      title = 'Success login to admin panel';
      break;

    case 'addAdmin':
      title = 'Success register new admin';
      break;
    default:
      break;
  }
  return Toast.fire({ title });
};
