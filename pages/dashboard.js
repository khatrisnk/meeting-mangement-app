import { Layout, ProtectedRoute } from "../components";

const Dashboard = () => {
  return <Layout>Dashboard</Layout>;
};

export default ProtectedRoute(Dashboard);
