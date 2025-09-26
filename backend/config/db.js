import mongoose from "mongoose";

export const dbConnect = async ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Database connection successful"))
    .catch((error)=>{
        console.log("Database connection failed : ",error)
        process.exit(1)
    })

}