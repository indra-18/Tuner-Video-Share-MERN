import React, { useContext} from "react";
import Navbar from "../Navbar";
import userIcon from "../../assets/userIcon.jpg";
import playIcon from "../../assets/playIcon.png";
import { Link } from "react-router-dom";
import { VideoContext } from "../../contextApi/VideoContextApi";

const SearchedList = () => {
  const { searchResults } = useContext(VideoContext)

  return (
    <div className="bg-[#0F121FF5] w-full h-screen">
      <Navbar />
      <ul className=" m-8 grid grid-cols-4 gap-4">
        {searchResults.map((card) => (
          <li key={card._id} className="flex items-center">
            <Link to={`/searchlist/video/${card._id}`}>
              <div className="relative w-full h-40">
                <video className="w-full h-full object-cover rounded">
                  <source src={card.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <img src={userIcon} className="absolute bottom-2 right-2 rounded-full max-h-6 max-w-6" />
                <img src={playIcon} className="absolute top-2 right-2 rounded-full max-h-6 max-w-6" />
                <div style={{ maxWidth: "50%", overflowWrap: "break-word", wordWrap: "break-word", wordBreak: "break-word" }} className=" absolute left-1 bottom-12 text-white font-bold text-justify text-xs mt-1">{card.title}</div>
                <div className="absolute left-1 bottom-2 text-gray-200 text-xs mt-1">{card.date}</div>
                <div className="absolute bottom-2 left-14 text-gray-200 text-xs px-1 py">{card.duration}</div>
                <div className="absolute bottom-2 left-24 text-gray-200 text-xs mt-1">{card.views}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchedList;
