import axios from 'axios'

const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL
})


export const fetchMessages = () => api.get("/messages")
export const sendMessageREST = (data) => api.post("/messages",data)