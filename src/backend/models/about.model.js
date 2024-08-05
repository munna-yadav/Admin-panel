import mongoose from "mongoose";

const aboutUsSchema = new mongoose.Schema(
  {
    
    description:{
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const aboutUs =  mongoose.model("aboutUs", aboutUsSchema);
