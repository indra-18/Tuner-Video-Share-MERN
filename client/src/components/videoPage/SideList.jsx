import React, { useContext, useEffect, useState } from 'react'
import { VideoContext } from '../../contextApi/VideoContextApi';
import { Link, useLocation, useParams } from 'react-router-dom';
import userIcon from '../../assets/userIcon.jpg';
import playIcon from '../../assets/playIcon.png'

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
  console.log(recommendedList)
  
  return (
    <div className='w-full lg:w-1/3 bg-[#0F121FF5]'>
      <aside className='mr-4 ml-4 mt-4 lg:ml-6 lg:mt-12 w-4/5 h-screen lg:h-[calc(100vh-8rem)] md:overflow-y-scroll '>
      <ul className=" lg:m-8 grid grid-row-3 gap-4">
        {recommendedList.map((card) => (
          <li key={card._id} className="flex items-center"
          onClick={window.scrollTo(0, 0)}
          >
            <Link to={`/${isFromSearch ? 'searchlist' : 'home'}/video/${card._id}`}>
              <div className="relative w-full h-auto max-md:flex">
                <div className='relative'>
                  <video className="w-full h-full object-cover rounded hover:border-[#C4B4F8] hover:border-4">
                    <source src={card.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <img src={playIcon} className="max-sm:hidden absolute top-2 right-2 rounded-full max-h-6 max-w-6"/>
                  <img src={userIcon} className="max-sm:hidden absolute bottom-2 right-2 rounded-full max-h-6 max-w-6" />
                </div>
                <div className=' max-lg:bg-black max-md:py-1 max-md:px-2'>
                  <div className='max-lg:block'>
                    <div className='flex justify-between '>
                      <div style={{ maxWidth: "50%", overflowWrap: "break-word", wordWrap: "break-word", wordBreak: "break-word" }} className="max-md:hidden ml-1 lg:absolute sm:left-1 sm:bottom-12 text-white font-bold text-justify text-xs mt-1">{card.title}</div>
                      <div  className=" ml-1 md:hidden lg:absolute sm:left-1 sm:bottom-12 text-white font-bold text-justify text-xs mt-1">{card.title}</div>
                    </div>
                  </div>
                  <div className='max-lg:block'>
                    <div className=" lg:absolute lg:bottom-2 left-2 flex justify-start items-baseline">
                        <div className="ml-2 text-gray-200 text-xs mt-1">{card.date}</div>
                        <div className="ml-2 text-gray-200 text-xs px-1 py">{card.duration} Mins</div>
                        <div className="ml-2 text-gray-200 text-xs mt-1">{card.views} Views</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      </aside>
    </div>
  )
}

export default SideList
