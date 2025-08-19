import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./ui/input-otp";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

type Props={
    isAccountVerify:boolean;
    sendingLoadingOTP:boolean;
    resendOTP:()=>void
    sendOtpLoginFn:(code:string)=>void;
    setIsAccountVerify:(e:boolean)=>void;
    email:string;
}
const OTPLogin = ({isAccountVerify,resendOTP,sendOtpLoginFn,sendingLoadingOTP,setIsAccountVerify,email}:Props) => {
 const [isResend, setIsResend] = useState(false);
  const [time, setTime] = useState<number>(60);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start countdown only if time > 0
    if (time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
        // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // ✅ Empty dependency array → run once on mount

  const resendCode = ()=>{
    setTime(60);
    setIsResend(false);
    resendOTP();

    // Restart timer
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }
  
  return (
    <Dialog open={isAccountVerify} onOpenChange={() => setIsAccountVerify(false)}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-center pb-4">
            Verify OTP code
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <InputOTP maxLength={6} onChange={(e) => sendOtpLoginFn(e)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <article className="text-center space-y-4">
          <h6 className="font-light text-sm text-gray-500 dark:text-gray-300">
            Please check your email
            <p className="text-xs">{email}</p>
          </h6>
          <div className="flex justify-center items-center gap-4">
            <Button
              className="cursor-pointer dark:bg-white bg-gray-400"
              disabled={sendingLoadingOTP || !isResend}
              onClick={resendCode}
            >
              {sendingLoadingOTP ? (
                <LoaderCircle className="animate-spin" size={24} />
              ) : (
                "Resend code"
              )}
            </Button>
            <span>{time}s</span>
          </div>
        </article>
      </DialogContent>
    </Dialog>
  );

}

export default OTPLogin