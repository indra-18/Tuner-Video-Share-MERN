import React from "react";
import Navbar from "../Navbar";
import userIcon from '../../assets/userIcon.jpg';
import playIcon from '../../assets/playIcon.png'

const SearchedList = () => (
  <div>
    {/* <Navbar /> */}
    {/* <div className="grid grid-cols-12 gap-2 gap-y-4 max-w-6xl">
      <div className="col-span-12 sm:col-span-6 md:col-span-3"> */}
    <div className="flex flex-col relative w-[210px] h-[140px]">
      <div className="relative">
        <img
          src="https://picsum.photos/seed/59/312/201"
          className="w-full h-full rounded-[10px]"
        />
        <img
          src={userIcon}
          className="absolute bottom-2 right-2 rounded-full max-h-[30px] max-w-[30px]"
        />
        <img src={playIcon} className="absolute top-2 right-2 rounded-full max-h-[30px] max-w-[30px]" />
      </div>
      <div className="absolute left-1 bottom-2 text-gray-200 text-[8px] mt-1">20 May 2023</div>
      <div className="absolute bottom-2 left-14 text-gray-200 text-[8px] px-1 py">4 min</div>
      <div className="absolute bottom-2 left-24 text-gray-200 text-[8px] mt-1">241K views</div>
    </div>
    {/* </div>
    </div> */}
  </div>
);
{
  /* <video className="w-96" controls>
  <source src="" type="video/mp4">
</video> */
}

export default SearchedList;
