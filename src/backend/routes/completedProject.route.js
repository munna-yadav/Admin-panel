import { Router } from "express";
import { createProject, deleteProject, getAllProjects, updateProject } from "../controllers/projects.controller.js";

const router = Router()

router.route("/create-project").post(createProject)
router.route("/getDetails").get( getAllProjects )
router.route("/updateProject").put(updateProject)
router.route("/deleteProject").delete(deleteProject)

export default router