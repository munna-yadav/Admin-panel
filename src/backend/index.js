import { connectDB } from "./db/db.js";
import { app } from "./app.js";

connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("App listening on port:", process.env.PORT);
    })
})
.catch((error)=>{
    console.log("monogdb connection error:",error);
})