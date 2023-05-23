import React, { useEffect, useState } from 'react'
import userIcon from '../../assets/userIcon.jpg'
import { getById } from '../../services/nodeApi'
import { useParams } from 'react-router-dom'

const MainVideo = () => {
  const [video, setVideo] = useState({})
  const { videoId } = useParams();

  useEffect(() => {
    const getVideo = async (videoId) => {
      try {
        const result = await getById(videoId)
        setVideo(result)
      } catch (err) {
        console.log(err.message)
      }
    }
    getVideo(videoId)
  }, [videoId])

  return (
    <div className='w-2/3 bg-[#0F121FF5] max-sm:w-full'>
      <div className=' mt-12 ml-12'>
        <div className=' w-full h-auto rounded-lg'>
          <video src={video.video} controls autoPlay className=' rounded-lg w-full h-full' />
        </div>
        <div className=' w-full flex justify-between items-center min-h-[80px] bg-[#000000]'>
          <div className='flex'>
            <img src={userIcon} className=" ml-1 rounded-full max-h-6 max-w-6" />
            <div 
            style={{ maxWidth: "50%", overflowWrap: "break-word", wordWrap: "break-word", wordBreak: "break-word" }} 
            className=" ml-3 text-white font-bold text-justify text-xs mt-1"
            >{video.title}</div>
          </div>
          <div className='flex items-baseline'>
            <div className=" pr-6 text-gray-200 text-xs mt-1">{video.date}</div>
            <div className=" pr-6 text-gray-200 text-xs px-1 py">{video.duration} Mins</div>
            <div className=" pr-6 text-gray-200 text-xs mt-1">{video.views} Views</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainVideo
