import React from 'react';
import '../CSS/App.css';
import { Button } from 'reactstrap';



export function SearchBarEvent(props){

    return(
        <form className="form">
            Event Name: <input type="text" name="eventName" value={props.eventNameState} onChange={props.updateEventNameSearch.bind()}/>
            Hosted By: <input type="text" name="hostedBy" value={props.hostedByState} onChange={props.updateHostedBySearch.bind()}/>
            <Button className="button" className="purple-button" onClick={props.clearEvents}>Clear</Button>
        </form>
    )
}

export function SearchBarPage(props){

    return(

    <form className="form">
        Name: <input type="text" name="name" value={props.nameState} onChange={props.updateNameSearch.bind()}/>
        Major: <input type="text" name="major" value={props.majorState} onChange={props.updateMajorSearch.bind()}/>
        Interest: <input type="text" name="interests" value={props.interestsState} onChange={props.updateInterestsSearch.bind()}/>
        <Button className="button" className="purple-button" onClick={props.clearPeople}>Clear</Button>
    </form>
    )
  }
