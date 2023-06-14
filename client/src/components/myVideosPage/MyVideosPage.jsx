import React, { useState } from 'react'
import Navbar from '../Navbar'
import List from './List'
import Edit from './Edit'
import Upload from '../Upload'

const MyVideosPage = () => {
  const [selectedVideo, setSelectedVideo] = useState('');
  const [updatedList, setUpdatedList] = useState(0);

  const handleSelectedVideo = (videoId) => {
    setSelectedVideo(videoId)
  }
  const handleUpdatedList = () => {
    setUpdatedList(prev => prev+1)
  }
  return (
    <div>
      <Navbar />
      <div className='flex relative max-sm:flex-col'>
        <List handleSelectedVideo={handleSelectedVideo} updatedList={updatedList} />
        <Edit handleSelectedVideo={handleSelectedVideo} selectedVideo={selectedVideo} 
        handleUpdatedList={handleUpdatedList}/>
        <Upload />
      </div>
    </div>
  )
}

export default MyVideosPage
