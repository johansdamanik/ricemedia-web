import { useDispatch } from 'react-redux';
import { deleteCategory } from '../store/actions/categoryAction';
import { showError, showSuccess } from '../hooks/swalModal';

export default function CategoryTable(props) {
  const dispatch = useDispatch();
  const { show, category, index, onCategoryEdit } = props;

  const formattedDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const handleDeleteCategory = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Deleting the category will also delete related posts.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory(id))
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
        <td className="p-4 font-semibold">{category.name}</td>
        <td className="p-4 font-semibold text-center">{formattedDate(category.createdAt)}</td>
        <td className="p-4 font-semibold text-center">{formattedDate(category.updatedAt)}</td>
        <td className="p-4">
          <div className="flex justify-center items-center">
            <button
              className="bg-black text-white m-1 px-2 py-1 hover:bg-gray-800"
              onClick={() => {
                onCategoryEdit(category);
                show();
              }}
            >
              EDIT
            </button>
            <button className="bg-red-500 text-white m-1 px-2 py-1 hover:bg-red-400" onClick={() => handleDeleteCategory(category.id)}>
              DELETE
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
