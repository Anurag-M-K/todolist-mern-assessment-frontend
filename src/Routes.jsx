import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoList from "./pages/TodoList";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import PrivateRoutes from "./utils/PrivateRoutes";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <PrivateRoute path="/" element={<TodoList  />} />
         */}
        <Route exact path="/" element={<PrivateRoutes> <TodoList /></PrivateRoutes>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
