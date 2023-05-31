import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCategoryById } from '../store/actions/categoryAction';

import HighlightCard from '../components/HighlightCard';

export default function Topic() {
  const dispatch = useDispatch();
  const { id, categoryName } = useParams();

  const categories = useSelector((state) => state.category.category);

  useEffect(() => {
    dispatch(fetchCategoryById(id));
  }, [id]);

  return (
    <>
      <div className="bg-white min-h-screen flex justify-center items-start">
        <div className="pt-12 ">
          <div className="text-7xl font-bold mt-12 uppercase text-center my-12">{categoryName.replace(/-/g, ' ')}</div>
          {categories?.Posts?.length < 1 && (
            <p className="text-black mb-40 ml-5 mt-24">There is no article in this topic yet. Try to browse another topic.</p>
        )}
          <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-3 ">
            {categories?.Posts.map((post) => (
              <HighlightCard key={post.id} post={post} />
            ))}
          </div>
        </div>
       
      </div>
    </>
  );
}
