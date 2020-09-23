import fs from "fs";
import path from "path";
import { calendarData } from "../data/calendar";

const dataDirectory = path.join(process.cwd(), "data");

export const saveEvent = (data) => {
  const { date, name, description, attendees } = data;
  const fullPath = path.join(dataDirectory, "events.json");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const events = JSON.parse(fileContents);
  events[date] = {
    date,
    name,
    description,
    attendees,
  };
  fs.writeFileSync(fullPath, JSON.stringify(events), { encoding: "utf8" });
  return data;
};

export const getEvents = () => {
  const fullPath = path.join(dataDirectory, "events.json");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const events = JSON.parse(fileContents);
  return events;
};

export const getEventData = (id) => {
  const fullPath = path.join(dataDirectory, "events.json");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const events = JSON.parse(fileContents);
  return events[id] || {
    date: "",
    name: "",
    description: "",
    attendees: ""
  };
};

export const validateUser = ({ email, password }) => {
  const fullPath = path.join(dataDirectory, "users.json");
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const user = JSON.parse(fileContents).users.find(
    (user) => user.email === email && user.pwd === password
  );
  return user;
};

export const getCalendarData = () => {
  return calendarData;
};

export const getAllDatesIds = () => {
  return calendarData.dates.map((date) => {
    return {
      params: {
        id: date.id,
      },
    };
  });
};
