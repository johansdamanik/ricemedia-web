import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function Homepage() {
  return (
    <>
      <div className="flex min-h-screen flex-row bg-white text-white">
        <Sidebar />
        <main className="main -ml-64 flex flex-grow flex-col p-6 transition-all duration-150 ease-in md:ml-0 bg-white">
        <Outlet />
        </main>
      </div>
    </>
  );
}
