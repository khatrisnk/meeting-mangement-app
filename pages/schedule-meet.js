import { useState, useEffect } from "react";
import { Layout } from "../components";
import { useFormFields } from "../utils/custome-hooks";
import { postData } from '../utils';
import { useRouter } from 'next/router';
import { getCalendarData, getEvents } from "../lib";

const ScheduleMeeting = (props) => {
  const { calendarData: { monthNumber, year }, events } = props;
  const [error, setError] = useState("");
  const { formFields, createChangeHandler, updateFormFields } = useFormFields({
    date: "",
    name: "",
    description: "",
    attendees: "",
  });
  const router = useRouter();

  useEffect(() => {
    const eventId = `${year}-${monthNumber}-${router.query.date}`;
    const eventData = events[eventId];
    updateFormFields(eventData);
  }, [router.query.date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postData("/api/event", {
      date: formFields.date,
      name: formFields.name,
      description: formFields.description,
      attendees: formFields.attendees
    });
    if (res.status === 201) {
      setError('');
      router.push('/dashboard');
    } else {
      setError('Something went wrong while creating event!!!');
    }
  };

  return (
    <Layout>
      <h1>{formFields.name ? 'Edit' : 'Create'} Event</h1>
      {error && <p className="global-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date</label>
          <input
            required
            type="date"
            id="date"
            value={formFields.date}
            placeholder="dd-mm-yyyy"
            min="2020-08-30"
            max="2020-11-03"
            onChange={createChangeHandler("date")}
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            id="name"
            value={formFields.name}
            onChange={createChangeHandler("name")}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={formFields.description}
            onChange={createChangeHandler("description")}
          />
        </div>
        <div>
          <label htmlFor="attendees">Attendees</label>
          <input
            required
            type="email"
            id="attendees"
            value={formFields.attendees}
            multiple
            pattern="^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4},*[\W]*)+$"
            onChange={createChangeHandler("attendees")}
          />
        </div>
        <input type="submit" value={`${formFields.name ? 'Edit' : 'Create'} Event`}></input>
      </form>
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

export default ScheduleMeeting;
