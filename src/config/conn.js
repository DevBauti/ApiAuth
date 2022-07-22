import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

let Uri = process.env.URI

mongoose.connect(Uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB on');
})
