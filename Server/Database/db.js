import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;
const MONGO_URL=process.env.MONGO_URL

const Connection=()=>{
    const URL= MONGO_URL
    try{
        mongoose.connect(URL)
        console.log("Database connected Sucessfully")
    } catch(error){
         console.log('Error while conecting with the database',error.message);
    }
}
export default Connection;


