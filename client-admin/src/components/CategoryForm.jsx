import { useDispatch } from 'react-redux';
import { addCategory, editCategory } from '../store/actions/categoryAction';
import { showError, showSuccess } from '../hooks/swalModal';

export default function CategoryForm(props) {
  const dispatch = useDispatch();

  const { open, onClose, categoryForm, setCategoryForm } = props;

  const classActive = open ? 'block' : 'hidden';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryForm((form) => ({
      ...form,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryForm.id) {
      dispatch(addCategory(categoryForm))
        .then(() => {
          showSuccess('addCategory');
          onClose();
        })
        .catch((error) => {
          showError(error);
        });
    } else {
      dispatch(editCategory(categoryForm))
        .then(() => {
          showSuccess('editCategory');
          onClose();
        })
        .catch((error) => {
          showError(error);
        });
    }
  };

  const handleCancel = () => {
    setCategoryForm({
      name: '',
    });
    onClose();
  };

  return (
    <>
      <div className={`${classActive}`}>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-white p-8 relative z-10 w-1/4">
            <h2 className="text-2xl mb-4 text-black font-semibold">{categoryForm.id ? 'Edit Category' : 'Add New Category'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                      </label>
                      <div className="mt-2">
                        <input
                          name="name"
                          value={categoryForm.name}
                          onChange={handleInputChange}
                          type="text"
                          className="block w-full border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                  {categoryForm.id ? 'Save' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
