import React from "react";
import MainVideo from "./MainVideo";
import SideList from "./SideList";
import Navbar from "../Navbar";

const VideoPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <MainVideo />
        <SideList />
      </div>
    </>
  );
};

export default VideoPage;
