import { useState, type ChangeEvent } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import type { LOGIN_FORM } from "../types/auth";
import { Loader } from "lucide-react";
import ForgetPassword from "./ForgetPassword";

type Props = {
  handleLoginChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isLogining: boolean;
  openLoginModal: boolean;
  saveLoginDate: () => void;
  setOpenLoginModal: (open: boolean) => void;
  loginForm: LOGIN_FORM;
};
const LoginDailog = ({
  handleLoginChange,
  isLogining,
  loginForm,
  openLoginModal,
  saveLoginDate,
  setOpenLoginModal,
}: Props) => {
  const [openForgetPassword, setopenForgetPassword] = useState(false);
  return (
    <>
      <Dialog open={openLoginModal} onOpenChange={() => setOpenLoginModal(false)}>
      <DialogContent
        className="w-[500px] rounded-2xl"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Login Account</DialogTitle>
        </DialogHeader>

        <form>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4 ">
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={handleLoginChange}
                className="col-span-4 h-11 rounded-2xl p-4"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={handleLoginChange}
                className="col-span-4 h-11 rounded-2xl p-4"
                onKeyDown={(e)=> e.key ==="Enter" && saveLoginDate()}
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-between items-center w-full">
              <span 
              onClick={()=> setopenForgetPassword(true)}
              className="text-sm hover:underline cursor-pointer">
                Forgit password ?
              </span>
              <Button
                type="button"
                disabled={isLogining}
                size={"lg"}
                onClick={saveLoginDate}
                className="rounded-full cursor-pointer"
              >
                {isLogining ? (
                  <Loader className="animate-spin" size={24} />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
      
      { <ForgetPassword
      openForgetPassword={openForgetPassword}
      setopenForgetPassword={setopenForgetPassword}
       />}
    </>
  );
};

export default LoginDailog;
