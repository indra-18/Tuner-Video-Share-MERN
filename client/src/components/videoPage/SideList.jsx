import React, { useContext, useEffect, useState } from 'react'
import { VideoContext } from '../../contextApi/VideoContextApi';
import { Link, useLocation, useParams } from 'react-router-dom';
import userIcon from '../../assets/userIcon.jpg';
import playIcon from '../../assets/playIcon.png'

const SideList = () => {
  const [recommendedList, setRecommendedList] = useState([])
  const { videoId } = useParams();
  const location = useLocation();
  const { searchResults } = useContext(VideoContext);

  const isFromSearch = location.pathname.includes('searchlist')

  useEffect(() => {
    if (isFromSearch && videoId) {
      setRecommendedList(searchResults)
    }
  }, [videoId])

  
  return (
    <div className='w-1/3 bg-[#0F121FF5]'>
      <aside className=' ml-6 mt-12 w-4/5'>
      <ul className=" m-8 grid grid-row-3 gap-4">
        {recommendedList.map((card) => (
          <li key={card._id} className="flex items-center">
            <Link to={`/searchlist/video/${card._id}`}>
              <div className="relative w-full h-38 w-">
                <video className="w-full h-full object-cover rounded">
                  <source src={card.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <img src={userIcon} className="absolute bottom-2 right-2 rounded-full max-h-6 max-w-6" />
                <img src={playIcon} className="absolute top-2 right-2 rounded-full max-h-6 max-w-6" />
                <div style={{ maxWidth: "50%", overflowWrap: "break-word", wordWrap: "break-word", wordBreak: "break-word" }} className=" absolute left-1 bottom-12 text-white font-bold text-justify text-xs mt-1">{card.title}</div>
                <div className="absolute bottom-2 left-2 flex justify-start items-baseline">
                <div className="ml-2 text-gray-200 text-xs mt-1">{card.date}</div>
                <div className="ml-2 text-gray-200 text-xs px-1 py">{card.duration} Mins</div>
                <div className="ml-2 text-gray-200 text-xs mt-1">{card.views} Views</div>
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
