import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { IoIosMore } from "react-icons/io";
import useLogout from "../hooks/useLogout";
import { LoaderCircle, LogOutIcon } from "lucide-react";
import { useAppSelector } from "../hooks/useRedux";



const User = () => {
  const {user:authUser} = useAppSelector((sel)=> sel.authSlice)
  const { isLogouting, logoutMutaion } = useLogout();
    const [openDrop, setOpen] = useState<boolean>(false);
  return (
    <div
      className="user relative border xl:border-none"
      onClick={() => setOpen(true)}
    >
      <div onClick={() => setOpen(true)} className="absolute w-full h-full top-0 left-0 rounded-full hover:bg-gray-400 hover:opacity-20 z-1 transition-all"></div>
      
      <img
        src={authUser?.profilePicture || '/icon.png'}
        className="size-12 xl:size-12 rounded-full object-cover border-2 border-gray-400 absolute xl:static top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2
        xl:top-0 xl:translate-y-0 xl:left-0 xl:translate-x-0"
      />

      <div className="hidden xl:flex flex-col ml-4">
        <h4 className="text-gray-800 dark:text-white font-bold text-sm">
          {authUser?.fullName}
        </h4>
        <p className="text-gray-400 text-xs text-ellipsis line-clamp-1 w-full overflow-hidden">{authUser?.username.slice(0,14)}</p>
      </div>

      <div className="ml-auto mr-2">
          <DropdownMenu open={openDrop} onOpenChange={() => setOpen(false)}>
          <DropdownMenuTrigger asChild>
            <IoIosMore
              className="text-2xl xl:ml-4 text-gray-800 dark:text-white"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 border-transparent" align="center" >
            <DropdownMenuItem onClick={()=>logoutMutaion()}>
              {isLogouting ? <LoaderCircle className="animate-spin" /> : "Log out"}
              <DropdownMenuShortcut>
                <LogOutIcon />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    </div>
  );
};

export default User;
