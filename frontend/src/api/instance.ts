import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosInstance, AxiosError } from "axios";
import { refreshToken } from "./refreshToken";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}


const protectedinstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:3003/",
    withCredentials: true
});

const unprotectedInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:3003/",
    withCredentials: true
})

protectedinstance.interceptors.request.use((config: CustomAxiosRequestConfig) => {

    const accessToken: string | null = localStorage.getItem('accessToken');

    if(!accessToken) throw new Error('access token is not available')
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config
},
    (error) => Promise.reject(error)
)

protectedinstance.interceptors.response.use(
    res => res,
    async(error: AxiosError) => {
        const orignalRequest = error.config as CustomAxiosRequestConfig;
        if(error.response?.status === 401 && !orignalRequest._retry) {
            orignalRequest._retry = true;
            try {
                const response = await refreshToken();
                localStorage.setItem('accessToken', response);
                return protectedinstance(orignalRequest);
            } catch (error) {
                console.log(error)
                localStorage.clear();
                window.location.href = "/login"
            }
        }
        return Promise.reject(error)
    }
)
export {
    protectedinstance,
    unprotectedInstance
}