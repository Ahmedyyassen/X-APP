import { Search } from "lucide-react";
import Header from "../components/Header";

const TRENDING_TOPICS = [
  { topic: "#ReactNative", tweets: "125K" },
  { topic: "#TypeScript", tweets: "89K" },
  { topic: "#WebDevelopment", tweets: "234K" },
  { topic: "#AI", tweets: "567K" },
  { topic: "#TeckNews", tweets: "98K" },
];

const TrendingPage = () => {
  return (
      <div className="w-full h-screen overflow-auto border-x-1 border-gray-300 dark:border-gray-800">
     <Header title="Trending"  />

          <div className='px-4 py-3 border-b'>
            <div className='flex flex-row items-center rounded-full px-4 py-3 bg-gray-100 dark:bg-zinc-950'>
              <Search name='search' size={20} color={"#657786"} />
              <input 
              placeholder='Search Twitter' 
              className='flex flex-1 ml-3 text-base border-none outline-none'
              />
            </div>
          </div>

        <div className='w-full'>
          <p className='p-4 text-xl font-bold '>Trending for you</p>
            <div className="flex flex-col w-full ">
                {TRENDING_TOPICS.map((item, index)=>(
                <button key={index} className='p-4 border-b w-full flex flex-col items-start'>
                    <p className='text-gray-500 text-sm'>Trending in Technology</p>
                    <p className='font-bold text-lg'>{item.topic}</p>
                    <p className='text-gray-500 text-sm'>{item.tweets}</p>
                </button>
                ))}
            </div>
        </div>

    </div>
  );
};

export default TrendingPage;
