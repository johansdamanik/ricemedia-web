import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../store/actions/categoryAction';

export default function Navbar() {
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);

  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 500) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <nav className={`bg-black h-12 flex items-center transition-all duration-300 fixed top-0 mb-12 w-full 2xl:w-3/4 ${isScrolled ? 'py-2 justify-center' : 'py-10 justify-start'}`}>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          {!isScrolled && (
            <>
              <Link to="/">
                <img src="/RICELOGOS.png" alt="" className="h-8 mx-4" />
              </Link>
              <ul className="flex space-x-4 font-bold text-lg">
                {categories.slice(0, 5).map((category) => (
                  <li key={category.id}>
                    <div className="text-white">
                      <Link to={`/topic/${category.id}/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>{category.name}</Link>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className={!isScrolled ? 'hidden' : 'text-center'}>
          <Link to="/">
            <img src="/RICELOGOS.png" alt="" className="h-8 mx-4" />
          </Link>
        </div>
        <div></div>
        <div className={`text-black mr-12 flex flex-row gap-5 ${!isScrolled ? '' : 'hidden'}`}>
          <img className="cursor-pointer" src="/facebook.svg" alt="" />
          <img className="cursor-pointer" src="/instagram.svg" alt="" />
          <img className="cursor-pointer" src="/twitter.svg" alt="" />
        </div>
      </div>
    </nav>
  );
}
