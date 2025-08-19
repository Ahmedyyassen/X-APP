import { FaXTwitter } from "react-icons/fa6";
import { ModeToggle } from "./ModeToggle";

const Header = ({title,post}:{title:string, post?:number}) => {
  return (
    <header className="flex justify-between items-center z-20 px-4 py-3 sticky top-0 brd bg-white dark:bg-black">
      <div className="flex flex-col justify-center">
      <span className="font-bold text-xl">{title}</span>
        { Number(post) >= 0 && <span className='text-gray-500 text-sm'>{post} Posts</span>}
      </div>
      <span className="flex items-center gap-4">
        <ModeToggle />
          <a className="link-active my-2 w-fit overflow-hidden text-black dark:text-white">
           <FaXTwitter className="text-2xl" />
        </a>
      </span>
    </header>
  );
};

export default Header;
