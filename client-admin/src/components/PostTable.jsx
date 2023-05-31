import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../store/actions/postAction';
import { showError, showSuccess } from '../hooks/swalModal';

export default function PostTable({ post, show, index, onPostEdit }) {
  const dispatch = useDispatch();

  const handleDeletePost = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePost(id))
          .then(() => {
            showSuccess('deletePost');
          })
          .catch((error) => {
            showError(error);
          });
      }
    });
  };

  return (
    <>
      <tr className="border-b hover:bg-gray-50">
        <td className="p-4">{index + 1}</td>
        <td className="p-4 font-semibold">{post.title}</td>
        <td className="p-4">{post.content}</td>
        <td className="p-4 h-24 w-32">
          <img src={post.imgUrl} alt=""></img>
        </td>
        <td className="p-4">{post.Category.name}</td>
        <td className="p-4">{post.User.username ? post.User.username : post.User.email}</td>
        <td className="p-4">
          <div className="flex justify-center items-center">
            <button
              className="bg-black text-white m-1 px-2 py-1 hover:bg-gray-800"
              onClick={() => {
                onPostEdit(post);
                show();
              }}
            >
              EDIT
            </button>
            <button className="bg-red-500 text-white m-1 px-2 py-1 hover:bg-red-400" onClick={() => handleDeletePost(post.id)}>
              DELETE
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
