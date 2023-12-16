import { createSlice } from "@reduxjs/toolkit";


export const todoListSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: [],
  },
  reducers: {
    setTodoList: (state, action) => {
        console.log("action payload ",action.payload)
      state.todoList = action.payload;
    },

  },
});

export const todoState = (state) => state.todo.todo;

export const { setTodoList } = todoListSlice.actions;

export default todoListSlice.reducer;
