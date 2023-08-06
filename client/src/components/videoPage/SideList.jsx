import React, { useContext, useEffect, useState } from 'react'
import { VideoContext } from '../../contextApi/VideoContextApi';
import { useLocation, useParams } from 'react-router-dom';
import Pagination from '../Pagination';

const SideList = () => {
  const [recommendedList, setRecommendedList] = useState([])
  const { videoId } = useParams();
  const location = useLocation();
  const { searchResults, allVideos } = useContext(VideoContext);

  const isFromSearch = location.pathname.includes('searchlist')

  useEffect(() => {
    if (isFromSearch && videoId) {
      setRecommendedList(searchResults)
    } else {
      setRecommendedList(allVideos)
    }
  }, [videoId])
  
  return (
    <div className='w-full lg:w-1/3 bg-[#0F121FF5]'>
      <aside className='mr-4 ml-4 mt-4 lg:ml-6 lg:mt-12 w-4/5 h-screen lg:h-[calc(100vh-8rem)] md:overflow-y-scroll '>
      <Pagination videos={recommendedList} source={isFromSearch ? 'searchlist' : 'home'} videosPerLoad={12}/>
      </aside>
    </div>
  )
}

export default SideList
