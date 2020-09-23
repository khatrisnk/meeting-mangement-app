import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useAuth } from "../../utils/custome-hooks";

const ProtectRoute = (Component) => {
  return () => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) router.push("/login");
    }, [isAuthenticated]);

    return <Component {...arguments} />;
  };
};

export default ProtectRoute;
