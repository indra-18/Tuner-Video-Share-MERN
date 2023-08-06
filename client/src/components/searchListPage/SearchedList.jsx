import React, { useContext } from "react";
import Navbar from "../Navbar";
import { VideoContext } from "../../contextApi/VideoContextApi";
import Upload from "../Upload";
import Pagination from "../Pagination";

const SearchedList = () => {
  const { searchResults } = useContext(VideoContext);

  return (
    <div className="bg-[#0F121FF5] w-full h-screen max-sm:h-full max-sm:bg-[#0F121FF5]">
      <Navbar />
      <div className="relative">
        <Pagination videos={searchResults} source={'searchlist'} videosPerLoad={12}/>
        <Upload />
      </div>
    </div>
  );
};

export default SearchedList;
