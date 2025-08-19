import { Loader, LoaderCircle } from "lucide-react";
import useForgetPassword from "../hooks/useForgetPassword";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";

type Props = {
  openForgetPassword: boolean;
  setopenForgetPassword: (e: boolean) => void;
};
const ForgetPassword = ({
  openForgetPassword,
  setopenForgetPassword,
}: Props) => {
  const {
    setemail,
    email,
    isPending,
    forgetPassword,
    openOTP,
    setopenOTP,
    setOtp,
    checkotpCode,
    loadingOTP,
    openResetDialog,
    setopenResetDialog,
    newPasswordDate,
    setnewPasswordDate,
    newPasswordMutation,
    loadingNewpassword,
  } = useForgetPassword(setopenForgetPassword);

  return (
    <>
    { openForgetPassword && 
    <Dialog
        open={openForgetPassword}
        onOpenChange={() => setopenForgetPassword(false)}
      >
        <DialogContent
          className="w-[500px] rounded-2xl"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>Forget password</DialogTitle>
          </DialogHeader>

          <div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4 ">
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  onKeyDown={(e)=> e.key === "Enter" && forgetPassword()}
                  placeholder="Email"
                  className="col-span-4 h-11 rounded-2xl p-4"
                />
              </div>
            </div>
            <DialogFooter>
              <div>
                <Button
                  type="button"
                  disabled={isPending}
                  onClick={forgetPassword}
                  size={"lg"}
                  className="rounded-full cursor-pointer"
                >
                  {isPending ? (
                    <Loader className="animate-spin" size={24} />
                  ) : (
                    "Send"
                  )}
                </Button>
              </div>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog> }

      {openOTP && 
        <Dialog open={openOTP} onOpenChange={() => setopenOTP(false)}>
          <DialogContent aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle className="text-center pb-4">
                Verify OTP code
              </DialogTitle>
            </DialogHeader>
            <div className="flex justify-center">
              <InputOTP maxLength={6} onChange={(e) => setOtp(e)} onKeyDown={(e)=> e.key === "Enter" && checkotpCode()}>
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
                  className="cursor-pointer"
                  disabled={loadingOTP}
                  onClick={checkotpCode}
                >
                  {loadingOTP ? (
                    <LoaderCircle className="animate-spin" size={24} />
                  ) : (
                    "Send code"
                  )}
                </Button>
              </div>
            </article>
          </DialogContent>
        </Dialog>
      }

      { openResetDialog && 
        <Dialog
        open={openResetDialog}
        onOpenChange={() => setopenResetDialog(false)}
      >
        <DialogContent
          className="w-[500px] rounded-2xl"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>Reset password</DialogTitle>
          </DialogHeader>

          <div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4 ">
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={newPasswordDate.password}
                  onChange={(e) => setnewPasswordDate((p)=>({...p,password:e.target.value}))}
                  onKeyDown={(e)=> e.key === "Enter" && newPasswordMutation()}
                  placeholder="New password"
                  className="col-span-4 h-11 rounded-2xl p-4"
                />
              </div>
            </div>
            <DialogFooter>
              <div>
                <Button
                  type="button"
                  disabled={loadingNewpassword}
                  onClick={newPasswordMutation}
                  size={"lg"}
                  className="rounded-full cursor-pointer"
                >
                  {loadingNewpassword ? (
                    <Loader className="animate-spin" size={24} />
                  ) : (
                    "Reset"
                  )}
                </Button>
              </div>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog> 
      }

    </>
  );
};

export default ForgetPassword;
