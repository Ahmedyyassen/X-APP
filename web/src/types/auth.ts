export interface REGISTER_FORM{
    fullName: string;
    email: string;
    password: string;
    confirmPassword:string;
}

export interface LOGIN_FORM{
    email: string;
    password: string;
}
export interface VERIFY_FORM{
    email:string;
    otp: string;
}
export interface FORGET_PASSWORD_FORM{
    email:string;
}
export interface CHECK_OTP_FORM{
    email:string;
    otp: string;
}
export interface RESET_PASSWORD_FORM{
    password:string;
    token: string;
}