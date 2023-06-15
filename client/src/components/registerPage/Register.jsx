import React,{useState} from 'react'
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import './Register.css';


const Register = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [profession, setProfession] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  const navigate = useNavigate();
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)
  const handleSubmit = async (e) => {


    e.preventDefault();
    if (!emailRegex.test(email)) {
      notifyA("Invalid email")
      return
    } else if (!passRegex.test(password)) {
      notifyA("Password must contain at least 8 characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!")
      return
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_NODE_API}api/v1/auth/register`, {
        name,
        email,
        profession,
        phone,
        password,
        confirmPassword,
        
      },{'Content-Type':'application/json'});
      if (res && res.data.success) {
        notifyB(res.data && res.data.message);
        navigate("/login");
      } else {
        notifyA(res.data.message);
      }
    } catch (error) {
      console.log(error);
      notifyA("Something went wrong");
    }
  };

  return (
    
<div className="h-screen md:flex w-full">
  
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
        <NavLink to="/login" className=" hover:text-indigo-800 hover:-translate-y-1 transition-all duration-500 text-white text-2xl mt-40 font-normal mb-2 underline" id='paddingT'>
        Sign In</NavLink>
      </div>
      </div>
  </div>
  {/* </div> */}
  <div className="flex md:w-1/2 justify-center py-10 items-center bg-gray-800" id='padding'>
    <form className="bg-gray-800 px-3" onSubmit={handleSubmit}>
      <h1 className="text-white font-bold text-3xl mb-1 text-center">Register</h1>
      <p className="text-lg font-normal text-white mb-4 text-center">Register to continue access pages</p>
      <div className='w-14 h-14 border-2 ml-24 rounded-full m text-white flex justify-center align-center'><p className='mt-3'>+</p></div>
      <div className="flex items-center border-b-2 py-2 px-3 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
        <input className="pl-2 outline-none bg-gray-800 border-none text-white px-5" type="text" name="name" id="name" placeholder="Full name" value={name}
              onChange={(e) => setName(e.target.value)} required />
      </div>
      
      <div className="flex items-center border-b-2 py-2 px-3  mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
        </svg>
        <input className="pl-2 outline-none border-none bg-gray-800 text-white" type="text" name="email" id="email" placeholder="Email Address" value={email}
              onChange={(e) => setEmail(e.target.value)} required/>
      </div>
      <div className="flex items-center border-b-2 py-2 px-3  mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 text-gray-400">
       <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
     </svg>
     <input className="pl-2 outline-none bg-gray-800 border-none px-5 text-white" type="text" name="profession" id="profession" placeholder="Profession" value={profession}
              onChange={(e) => setProfession(e.target.value)} required />
        
      </div>

      <div className="flex items-center border-b-2 py-2 px-3 mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 text-gray-400">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
</svg>


        <input className="pl-2 outline-none border-none bg-gray-800 text-white" type="text" name="phone" id="Phone" placeholder="Phone" value={phone}
              onChange={(e) => setPhone(e.target.value)} required />
      </div>
      
      <div className="flex items-center border-b-2 mb-4 py-2 px-3 ">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <input className="pl-2 w-full outline-none border-none bg-gray-800 text-white" type="password" name="password" id="password" placeholder="Password" 
            onChange={(e)=>{
            setPassword(e.target.value)
          }} value={password}
          />
        </div>
        <div className="flex items-center border-b-2 mb-4 py-2 px-3 ">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <input className="pl-2 w-full outline-none border-none bg-gray-800 text-white" type="password" name="password" id="password" placeholder="Confirm Password" 
            onChange={(e)=>{
              setConfirmPassword(e.target.value)
          }} value={confirmPassword}
          />
        </div>
      <button type="submit" className="block w-full bg-purple-400 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 hover:bg-indigo-800">Register</button>
    </form>
  </div>
</div>

  )
}

export default Register
