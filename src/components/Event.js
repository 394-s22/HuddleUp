import { useUserState } from '../utilities/firebase';
import { Card, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { setData } from "../utilities/firebase";
import { hasConflict } from '../utilities/times';

const joinEvent = async (user, userData, event) => {
  try {
    const userId = user.uid;
    const joined_events = userData[userId].joined_events;

    if (joined_events && joined_events.includes(event.id)) {
      await setData(`/events/${event.id}/current_players`, event.current_players - 1);
      await setData(`/users/${user.uid}/joined_events`, joined_events.filter(e => e !== event.id));
    } else {
      var newEvents = [event.id];
      if (joined_events !== undefined && joined_events.length !== 0) {
        joined_events.push(event.id);
        newEvents = joined_events;
      }

      await setData(`/users/${user.uid}/joined_events`, newEvents);
      await setData(`/events/${event.id}/current_players`, event.current_players + 1);
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

const Event = ({ event, events, userData }) => {
  const [user] = useUserState();

  const signedIn = user && userData && userData[user.uid].joined_events;
  
  const joinedEvents = signedIn ?
    Object.values(events).filter(event => userData[user.uid].joined_events.includes(event.id)) : [];

  const joined_condition = signedIn &&
    userData[user.uid].joined_events.includes(event.id);

  const playerList = userData ? Object.values(userData).filter((user) =>
    user.joined_events && user.joined_events.includes(event.id)).map((user) => user.displayName) : [];

  const isJoined = signedIn ? userData[user.uid].joined_events.includes(event.id) : false;

  const isFull = event.current_players >= event.max_players;

  const isDisabled = (!isJoined && isFull) || !user || (!isJoined && hasConflict(event, joinedEvents));

  const style = { textAlign: 'left', 
                  backgroundColor: isDisabled ? 'lightgrey' : 'white' };
  return (
    <Card style={style}>
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Host: {event.host} </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Location: {event.location} </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Minimum Players: {event.min_players} </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Players Signed Up: {event.current_players}/{event.max_players}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Players Attending: {playerList.join(', ')}
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
          overlay={!user ? renderTooltip : (props) => (<span></span>)}
        >
          <span>
            <Button
              variant="primary"
              onClick={() => joinEvent(user, userData, event)}
              disabled={isDisabled}
              style={{ backgroundColor: joined_condition ? '#c71c13' : '#0d6efd' }}
            >{user && joined_condition ? 'Leave' : 'Join'}
            </Button>
          </span>
        </OverlayTrigger>

      </Card.Body>
    </Card>
  );
};

export default Event;