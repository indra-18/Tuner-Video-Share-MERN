import React from 'react'
import Navbar from '../Navbar'
import Intro from './Intro'
import Upload from '../Upload'

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className='relative'>
        <Intro />
        <Upload />
      </div>
    </div>
  )
}

export default Home
