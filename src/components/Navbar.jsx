import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('');
  console.log(userName)

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const { username } = JSON.parse(user);
      setUserName(username);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="box flex justify-between items-center w-full p-4 m-3 bg-blue-700 shadow-lg text-white">
      <h1 className="lg:text-4xl text-2xl">toDoApp;</h1>
     {
      userName ?  <h3 className="hidden sm:flex">Logged in as {userName}</h3> : ""
     }
     {
      userName ?  <button onClick={handleSignOut} className="mx-5 hover:text-gray-300" >
      SIGNOUT
    </button> :  <button onClick={()=>navigate("/login  ")} className="mx-5 hover:text-gray-300" >
        LOGIN
      </button>
     }
    </div>
  );
}

export default Navbar;
