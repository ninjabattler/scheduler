import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";

import DayList from 'components/DayList';

import Appointment from 'components/Appointment';

const config = { proxy: { host: 'localhost', port: '8001' } }

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: []
  });

  const setDay = day => setState({ ...state, day });

  const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    axios.get('/api/days',config)
    .then((res)=>{
      setDays(res.data)
    })
  }, [])

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
        {state.appointments.map(appointment=>(
          <Appointment key={appointment.id} {...appointment} />
        ))}
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
