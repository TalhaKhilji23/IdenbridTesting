import React, {useState} from "react";
import { Auth } from "aws-amplify";
// import "./App.css";
import { Link } from "react-router-dom";

import { useNavigate } from 'react-router-dom';

function LogIn() {

//   Auth.signUp({
//     username:"hamza2.idenbrid@gmail.com",
//     password:"HamzaAshfaq01"
//   })

// //   Auth.confirmSignUp(email,  otp)

//   Auth.signIn({
//     username:"Hamza",
//     password: "as"
//   })


// Auth.forgotPassword(username)
// Auth.forgotPasswordSubmit(username,otp. pass)
const navigate = useNavigate();


const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleLogIn = async (event) => {
    event.preventDefault();
    console.log("Email Login:", email);
    console.log("Password Login :", pass);

    try {
      const response = await Auth.signIn({
        username: email,
        password: pass,
      });
      // On successful signup, navigate to confirm signup
      if(response){
        navigate('/todolist');
      } // Use absolute path
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen rounded-md bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form className="space-y-4" onSubmit={handleLogIn}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}

              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              autoComplete="current-password"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <Link to={'/forgotpassword'}>
            
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
            </Link>
          </div>
          <div>


        
          <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
               
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
