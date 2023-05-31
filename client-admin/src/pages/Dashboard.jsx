import { useState, useEffect } from 'react';
import { fetchPosts } from '../store/actions/postAction';
import { fetchCategories } from '../store/actions/categoryAction';
import { useSelector, useDispatch } from 'react-redux';

import PostTable from '../components/PostTable';
import AddButton from '../components/AddButton';
import PostForm from '../components/PostForm';
import useModal from '../hooks/useModal';
import Lottie from 'lottie-react';
import loaders from '../assets/loading.json';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { open, show, hide } = useModal(false);

  const data = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);
  const categories = useSelector((state) => state.category.categories);

  // Post Form -----------------
  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    categoryId: '',
    imgUrl: '',
    tags: [],
  });

  // Edit Post -----------------
  const handlePostEdit = (post) => {
    setPostForm(post);
  };

  // Add Post -----------------
  const handleAdd = () => {
    setPostForm({
      title: '',
      content: '',
      categoryId: '',
      imgUrl: '',
      tags: [],
    });
    show();
  };

  // Use effect ---------------
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchCategories());
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-end">
          <div onClick={handleAdd}>
            <AddButton text="ADD NEW POST" />
          </div>
        </div>

        <table className="table-auto w-full border-x border-t">
          <thead className="border-b">
            <tr className="bg-black">
              <th className="text-left p-4 font-medium w-10">#</th>
              <th className="text-left p-4 font-medium">Title</th>
              <th className="text-left p-4 font-medium">Content</th>
              <th className="text-center p-4 font-medium">Image</th>
              <th className="text-center p-4 font-medium">Category</th>
              <th className="text-center p-4 font-medium">Author</th>
              <th className="text-center p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {data.map((post, index) => (
              <PostTable key={post.id} index={index} show={show} onPostEdit={handlePostEdit} post={post} />
            ))}
          </tbody>
        </table>
      </div>
      <PostForm open={open} onClose={hide} categories={categories} postForm={postForm} setPostForm={setPostForm} />
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
