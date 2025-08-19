import { useState, type ChangeEvent } from "react";
import useApiClient from "./useApiClient";
import type { LOGIN_FORM, VERIFY_FORM } from "../types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../lib/api";
import toast from "react-hot-toast";
import { errorMessage } from "../utils/errorMessage";
import { query } from "../constants/queries";
import useAuth from "./useAuth";

const useLogin = () => {
  const { authUser } = useAuth();
  const api = useApiClient();
  const queryClient = useQueryClient();
  const [isAccountVerify, setIsAccountVerify] = useState(false);
  

  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [loginForm, setLoginForm] = useState<LOGIN_FORM>({
    email: "",
    password: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LOGIN_FORM) => await authApi.login(api, data),
    onSuccess: (res) => {
      setOpenLoginModal(false);
      queryClient.invalidateQueries({ queryKey: [query.AUTH_USER] });
      toast.success(res.data.message);
        if (!authUser) {
        setIsAccountVerify(true);
      }
    },
    onError: (err) => {
      toast.error(errorMessage(err.message));
    },
  });

  const { mutate: otpLoginCodeMutation, isPending: sendingLoadingOTP } =
    useMutation({
      mutationFn: async (data: VERIFY_FORM) =>
        await authApi.verifyAccount(api, data),
      onSuccess: (res) => {
        setIsAccountVerify(false);
        mutate(loginForm);
        queryClient.invalidateQueries({ queryKey: [query.AUTH_USER] });
        toast.success(res.data.message);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveLoginDate = () => {
    mutate(loginForm);
  };

  const sendOtpLoginFn = (e: string) => {
    if (e.length === 6) {
      otpLoginCodeMutation({ email: loginForm.email, otp: e });
    }
  };  

  return {
    saveLoginDate,
    handleLoginChange,
    loginForm,
    openLoginModal,
    setOpenLoginModal,
    isLogining: isPending,

    isAccountVerify,
    sendOtpLoginFn,
    sendingLoadingOTP,
    setIsAccountVerify,
  };
};

export default useLogin;
