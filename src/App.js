import React, {useState, useEffect} from 'react';
import './CSS/App.css';
import {NavBar, Footer} from './components/Navigation.js'
import {EventsIndividualPage, EventsMainPage} from './components/Events.js'
import { Route, Switch, Redirect} from 'react-router-dom';
import {PeopleList, PeopleDetails} from './components/People.js'
import firebase from 'firebase';
import { LandingPage } from './components/LandingPage.js';
import {EventSubmission, EditProfile} from './components/SubmissionPages.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


const uiConfig = {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  credentialHelper: 'none',
  signInFlow: 'popup',
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },

};

function App() {


  // Firebase state

  const[user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  let spinnerIcon= <FontAwesomeIcon icon={faSpinner}/>;
 
  
  //auth state event listener
  useEffect( () => { //run after component loads
    //listen to the the authentication state
    const authUnregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) =>{
      if(firebaseUser){
        setUser(firebaseUser);
        setIsLoading(false);
        if(firebaseUser && firebaseUser.metadata.creationTime === firebaseUser.metadata.lastSignInTime) {
          const newPerson = {
            fname: firebaseUser.displayName.substr(0, firebaseUser.displayName.indexOf(' ')),
            lname: firebaseUser.displayName.substr(firebaseUser.displayName.indexOf(' ')+1, firebaseUser.displayName.length),
            major: "-",
            interest: "-",
            year: "-",
            email: firebaseUser.email,
            bio: "-",
            image: "images/avatar.png"
          }
          firebase.database().ref('people').push(newPerson);
        }
      }else{ //not defined, logged out
        setUser(null)
      }
    })

    return function cleanup() {
      authUnregisterFunction();
    }
  }, []) //only run hook on first load



  const [eventsArray, setEvents] = useState([]); //array
  const [peopleArray, setPeople] = useState([]);
  const [interestedEventsFull, setInterested] = useState(eventsArray);
  

  /////  Gets all data from firebase /////
  useEffect(() => {
    const peopleRef = firebase.database().ref("people");
    const eventRef = firebase.database().ref("events");
    peopleRef.on("value", (snapshot) => {
      const peopleObjects = snapshot.val();
      let peopleKeyArray = Object.keys(peopleObjects);
      let peopleArray = peopleKeyArray.map((key) => {
        let singlePeopleObject = peopleObjects[key];
        singlePeopleObject.key = key;
        
        return singlePeopleObject;
      })
      setPeople(peopleArray);
    
    })

    eventRef.on("value", (snapshot) => {
      const eventsObject = snapshot.val() //converts to JS value
      let objectKeyArray = Object.keys(eventsObject);
      let array = objectKeyArray.map((key) => {
        let singleEventObject = eventsObject[key];
        singleEventObject.key = key;
        

        return singleEventObject;
      })
      
      setEvents(array);
      setInterested(eventsArray);
    })

  }, [])
  ///// Handle interested /////
  function handleInterestedClick (eventTitle)  {
    
    let user = firebase.auth().currentUser.email;

    let keyOfCurrentUser;

    for(let i = 0; i < peopleArray.length; i++) {
      if(peopleArray[i].email === user.email){
        keyOfCurrentUser = peopleArray[i].key;
      }
    }
    
    const interestedEvents = eventsArray.map((event) => {
      if(event.title === eventTitle){
        const refEvents = firebase.database().ref("events").child(event.key)
        
        const refInterestedPeople = firebase.database().ref("events/" + event.key + "/interestedPeople");
        
        refInterestedPeople.push(keyOfCurrentUser);
        refEvents.update({isInterested: !event.isInterested})
        //event.isInterested = !event.isInterested;
      }
      return event;
    })
    
    setInterested(interestedEvents);
  }

  let content = null;
/*
  if(isLoading){
    return(
    <div className="text-center">
      {spinnerIcon}
    </div>
    ) 
  }
*/

  //Log in page
  if(!user){
    content = (
      <LandingPage uiConfig={uiConfig} />
      
    )

   
  // Home page + rest of page
  }else{
    content =(
      <div>
        <nav>
          <NavBar />
         
        </nav>

        <main>
          <div className="container">
            <Switch>
              <Route exact path="/people" render={(routerProps) => (
              <PeopleList {...routerProps} user={user} peopleArray={peopleArray} ></PeopleList>
              )} />

              <Route exact path="/" render={(routerProps) => (
              <EventsMainPage {...routerProps} events={eventsArray} adoptHandleInterestedClick={handleInterestedClick}  ></EventsMainPage>
            )} />

              <Route path="/submit-event" render={() => (
              <EventSubmission peopleArray = {peopleArray} />
              )}/>

              <Route path="/event/:eventName" render={(routerProps) => (
              <EventsIndividualPage {...routerProps} ></EventsIndividualPage>
              )}/>

              <Route path="/people-edit" render={() => (
              <EditProfile user={user} peopleArray={peopleArray}></EditProfile>
              )}/>

              <Route path="/people/:fullname" render={(routerProps) => (
              <PeopleDetails {...routerProps} peopleArray={peopleArray}></PeopleDetails>
              )}/>
              
              <Redirect to="/" />
            </Switch>
          </div>
          
        </main>

        <footer>
          <Footer />
        </footer>

    </div>
 

    )
  }
  return (
   content
  );
}

export default App;
