import mongoose from "mongoose";

const aboutUsSchema = new mongoose.Schema(
  {
    title:{
        type: String,
        required: true
    },
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
