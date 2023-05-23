// import React, { useState } from 'react'
// import "./card.css"
// import playIcon from "../../assets/playIcon.png";
// import {Link} from "react-router-dom"

// const Card = ({data, videoData})=> {
//   return (
//     <>
//       <Link to={`/home/video/${data._id}`}>
//      <div className='card' >
//         <video src={data.video}/>
//         <div className='btn'>
//             <img src={playIcon} alt='img not'/>
//         </div>
//         <h3>{data.tittle}</h3>
//     </div> </Link>
    
//     </>
//   )
// }
// export default Card
import React, { useState } from 'react'
import "./Card.css"
import Videoplayer from "./VideoPlayer"

const Card = ({data, videoData})=> {
    const [toggle,setToggle] = useState(false)
  return (
    <>{!toggle?
    <div className='card' onClick={()=>{setToggle(true)}}>
        <video src={data.video} />
        <div className='btn'>
            <img src='https://png.pngtree.com/png-vector/20190419/ourmid/pngtree-vector-play-icon-png-image_956416.jpg' alt='img not'/>
        </div>
        <h3>{data.tittle}</h3>
    </div>:
    <Videoplayer setToggle={setToggle} data={data} videoData={videoData}/>
    }

    
    </>
  )
}
export default Card