import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Formik , Form }  from 'formik';
import { TextField } from "./TextField";
import * as Yup from 'yup';
import toast , {Toaster} from "react-hot-toast";
import axios from 'axios';

function SignupForm() {
  const [loading, setLoading ] = useState(false)
  const navigate = useNavigate()
  const validate = Yup.object({
    username:Yup.string().max(15, "username must be 15 charecters of less").required("Username is required"),
    email:Yup.string().email( "Email is invalid").required("Email is required"),
    password:Yup.string().min(6, "Password must be atleast 6 charecters").required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true)
      const response = await axios.post('http://localhost:8080/api/signup', values); 
      setLoading(false)

      toast.success("Registered successfully")
      navigate("/login")
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    <div className="md:px-44 px-5 flex flex-col justify-center gap-y-4 items-center">
      <Navbar />
    </div>
      <div className="  py-6 flex flex-col justify-center  sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r hidden sm:flex from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl  m-5 sm:m-0 sm:p-20">
            <div className="max-w-md mx-auto min-w-[300px]">
              <div>
                <h1 className="text-2xl font-semibold">
                 Register here
                </h1>
              </div>
              <div className="divide-y divide-gray-200">
    <Formik 
    initialValues={{
      username:"",
      email:"",
      password:""
    }}
    validationSchema={validate}
    onSubmit={handleSubmit}
    >
      {formik => (
        
        <Form>

                
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <TextField
                      name="username"
                      type="text"
                    />
                    <label
                      for="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Your name
                    </label>
                  </div>
                  <div className="relative">
                  <TextField
                       name="email"
                       type="text"
                    />
                    <label
                      for="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                  <TextField
                       name="password"
                       type="password"
                    />
                    <label
                      for="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative flex justify-between items-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 hover:scale-95 duration-500 text-white rounded-md px-2 py-1">
                      {loading===true ? "Submiting..." : "Submit"}
                    </button>
                  <Link to={'/login'}> <small className="text-blue-700 hover:text-blue-400 cursor-pointer ">Already have account</small></Link> 
                  </div>
                </div>
                </Form>
                 )}
      </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster/>
    </>
  );
}

export default SignupForm;
