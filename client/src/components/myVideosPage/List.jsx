import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../contextApi/appContext";
import { getById } from "../../services/nodeApi";
import Loader from "../Loader";
import { VideoContext } from "../../contextApi/VideoContextApi";
import axios from "axios";
import VideoCard from "../VideoCard";

const List = ({ handleSelectedVideo }) => {
  const { updatedList, handleFetchedUserVideos, fetchedUserVideos } = useContext(VideoContext);
  const [userVideos, setUserVideos] = useState([]);
  const [showRecent, setShowRecent] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    setIsLoading(true);
    const fetchUserVideos = async (userId) => {
      const myVideos = await axios.get(`${import.meta.env.VITE_NODE_API}api/v1/auth/userVideos/${userId}`);
      setUserVideos(myVideos.data.userVideos);
    };
    fetchUserVideos(auth.user._id);
  }, [updatedList]);

  useEffect(() => {
    const fetchVideos = async () => {
      const updatedfetchedVideos = await Promise.all(
        userVideos.map(async (id) => {
          const video = await getById(id);
          return video;
        })
      );
      if (updatedfetchedVideos[0] === null) {
        updatedfetchedVideos.shift();
      }
      handleFetchedUserVideos(updatedfetchedVideos);
      setIsLoading(false);
    };
    if (userVideos.length > 0) {
      fetchVideos();
    }
  }, [userVideos]);

  return (
    <div className="w-1/2 bg-[#0F121FF5] max-sm:w-full">
      <div className="mx-6 flex justify-between items-baseline mt-3">
        <p className="text-white">My Videos</p>
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="text-white focus:outline-none font-medium rounded-lg text-sm px-4 pb-2.5 pt-1 text-center inline-flex items-center"
          type="button"
          onClick={() => setShowRecent((prev) => !prev)}
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
      {!isLoading ? (
        !showRecent ? null : (
          <ul className="sm:grid sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:gap-4">
            {fetchedUserVideos.map((card) => (
              <li
                key={card._id}
                className="flex items-center max-sm:mb-3"
                onClick={() => {
                  handleSelectedVideo(card);
                }}>
                <VideoCard card={card} />
              </li>
            ))}
          </ul>
        )
      ) :
        <Loader />}
    </div>
  );
};

export default List;