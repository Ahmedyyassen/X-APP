import type { ChangeEvent } from "react";
import type { REGISTER_FORM } from "../types/auth";
import { Button } from "./ui/button";
import { Loader } from 'lucide-react';


import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";

type Props = {
  openSignupModal: boolean;
  setOpenSignupModal: (e: boolean) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isSignuping: boolean;
  saveSignup: () => void;
  signupForm: REGISTER_FORM;
};

const SignupDialog = ({
  openSignupModal,
  setOpenSignupModal,
  handleChange,
  isSignuping,
  saveSignup,
  signupForm,
}: Props) => {
  return (
    <Dialog
      open={openSignupModal}
      onOpenChange={() => setOpenSignupModal(false)}
    >
      <DialogContent className="w-[450px] lg:w-[600px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Register Account</DialogTitle>
        </DialogHeader>
        <form>
          <div className="grid gap-5 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="fullName"
                type="text"
                name="fullName"
                onChange={handleChange}
                value={signupForm.fullName}
                placeholder="Full Name"
                className="col-span-4 h-11 rounded-2xl p-4"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="email"
                type="email"
                name="email"
                onChange={handleChange}
                value={signupForm.email}
                placeholder="Email"
                className="col-span-4 h-11 rounded-2xl p-4"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                value={signupForm.password}
                placeholder="Password"
                className="col-span-4 h-11 rounded-2xl p-4"
                onKeyDown={(e)=> e.key==="Enter" && saveSignup()}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                value={signupForm.confirmPassword}
                placeholder="Confirm Password"
                className="col-span-4 h-11 rounded-2xl p-4"
                onKeyDown={(e)=> e.key==="Enter" && saveSignup()}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="rounded-full"
              type="button"
              size={"lg"}
              disabled={isSignuping}
              onClick={saveSignup}
            >
              {isSignuping ? <Loader className="animate-spin" size={24} /> : "Register"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
