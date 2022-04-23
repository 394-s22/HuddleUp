import { useState, render, useRef } from 'react';
import { useUserState } from '../utilities/firebase';
import { Card, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useData, setData } from "../utilities/firebase";

const joinEvent = async (user, userData, event) => {
  try {
    //particular event id is in user's list 
    if(event.join_status){
      //await setData(`/events/${event.id}/join_status`, false);
      await setData(`/events/${event.id}/current_players`, event.current_players-1);
    } else {
      //await setData(`/events/${event.id}/join_status`, true);
      await setData(`/users/${user.uid}/joined_events`, userData.joined_events ? userData.joined_events.push(event.id) : [event.id]);
      await setData(`/events/${event.id}/current_players`, event.current_players+1);
    }
  } catch (error) {
    alert(error);
  }
};

const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Sign in to join events!
    </Tooltip>
  );

const Event = ({ event, setEventsList, userData }) => {  
  const [joined, setJoined] = useState(event.join_status);
  const [user] = useUserState();
  // const target = useRef(null);
  // const [show, setShow] = useState(user);

  const handleJoin = () => {
    // edit list of joined events; how to keep track of this list across components?
    // need to pass down the list of joined events from App.js?
    // increment number of current players
    // edit 'join_status' property for that event
    if (event.join_status) {
      setJoined(false);
      joinEvent(user, userData, event);
    }
    else {
      setJoined(true);
      joinEvent(user, userData, event);
    };
  };

  return (
    <Card style={{ textAlign: 'left' }}>
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Host: {event.host} </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Location: {event.location} </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Minimum Players: {event.min_players} </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Players Signed Up: {event.current_players}/{event.max_players}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Date: {event.date}: {event.start_time} - {event.end_time}
        </Card.Subtitle>
        <Card.Text>
          {event.description}
        </Card.Text>


        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay= {!user ? renderTooltip : (props) => (<span></span>)}
        >
          <span>            
            <Button
              variant="primary"
              onClick={() => handleJoin()}
              disabled={event.current_players >= event.max_players || !user}
              style={{backgroundColor: user && event.join_status ? '#c71c13' : '#0d6efd'}}
            >{ user && event.join_status ? 'Leave' : 'Join' }
            </Button>
          </span>
        </OverlayTrigger>
        
      </Card.Body>
    </Card>
  );
};

export default Event;