import axios from 'axios'

export const postVideo = async (userId, videoData) => {
    try {
        const response = await axios.post(`http://localhost:4943/video/${userId}`, videoData)
        return response
    } catch (err) {
        return err.message
    }
}