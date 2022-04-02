import { Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import { setData } from "../utilities/firebase";

const joinEvent = async (event) => {
  try {
    if(event.join_status){
      await setData(`/events/${event.id}/join_status`, false);
      await setData(`/events/${event.id}/current_players`, event.current_players-1);
    } else {
      await setData(`/events/${event.id}/join_status`, true);
      await setData(`/events/${event.id}/current_players`, event.current_players+1);
    }
  } catch (error) {
    alert(error);
  }
};

const Event = ({ event, setEventsList }) => {  
  const [joined, setJoined] = useState(event.join_status);
  const handleJoin = () => {
    // edit list of joined events; how to keep track of this list across components?
    // need to pass down the list of joined events from App.js?
    // increment number of current players
    // edit 'join_status' property for that event
    if (event.join_status) {
      setJoined(false);
      joinEvent(event);
    }
    else {
      setJoined(true);
      joinEvent(event);
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
        <Button
          variant="primary"
          onClick={() => handleJoin()}
          disabled={event.current_players >= event.max_players}
        >{ event.join_status ? 'Joined' : 'Join' }</Button>
      </Card.Body>
    </Card>
  );
};

export default Event;