import Link from 'next/link';
import { Layout, ProtectedRoute, Calendar } from "../components";
import { getCalendarData, getEvents } from "../lib";

const Dashboard = (props) => {
  return (
    <Layout>
      <h1>Calendar</h1>
      <Calendar {...props} />
      <br />
      <Link href="/schedule-meet">Schedule Meeting</Link>
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
