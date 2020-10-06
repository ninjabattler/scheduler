import React from "react";
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/header';
import Show from 'components/Appointment/show';
import Empty from 'components/Appointment/empty';
import Form from 'components/Appointment/form';
import Status from 'components/Appointment/status';
import Confirm from 'components/Appointment/confirm';
import Error from 'components/Appointment/error';
import useVisualMode from "hooks/useVisualMode";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const SAVING = "SAVING";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment" data-testid="appointment">
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
          onEdit={
            ()=>{
              transition(EDIT)
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
              .catch(()=>{
                transition(ERROR_SAVE, true)
              })
            }
          }
        />
      )}   
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={()=>{back()}}
          onSave={
            (name, interviewer)=>{
              transition(SAVING)
              props.onSave(name, interviewer, props.id)
              .then(()=>{
                transition(SHOW)
              })
              .catch(()=>{
                transition(ERROR_SAVE, true)
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
      {mode === ERROR_SAVE && (
        <Error
          message={'Whoops'}
          onClose={()=>{back()}}
        />
      )} 
      {mode === ERROR_DELETE && (
        <Error
          message={'OOPS'}
          onClose={()=>{back()}}
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
              .catch(()=>{
                transition(ERROR_DELETE, true)
              })
              
          }}
        />
      )} 
    </article>
  );
}