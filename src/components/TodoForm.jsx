import React, { useState, useEffect } from 'react';
import { IoMdSend } from 'react-icons/io';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function TodoForm({ setTodos, editTodo, setEditTodo }) {
  const [isRotating, setIsRotating] = useState(false);
  const initialValues = {
    todo: '',
  };

  console.log("edittod ",editTodo,setEditTodo)

  const validationSchema = Yup.object({
    todo: Yup.string().required('Todo is required'),
  });

  useEffect(() => {
    if (editTodo) {
      initialValues.todo = editTodo.todo;
    }
  }, [editTodo]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: token,
        },
      };

      setIsRotating(true);

      if (editTodo) {
        await axios.put(`http://localhost:8080/api/todos/${editTodo._id}`, values, config);
        setTodos((prevTodos) =>
          prevTodos.map((todo) => {
            if (todo._id === editTodo._id) {
              return { ...todo, todo: values.todo };
            }
            return todo;
          })
        );
        setEditTodo(null);
      } else {
        await axios.post('http://localhost:8080/api/todos', values, config);
        const response = await axios.get('http://localhost:8080/api/todos', config);
        setTodos(response.data.todos);
      }

      setIsRotating(false);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="box py-7 px-4 md:w-[60%] w-full border bg-white shadow-lg shadow-left shadow-right shadow-top shadow-bottom rounded-lg">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <div className="flex w-full">
            <Field
              className="border-2 mx-3 w-full p-3 rounded-md"
              placeholder="Enter ToDo"
              type="text"
              name="todo"
            />
            <button
              type="submit"
              className={`bg-blue-800 rounded-[4px] me-4 box hover:scale-90 duration-300 ease-in-out cursor-pointer flex items-center p-4 ${
                isRotating ? 'rotate' : ''
              }`}
            >
              <IoMdSend color="white" size={20} />
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default TodoForm;
