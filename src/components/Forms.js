import {Formik, Form, Field} from 'formik';
import firebase from 'firebase';
import {Redirect} from 'react-router-dom';
import 'firebase/database';
import 'firebase/auth';
import {Button} from 'reactstrap';
import {BackButton} from './Buttons';
import {useState} from 'react';




export function EventsSubmissionForm(props){

  let user = firebase.auth().currentUser;
  //let peopleRef = firebase.database.ref("people");

  let keyOfCurrentUser;

  for(let i = 0; i < props.peopleArray.length; i++) {
    if(props.peopleArray[i].email === user.email){
      keyOfCurrentUser = props.peopleArray[i].key;
    }
  }


  const initialValues = {
    titlea: '', 
    hostedBy: '', 
    time:'',
    date: '', 
    location: '',
    link: '', 
    description: '', 
    image: '',
    isInterested: '',
    interestedPeople: [],
  }

  const [redirectTo, setRedirectTo] = useState(undefined);

  

  

  const onSubmit = (values) =>{
    let databaseRef = firebase.database().ref('events');

    databaseRef.push(
      {
        title: values.title,
        hostedBy: values.hostedBy,
        time: values.time,
        date: values.date,
        location: values.location,
        link: values.link,
        description: values.description,
        image: 'temp-background.jpg',
        isInterested: false,
        interestedPeople: [keyOfCurrentUser],
        
      }
    );

    ///Redirects user after submit
    setRedirectTo("/");

  }


  if(redirectTo !== undefined){
    return <Redirect push to={redirectTo} />
  }


  return(
    <Formik {...{initialValues, onSubmit}}>
      {() => (
        <Form className="baseForm" noValidate>
          
          <label className="mt-4">Title of event</label> <br></br>
          <Field 
            type="text"
            id="title"
            name="title"
            /> <br></br>

          <label className="mt-4">Hosted by</label> <br></br>
          <Field 
            type="text"
            id="hostedBy"
            name="hostedBy"
            /> <br></br>

          <label className="mt-4">Date</label> <br></br>
          <Field
            type="date"
            id="date"
            name="date"
            /> <br></br>

          <label className="mt-4">Time</label> <br></br>
          <Field 
            type="time"
            id="time"
            name="time"
            /> <br></br>

          <label className="mt-4">Location</label> <br></br>
          <Field 
            type="text"
            id="location"
            name="location"
            /> <br></br>

          <label className="mt-4">Link to event</label> <br></br>
          <Field 
            type="text"
            id="link"
            name="link"
            /> <br></br>

          <label className="mt-4">Description</label> <br></br>
          <Field 
            type="textarea"
            id="description"
            name="description"
            className="mb-5"
            /> <br></br>
         

          <Button type="submit" className="purple-button">Submit</Button>
      
         
         <BackButton/>

        </Form>
      )}
    </Formik>
  )
}


export function PeopleForm(props){
  let user = firebase.auth().currentUser;
  //let peopleRef = firebase.database.ref("people");

  let keyOfCurrentUser;
  

  for(let i = 0; i < props.peopleArray.length; i++) {
    if(props.peopleArray[i].email === user.email){
      keyOfCurrentUser = props.peopleArray[i].key;
    }
  }

  

  let fnameUpdate = user.displayName.substr(0, user.displayName.indexOf(' '));
  let lnameUpdate = user.displayName.substr(user.displayName.indexOf(' ')+1, user.displayName.length);

  const initialValues = {
    fname: fnameUpdate, 
    lname: lnameUpdate,
    major: '',
    interest: '',
    year: '',
    email: user.email,
    bio: '',
    image: ''
    
  }

  const onSubmit = (values) => {

    const updatePerson = {
        fname: fnameUpdate,
        lname: lnameUpdate,
        major: values.major,
        interest: values.interest,
        year: values.year,
        email: user.email,
        bio: values.bio,
        image: 'images/avatar.png'
      
    }
    firebase.database().ref('people/'+keyOfCurrentUser).update(updatePerson);
  }  


  return(
    <Formik {...{initialValues, onSubmit}}>
    {() => (
      <Form className="baseForm" noValidate>

      <label className="mt-4">First Name</label> <br></br>
        <Field 
          type="text"
          id="fname"
          name="fname"
          /> <br></br>

      <label className="mt-4">Last Name</label> <br></br>
        <Field 
          type="text"
          id="lname"
          name="lname"
          /> <br></br>

        <label className="mt-4">Major</label> <br></br>
        <Field 
          type="text"
          id="major"
          name="major"
          /> <br></br>

        <label className="mt-4">Class Standing</label> <br></br>
        <Field
          type="text"
          id="year"
          name="year"
          /> <br></br>

        <label className="mt-4">Interest</label> <br></br>
        <Field 
          type="text"
          id="interest"
          name="interest"
          /> <br></br>

        <label className="mt-4">Email</label> <br></br>
        <Field 
          type="text"
          id="email"
          name="email"
          /> <br></br>

        <label className="mt-4">Bio</label> <br></br>
        <Field 
          type="text"
          id="bio"
          name="bio"
          /> <br></br>
          <Button type="submit">Submit</Button>
        <BackButton/>
      </Form>
    )}
  </Formik>
  )
}