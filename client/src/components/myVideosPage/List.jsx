import React, { useEffect } from "react"
import { useState } from "react"
import { useAuth } from "../../contextApi/appContext"
import "./List.css"
import playIcon from "../../assets/playIcon.png";
import axios from "axios";

const List = ({handleSelectedVideo}) => {
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
   <div className="w-1/2">
     {myvideo.map((myvideo)=>{
       <div className='card'>
        <video src={myvideo.video} controls/>
        <div className='btn'>
          <img src={playIcon} alt='img not' />
        </div>
        <h3>{myvideo.video}</h3>
        
      </div>
    })}
    </div>
  )
}
export default List


