import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

let { Schema, model } = mongoose
let saltwork = 10

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [4, 'Name should be minimum of 4 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [4, 'Password should be minimum of 4 characters']
    },
    token: {
        type: String
    }
})

userSchema.pre("save", async function save(next) {
    try {
        const salt = await bcrypt.genSaltSync(saltwork)
        this.password = await bcrypt.hash(this.password, salt)
        return next()
    } catch (error) {
        console.log(error);
    }
})

userSchema.methods.comparePassword = function comparePassword(data) {
    return  bcrypt.compareSync(data, this.password)
}


export default model('User', userSchema)
