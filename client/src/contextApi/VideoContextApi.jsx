import React, { createContext, useState } from 'react'

export const VideoContext = createContext(null)

const VideoContextProvider = ({children}) => {
    const [searchResults, setSearchResults] = useState([]);

    return <VideoContext.Provider value={{
        searchResults,
        searchVideo: (videos) => {
            setSearchResults(videos)
        }
    }}>
        {children}
    </VideoContext.Provider>
}

export default VideoContextProvider
