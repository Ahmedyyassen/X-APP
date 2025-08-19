import { useQuery } from "@tanstack/react-query";
import useApiClient from "./useApiClient"
import { query } from "../constants/queries";
import { userApi } from "../lib/api";
import type { USER } from "../types/user";
import { useAppDispatch } from "./useRedux";
import { setAuthUser } from "../store/slices/AuthSlice";

const useAuth = () => {
    const api = useApiClient();
    const dispatch = useAppDispatch();
    const { data, isLoading,error } = useQuery<USER | null>({
        queryKey:[query.AUTH_USER],
        queryFn: async()=>{
            const res = await userApi.syncUser(api);
            // backend returns { user: null } if not logged in
            dispatch(setAuthUser({user:res.data.user, isLoading,error}))
            return res.data.user;
        },
        retry:false
    })    
  return { authUser:data, isLoading,error }
}

export default useAuth