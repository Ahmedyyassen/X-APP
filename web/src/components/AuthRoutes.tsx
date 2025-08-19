import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";
import SocketProvider from "../context/SocketContext";

type Props = {
  children: React.ReactNode;
  type: "Protected" | "Public";
};
const AuthRoutes = ({ children, type }: Props) => {
  const { authUser: isAuth, isLoading, error } = useAuth();
  if (isLoading) {
    return <Loader size={72} />;
  }
  // Show error only if user is logged in AND an error occurred
  if (error && isAuth) {
    return (
      <div className="text-red-500 p-4 text-center">
        Something went wrong. Please try again.
      </div>
    );
  }

  if (type === "Protected") {
    return isAuth ? 
    (
    <SocketProvider>
      {children}
    </SocketProvider>
    ) 
    : <Navigate to={"/auth"} />;
  } else if (type === "Public") {
    return !isAuth ? children : <Navigate to={"/"} />;
  }
};

export default AuthRoutes;
