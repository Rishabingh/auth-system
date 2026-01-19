import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { IUserResponse } from "../types/User.types.js";
import { IUser } from "../types/User.types.js";
import { RegisterInput } from "../types/User.types.js";
import jwt, {JwtPayload} from 'jsonwebtoken'
import { AuthRequest } from "../types/request.js";

interface RefreshPayload extends JwtPayload {
  username: string;
}


const registerUser = asyncHandler(async (req, res) => {
  const {
    email,
    password, 
    username
  }: {email: string, password: string, username: string} = req.body;

  if(!email || !username) throw new ApiError(400, 'username or email cant be empty');
  if(password?.trim()?.length < 6) throw new ApiError(400, 'password should be greater than 6 digits');

  const isEmailExist: IUser | null = await User.findOne({$or: [{email}, {username}]});

  if(isEmailExist) throw new ApiError(400, 'username or email already exist');

  const newUser: RegisterInput = {
    email,
    username,
    password
  }

  const user = await User.create(newUser)

  if(!user) throw new ApiError(500, 'something went wrong while registering');

  const refreshToken = user.generateRefreshToken();
  const accessToken = user.generateAccessToken();

  await user.save({validateBeforeSave: false})

  const data: IUserResponse = {
    email,
    username,
    accessToken,
    id: user._id.toString()
  }

 return res.status(201).cookie('refreshToken', refreshToken, {maxAge: 10*60*1000, httpOnly: true, secure: false, sameSite: 'lax' }).json(new ApiResponse<IUserResponse>(201, data, 'user registered successfully'))
});

const loginUser = asyncHandler(async (req, res) => {
  const {
    email,
    password, 
    username
  }: {email?: string, password: string, username?: string} = req.body;

  if(!email || !username) throw new ApiError(400, 'username or email cant be empty');

  const user: IUser | null = await User.findOne({$or: [{email}, {username}]});

  if(!user) throw new ApiError(400, 'username or email not exist');

  const isPasswordGood = await user.verifyPassword(password);

  if(!isPasswordGood) throw new ApiError(400, 'incorrect password');

  const refreshToken = user.generateRefreshToken();
  const accessToken = user.generateAccessToken();

  await user.save({validateBeforeSave: false})

  const data: IUserResponse = {
    email,
    username,
    accessToken,
    id: user._id.toString()
  }

  return res.status(200).cookie('refreshToken', refreshToken, {maxAge: 10*60*1000, httpOnly: true, secure: false, sameSite: 'lax' }).json(new ApiResponse<IUserResponse>(200, data, 'login successful'))
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const {refreshToken} = req.cookies;

  if (!refreshToken)
    throw new ApiError(401, "No refresh token");
  
   if (!process.env.REFRESH_SECRET)
    throw new ApiError(500, "Missing secret");

 
  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET
  ) as RefreshPayload;

  const username = decoded.username;

  if(!username)
    throw new ApiError(500, "wrong web token");
  
  const user = await User.findOne({username})
  if(!user)
    throw new ApiError(500, "user not exist probably account deleted or banned");

  const newRefreshToken = user.generateRefreshToken();
  const newAccessToken = user.generateAccessToken();

  await user.save({validateBeforeSave: false});

  return res.status(201).cookie('refreshToken', newRefreshToken, {
    maxAge: 10*60*1000, httpOnly: true, secure: false, sameSite: 'lax' 
  }).json(new ApiResponse<{accessToken: string}>(200, {accessToken: newAccessToken}))
})

const logoutUser = asyncHandler(async(req: AuthRequest, res) => {
  const user = req.user;
  if(!user)
    throw new ApiError(400, 'something went wrong user not exist on req')

  user.refreshToken = "";
  await user.save({validateBeforeSave: false});

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  }).status(200).json(new ApiResponse<null>(200, null, 'logout successful'))
})

export {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser
}