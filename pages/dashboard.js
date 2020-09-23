import { Layout, ProtectedRoute, Calendar } from "../components";
import { getCalendarData, getEvents } from "../lib";

const Dashboard = (props) => {
  return (
    <Layout>
      <h1>Calendar</h1>
      <p>Navigate to schedule meeting page by clicking on date...</p>
      <Calendar {...props} />
    </Layout>
  );
};

export const getStaticProps = async () => {
  const calendarData = getCalendarData();
  const events = getEvents();
  return {
    props: {
      calendarData,
      events,
    },
  };
};

export default ProtectedRoute(Dashboard);
