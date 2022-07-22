import express from "express";
import { register, login, userGetter } from "../control/userController.js";
import isAuth from '../control/middleware/auth.js'

let userRouter = express.Router()

userRouter.post('/register', register).post('/login', login).get('/user', isAuth, userGetter)

export default userRouter