import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import { setTodoList } from '../redux/features/todoListSlice';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import EditingModal from '../components/EditingModal';
import { ToastContainer, toast } from 'react-toastify';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(false);
  const [read,setRead] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodoValue,setEditingTodoValue] = useState([])

  const token = localStorage.getItem('token');
const [userName ,setUsername] = useState("")
const dispatch = useDispatch()
const { modalState } = useSelector(state=>state.modal)
const {userDetails} = useSelector(state=>state.user)

useEffect(()=>{

if(userDetails.username === import.meta.env.VITE_APP_NAME){
  toast(import.meta.env.VITE_APP_LOGIN_MESSAGE, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
}
},[])

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const { username } = JSON.parse(user);
      setUsername(username);
    }
  }, []);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
    },
  };

  const getTodos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/todos`, config);
      dispatch(setTodoList(response.data.todos))
      // setTodos(response.data.todos.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);


  const handleRead = (todo) => {
    if(read === false){
      setRead(true)
    }else{
      setRead(false)
    }
  }
  

  const editingTodo = (todo) =>{
    setEditingTodoValue(todo)
  }

  
  return (
    <>
    <div className={`${modalState ? "":""}`}>
    {userName==import.meta.env.VITE_APP_NAME ?
     <div style={{
       backgroundImage: "url('/bgmk.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }}  className={` ${isModalOpen === true ? "blur-sm": ""} lg:px-44   h-screen px-5 flex flex-col  gap-y-4 items-center`}>
      <Navbar />
      <TodoForm  editingTodoValue={editingTodoValue} editTodo={editTodo} setEditTodo={setEditTodo} setTodos={setTodos} />
      <TodoItem editingTodo={editingTodo} 
      isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
       setEditTodo={setEditTodo} read={read} handleRead={handleRead} setTodos={setTodos} todos={todos }  />
    </div> :  
     <div className={` ${isModalOpen === true ? "blur-sm": ""} lg:px-44   h-screen px-5 flex flex-col  gap-y-4 items-center`}>
      <Navbar />
      <TodoForm  editingTodoValue={editingTodoValue} editTodo={editTodo} setEditTodo={setEditTodo} setTodos={setTodos} />
      <TodoItem editingTodo={editingTodo} 
      isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
      setEditTodo={setEditTodo} read={read} handleRead={handleRead} setTodos={setTodos} todos={todos }  />
    </div>}
      </div>
      {/* {modalState && (
        <EditingModal
          setTodos={setTodos}
          setIsModalOpen={setIsModalOpen}
          todo={"todo"}
        />
      )} */}
             <ToastContainer
position="top-center"
autoClose={3000}
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
