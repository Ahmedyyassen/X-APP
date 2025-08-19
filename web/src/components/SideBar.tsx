import { NavLink, type NavLinkRenderProps } from "react-router-dom";
import {
  FaBookmark,
  FaEnvelope,
  FaFeather,
  FaHashtag,
  FaUser,
  FaXTwitter,
} from "react-icons/fa6";
import { Button } from "./ui/button";
import { IoIosMore, IoIosNotifications } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";
import User from "./User";
import { useAppSelector } from "../hooks/useRedux";

const SideBar = () => {
  const {user:currentUser} = useAppSelector((sel)=> sel.authSlice)
  const navigateStyle = ({ isActive }: NavLinkRenderProps) => {
    return {
      color: isActive ? "oklch(0.707 0.165 254.624)" : "",
    };
  };
  return (
    <aside className="w-14 h-full flex flex-col xl:w-1/5 xl:pr-4 items-center">
      <a className="link-active my-2 w-fit overflow-hidden text-black dark:text-white">
        <FaXTwitter className="text-2xl" />
      </a>
      <nav className="mt-5 ">
        <NavLink
          style={navigateStyle}
          to={"home"}
          className="link items-center mb-8"
        >
          <IoHomeSharp className="text-2xl" />
          <span className="hidden font-bold xl:block xl:ml-4">Home</span>
        </NavLink>

        <NavLink
          style={navigateStyle}
          to={"trending"}
          className="link items-center mb-8"
        >
          <FaHashtag className="text-2xl" />
          <span className="hidden font-bold xl:block xl:ml-4">New</span>
        </NavLink>

        <NavLink
          style={navigateStyle}
          to={"notifications"}
          className="link items-center mb-8"
        >
          <IoIosNotifications className="text-2xl" />
          <span className="hidden font-bold xl:block xl:ml-4">
            Notifications
          </span>
        </NavLink>

        <NavLink
          style={navigateStyle}
          to={"messages"}
          className="link items-center mb-8"
        >
          <FaEnvelope className="text-2xl" />
          <span className="hidden font-bold xl:block xl:ml-4">Messages</span>
        </NavLink>

        <NavLink
          style={navigateStyle}
          to={"bookmark"}
          className="link items-center mb-8"
        >
          <FaBookmark className="text-2xl" />
          <span className="hidden font-bold xl:block xl:ml-4">Bookmark</span>
        </NavLink>

        <NavLink
          style={navigateStyle}
          to={`profile/${currentUser?.username}`}
          className="link items-center mb-8"
        >
          <FaUser className="text-2xl" />
          <span className="hidden font-bold xl:block xl:ml-4">Profile</span>
        </NavLink>

        <NavLink
          style={navigateStyle}
          to={"/more"}
          className="link items-center mb-8"
        >
          <IoIosMore className="text-2xl" />
          <span className="hidden font-bold xl:block xl:ml-4">More</span>
        </NavLink>
      </nav>
      <Button className="w-10 h-10 xl:w-full  xl:h-10 text-lg rounded-full bg-blue-400 dark:bg-blue-400 dark:text-white dark:hover:text-black cursor-pointer">
        <span className="hidden xl:block">Tweet</span>
        <FaFeather className="xl:hidden" />
      </Button>
      <User />
    </aside>
  );
};

export default SideBar;
