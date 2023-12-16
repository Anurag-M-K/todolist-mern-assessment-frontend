import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import { formatDistanceToNow } from 'date-fns';
import {useDispatch,useSelector} from 'react-redux'
import { setTodoList } from '../redux/features/todoListSlice';
import { ToastContainer, toast } from 'react-toastify';

function TodoItem({ todos, setTodos, handleRead, read, setEditTodo, isModalOpen, setIsModalOpen, editingTodo }) {
  const [isRotating, setIsRotating] = useState(false);
  const [highlightedTodo, setHighlightedTodo] = useState(null);
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch()

  const { todoList } = useSelector((state)=>state.todoList)


  const handleDelete = async (todo) => {
    try {
      // Make an API call to delete the todo
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      };

      // Send a DELETE request to the server
      setIsRotating(true);

      const res = await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/todos/${todo._id}`, config);
      toast('Todo Deleted successfully', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/todos`, config);
      dispatch(setTodoList(response.data.todos))

      setTodos(response.data.todos);
      setIsRotating(false);

    } catch (error) {
      console.log(error);
      // Handle error case if deletion fails (e.g., display an error message)
    }
  };
  

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const { username } = JSON.parse(user);
      setUserName(username);
    }
  }, []);

  console.log("todo",todoList)

  // sort todo  by time
  const sortedTodo = [...todoList].sort((a,b)=>new Date(b.timestamp) - new Date(a.timestamp))
  return (
<div className={`box ${sortedTodo.length !== 0 ? "p-5 border-2" : "p-0 border-none"} opacity-80 md:w-[60%] w-full overflow-y-scroll bg-white shadow-lg rounded-lg mb-5`}>
      {/* <h3 className='text-2xl font-medium'>The Todos:</h3> */}
      {sortedTodo?.map((todo, i) => (
        
        <div
          key={i}
          className={`border-2 flex items-center ${todo.read === true ? 'border-gray-200 text-gray-300' : 'border-gray-300'} my-5 p-4 rounded-md grid grid-cols-4`}
        >
          <div className="col-span-3">
            <h3 className={`font-medium text-[20px] flex items-center ${todo.read === true  ? 'line-through text-gray-400' : ''}`}>
              {todo?.todo}
            </h3>
          </div>
          <TodoList
          editingTodo={editingTodo}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
            setEditTodo={setEditTodo}
            setTodos={setTodos}
            isRotating={isRotating}
            todo={todo}
            handleDelete={handleDelete}
          />
        </div>
      ))}
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

export default TodoItem;
