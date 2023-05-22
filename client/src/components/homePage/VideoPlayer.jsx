import React, { useState, useEffect } from 'react'
import './VideoPlayer.css'
import axios from 'axios';
import { useParams } from 'react-router-dom'

const VideoPlayer = () => {
    const [data, setData] = useState([]);
    const { videoId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:4943/home/video/${videoId}`)
            .then((res) => {
                setData(res.data)
            }).catch((err) => {
                window.alert("Vidoes are unavailable to load")
            })

    }, []);
    return (
      <>
           <div className='main'>
                <div className='left'>
                    <video src={data.video} style={{ width: "100%", height: "85%" }} controls />
                    <div className='info'>
                        <h1>{data.tittle}</h1>
                        <h4>{data.description}</h4>
                    </div>
                </div>
                </div>
          </>
          )

}

export default VideoPlayer
