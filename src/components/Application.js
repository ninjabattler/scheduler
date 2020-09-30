import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import { getAppointmentsForDay } from "helpers/selectors";
const config = { proxy: { host: 'localhost', port: '8001' } }

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days',config),
      axios.get('/api/appointments',config),
      axios.get('/api/interviewers',config)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}));
      dailyAppointments.push(all[1].data);
    });
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={day => setDay(day)}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment=>(
          <Appointment key={appointment.id} {...appointment} />
        ))}
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
