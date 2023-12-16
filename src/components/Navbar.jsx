import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserLogout, setUserDetails } from '../redux/features/userSlice';

function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.user);

  const handleSignOut = () => {
    dispatch(setUserLogout());
    dispatch(setUserDetails(''));
    dispatch(setUserDetails(""))
    navigate('/login');
  };

  return (
    <div className="box flex justify-between items-center w-full p-4 m-3 bg-blue-700 bg-opacity-60 shadow-lg text-white">
      <h1 className="lg:text-4xl font-serif font-bold text-2xl">TODO</h1>
      {userDetails.username ? (
        <h3 className="hidden sm:flex">Logged in as {userDetails?.username}</h3>
      ) : (
        ''
      )}
      {userDetails ? (
        <button onClick={handleSignOut} className="mx-5 hover:text-gray-300">
          SIGNOUT
        </button>
      ) : (
        <button onClick={() => navigate('/login')} className="mx-5 hover:text-gray-300">
          LOGIN
        </button>
      )}
    </div>
  );
}

export default Navbar;
  