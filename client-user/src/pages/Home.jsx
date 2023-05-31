import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/actions/postAction';

import HeadersCard from '../components/HeadersCard';
import HighlightCard from '../components/HighlightCard';
import NewsCard from '../components/NewsCard';

export default function Main() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(fetchPosts()).then(() => {});
  }, []);

  return (
    <>
      <div className="bg-white min-h-screen flex justify-between items-center">
        <div className="pt-12">
          {posts.slice(posts.length - 1).map((post) => (
            <HeadersCard post={post} key={post.id} />
          ))}

          <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-3">
            {posts.slice(0, 3).map((post) => (
              <HighlightCard key={post.id} post={post} />
            ))}
          </div>

          <hr />
          <div className="text-5xl font-extrabold ml-8 py-4"> TERBARU</div>
          <hr />

          <div className="w-full md:w-full lg:w-4/6 ">
            {posts.map((post) => (
              <NewsCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
