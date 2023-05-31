import { useEffect, useState } from 'react';
import { fetchCategories } from '../store/actions/categoryAction';
import { useSelector, useDispatch } from 'react-redux';

import AddButton from '../components/AddButton';
import CategoryForm from '../components/CategoryForm';
import useModal from '../hooks/useModal';
import Lottie from 'lottie-react';
import loaders from '../assets/loading.json';
import CategoryTable from '../components/CategoryTable';

export default function Category() {
  const dispatch = useDispatch();
  const { open, show, hide } = useModal(false);

  const data = useSelector((state) => state.category.categories);
  const loading = useSelector((state) => state.category.loading);
  const error = useSelector((state) => state.category.error);

  const [categoryForm, setCategoryForm] = useState({
    name: '',
  });

  const handleCategoryEdit = (category) => {
    setCategoryForm(category)
  };

  const handleAdd = () => {
    setCategoryForm({
      name: ''
    })
    show()
  }

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-end">
          <div onClick={handleAdd}>
            <AddButton text="ADD NEW CATEGORY" />
          </div>
        </div>
        <table className="table-auto w-full border-x border-t">
          <thead className="border-b">
            <tr className="bg-black">
              <th className="text-left p-4 font-medium w-24">#</th>
              <th className="text-left p-4 font-medium">Name</th>
              <th className="text-center p-4 font-medium">Created At</th>
              <th className="text-center p-4 font-medium">Updated At</th>
              <th className="text-center p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {data.map((category, index) => (
              <CategoryTable category={category} show={show} onCategoryEdit={handleCategoryEdit} key={category.id} index={index}/>
            ))}
          </tbody>
        </table>
      </div>
      <CategoryForm open={open} onClose={hide} setCategoryForm={setCategoryForm} categoryForm={categoryForm}/>
      {loading && (
        <div className="fixed flex items-center ml-8 justify-center  min-h-screen mx-auto w-3/4">
          <div className="mb-40 flex-col">
            <Lottie animationData={loaders} loop={true} />
            <p className="text-black">Loading . . .</p>
          </div>
        </div>
      )}
      {error && (
        <div className="fixed flex items-center ml-8 justify-center  min-h-screen mx-auto w-3/4">
          <p className="text-black mb-40">Something went wrong. Try to reload the page.</p>
        </div>
      )}
    </>
  );
}
