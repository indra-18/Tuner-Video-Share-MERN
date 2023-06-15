import React ,{useContext, useState}from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contextApi/appContext';
import { toast } from 'react-toastify';
import { searchByTitle } from '../services/nodeApi';
import { VideoContext } from '../contextApi/VideoContextApi';

const Navbar = () => {
  const [toggle, setToggle]= useState(false);
  const [auth , setAuth] = useAuth();
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)
  const { searchVideo, handleShowUpload } = useContext(VideoContext)
  const [searchText, setSearchText] = useState('')
  const navigate = useNavigate()

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    notifyB("Logout Successfully");
  };

  const search = async (searchText) => {
    try {
      const result = await searchByTitle(searchText);
      if (result.length === 0) return notifyA('Search Results Not Found')
      searchVideo(result);
      navigate('/searchlist')
    } catch (err) {
      console.log(err.message)
    }
  };


  return (
<nav className=" bg-black">
  <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
    <div className="flex justify-between h-16">
      <div className="flex">
        <div className="flex-shrink-0 flex items-center">
          <NavLink to="/" className='text-purple-300 text-3xl font-bold'>
            Tuner
          </NavLink>
        </div>
      </div>
      <div className="flex">
        <div className="mt-2 ml-2 md:ml-6 md:flex md:items-center text-white">
          <input type="text" 
          placeholder="Search" 
          className="px-4 py-2 border-white rounded-full text-white w-60 ml-4 md:w-96 bg-gray-700 md:mt-0 mt-2 h-9" 
          onChange={(e) => {
            setSearchText(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              search(searchText)
            }
          }}
          value={searchText}
          />
        </div>
      </div>
      <div className="mx-2 flex items-center sm:hidden">
        <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
         aria-label="Main menu" aria-expanded="false" onClick={()=>{
          setToggle(!toggle)
         }}>
          <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
  
  {!auth?.user ? (<div className="invisible md:visible">
    <div className="flex gap-3 mt-3">
      <NavLink to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white">Login</NavLink>
      <p className="block px-3 py-2 rounded-md text-base font-medium text-gray-300">|</p>
      <NavLink to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white">Register</NavLink>
    </div>
  </div>) : (<div className="invisible sm:visible">
    <div className="flex gap-3 mt-3">
      <NavLink to="/myvideos" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white">My Videos</NavLink>
      <p className="block px-3 py-2 rounded-md text-base font-medium text-gray-300">|</p>
      <NavLink to="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white"
      onClick={() => handleShowUpload(true)}
      >Upload</NavLink>
      <p className="block px-3 py-2 rounded-md text-base font-medium text-gray-300">|</p>
      <NavLink to="/" onClick={handleLogout} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white">Sign out</NavLink>
    </div>
  </div>)}
  </div>
  </div>
 {toggle && !auth?.user && <div className="md:hidden" id="mobile-menu">
  <div className="px-2 pt-2 pb-3 space-y-1">
      <NavLink to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white">Login</NavLink>
      <NavLink to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white ">Register</NavLink>
    </div>
</div>}
{toggle && auth?.user && <div className="sm:hidden" id="mobile-menu">
  <div className="px-2 pt-2 pb-3 space-y-1">
      <NavLink to="/myvideos" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white">My Videos</NavLink>
      <NavLink to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white"
      onClick={() => handleShowUpload(true)}
      >Upload</NavLink>
      <NavLink to="/" onClick={handleLogout} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white">Sign out</NavLink>
   </div>
</div>}
</nav>
  )
}

export default Navbar
