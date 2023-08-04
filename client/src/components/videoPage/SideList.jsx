import React, { useContext, useEffect, useState } from 'react'
import { VideoContext } from '../../contextApi/VideoContextApi';
import { Link, useLocation, useParams } from 'react-router-dom';
import VideoCard from '../VideoCard';

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
      <ul className=" lg:m-8 grid grid-row-3 gap-4">
        {recommendedList.map((card) => (
          <li key={card._id} className="flex items-center"
          onClick={window.scrollTo(0, 0)}
          >
            <Link to={`/${isFromSearch ? 'searchlist' : 'home'}/video/${card._id}`}>
              <VideoCard card={card} />
            </Link>
          </li>
        ))}
      </ul>
      </aside>
    </div>
  )
}

export default SideList
