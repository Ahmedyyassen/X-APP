import { LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";
import { useEffect, useRef, useState } from "react";

type Props = {
  openOTPModal: boolean;
  setOpenOTPModal: (e: boolean) => void;
  sendOtpFn: (e: string) => void;
  sendingOTP: boolean;
  resendOTP:()=>void;
  email:string;
};
const OTP = ({
  openOTPModal,
  setOpenOTPModal,
  sendOtpFn,
  sendingOTP,
  resendOTP,
  email
}: Props) => {
  
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
    <Dialog open={openOTPModal} onOpenChange={() => setOpenOTPModal(false)}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-center pb-4">
            Verify OTP code
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <InputOTP maxLength={6} onChange={(e) => sendOtpFn(e)}>
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
              disabled={sendingOTP || !isResend}
              onClick={resendCode}
            >
              {sendingOTP ? (
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
};

export default OTP;
