import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from "axios";
import { BASE_URL } from "../constants/env";


const useApiClient = ():AxiosInstance => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        withCredentials: true
    });

    axiosInstance.interceptors.response.use((res:AxiosResponse)=>{
        return Promise.resolve(res)
    },
    (error:AxiosError)=>{
        return Promise.reject(error.response?.data)
    })
  return axiosInstance;
}

export default useApiClient