import {Router} from 'express';
import { createAboutUs, editAboutUs, getAboutUs } from '../controllers/aboutUs.controller.js';


const router = Router()

router.route("/get-about-us").get(getAboutUs)
router.route("/create-about-us").post(createAboutUs)
router.route("/edit-about-us").put(editAboutUs)


export default router