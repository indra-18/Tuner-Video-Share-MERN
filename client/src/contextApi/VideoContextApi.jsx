import React, { createContext, useState } from 'react'

export const VideoContext = createContext(null)

const VideoContextProvider = ({children}) => {
    const [searchResults, setSearchResults] = useState([]);
    const [showUpload, setShowUpload] = useState(false);


    return <VideoContext.Provider value={{
        searchResults,
        searchVideo: (videos) => {
            setSearchResults(videos)
        },
        showUpload,
        handleShowUpload: (command) => {
            setShowUpload(command)
        }

    }}>
        {children}
    </VideoContext.Provider>
}

export default VideoContextProvider
