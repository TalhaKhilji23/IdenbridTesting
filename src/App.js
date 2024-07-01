import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { useEffect,useState } from "react";
import SignUp from "./screens/SignUp";
import LogIn from "./screens/LogIn";
import ConfirmSignUp from "./screens/ConfirmSignUp";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";
import TodoList from "./screens/TodoList";
import ErrorPage from "./screens/ErrorPage";

import { Auth } from "aws-amplify";
import { error } from "ajv/dist/vocabularies/applicator/dependencies";
import HelloWorld from "./screens/HelloWorld";
import DraggableComp from "./screens/DraggableComp";
import StickyNavbar from "./screens/StickyNavbar";
import Footer from "./screens/Footer";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        console.log("Is Authenticated", user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      }
    };
    checkUser();
  }, []);
  return (
    <div>
      <Routes>
      <Route
          path="/"
          element={
            <>
              <StickyNavbar />

              <TodoList />
              <Footer />
            </>
          }
        />
      {/* <Route
          path="/todolist"
          element={isAuthenticated ? <>
          <StickyNavbar />
          <TodoList />
          
          
          </> : <Navigate to="/login" replace />}
        />         */}
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/navbar" element={<StickyNavbar />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/helloworld" element={<HelloWorld />} />
        <Route path="/confirmsignup" element={<ConfirmSignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/draggable" element={<DraggableComp />} />
        
        {/* Wildcard route to catch any other paths */}
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </div>
  );
}

export default App;