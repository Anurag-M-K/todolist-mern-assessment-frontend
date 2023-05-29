import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

function EditingModal({ todo ,setIsModalOpen, setTodos }) {

    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };

    const getTodos = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/todos', config);
          console.log("response ",response)
          setTodos(response.data.todos);
        } catch (error) {
          console.log(error);
        }
      };
    


  const onSubmit = async(values) => {
      try {
        setLoading(true)
    const res = await axios.put(`http://localhost:8080/api/edit-todo/${todo._id}`, values,config);
    getTodos();
    setIsModalOpen(false)
    setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      todo: '',
    },
    onSubmit,
  });

  const handleModalClick = (e) => {
    e.stopPropagation(); // Stop click event propagation
  };

  return (
    <>
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed  flex justify-center items-center  z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        onClick={handleModalClick} // Handle click event to prevent closing
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white " onClick={()=>setIsModalOpen(false)}
              data-modal-hide="authentication-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 text-center dark:text-white">
                Edit your Todo
              </h3>
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                action="#"
              >
                <div>
                  <input
                    type="text"
                    name="todo"
                    value={values.todo}
                    onChange={handleChange}
                    id="password"
                    placeholder={todo.todo}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>


                <button
                  type="submit"
                  className="w-full mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                {loading ? "Updating..." : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditingModal;
