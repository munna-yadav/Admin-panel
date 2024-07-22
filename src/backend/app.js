import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        Credential: true,
      }
))
app.use(express.json())
app.use(cookieParser())



// import routers

import userRouter   from "./routes/user.route.js"
import completedProjectRouter from './routes/completedProject.route.js';

app.use("/api/v1/users",userRouter);
app.use("/api/v1/completed-projects",completedProjectRouter)

export {app}