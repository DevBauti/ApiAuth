import userSchema from '../../model/model.js'
import jwt from 'jsonwebtoken'


const isAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) return next('Please login to access the data')
        const verify = await jwt.verify(token, process.env.SECRET_KEY)
        req.user = await userSchema.findById(verify.id)
        next()
    } catch (error) {
        return next(error)
    }
}

export default isAuth