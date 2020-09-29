import React from "react";
import 'components/InterviewerListItem.scss';
import classNames from 'classnames';

export default function InterviewerListItem(props) {

  const className = classNames('interviewers__item', {'interviewers__item--selected': props.selected},{'interviewers__item--image': props.avatar})
  let onClick;
  props.setInterviewer ? onClick = props.setInterviewer : onClick = ()=>{};

  return (
    <li className={className} onClick={onClick}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt="Sylvia Palmer"
      />
      {props.selected && props.name}
    </li>
  );
}