import React, { useState } from 'react'
import "./card.css"
import playIcon from "../../assets/playIcon.png";
import {Link} from "react-router-dom"

const Card = ({data, videoData})=> {
  return (
    <>
      <Link to={`/home/video/${data._id}`}>
     <div className='card' >
        <video src={data.video}/>
        <div className='btn'>
            <img src={playIcon} alt='img not'/>
        </div>
        <h3>{data.tittle}</h3>
    </div> </Link>
    
    </>
  )
}
export default Card