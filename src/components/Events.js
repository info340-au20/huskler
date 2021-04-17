import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {Card, CardText, CardBody, CardFooter, CardLink, CardTitle, Col, Row} from 'reactstrap';
import {Redirect, useParams} from 'react-router-dom';
import { BackButton, SubmitEventButton } from './Buttons.js';
import { Button } from 'reactstrap';
import { SearchBarEvent } from './Search.js';
import firebase from 'firebase';
import '../CSS/App.css';


export function EventsMainPage(props){

  let adoptHandleInterestedClick = props.adoptHandleInterestedClick;
  let eventsArray = props.events;
  
  let content ='';

  if(firebase.database().ref("events") === null ){
    content = 
      <div>
        <SubmitEventButton />
        <div className="mt-5">
          <h2>There are currently no events at this time. Please check again later!</h2>;
        </div>
      </div>
    
  }else{
   content = <EventsList eventsArray={eventsArray} adoptHandleInterestedClick={adoptHandleInterestedClick}/>;
  }

  return(
   content
  )
}

export function EventsList(props){

  const [eventNameState, setEventNameSearch] = useState('');
  const [hostedByState, setHostedBySearch] = useState('');
  let eventsArray = props.eventsArray;
  
  let adoptHandleInterestedClick = props.adoptHandleInterestedClick;
  
 
  ////// Search function /////
  let filteredEvents = eventsArray.filter((event) => {
    return (event.title.toLowerCase().indexOf(eventNameState.toLowerCase()) !== -1);
  });

  if(hostedByState !== ''){
    filteredEvents = eventsArray.filter((event) => {
      return (event.hostedBy.toLowerCase().indexOf(hostedByState.toLowerCase()) !== -1);
    })
  }

  const updateEventNameSearch = (event) => {
    setEventNameSearch(event.target.value);
  }

  const updateHostedBySearch = (event) => {
    setHostedBySearch(event.target.value);
  }

  const clearEvents = () => {
    setEventNameSearch('');
    setHostedBySearch('');
  }

  let eventCards = filteredEvents.map((eventsArray) => {
    return <EventCard key={eventsArray.title} event={eventsArray} adoptHandleInterestedClick={adoptHandleInterestedClick} />
  })
 
  ///// Return /////
  return(
    <div>
      <div className="search-bar">
        <SearchBarEvent updateEventNameSearch={updateEventNameSearch} eventNameState={eventNameState} updateHostedBySearch={updateHostedBySearch} hostedByState={hostedByState} clearEvents={clearEvents}></SearchBarEvent>
      </div>
      <SubmitEventButton />
      <h3>Events</h3>
      <Row>
        {eventCards}
      </Row>
    </div>
    
  )
  
}

//////// EVENT CARD /////////
export function EventCard(props) {
  
  let event = props.event;
  let adoptHandleInterestedClick = props.adoptHandleInterestedClick;


  const[redirectTo, setRedirectTo] = useState(undefined);

  const handleClick =() => {
    setRedirectTo("/event/" + event.title);
  }

  if(redirectTo !== undefined){
    return <Redirect push to={redirectTo}/>
  }

 

  return (
    <Col md="6" className="mt-4">
      <Card>
        <div className="image-div">
          <img className="event-images" src={"../images/"+event.image} alt={"an image for " + event.title} />
        </div>
        <CardBody className="clickable" onClick={() => handleClick(event.name) }>

          <CardTitle tag="h3" className="text-center">
            {event.title}
          </CardTitle>
          <CardText className="text-center">
            {"Hosted by: " + event.hostedBy}
          </CardText>
          <CardText >
            {(event.description).substring(0,200) +"..."} 
          </CardText>
          <CardLink href="">Click to learn more!</CardLink>

        </CardBody>
        <CardFooter> 
          <Button onClick={ () => adoptHandleInterestedClick(event.title)}>Interested</Button>
          <p> {event.isInterested ? "You are interested in this event!" : <br></br> }</p>
        </CardFooter>
      </Card>

    </Col>
  )
}

////// EVENT PAGE /////
export function EventsIndividualPage(){
  
  const [eventsArray, setEvents] = useState([]); //array
  useEffect(() => {
    const eventRef = firebase.database().ref("events");
    eventRef.on("value", (snapshot) => {
      const eventsObject = snapshot.val() //converts to JS value
      let objectKeyArray = Object.keys(eventsObject);
      let eventsArray = objectKeyArray.map((key) => {
        let singleEventObject = eventsObject[key];
        singleEventObject.key = key;
        return singleEventObject;
      })
      setEvents(eventsArray);
    })
  }, [])

  
  let eventName = useParams().eventName;
  let event = _.find(eventsArray, {title:eventName});
  let eventLink = '';
  if(!event){
    return <h4>No event that matches</h4>
  }
  if(event.link = ""){
    eventLink = "A link to the event was not provided";
  }else{
    eventLink = event.link;
  }
  

  return(
    <div>
      <img src={"../images/" + event.image} alt={"an image of " + event.title} className="event-images-lg mt-5" />
      <h5>{event.title}</h5>
      <p><strong>Hosted by: </strong>{event.hostedBy}</p>
      <p><strong>Date: </strong>{event.date}</p>
      <p><strong>Time: </strong>{event.time}</p>
      <p><strong>Location: </strong>{event.location}</p>
      <p><strong>Link: </strong>{eventLink}</p>
      <p><strong>Description:</strong> <br></br> {event.description}</p>
    
      <BackButton />
    </div>
  )
}


