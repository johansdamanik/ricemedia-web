import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showError, showSuccess } from '../hooks/swalModal';
import { registerAdmin } from '../store/actions/userAction';

export default function RegisterPage() {
  const dispatch = useDispatch();

  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((form) => ({
      ...form,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAdmin(registerForm))
      .then(() => {
        showSuccess('addAdmin');
        setRegisterForm({
          username: '',
          email: '',
          password: '',
          phone: '',
          address: '',
        });
      })
      .catch((error) => {
        showError(error);
      });
  };

  return (
    <>
      <div className="flex items-center justify-center z-50">
        <div className="bg-white p-8 relative z-10 w-2/4">
          <h2 className="text-2xl mb-4 text-white bg-black uppercase font-semibold p-2 text-center">Register New Admin</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="username"
                        value={registerForm.username}
                        onChange={handleInputChange}
                        placeholder="Input username or full name"
                        className="block w-full border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></input>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                    <div className="mt-2">
                      <input
                        type="email"
                        name="email"
                        value={registerForm.email}
                        onChange={handleInputChange}
                        placeholder="Input email"
                        className="block w-full border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></input>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div className="mt-2">
                      <input
                        type="password"
                        name="password"
                        value={registerForm.password}
                        onChange={handleInputChange}
                        placeholder="Input password"
                        className="block w-full border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></input>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="phone"
                        value={registerForm.phone}
                        onChange={handleInputChange}
                        placeholder="eg: 0812 2223..."
                        className="block w-full border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></input>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Address</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="address"
                        value={registerForm.address}
                        onChange={handleInputChange}
                        placeholder="eg: Jl. Meranti No. 4..."
                        className="block w-full border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Link to="/">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                  Cancel
                </button>
              </Link>
              <button type="submit" className="bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
