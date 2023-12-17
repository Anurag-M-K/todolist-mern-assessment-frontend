import { createSlice } from "@reduxjs/toolkit";


export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalState: false,
  },
  reducers: {
    setModelState: (state, action) => {
        console.log("action payload ",action.payload)
      state.modalState = action.payload;
    },

  },
});

export const modelState = (state) => state.todo.todo;

export const { setModelState } = modalSlice.actions;

export default modalSlice.reducer;
