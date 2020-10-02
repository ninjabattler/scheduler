import React from "react";
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/header';
import Show from 'components/Appointment/show';
import Empty from 'components/Appointment/empty';
import Form from 'components/Appointment/form';
import Status from 'components/Appointment/status';
import Confirm from 'components/Appointment/confirm';
import useVisualMode from "hooks/useVisualMode";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const SAVING = "SAVING";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onClick={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={
            ()=>{
              transition(CONFIRM)
            }
          }
        />
      )}    
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={()=>{back()}}
          onSave={
            (name, interviewer)=>{
              transition(SAVING)
              props.onSave(name, interviewer, props.id)
              .then(()=>{
                transition(SHOW)
              })
            }
          }
        />
      )}   
      {mode === SAVING && (
        <Status
          message={'Creating a new thing...'}
        />
      )} 
      {mode === DELETING && (
        <Status
          message={'DELETING a new thing...'}
        />
      )} 
      {mode === CONFIRM && (
        <Confirm
          message={'Really?'}
          onCancel={()=>{back()}}
          onConfirm={()=>{
            transition(DELETING)
              props.onDelete(props.id, null)
              .then(()=>{
                transition(EMPTY)
              })
          }}
        />
      )} 
    </article>
  );
}