import { useMutation, useQueryClient } from "@tanstack/react-query"
import useApiClient from "./useApiClient"
import { authApi } from "../lib/api";
import { query } from "../constants/queries";
import toast from "react-hot-toast";
import { useAppDispatch } from "./useRedux";
import { setAuthUser } from "../store/slices/AuthSlice";

const useLogout = () => {
    const api = useApiClient();
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const {mutate, isPending} = useMutation({
        mutationFn: async()=> await authApi.logout(api),
        onSuccess:(res)=>{
            queryClient.setQueryData([query.AUTH_USER], null );
            dispatch(setAuthUser({user:null,isLoading:false,error:null}));
            toast.success(res.data.message)
        },
        onError:(err)=>{
            toast.error(err.message);
        }
    })
  return {
    logoutMutaion: mutate,
    isLogouting:isPending
}
}

export default useLogout