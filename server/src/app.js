import express from 'express'

import cors from 'cors'


import errorHandler from './middleware/error.middleware.js';
import messageRoutes from './routes/message.route.js'

const app = express()

app.use(cors({
    origin : process.env.CLIENT_URL
}))
app.use(express.json())
app.use(express.urlencoded())


app.use("/api/v1/messages", messageRoutes);

app.use(errorHandler)









app.use(errorHandler)

export default app