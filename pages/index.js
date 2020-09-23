import Link from "next/link";
import { Layout } from "../components";
import { useAuth } from "../utils/custome-hooks";

const Home = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Layout>
      <h1>Welcome to Meeting Management App (MMA)</h1>
      {isAuthenticated ? (
        <>
          <p>Kindly click the link below to schedule meeting.</p>
          <Link href="/dashboard">Dashboard</Link>
        </>
      ) : (
        <>
          <p>Kindly click the link below to login the application</p>
          <Link href="/login">Login</Link>
        </>
      )}
    </Layout>
  );
};

export default Home;
