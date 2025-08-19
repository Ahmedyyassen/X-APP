import { Input } from "./ui/input";
// import UserImage from "./UserImage";

const RightLayout = () => {
  return (
    <div className="hidden xl:w-[30%] xl:block p-3 ">
        <Input placeholder="Search X"  className="rounded-full" style={{backgroundColor:"transparent"}} />
        <div className="dark:bg-black border flex flex-col justify-start m-2 bg-gray-50 dark:bg-demo-700 rounded-2xl divide-y divide-gray-200 dark:divide-demo-200 ">
          <h3 className="p-3 font-bold text-gray-900 dark:text-white text-lg">what&apos;s happening </h3>
          <h3 className="p-3 font-bold text-gray-900 dark:text-white text-lg">#Palestine <p className="text-xs text-gray-400">351k Tweets</p></h3>
          <h3 className="p-3 font-bold text-gray-900 dark:text-white text-lg">#Palestine <p className="text-xs text-gray-400">52.7k Tweets</p></h3>
          <h3 className="p-3 font-bold text-gray-900 dark:text-white text-lg">#Palestine <p className="text-xs text-gray-400">39.7k Tweets</p></h3>
          <h3 className="cursor-pointer p-3 text-blue-400">Show more</h3>
        </div>

        <div className="dark:bg-black border flex flex-col justify-start m-2 bg-gray-50 dark:bg-demo-700 rounded-2xl divide-y divide-gray-200 dark:divide-demo-200 ">
            <h3 className="p-3 font-bold text-gray-900 dark:text-white text-lg">Who to follow</h3>
            <div className="flex  p-6 items-center">
              {/* <UserImage  src="" /> */}
              <div className="ml-2 font-bold">
                <h4>Ahmed yassen</h4>
                <p className="text-xs text-gray-400">@mrcodeboygmail</p>
              </div>
              <button className="ml-auto border-3 text-blue-400 font-bold cursor-pointer focus:outline-none border-blue-400 text-400 bg-transparent py-2 px-5 text-sm rounded-full">Follow</button>
            </div>
            
            <div className="flex  p-6 items-center">
              {/* <UserImage src=""  /> */}
              <div className="ml-2 font-bold">
                <h4>Ali Ahmed</h4>
                <p className="text-xs text-gray-400">@mrcodeboygmail</p>
              </div>
              <button className="ml-auto border-3 text-blue-400 font-bold cursor-pointer focus:outline-none border-blue-400 text-400 bg-transparent py-2 px-5 text-sm rounded-full">Follow</button>
            </div>
              
            <h3 className="cursor-pointer p-3 text-blue-400">Show more</h3>
        </div>
    </div>
  )
}

export default RightLayout;