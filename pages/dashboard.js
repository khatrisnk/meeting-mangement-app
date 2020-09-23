import { Layout, ProtectedRoute, Calendar } from "../components";
import { getCalendarData } from "../lib";

const Dashboard = ({ calendarData }) => {
  return (
    <Layout>
      <h1>Calendar</h1>
      <p>Navigate to schedule meeting page by clicking on date...</p>
      <Calendar
        month={calendarData.month}
        year={calendarData.year}
        weekDays={calendarData.weekDays}
        dates={calendarData.dates}
      />
    </Layout>
  );
};

export const getStaticProps = async () => {
  const calendarData = getCalendarData();
  return {
    props: {
      calendarData,
    },
  };
};

export default ProtectedRoute(Dashboard);
