import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import './config/conn.js'


import userRouter from './routes/userRoutes.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/', userRouter)

let port = process.env.PORT
app.listen(port, ()=>{
    console.log(`Server listening in ${port}`);
})

