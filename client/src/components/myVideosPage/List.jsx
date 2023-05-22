import React, { useEffect } from "react"
import { useState } from "react"
import { useAuth } from "../../contextApi/appContext"
import "./List.css"
import playIcon from "../../assets/playIcon.png";
import axios from "axios";

const List = () => {
  const [myvideo, setMyvideo] = useState([]);
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    axios.get(`http://localhost:4943/myVideo`)
        .then((res) => {
            setMyvideo(res.data)
        }).catch((err) => {
            window.alert("Vidoes are unavailable to load")
        })

}, []);
  console.log(auth)
  console.log(myvideo)

return (
   <>
     {myvideo.map((myvideo)=>{
       <div className='card' >
        <video src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" controls/>
        <div className='btn'>
          <img src={playIcon} alt='img not' />
        </div>
        <h3>title</h3>
        
      </div>
    })}
    </>
  )
}
export default List


