import React from 'react';
import {EventsSubmissionForm, PeopleForm} from './Forms'
export function EventSubmission(props){
  
  return(
    <main>
      <div className="d-flex justify-content-center mt-5">
        <h1>SUBMIT AN EVENT</h1>
      </div>
  
      <EventsSubmissionForm peopleArray={props.peopleArray} />
    
      
  
    </main>
  )
  
}

export function EditProfile(props){
  return(
    <main>
      <div className="d-flex justify-content-center mt-5">
        <h1>EDIT PROFILE</h1>
      </div>

      <PeopleForm user={props.user} peopleArray={props.peopleArray} />
      
     
  
    </main>
  )
   
}