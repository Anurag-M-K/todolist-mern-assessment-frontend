import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(false);
  const [read,setRead] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodoValue,setEditingTodoValue] = useState([])

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const getTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/todos', config);
      setTodos(response.data.todos.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);


  const handleRead = (todo) => {
    console.log("read ",todo)
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
    <div className={` ${isModalOpen === true ? "blur-sm": ""} lg:px-44 px-5 flex flex-col justify-center gap-y-4 items-center`}>
      <Navbar />
      <TodoForm  editingTodoValue={editingTodoValue} editTodo={editTodo} setEditTodo={setEditTodo} setTodos={setTodos} />
      <TodoItem editingTodo={editingTodo} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setEditTodo={setEditTodo} read={read} handleRead={handleRead} setTodos={setTodos} todos={todos }  />
    </div>
  );
}

export default TodoList;
