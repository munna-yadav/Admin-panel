import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerUser, login } from "../controllers/user.controller.js";

const router =  Router()

router.route("/register").post(registerUser)

router.route("/login").post(login)
router.route("/admin").get(verifyJWT,(req,res)=>{
    res.sendFile(); 
})

export default router;
