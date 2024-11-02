import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

const Connection=()=>{
    const URL=`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.jhpzswv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    try{
        mongoose.connect(URL)
        console.log("Database connected Sucessfully")
    } catch(error){
         console.log('Error while conecting with the database',error.message);
    }
}
export default Connection;