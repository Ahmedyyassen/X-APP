import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { CiCamera } from "react-icons/ci";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, type ChangeEvent } from "react";
import type { UpdateProfile } from "../types/user";
import { imageTo64Base } from "../utils/base64";
import Loader from "./Loader";
import { FaXmark } from "react-icons/fa6";

type Props = {
  open: boolean;
  onClose: (e: boolean) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  updatedProfile: UpdateProfile;
  saveData: () => void;
  loading: boolean;
  setimageFile: (e: File | null) => void;
  setBannerImageFile: (e: File | null) => void;
  disable:()=>boolean;
};
const UpdateProfileDialog = ({
  handleChange,
  loading,
  onClose,
  open,
  saveData,
  updatedProfile,
  setimageFile,
  disable,
  setBannerImageFile,
}: Props) => {

  const [imageText, setimageText] = useState("");
  const [bannerImage, setbannerImage] = useState("");

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files) {
        if (name === "profile") {
            setimageFile(files[0]);
            const image64 = await imageTo64Base(files[0]);
            setimageText(image64);
        }else if (name === "banner") {
            setBannerImageFile(files[0])
            const image64 = await imageTo64Base(files[0]);
            setbannerImage(image64);
        }
    }
  };
  const handleClose = ()=>{
    setimageFile(null);
    setBannerImageFile(null);
    setbannerImage("");
    setimageText("")
    onClose(false)
  }
  const removerImage = ()=> {
    setBannerImageFile(null);
    setbannerImage("");
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent aria-describedby={undefined} >
          <DialogHeader>
            <DialogTitle className="text-center">Update Profile</DialogTitle>
          </DialogHeader>
          <form>
            <div className="flex flex-col w-[90%] mx-auto items-center justify-center gap-3 py-4">
                <div className="w-full relative">
                 <div className="w-full h-46 rounded-lg overflow-hidden relative">
                   {bannerImage && 
                    <button 
                    onClick={removerImage}
                    type="button"
                    className="absolute top-2 right-2 size-8 bg-black opacity-60 p-1 rounded-full flex items-center justify-center z-2 cursor-pointer">
                        <FaXmark />
                        </button>
                    }
                    <input 
                    type="file" 
                    name="banner"
                    onChange={handleImageChange}
                    className="absolute top-0 left-0 w-full h-full cursor-pointer scale-150 border-gray-400 hover:bg-gray-900 opacity-0 hover:opacity-15 transition-colors" />
                    {updatedProfile.bannerImage ? 
                    <img
                    className="object-center object-cover w-full h-full" 
                    src={bannerImage || updatedProfile.bannerImage}
                    alt="banner image"
                     /> : (
                        <div className="w-full h-full bg-gray-300 dark:bg-gray-400" />
                    )}
                 </div>
                <div className="flex justify-center p-4 -mt-20">
                    <div className="relative overflow-hidden size-36 rounded-full border-2">
                    <img
                        src={imageText || updatedProfile.image || "/icon.png"}
                        className="w-full h-full object-cover  "
                    />
                    <CiCamera className="text-4xl bg-gray-300 rounded-full text-black p-1 z-10  absolute left-1/2 -translate-x-1/2 bottom-1 " />
                    <input
                        type="file"
                        name="profile"
                        onChange={handleImageChange}
                        className="w-full h-full absolute top-0 scale-150 rounded-full opacity-0 hover:opacity-15 bg-gray-950 transition-all cursor-pointer"
                    />
                    </div>
                </div>
                </div>

              <div className="w-full">
                <Input
                  id="fullName"
                  name="fullName"
                  value={updatedProfile.fullName}
                  type="text"
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="col-span-3"
                />
              </div>

              <div className="w-full">
                <Input
                  id="bio"
                  name="bio"
                  value={updatedProfile.bio}
                  type="text"
                  placeholder="Bio"
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="w-full">
                <Input
                  id="location"
                  name="location"
                  value={updatedProfile.location}
                  type="text"
                  placeholder="Location"
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
            <Button 
              onClick={saveData}
              className="cursor-pointer"
              disabled={disable()}
              type="button"
              >
                {loading ? <Loader size={24} /> : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
