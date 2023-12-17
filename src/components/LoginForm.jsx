import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUserDetails } from "../redux/features/userSlice";
import { ToastContainer, toast } from 'react-toastify';
import Footer from "./Footer";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading ] = useState(false)
  const dispatch = useDispatch()


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/login`, {
        email,
        password,
      });
      console.log("rsponse ",response )
      toast(response.data.message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      dispatch(setUserDetails(response?.data?.user))
      dispatch(setToken(response?.data?.token))

      setLoading(false)
      // Save the token and user details in local storage or state
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect to the desired page
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen grid grid-rows-3">
      <div className="md:px-44   px-5 flex flex-col  justify-start gap-y-4 items-center">
        <Navbar />
      </div>
      <div  className=" flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r hidden sm:flex from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-xl border rounded-lg  sm:rounded-3xl m-5 sm:m-0 sm:p-20">
            <div className="max-w-md mx-auto min-w-[300px] p-3 sm:p-0 ">
              <div>
                <h1 className="text-3xl uppercase text-center font-medium ">Login</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base  leading-6  sm:space-y-4  space-y-8 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="peer  placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className=" flex justify-center  items-center">
                    <button
                      type="submit"
                      className="bg-blue-500 w-full hover:bg-blue-600 hover:scale-95 duration-500 text-white rounded-md px-2 py-1"
                      onClick={handleSubmit}
                    >
                     {loading === true ? "Login..." : "Login"}
                    </button>
                  </div>
                  <div className="flex justify-end">

                    <Link to={"/signup"}>
                      <small className="text-blue-700 hover:text-blue-400 cursor-pointer">
                        Don't have an account?
                      </small>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="md:px-44   flex flex-col justify-end gap-y-4 items-center">
        <Footer />
      </div>   
      <ToastContainer
position="bottom-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>

    </div>
  );
}

export default LoginForm;
