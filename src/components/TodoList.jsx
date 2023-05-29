import React, { useState, useEffect } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import EditingModal from "./EditingModal";

function TodoList({ todo, handleDelete, handleRead ,setTodos,setEditTodo}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Add this state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const editingTodo = (todo) => {
    setIsModalOpen(!isModalOpen);
    console.log(todo);
  };

  const handleDeleteClick = async () => {
    try {
      setIsDeleting(true);
      await handleDelete(todo); // Call the handleDelete function and pass the todo item
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

  return (
    <div className="border-2 grid md:grid-cols-3 grid-cols-1 items-center">
      <span
        onClick={() => handleRead(todo)}
        className="text-gray-500 hover:text-gray-600 flex justify-center cursor-pointer m-1 md:m-0"
      >
        <BsFillCheckCircleFill size={20} />
      </span>
      <span
        onClick={() => editingTodo(todo)}
        className={`text-blue-600 flex justify-center cursor-pointer hover:text-blue-800 border-t-2 md:border-t-0 md:border-l-2 border-l-0  md:border-r-2 border-r-0 m-1 md:m-0 ${
          isEditing ? "line-through" : ""
        }`}
      >
        
        <HiPencil size={24} />
      </span>
      <span
        className={`text-red-600 flex justify-center cursor-pointer border-t-2 hover:text-red-700 md:border-t-0 m-1 md:m-0 ${
          isDeleting ? "rotate" : ""
        }`}
        onClick={handleDeleteClick}
      >
        <MdDelete size={24} />
      </span>
        
      {isModalOpen && <EditingModal className=""  setTodos={setTodos} setIsModalOpen={setIsModalOpen} todo={todo} />}
      </div>
  );
}

export default TodoList;
