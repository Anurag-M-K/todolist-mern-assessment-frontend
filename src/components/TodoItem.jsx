import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import { formatDistanceToNow } from 'date-fns';
import {useDispatch,useSelector} from 'react-redux'
import { setTodoList } from '../redux/features/todoListSlice';

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

      const res = await axios.delete(`http://localhost:8080/api/todos/${todo._id}`, config);
      const response = await axios.get('http://localhost:8080/api/todos', config);
      dispatch(setTodoList(response.data.todos))

      setTodos(response.data.todos);
      setIsRotating(false);

      // Perform any additional actions after successful deletion (e.g., update the state or display a success message)
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

                // const handleReadClick = (todo) => {
                //   setHighlightedTodo(todo);
                //   handleRead(todo); // Call the handleRead function and pass the todo item
                // };

  return (
    <div className="box p-5 opacity-80 md:w-[60%] w-full border-2 overflow-y-scroll bg-white shadow-lg rounded-lg mb-5">
      <h3 className='text-2xl font-medium'>The Todos:</h3>
<<<<<<< HEAD
      {todoList?.map((todo, i) => (
=======
      {todos?.map((todo, i) => (
>>>>>>> b2154311b919d32c2df2d6cb581a97170d035fcf
        
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
          {/* <div>
            <p className='text-sm  text-gray-400'>Author: {userName}</p>
            <p className='text-sm  text-gray-400'>Added: {formatDistanceToNow(new Date(todo.timestamp), { addSuffix: true })}</p>
          </div> */}
        </div>
      ))}
    </div>
  );
}

export default TodoItem;
