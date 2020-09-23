import Link from 'next/link';
import { Layout, ProtectedRoute, Calendar } from "../components";
import { getCalendarData, getEvents } from "../lib";
import { useRouter } from 'next/router';

const Dashboard = (props) => {
  const { calendarData: { monthNumber, year }, events } = props;
  const router = useRouter();

  const singleClick = (evt, date) => {
    console.log('Single click');
  }

  const doubleClick = (params) => {
    router.push(`/schedule-meet?date=${params.date}`)
  }

  return (
    <Layout>
      <h1>Calendar</h1>
      <Calendar {...props} onClick={singleClick} onDoubleClick={doubleClick} />
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
