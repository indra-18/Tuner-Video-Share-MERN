import React, { useContext, useEffect, useState } from "react";
import "./Intro.css";
import { getAllVideos } from "../../services/nodeApi";
import { VideoContext } from "../../contextApi/VideoContextApi";
import Loader from "../Loader";
import HomeCarousel from "./HomeCarousel";
import VideoCard from "../VideoCard";
import { Link } from "react-router-dom";

const Content = () => {
  const [banner, setBanner] = useState("");
  const [name, setName] = useState("View all");
  const { handleSetAllVideos, updatedList, allVideos } = useContext(VideoContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getVideos = async () => {
      try {
        setIsLoading(true);
        const response = await getAllVideos();
        const reversedResponse = response.reverse();
        handleSetAllVideos(reversedResponse);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    getVideos();
  }, [updatedList]);

  const handleViewButton = () => {
    if (banner) {
      setBanner("");
    } else {
      setBanner("class");
    }
    if (name === "View all") {
      setName("View less");
    } else {
      setName("View all");
    }
  };

  const getCard = (card) => (
    <li key={card._id} className="flex items-center">
      <Link to={`/home/video/${card._id}`}>
        <VideoCard card={card} />
      </Link>
    </li>
  )

  return (
    <>
      <HomeCarousel />
      {!isLoading ? (
        <div className={`video-content ${banner ? "relative translate-y-[-125px]" : ""}`}>
          <div className="btns">
            <div className="recent">Recent</div>
            <div className="view-all" onClick={handleViewButton}>
              {name}
            </div>
          </div>
          <div className="videos">
            <ul 
            className=" ml-8 mr-8 mb-8  gap-4 block sm:grid sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:gap-4 ">
              {!banner
                ? allVideos.slice(0, 4).map((card) => {
                    return getCard(card);
                  })
                : allVideos.map((card) => {
                    return getCard(card);
                  })}
            </ul>
          </div>
        </div>
      ) : <Loader />}
    </>
  );
};
export default Content;
