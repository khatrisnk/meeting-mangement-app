import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useAuth } from "../../utils/custome-hooks";

const ProtectRoute = (Component) => {
  return (props) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      } else {
        router.push("/dashboard");
      }
    }, [isAuthenticated]);

    return <Component {...props} />;
  };
};

export default ProtectRoute;
