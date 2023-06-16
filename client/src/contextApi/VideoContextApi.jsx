import React, { createContext, useState } from 'react'

export const VideoContext = createContext(null)

const VideoContextProvider = ({children}) => {
    const [searchResults, setSearchResults] = useState([]);
    const [showUpload, setShowUpload] = useState(false);
    const [allVideos, setAllVideos] = useState([])
    const [updatedList, setUpdatedList] = useState(0);

    return <VideoContext.Provider value={{
        updatedList,
        handleUpdatedList : () => {
            setUpdatedList(prev => prev+1)
        },
        searchResults,
        searchVideo: (videos) => {
            setSearchResults(videos)
        },
        showUpload,
        handleShowUpload: (command) => {
            setShowUpload(command)
        },
        allVideos,
        handleSetAllVideos: (videos) => {
            setAllVideos(videos)
        }
    }}>
        {children}
    </VideoContext.Provider>
}

export default VideoContextProvider
