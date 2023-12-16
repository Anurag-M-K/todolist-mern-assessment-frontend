import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";
import {userSlice} from "./features/userSlice";
import {todoListSlice} from "./features/todoListSlice";


const persistConfig = {
    key:"root",
    version:1,
    storage
};
const reducer = combineReducers({
    user:userSlice.reducer,
    todoList:todoListSlice.reducer


})


const persistedReducer = persistReducer(persistConfig,reducer);

export default configureStore({
    reducer:persistedReducer
});
