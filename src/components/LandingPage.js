import React from 'react';
import { Container} from 'reactstrap'
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import '../CSS/App.css'


export function LandingPage (props){

  return(
    <div style={{ 
      backgroundImage: "url(images/signup-page-background.jpg)", 
      backgroundSize: "cover",
      backgroundPosition: "center bottom",
      height: "100vh",
      border: "1px solid black",
      }}>
      <div className="header-flex">
        <h1 className="header-landing-page">HUSKLER</h1>  
      </div>
      
      <Container>
        <StyledFirebaseAuth uiConfig={props.uiConfig} firebaseAuth={firebase.auth()} />
      </Container>
    </div>
  )
}


/*
function LandingPageCarousel(){
  const items = [
    {
      src: '../images/lux.png',
      altText: 'event by LUX',
    },
    {
      src: '../images/quest-facor.jpg',
      altText: 'event by Sam',
    }
  ];

  return(
    <UncontrolledCarousel items={items}/>
  )
}
*/