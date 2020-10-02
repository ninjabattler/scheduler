import React, { useState, useEffect } from "react";
import axios from "axios";
const config = { proxy: { host: 'localhost', port: '8001' } }

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  //Get data from the api and change the state

  const dailyAppointments = [];

  useEffect(() => {
    Promise.all([
      axios.get('/api/days',config),
      axios.get('/api/appointments',config),
      axios.get('/api/interviewers',config)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      dailyAppointments.push(all[1].data);
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios.put(`/api/appointments/${id}`, appointment, config)
      .then((res)=>{
        setState({...state, appointments});
      })
  };


  return ({
    state,

    setState,

    //Delete an appointment
    deleteInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      return axios.delete(`/api/appointments/${id}`, appointment, config)
        .then((res)=>{
          setState({...state, appointments});
        })
    },

    save(name, interviewer, id) {
      const interview = {
        student: name,
        interviewer
      };
      return bookInterview(id, interview)
    },

    
    setDay (day){setState({ ...state, day })}

  })
}