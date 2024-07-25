import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { aboutUs } from "../models/about.model.js";
import { apiResponse } from "../utils/apiResponse.js";

const createAboutUs = asyncHandler(async(req,res)=>{
    const {description} = req.body;

    if(description===''){
        throw new apiError(404, "description cannot be empty")
    }
    const about = await aboutUs.create({description:description})
    const AboutUs = await aboutUs.findById(about._id);
    if(!AboutUs){
        throw new apiError(500,"something went wrong")
    }
    return res
    .status(200)
    .json(new apiResponse(201,AboutUs,"about us stored"))
})

const getAboutUs = asyncHandler(async (req,res)=>{
    const aboutus = await aboutUs.find()

if(!aboutus){
    throw new apiError(500,"something went wrong while fetching details")
}

return res
.status(200)
.json(new apiResponse(200,aboutus,"details fetched sucessfully"))
})

const editAboutUs = asyncHandler(async(req,res)=>{
    const {description} = req.body;
    const id = req.body._id;

    if(description =='' || id==''){
        throw new apiError(400,"description is  rerquired")
    }

    const  newAboutUs = await aboutUs.findByIdAndUpdate(id,{
        description:description
    })
    if(!newAboutUs){
        throw new apiError(500,"something went wrong while saving details")
    }

    return res
    .status(200)
    .json(new apiResponse(200,newAboutUs, "about us updated sucesfully"))
})

export{
    createAboutUs,
    getAboutUs,
    editAboutUs

}