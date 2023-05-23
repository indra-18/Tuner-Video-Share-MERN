import axios from 'axios'

export const postVideo = async (userId, videoData) => {
    try {
        const response = await axios.post(`http://localhost:4943/video/${userId}`, videoData)
        return response
    } catch (err) {
        return err.message
    }
}

export const searchByTitle = async (query) => {
    try {
        const response = await axios.get(`http://localhost:4943/video/search?q=${query}`)
        return response.data.result
    } catch (err) {
        return err.message
    }
}

export const getById = async (videoId) => {
    try {
        const response = await axios.get(`http://localhost:4943/searchlist/video/${videoId}`)
        return response.data.result
    } catch (err) {
        return err.message
    }
}

export const updateVideo = async (userId, videoId, videoData) => {
    try {
        const response = await axios
                            .put(`http://localhost:4943/video/${userId}/${videoId}`, videoData)
        return response.data.result
    } catch (err) {
        return err.message
    }
}

export const deleteVideo = async (userId, videoId) => {
    try {
        const response = await axios.delete(`http://localhost:4943/video/${userId}/${videoId}`)
        return response.data.result
    } catch (err) {
        return err.message
    }
}