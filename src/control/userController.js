import jwt from 'jsonwebtoken'
import userSchema from '../model/model.js'


export async function register(req, res) {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) return res.json({ message: 'please enter all the details' })
        // 
        const userExists = await userSchema.findOne({ email: req.body.email })
        if (userExists) {
            return res.json({ message: 'user already exists' })
        }
        // 
        const user = new userSchema(req.body)
        await user.save(function (err) {
            if (err) throw err
        })
        // 
        let token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        })
        return res.cookie("token", token).json({ success: true, message: 'User registered successfully', data: user })
    } catch (error) {
        res.json({ error: error })
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.json({ message: 'please enter all the details' })
        //
        const foundUser = await userSchema.findOne({ email: email })
        if (!foundUser) return res.json({ message: 'Wrong credentials' })
        // 
        let validPassword = foundUser.comparePassword(password)
        if (!validPassword) return res.json({ message: 'Wrong credentials pass' })
        //  
        let token = await jwt.sign({ id: foundUser._id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        })
        return res.cookie("token", token).json({ success: true, message: 'LoggedIn successfully' })
    } catch (error) {
        res.json({ error: error })
    }
}

export async function userGetter(req, res) {
    try {
        const users = await userSchema.find().lean()
        if (!users) return res.json({ message: 'No data' })
        return res.json({ users: users })
    } catch (error) {
        res.json({ error: error })
    }
}

