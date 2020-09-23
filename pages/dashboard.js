import { useState } from 'react';
import Link from 'next/link';
import { Layout, ProtectedRoute, Calendar, Modal } from "../components";
import { getCalendarData, getEvents } from "../lib";
import { useRouter } from 'next/router';

const Dashboard = (props) => {
  const { calendarData: { monthNumber, year }, events } = props;
  const [eventData, setEventData] = useState(null);
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const singleClick = (params) => {
    const eventId = `${year}-${monthNumber}-${params.date}`;
    const eventData = events[eventId];
    setEventData(eventData);
    if (eventData) {
      setModal(true);
    }
  }

  const closeModal = () => {
    setModal(false);
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
      {modal && <Modal closeModal={closeModal} eventData={eventData} />}
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
