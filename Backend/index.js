import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import userRouter from './component/routers/userRouter.js'
import connectDatabase from './component/database/db.js';
dotenv.config();

// Connect to database
connectDatabase();

const app = express()
app.use
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    }
))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})



// use userRouter
app.use('/api/v1/', userRouter) 
