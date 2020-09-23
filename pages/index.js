import Link from "next/link";
import { Layout } from "../components";

const Home = () => {
  return (
    <Layout>
      <h1>Welcome to Meeting Management App (MMA)</h1>
      <p>Kindly click the link below to login the application</p>
      <Link href="/login">Login</Link>
    </Layout>
  );
};

export default Home;
