import { FaApple, FaGoogle, FaXTwitter } from "react-icons/fa6";
import { Button } from "../components/ui/button";
import { ModeToggle } from "../components/ModeToggle";
import useSignup from "../hooks/useSignup";
import SignupDialog from "../components/SignupDialog";
import OTP from "../components/OTP";
import useLogin from "../hooks/useLogin";
import LoginDailog from "../components/LoginDailog";
import OTPLogin from "../components/OTPLogin";

const AuthPage = () => {
  const {
    openSignupModal,
    setOpenSignupModal,
    handleChange,
    isSignuping,
    saveSignup,
    signupForm,
    openOTPModal,
    setOpenOTPModal,
    sendOtpFn,
    sendingOTP,
  } = useSignup();

  const {
    handleLoginChange,
    isLogining,
    openLoginModal,
    saveLoginDate,
    setOpenLoginModal,
    loginForm,
    isAccountVerify,
    sendOtpLoginFn,
    sendingLoadingOTP,
    setIsAccountVerify
  } = useLogin();
  return (
    <>
      <div className="bg-white dark:bg-black relative">
        <span className="absolute top-4 right-4">
          <ModeToggle />
        </span>
        <div className="w-[90%] lg:w-[80%] mx-auto px-16 flex flex-col lg:flex-row justify-center items-center lg:justify-between h-screen text-demo-150 gap-8 lg:gap-0">
          <FaXTwitter className="lg:text-[400px] text-9xl  text-black dark:text-white" />
          <div className="">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-16 text-black dark:text-white">
              Happening now
            </h1>
            <section className="w-80">
              <h3 className="text-xl lg:text-2xl font-extrabold text-black dark:text-white">
                Join today.
              </h3>
              <div className="flex flex-col gap-2 mt-8">
                <button className="text-white dark:text-black bg-black dark:bg-white rounded-full text-center flex items-center justify-center gap-2 h-10 outline-0 font-bold text-md cursor-pointer">
                  <FaGoogle />
                  Sign up with Google
                </button>
                <button className="text-white dark:text-black bg-black dark:bg-white  rounded-full text-center flex items-center justify-center gap-2 h-10 outline-0 font-bold text-md cursor-pointer">
                  <FaApple />
                  Sign up with Apple
                </button>
                <div className="flex items-center">
                  <div className="border w-full border-gray-400"></div>
                  <p className="px-2 text-black dark:text-white">or</p>
                  <div className="border w-full border-gray-400"></div>
                </div>
                <Button
                  onClick={() => setOpenSignupModal(true)}
                  className="rounded-full text-center flex items-center justify-center gap-2 h-10 outline-0 text-white bg-blue-400 dark:text-white dark:bg-blue-400 font-bold text-md cursor-pointer"
                >
                  Create Account
                </Button>
                <p className="text-xs text-gray-400">
                  By signing up, you agree to the Terms of Service and Privacy
                  Policy, including Cookie Use.
                </p>
              </div>

              <h5 className="text-black dark:text-white text-lg mt-16 mb-4">
                Already have an account?
              </h5>
              <Button
                type="button"
                onClick={()=> setOpenLoginModal(true)}
                className="border border-gray-400 w-full rounded-full text-center flex items-center justify-center gap-2 h-10 outline-0 text-blue-400 font-bold text-md cursor-pointer bg-transparent"
              >
                Sign in
              </Button>
            </section>
          </div>
        </div>
      </div>
      {openSignupModal && (
        <SignupDialog
          openSignupModal={openSignupModal}
          setOpenSignupModal={setOpenSignupModal}
          handleChange={handleChange}
          isSignuping={isSignuping}
          saveSignup={saveSignup}
          signupForm={signupForm}
        />
      )}

      {openOTPModal && (
        <OTP
          openOTPModal={openOTPModal}
          setOpenOTPModal={setOpenOTPModal}
          sendOtpFn={sendOtpFn}
          sendingOTP={sendingOTP}
          resendOTP={()=>{}}
          email={signupForm.email}
        />
      )}
      {openLoginModal && (
        <LoginDailog
          handleLoginChange={handleLoginChange}
          isLogining={isLogining}
          openLoginModal={openLoginModal}
          saveLoginDate={saveLoginDate}
          setOpenLoginModal={setOpenLoginModal}
          loginForm={loginForm}
        />
      )}
      { isAccountVerify && (
        <OTPLogin 
          isAccountVerify={isAccountVerify}
          resendOTP={saveLoginDate}
          sendOtpLoginFn={sendOtpLoginFn}
          sendingLoadingOTP={sendingLoadingOTP}
          setIsAccountVerify={setIsAccountVerify}
          email={loginForm.email}
        />
      )

      }
    </>
  );
};

export default AuthPage;
