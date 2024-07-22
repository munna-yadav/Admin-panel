import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { completedProject } from "../models/completedProjects.model.js";

const createProject = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!(title || description)) {
    throw new apiError(400, "both title and description is required");
  }

  const project = await completedProject.create({
    title,
    description,
  });

  if (completedProject.findById(project._id)) {
    console.log("project Created");
  }

  return res.status(201).json(new apiResponse(201, project, "project created"));
});

const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await completedProject.find({});
  if (!projects) {
    throw new apiError(500, "error while fetching projects");
  }
  return res
    .status(200)
    .json(new apiResponse(200, projects, "All details fetched sucessfully"));
});

const updateProject = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const id = req.body._id;
  if (title == "" && description == "" && id == "") {
    throw new apiError(400, "both title and descriptions are required");
  }

  const updatedProject = await completedProject.findByIdAndUpdate(id, {
    title: title,
    description: description,
  });
  if (!updatedProject) {
    throw new apiError(500, "something went wrong");
  }

  return res
    .status(200)
    .json(new apiResponse(200, updatedProject, "project updated sucessfully"));
});

const deleteProject = asyncHandler(async(req, res) => {
 const  id = req.body._id;

  const project = await completedProject.findById(id);
  if (!project) {
    throw new apiError(400, "no such project");
  }

  await completedProject.findByIdAndDelete(id);

  return res.status(200).json(new apiResponse(200, project, "project deleted"));
});

export { 
  createProject, 
  getAllProjects,
  updateProject,
  deleteProject
   };
