import { useMutation } from "@tanstack/react-query";
import useApiClient from "./useApiClient"
import { authApi } from "../lib/api";
import type { CHECK_OTP_FORM, FORGET_PASSWORD_FORM, RESET_PASSWORD_FORM } from "../types/auth";
import toast from "react-hot-toast";
import { useState } from "react";

const useForgetPassword = (setopenForgetPassword:(e: boolean) => void) => {
    const api = useApiClient();
    const [openOTP, setopenOTP] = useState(false);
    const [otp, setOtp] = useState("");
    const [openResetDialog, setopenResetDialog] = useState(false);

    const [newPasswordDate, setnewPasswordDate] = useState<RESET_PASSWORD_FORM>({
      password:"",
      token:""
    })

    const [email, setemail] = useState("");

    const { mutate, isPending } = useMutation({
        mutationFn: async(data:FORGET_PASSWORD_FORM)=> await authApi.forgetPassword(api, data),
        onSuccess:(res)=> {
            setopenForgetPassword(false);
            setopenOTP(true);
            toast.success(res.data.message);
        },
        onError:(err)=>{
            toast.error(err.message);
        }
    });
        const { mutate:checkoptMutation, isPending:loadingOTP } = useMutation({
        mutationFn: async(data:CHECK_OTP_FORM)=> await authApi.checkPasswordOTP(api, data),
        onSuccess:(res)=> {
            setopenOTP(false);
            setopenResetDialog(true);
            setnewPasswordDate((prev)=>({...prev, token:res.data.token}))
            toast.success(res.data.message);
        },
        onError:(err)=>{
            toast.error(err.message);
        }
    });

      const { mutate:newPasswordMutation, isPending:loadingNewpassword } = useMutation({
        mutationFn: async(data:RESET_PASSWORD_FORM)=> await authApi.resetPassword(api, data),
        onSuccess:(res)=> {
            setopenResetDialog(false);
            setemail("");
            setnewPasswordDate(({password:"", token:""}));
            toast.success(res.data.message);
        },
        onError:(err)=>{
            toast.error(err.message);
        }
    });

  return {
    forgetPassword: ()=> mutate({email}),
    isPending,
    setemail,
    email,

    openOTP,
    setopenOTP,
    setOtp,
    checkotpCode:()=> checkoptMutation({email,otp}),
    loadingOTP,

    openResetDialog,
    setopenResetDialog,
    newPasswordDate,
    setnewPasswordDate,
    newPasswordMutation:()=> newPasswordMutation(newPasswordDate),
    loadingNewpassword,


  }
}

export default useForgetPassword