import { protectedinstance } from "../api/instance";
import { useState } from "react";
import type {SecretData, ApiResponse} from '../types/api.types'
 

const useSecret = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<SecretData | null>();

  const getSecret = async() => {
    try {
      setLoading(true)
      const response = await protectedinstance.get<ApiResponse<SecretData>>('/data/secret');
      if(!response.data.success) throw new Error('failed to fetch secret');
      setData(response.data.data)
    } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
        setError("Something went wrong");
        }
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    data,
    getSecret
  }
 }
export {useSecret}