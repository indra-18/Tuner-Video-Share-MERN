import React, { useContext, useEffect, useState } from "react";
import Card from "./card";
import "./Intro.css";
import axios from "axios";
import { getAllVideos } from "../../services/nodeApi";
import { VideoContext } from "../../contextApi/VideoContextApi";

const Content = () => {
  const [banner, setBanner] = useState("");
  const [name, setName] = useState("View all");
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const { handleSetAllVideos } = useContext(VideoContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_NODE_API}video`)
      .then((res) => {
        setData(res.data);
        setVideoData(res.data);
      })
      .catch((err) => {
        window.alert("Vidoes are unavailable to load");
      });

    const getVideos = async () => {
      try {
        const result = await getAllVideos();
        handleSetAllVideos(result);
      } catch (err) {
        console.log(err.message);
      }
    };
    getVideos();
  }, []);

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
   
    return (<>
        <div className={`banner${banner}`} id="height">
          
            {!toggle?<>
            <img src="https://s1.dmcdn.net/v/QQG701T4FrD60Fc9W/x1080" onClick={()=>setToggle(true)} className="img1" alt=""/> 
            <div className="details">
                <h1>{data.slice(0,1).map((data,key)=>{return data.title})}</h1>
                <div className="span">
                    <span>21 May 2023 </span>
                    <span>Last 1 hour </span>
                    <span>186k Views </span>
                </div>
            </div></>:
            <>
             <video src={data.slice(0,1).map((data,key)=>{return data.video})} onClick={()=>setToggle(false)} controls autoPlay/>
             </>
            }

            
        </div>   

        <div className="video-content">
            <div className="btns">
                <div className="recent">
                    Recent
                </div>
                <div className="view-all" onClick={handleViewButton}>
                    {name}
                </div>
            </div>
            <div className="videos">            
                {!banner? data.slice(0,5).map((data,key) => {
                       return <Card data={data} videoData={videoData}/>
                    }):
                    data.map((data) => {
                       return <Card data={data} videoData={videoData}/>
                    })
                }
            </div>
        </div>
    </>
  );
}};
export default Content;
