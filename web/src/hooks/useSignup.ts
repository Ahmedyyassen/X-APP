import { useState, type ChangeEvent } from "react";
import { authApi } from "../lib/api";
import useApiClient from "./useApiClient"
import { useMutation } from "@tanstack/react-query";
import type { REGISTER_FORM, VERIFY_FORM } from "../types/auth";
import toast from "react-hot-toast";
import { errorMessage } from "../utils/errorMessage";

const useSignup = () => {
    const api = useApiClient();
    const [openSignupModal, setOpenSignupModal] = useState<boolean>(false);
    const [openOTPModal, setOpenOTPModal] = useState<boolean>(false);

    const [signupForm, setSignupForm] = useState<REGISTER_FORM>({
      fullName: "",
      email: "",
      password: "",
      confirmPassword:""
    });
    
    const { mutate, isPending } = useMutation({
      mutationFn: async(data:REGISTER_FORM) => await authApi.register(api, data),
      onSuccess:(res)=>{
        setOpenSignupModal(false);
        setOpenOTPModal(true);
        toast.success(res.data.message);
      },
      onError:(err)=> {
        toast.error(errorMessage(err.message));
      }
    });
      const { mutate:otpCodeMutation, isPending: sendingOTP } = useMutation({
      mutationFn: async(data:VERIFY_FORM) => await authApi.verifyAccount(api, data),
      onSuccess:(res)=>{
        setOpenOTPModal(false);
        toast.success(res.data.message);
      },
      onError:(err)=> {
        toast.error(err.message);
      }
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setSignupForm((prev)=> ({...prev, [name]:value }))
    }
    const saveSignup = () => {
      mutate(signupForm)
    }


    const sendOtpFn = (e:string) => {
      if (e.length === 6) {
        otpCodeMutation({ email: signupForm.email, otp: e });
      }
    }
    
  return {
    saveSignup,
    handleChange,
    signupForm,
    openSignupModal,
    setOpenSignupModal,
    isSignuping: isPending,
    openOTPModal,
    setOpenOTPModal,
    sendOtpFn,
    sendingOTP,
    
  }
}

export default useSignup