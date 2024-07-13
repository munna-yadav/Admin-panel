import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import Jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error); //this was used to find error wihle genearting AccessToken
    throw new apiError(
      500,
      "something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!(email || username || password)) {
    throw new apiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new apiError(409, "User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (User.findById(user._id)) {
    console.log("user created");
  }

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new apiError(500, "error while creating user");
  }

  return res
    .status(201)
    .json(new apiResponse(201, createdUser, "user created sucessfully"));
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if ((!username && !password)) {
    throw new apiError(400, "all fields are required");
  }

  const user = await User.findOne({ username });
  if (!user) {
    throw new apiError(404, "Invalid Username");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json(new apiResponse(401, {}, "Invalid Password"));
    throw new apiError(400,"wrong password")
  }

  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken )
    .json(
      new apiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "user loggedIn sucessfully"
      )
    );
});

export { 
  registerUser,
  login,

 };
