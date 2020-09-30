export function getAppointmentsForDay(state, day) {
  
  let appointments = [];

  for(const st of state.days){
    if(st.name === day) {
      appointments = st.appointments;
    }
  }

  let correctAppointments = [];

  for(const st in state.appointments){
    for(const appointment of appointments){
      if(state.appointments[st].id === appointment) {
        correctAppointments.push(state.appointments[st]);
      }
    }
  }

  return correctAppointments;

}