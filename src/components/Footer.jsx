import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserLogout, setUserDetails } from '../redux/features/userSlice';

function Footer() {
    const { userDetails } = useSelector((state) => state.user);

  return (
    <div className={`box flex justify-center items-center w-full p-4  bg-blue-700 ${userDetails ? "bg-opacity-60":""} shadow-lg text-white`}>
     <div>

      <h4 className='text-center'>a_y_m_k</h4>
     </div>
    </div>
  );
}

export default Footer;
  