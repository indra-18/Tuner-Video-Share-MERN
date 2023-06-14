import React ,{useState}from 'react'
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate, useLocation} from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contextApi/appContext";

import './Login.css';

const Login = () => {
  const [auth,setAuth]= useAuth();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const location = useLocation();
  

  const notifyA = (msg) => toast.error(msg)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_NODE_API}api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        notifyA(res.data.message);
      }
    } catch (error) {
      console.log(error);
      notifyA("Something went wrong");
    }
  };

  return (
   <div className="h-screen flex">
  <div className="hidden lg:flex w-full lg:w-1/2 login_img_section
    justify-around items-center">
    <div className=" 
            bg-black 
            opacity-20 
            inset-0 
            z-0">
    </div>
    <div className="w-full mx-auto px-20 space-y-6">
      <h1 className=" text-8xl font-normal text-purple-400" id='marginT'>Tuner</h1>
      <p className="text-white text-4xl" id='margin'>Enjoy Multiple videos</p>
      <p className="text-white text-4xl" id='marginp'>at one place</p>

      <div className="mt-40 pt-36">
        <NavLink to="/register" className=" hover:text-indigo-800 hover:-translate-y-1 transition-all duration-500 text-white text-2xl mt-40 font-normal mb-2 underline" id='paddingT'>
        Register</NavLink>
      </div>
    </div>
  </div>
  <div className="flex w-full lg:w-1/2 justify-center items-center bg-gray-800 space-y-8" id='widthF'>
    <div className="w-full px-8 md:px-32 lg:px-24">
      <form className="bg-gray-800 rounded-md p-5" onSubmit={handleSubmit}>
        <h1 className=" font-bold text-3xl mb-1 text-center text-white">Sign In</h1>
        <p className="text-lg text-center font-normal  mb-8 text-white">Sign in to continue access pages</p>
        <div className="flex items-center border-b-2 mb-8 py-2 px-3 ">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
          <input id="email" className=" pl-2 w-full outline-none bg-gray-800 text-white" type="email" name="email" placeholder="Email Address" onChange={(e)=>{
            setEmail(e.target.value)
          }} value={email} />
        </div>
        <div className="flex items-center border-b-2 mb-12 py-2 px-3 ">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <input className="pl-2 w-full outline-none border-none bg-gray-800 text-white" type="password" name="password" id="password" placeholder="Password" 
            onChange={(e)=>{
            setPassword(e.target.value)
          }} value={password}
          />
        </div>
        <button type="submit" className="block w-32  my-10 py-2  ml-40 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2 bg-purple-400">Login</button>
        
      </form>
    </div>
  </div>
</div>

  )
}

export default Login
