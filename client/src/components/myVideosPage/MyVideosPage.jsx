import React, { useState } from 'react'
import Navbar from '../Navbar'
import List from './List'
import Edit from './Edit'
import Upload from '../Upload'

const MyVideosPage = () => {
  const [selectedVideo, setSelectedVideo] = useState('');

  const handleSelectedVideo = (videoId) => {
    setSelectedVideo(videoId)
  }

  return (
    <div>
      <Navbar />
      <div className='flex relative max-sm:flex-col'>
        <List handleSelectedVideo={handleSelectedVideo}/>
        <Edit handleSelectedVideo={handleSelectedVideo} selectedVideo={selectedVideo} />
        <Upload />
      </div>
    </div>
  )
}

export default MyVideosPage
