import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import routes from "./routes/routes.js"
import { dbConnect } from "./config/db.js"
import cookieParser from "cookie-parser"
dotenv.config()
const app = express()
dbConnect()
const allowedOrigin = process.env.FRONTEND_URL?.split(",")

app.use(cors({
    origin:(origin,callback)=>{
        if(!origin || allowedOrigin.includes(origin)){
            callback(null,true)
        }
        else{
            callback(new Error("Not allowed by CORS"), false);
        }
    },
    credentials:true

}))
app.use(express.json())
app.use(cookieParser())
app.use("/api",routes)



app.get("/",(req ,res)=>{
    res.send(`<h1>Hi From Crypto Stream</h1>`)
})

app.listen(process.env.PORT,()=>{
    console.log("App is running",process.env.PORT)
})