import React from "react";
import MainVideo from "./MainVideo";
import SideList from "./SideList";
import Navbar from "../Navbar";
import Upload from "../Upload";

const VideoPage = () => {
  return (
    <>
      <Navbar />
      <div className="md:flex relative">
        <MainVideo />
        <SideList />
        <Upload />
      </div>
    </>
  );
};
export default VideoPage;
