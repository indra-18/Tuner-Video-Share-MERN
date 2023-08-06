import React, { useRef } from "react";
import userIcon from '../assets/userIcon.jpg';
import playIcon from '../assets/playIcon.png';

const VideoCard = ( { card } ) => {
  const videoRef = useRef();

  const isMouseEntered = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
    }
  };
  
  const isMouseLeft = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
      <div className="relative w-full h-auto max-md:flex"
      onMouseEnter={isMouseEntered}
      onMouseLeave={isMouseLeft}
      >
        <div className="relative">
          <video 
          muted
          playsInline
          loop
          preload="none"
          ref={videoRef}
          poster={card.thumbnail}
          className=" w-full h-full object-cover rounded hover:border-[#C4B4F8] hover:border-4">
            <source src={card.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <img
            src={playIcon}
            className="max-sm:hidden absolute top-2 right-2 rounded-full max-h-6 max-w-6"
          />
          <img
            src={userIcon}
            className="max-sm:hidden absolute bottom-2 right-2 rounded-full max-h-6 max-w-6"
          />
        </div>
        <div className=" max-lg:bg-black max-md:py-1 max-md:px-2">
          <div className="max-lg:block">
            <div className="flex justify-between ">
              <div
                style={{
                  maxWidth: "50%",
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                }}
                className="max-md:hidden ml-1 lg:absolute sm:left-1 sm:bottom-12 text-white font-bold text-justify text-xs mt-1"
              >
                {card.title}
              </div>
              <div className=" ml-1 md:hidden lg:absolute sm:left-1 sm:bottom-12 text-white font-bold text-justify text-xs mt-1">
                {card.title}
              </div>
            </div>
          </div>
          <div className="max-lg:block">
            <div className=" lg:absolute lg:bottom-2 left-2 flex justify-start items-baseline">
              <div className="ml-2 text-gray-200 text-xs mt-1">{card.date}</div>
              <div className="ml-2 text-gray-200 text-xs px-1 py">
                {card.duration} Mins
              </div>
              <div className="ml-2 text-gray-200 text-xs mt-1">
                {card.views} Views
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default VideoCard;
