import { ApiErrors } from "../utilities/apiErrors.js";
import { asyncHandler } from "../utilities/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiErrors(401, "Unauthorized Token");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiErrors(401, "invalid access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiErrors(401, error?.message || "invalid access token");
  }
});
