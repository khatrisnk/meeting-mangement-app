/**
 * 
 * 
 * 
 * This file is no longer used
 * 
 * I created this in confusion to have dynamic path from event id
 * 
 * 
 * 
 * 
 */


import { useState } from "react";
import { getAllDatesIds, getEventData } from "../../lib";
import { Layout } from "../../components";
import { useFormFields } from "../../utils/custome-hooks";
import { postData } from '../../utils';
import { useRouter } from 'next/router';

const ScheduleMeeting = ({ eventData, eventId }) => {
  const [error, setError] = useState("");
  const { formFields, createChangeHandler } = useFormFields({
    date: eventData.date,
    name: eventData.name,
    description: eventData.description,
    attendees: eventData.attendees,
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postData("/api/event", {
      eventId,
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
      <h1>{eventData.name ? 'Edit' : 'Create'} Event</h1>
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
        <input type="submit" value={`${ eventData.name ? 'Edit' : 'Create' } Event`}></input>
        {/* <button>{eventData.name ? 'Edit' : 'Create'} Event</button> */}
      </form>
    </Layout>
  );
};

export const getStaticProps = async ({ params }) => {
  const eventData = getEventData(params.id);
  return {
    props: {
      eventData,
      eventId: params.id
    },
  };
};

export const getStaticPaths = async () => {
  const paths = getAllDatesIds();
  return {
    paths,
    fallback: false,
  };
};

export default ScheduleMeeting;
