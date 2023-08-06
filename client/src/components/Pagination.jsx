import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VideoCard from "./VideoCard";

const Pagination = ({ videos, source, videosPerLoad }) => {
  const [visibleVideos, setVisibleVideos] = useState([]);

  useEffect(() => {
    setVisibleVideos(videos.slice(0, videosPerLoad));
  }, [videos]);

  const handleShowMore = () => {
    const nextEndIndex = visibleVideos.length + videosPerLoad;
    setVisibleVideos(videos.slice(0, nextEndIndex));
  };

  return (
    <>
      <ul className=" m-8  gap-4 block sm:grid sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:gap-4">
        {visibleVideos.map((card) => (
          <li key={card._id} className="flex items-center">
            <Link to={`/${source}/video/${card._id}`}>
              <VideoCard card={card} />
            </Link>
          </li>
        ))}
      </ul>
      {visibleVideos.length < videos.length && (
        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={handleShowMore}
            className="text-white hover:bg-violet-500 font-bold py-3 px-20 bg-[#7e73a3] rounded-[28px]"
          >
            Show More
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
