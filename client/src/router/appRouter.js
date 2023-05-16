import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../components/homePage/Home'
import Register from '../components/registerPage/Register'
import Login from '../components/loginPage/Login'
import VideoPage from '../components/videoPage/VideoPage'
import MyVideosPage from '../components/myVideosPage/MyVideosPage'
import SearchedList from '../components/searchListPage/SearchedList'

const appRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />}/>
            <Route path='/myvideos' element={<MyVideosPage />}/>
            <Route path='/searchlist' element={<SearchedList />}/>
            <Route path='/video' element={<VideoPage />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default appRouter
