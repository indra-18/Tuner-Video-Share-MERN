import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../contextApi/appContext";
import playIcon from "../../assets/playIcon.png";
import userIcon from "../../assets/userIcon.jpg";
import { getById } from "../../services/nodeApi";

const List = ({ handleSelectedVideo }) => {
  const [allVideos, setAllVideos] = useState([]);
  const [showRecent, setShowRecent] = useState(true)
  const [auth] = useAuth();
  const myVideos = auth.user.myVideos;

  useEffect(() => {
    const fetchVideos = async () => {
      const updatedAllVideos = await Promise.all(
        myVideos.map(async (id) => {
          const video = await getById(id);
          return video;
        })
      );
      setAllVideos(updatedAllVideos);
    };
    fetchVideos();
  }, [myVideos]);

  return (
    <div className="w-1/2 bg-[#0F121FF5]">
      <div className=" mx-6 flex justify-between items-baseline mt-3">
        <p className="text-white">My Videos</p>
        <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-white focus:outline-none font-medium rounded-lg text-sm px-4 pb-2.5 pt-1 text-center inline-flex items-center"
                type="button"
                onClick={() => setShowRecent(prev => !prev)}
              >
                Recent
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
      </div>
      {
        !showRecent ? null : (
          <ul className=" grid grid-cols-2 gap-3">
        {allVideos.map((card) => (
          <li key={card._id} className="flex items-center"
          onClick={() => {handleSelectedVideo(card._id)}}
          >
              <div className=" relative w-5/6 ml-6 h-auto">
                <video className="w-full h-full object-cover rounded hover:border-[#C4B4F8] hover:border-4">
                  <source src={card.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <img
                  src={userIcon}
                  className="absolute bottom-2 right-2 rounded-full max-h-6 max-w-6"
                />
                <img
                  src={playIcon}
                  className="absolute top-2 right-2 rounded-full max-h-6 max-w-6"
                />
                <div
                  style={{
                    maxWidth: "50%",
                    overflowWrap: "break-word",
                    wordWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                  className=" absolute left-1 bottom-12 text-white font-bold text-justify text-xs mt-1"
                >
                  {card.title}
                </div>
                <div className="absolute bottom-2 left-2 flex justify-start items-baseline">
                  <div className="ml-2 text-gray-200 text-xs mt-1">
                    {card.date}
                  </div>
                  <div className="ml-2 text-gray-200 text-xs px-1 py">
                    {card.duration} Mins
                  </div>
                  <div className="ml-2 text-gray-200 text-xs mt-1">
                    {card.views} Views
                  </div>
                </div>
              </div>
          </li>
        ))}
      </ul>
        )
      }
    </div>
  );
};
export default List;


