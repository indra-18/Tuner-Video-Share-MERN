import React, { useContext } from "react";
import Navbar from "../Navbar";
import userIcon from "../../assets/userIcon.jpg";
import playIcon from "../../assets/playIcon.png";
import { Link } from "react-router-dom";
import { VideoContext } from "../../contextApi/VideoContextApi";
import Upload from "../Upload";

const SearchedList = () => {
  const { searchResults } = useContext(VideoContext);

  return (
    <div className="bg-[#0F121FF5] w-full h-screen max-sm:h-full max-sm:bg-[#0F121FF5]">
      <Navbar />
      <div className="relative">
        <ul className=" m-8  gap-4 block sm:grid sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:gap-4">
          {searchResults.map((card) => (
            <li key={card._id} className="flex items-center max-sm:mb-4">
              <Link to={`/searchlist/video/${card._id}`}>
                <div className="relative w-full h-auto">
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
