import React, { useState, useEffect } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import EditingModal from "./EditingModal";
import axios from "axios";
import { setTodoList } from "../redux/features/todoListSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { setModelState } from "../redux/features/modalSlice";

function TodoList({ todo, handleDelete, setTodos, setEditTodo }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Add this state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { todoList } = useSelector((state) => state?.todoList);

  const editingTodo = (todo) => {
    setIsModalOpen(!isModalOpen);
    dispatch(setModelState(true))
  };

  const handleDeleteClick = async () => {
    try {
      setIsDeleting(true);
      await handleDelete(todo); // Call the handleDelete function and pass the todo item
       // Retrieve the updated list of todos
       const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/todos`,
        config
      );
      dispatch(setTodoList(response.data.todos));
      setIsDeleting(false);
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
    }
  };

  const handleEdit = (todo) => {
    setEditTodo(todo);
    setIsEditing(true); // Set the editing state to true
  };

  useEffect(() => {
    const handleCloseModal = (event) => {
      // Check if the click target is outside the modal
      if (event.target.id === "authentication-modal") {
        setIsModalOpen(false);
      }
    };

    // Attach the event listener
    window.addEventListener("click", handleCloseModal);

    // Clean up the event listener
    return () => {
      window.removeEventListener("click", handleCloseModal);
    };
  }, []);

  const handleReadTodo = async (todo) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };

    try {
      // Update the specific todo
     const res = await axios.patch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/todo/${todo._id}`,
        {},
        config
      );
      toast(res.data.message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

      // Retrieve the updated list of todos
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/todos`,
        config
      );
      dispatch(setTodoList(response.data.todos));
    } catch (error) {
      console.error("Error handling read todo: ", error);
    }
  };
  return (
    <>
      <div className="sm:border-2  grid md:grid-cols-3 grid-cols-1 items-center">
        {todo?.read === true ? (
          <><span
            onClick={() => handleReadTodo(todo)}
            className="text-gray-400 hover:text-gray-400 flex justify-center cursor-pointer m-1 md:m-0"
          >
            <BsFillCheckCircleFill size={20} />
          </span><span
            onClick={() => editingTodo(todo)}
            className={`text-blue-00 flex justify-center cursor-pointer hover:text-blue-800  md:border-t-0 md:border-l-2 border-l-0  md:border-r-2 border-r-0 m-1 md:m-0 ${isEditing ? "line-through" : ""}`}
          >
              <HiPencil size={24} />
            </span>
            <span
              className={`text-red-00 flex justify-center cursor-pointer  hover:text-red-700 md:border-t-0 m-1 md:m-0 ${isDeleting ? "rotate  " : ""}`}
              onClick={handleDeleteClick}
            >
              <MdDelete size={24} />
            </span></>
        ) : (
          <><span
              onClick={() => handleReadTodo(todo)}
              className="text-gray-600 hover:text-gray-600 flex justify-center cursor-pointer m-1 md:m-0"
            >
              <BsFillCheckCircleFill size={20} />
            </span><span
              onClick={() => editingTodo(todo)}
              className={`text-blue-600 flex justify-center cursor-pointer hover:text-blue-800  md:border-t-0 md:border-l-2 border-l-0  md:border-r-2 border-r-0 m-1 md:m-0 ${isEditing ? "line-through" : ""}`}
            >
                <HiPencil size={24} />
              </span>
              <span
                className={`text-red-600 flex justify-center cursor-pointer  hover:text-red-700 md:border-t-0 m-1 md:m-0 ${isDeleting ? "rotate " : ""}`}
                onClick={handleDeleteClick}
              >
                <MdDelete size={24} />
              </span></>
        )}

 
      </div>
      {isModalOpen && (
        <EditingModal
          setTodos={setTodos}
          setIsModalOpen={setIsModalOpen}
          todo={todo}
        />
      )}
                <ToastContainer
position="bottom-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </>
  );
}

export default TodoList;
