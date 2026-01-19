import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt, {JwtPayload} from 'jsonwebtoken'
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

  const decoded = jwt.verify(
    accessToken,
    process.env.ACCESS_SECRET
  );

  if (typeof decoded === "string") {
    throw new ApiError(401, "Invalid access token");
  }

  const payload = decoded as RefreshPayload;
  const username = payload.username;

  const user = await User.findOne({username});

  if(!user)
    throw new ApiError(400, 'user deleted or account banned')

  req.user = user;
  next();
})