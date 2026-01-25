import { unprotectedInstance } from "../api/instance";
import { useState } from "react";
import type { ApiResponse, LoginResponseData } from "../types/api.types";

const useRegister = () => {
    const [user, setUser] = useState<LoginResponseData | null>(null)
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false);

    const registerReq = async (
        username: string,
        email: string,
        password: string
    ) => {
        try {
         setLoading(true)
         setError("");
         const res = await unprotectedInstance.post<ApiResponse<LoginResponseData>>('user/register', 
            {
                username,
                email,
                password
            })
        if (!res.data.success) throw new Error('registration failed')
        setUser(res.data.data);           
        } catch (error) {
            if(error instanceof Error) {
                setError(error.message)
            } else {
                setError('something went wrong')
            }
        } finally {
            setLoading(false)
        }
    }
    return {
        user,
        error,
        loading,
        registerReq
    }
}
export {
    useRegister
}