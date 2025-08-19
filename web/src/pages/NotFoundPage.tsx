import { PiSmileySadBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <span ><PiSmileySadBold  className="text-blue-400 text-8xl" /></span>
      <h1 className="text-4xl font-bold">Where are you go.</h1>
      <Button onClick={()=> navigate("/")} className="bg-blue-400 dark:bg-blue-400 rounded-full cursor-pointer" size={"lg"}>Go Back To Home Page</Button>
    </div>
  )
}

export default NotFoundPage;