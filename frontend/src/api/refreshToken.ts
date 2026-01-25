import axios from "axios";
import type {ApiResponse, RefreshTokenData} from '../types/api.types'

const refreshToken = async function(): Promise<string> {

     const response = await axios.get<ApiResponse<RefreshTokenData>>('http://localhost:3003/user/refresh-access-token', {
     withCredentials: true
    });

    if(!response.data.success) throw new Error(response.data.message);
    return response.data.data.accessToken


}
export {refreshToken}