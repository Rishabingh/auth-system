import { unprotectedInstance } from "../api/instance";
import { useState } from "react";
import type { ApiResponse, LoginResponseData } from "../types/api.types";

const useLogin = function () {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<LoginResponseData | null>(null);


  const loginReq = async function (
    username: string,
    email: string,
    password: string,
  ) {
    try {
      setLoading(true);
      const response = await unprotectedInstance.post<
        ApiResponse<LoginResponseData>
      >("/user/login", {
        username,
        email,
        password,
      });
      if (!response.data.success) throw new Error("login failed");
      setUser(response.data.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  return {
    loginReq,
    loading,
    error,
    user,
  };
};

export { useLogin };
