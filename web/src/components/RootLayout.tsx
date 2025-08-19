import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import RightLayout from "./RightLayout";

const RootLayout = () => {
  return (
    <div className=" bg-white dark:bg-black">
      <div className="container mx-auto flex h-screen xl:max-w-[1200]">
        <SideBar />

        <main className="w-[calc(100%-56px)] xl:w-1/2">
          <Outlet />
        </main>

        <RightLayout />
      </div>
    </div>
  );
};

export default RootLayout;
