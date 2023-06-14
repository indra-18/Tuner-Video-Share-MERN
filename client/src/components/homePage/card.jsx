import React from "react";
import playIcon from "../../assets/playIcon.png";
import { Link } from "react-router-dom";
import userIcon from "../../assets/userIcon.jpg";

const Card = ({ data }) => {
  return (
    <>
      <Link to={`/home/video/${data._id}`}>
        <div className="relative w-full h-40">
          <video className="w-full h-full object-cover rounded hover:border-[#C4B4F8] hover:border-4">
            <source src={data.video} type="video/mp4" />
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
            {data.title}
          </div>
          <div className="absolute bottom-2 left-2 flex justify-start items-baseline">
            <div className="ml-2 text-gray-200 text-xs mt-1">{data.date}</div>
            <div className="ml-2 text-gray-200 text-xs px-1 py">
              {data.duration} Mins
            </div>
            <div className="ml-2 text-gray-200 text-xs mt-1">
              {data.views} Views
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
export default Card;
