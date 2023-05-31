import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ handlePageChange }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }
  return (
    <>
      <aside className="sidebar w-48 lg:w-64 min-h-screen -translate-x-full transform bg-black p-4 transition-transform duration-150 ease-in md:translate-x-0 md:shadow-md flex-shrink-0">
        <div className="my-4 w-full border-b-4 border-indigo-100 text-center mb-10">
          <span className="font-mono text-2xl tracking-widest">
            {' '}
            <span className="font-bold">RICE</span> MEDIA{' '}
          </span>
        </div>
        <Link to={'/'}>
          <div className="my-4 w-full border-b-4 border-indigo-100 text-center bg-white cursor-pointer text-black transition-transform duration-300 ease-in-out hover:translate-x-2">
            <span className="font-mono text-md font-semibold tracking-widest">
              <span>Dashboard</span>
            </span>
          </div>
        </Link>
        <Link to={'/categories'}>
          <div className="my-4 w-full border-b-4 border-indigo-100 text-center bg-white cursor-pointer text-black transition-transform duration-300 ease-in-out hover:translate-x-2">
            <span className="font-mono text-md font-semibold tracking-widest">
              <span>Category</span>
            </span>
          </div>
        </Link>

        <Link to={'/register'}>
          <div className="my-4 w-full border-b-4 border-indigo-100 text-center bg-white cursor-pointer text-black transition-transform duration-300 ease-in-out hover:translate-x-2">
            <span className="font-mono text-md font-semibold tracking-widest">
              <span>Register Admin</span>
            </span>
          </div>
        </Link>
        <br />
        <br />
        <hr />
        <div onClick={handleLogout} className="my-4 w-full border-b-4 border-indigo-100 text-center bg-white cursor-pointer text-black transition-transform duration-300 ease-in-out hover:translate-x-2">
          <span className="font-mono text-md font-semibold tracking-widest">
            <span>Logout</span>
          </span>
        </div>
        <div className="my-4"></div>
      </aside>
    </>
  );
}
