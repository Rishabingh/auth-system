import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
import type { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from "../types/request.js";

interface RefreshPayload extends JwtPayload {
  username: string;
}

export const verifySattachUser = asyncHandler(async(req: AuthRequest, res, next) => {
  const RowAccessToken = req.headers.authorization;
  const accessToken = RowAccessToken?.replace("Bearer ", "");
  if(!accessToken)
    throw new ApiError(401, 'access token not exist on request')

  if(!process.env.ACCESS_SECRET)
    throw new ApiError(500, "access token secret not provided")

  let decoded: JwtPayload; 

  try {
    decoded = jwt.verify(
    accessToken,
    process.env.ACCESS_SECRET
  ) as JwtPayload;
  } catch (error) {
    if(error instanceof jwt.TokenExpiredError) {
      throw new ApiError(401, "access token expired")
    }

    if(error instanceof jwt.JsonWebTokenError) {
      throw new ApiError(401, "invalid access token");
    }
    throw error;
  }

  const payload = decoded as RefreshPayload;
  const username = payload.username;

  const user = await User.findOne({username});

  if(!user)
    throw new ApiError(400, 'user deleted or account banned')

  req.user = user;
  next();
})