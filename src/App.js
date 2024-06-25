import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import SignUp from "./screens/SignUp";
import LogIn from "./screens/LogIn";
import ConfirmSignUp from "./screens/ConfirmSignUp";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";
import TodoList from "./screens/TodoList";


function App() {
  return (
    <div>
      <Routes>
   
        <Route
          path="/todolist"
          element={
         
             <TodoList/>  
                      }
        />
        <Route
          path="/signup"
          element={
         
             <SignUp/>  
                      }
        />
             <Route
          path="/login"
          element={
            <>
             <LogIn/>
            </>
          }
        />
        <Route
          path="/confirmsignup"
          element={
            <>
             <ConfirmSignUp/>
            </>
          }
        />
        <Route
          path="/forgotpassword"
          element={
            <>
             <ForgotPassword/>
            </>
          }
        />
        <Route
          path="/resetpassword"
          element={
            <>
             <ResetPassword/>
            </>
          }
        />
        {/* <Route
          path="*"
          element={
            <>
              <ErrorPage />
            </>
          }
        />
         */}

      
       
      </Routes>
    </div>
  );
}

export default App;