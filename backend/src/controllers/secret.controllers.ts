import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AuthRequest } from "../types/request.js";
import {IsecretResponse} from "../types/User.types.js"

const secretController = asyncHandler(async (req: AuthRequest, res) => {
    const user = req.user;
    if(!user) throw new ApiError(401, 'something is wrong with access token');

    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data: {type: string, setup: string, punchline: string, id: number} = await response.json() as {
  type: string;
  setup: string;
  punchline: string;
  id: number;
};
    if(!data) throw new ApiError(500, "internal server error secret generator api not working")

    const secret: {setup: string, punchLine: string} = {
        setup: data.setup,
        punchLine: data.punchline,
    }

    res.status(200).json(new ApiResponse<IsecretResponse>(200, {
        username: user.username,
        email: user.email,
        secret,
        id: String(user._id)
    }))
})

export {secretController}