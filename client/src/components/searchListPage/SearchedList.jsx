import React, { useContext } from "react";
import Navbar from "../Navbar";
import { VideoContext } from "../../contextApi/VideoContextApi";
import Upload from "../Upload";
import { Link } from "react-router-dom";
import VideoCard from "../VideoCard";

const SearchedList = () => {
  const { searchResults } = useContext(VideoContext);

  return (
    <div className="bg-[#0F121FF5] w-full h-screen max-sm:h-full max-sm:bg-[#0F121FF5]">
      <Navbar />
      <div className="relative">
        <ul className=" m-8  gap-4 block sm:grid sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:gap-4">
          {searchResults.map((card) => (
                  <li key={card._id} className="flex items-center">
                  <Link to={`/searchlist/video/${card._id}`}>
                    <VideoCard card={card} />
                  </Link>
                </li>          
          ))}
        </ul>
        <Upload />
      </div>
    </div>
  );
};

export default SearchedList;
