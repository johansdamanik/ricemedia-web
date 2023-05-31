import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Homepage() {
  return (
    <>
      <div className="w-full bg-blue-400 md:w-full xl:w-full 2xl:w-3/4 xl:mx-auto transition-all duration-300 flex flex-col justify-between">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
