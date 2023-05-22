import React, { useState } from 'react'
import "./card.css"
import playIcon from "../../assets/playIcon.png";
import {Link} from "react-router-dom"

const Card = ({data, videoData})=> {
    const [toggle,setToggle] = useState(false)
  return (
    <>
    {!toggle?
     <div className='card' onClick={()=>{setToggle(true)}}>
        <video src={data.video}/>
        <div className='btn'>
            <img src={playIcon} alt='img not'/>
        </div>
        <h3>{data.tittle}</h3>
    </div> :
    <div className='main'>
        <div className='close-icon'>
            <img onClick={()=>{setToggle(false)}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/High-contrast-dialog-close.svg/768px-High-contrast-dialog-close.svg.png" alt='Not found'/>
        </div>
        <div className='left'>
            <video src={data.video} style={{width:"100%",height:"85%"}} controls/>
            <div className='info'>
                <h1>{data.tittle}</h1>
                <h4>{data.description}</h4>
            </div>
        </div>
        <div className='right'>
                {videoData.slice(0,3).map((data1,key) => {
                   return <div className='releted-content'>
                    <video src={data1.video} style={{width:"100%",height:"100%"}} />
                    <h3>{data1.tittle}</h3>
                    </div>
                })}
        </div>
    </div>}
    </>
  )
}
export default Card