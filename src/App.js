import fakeEvents from './fakeEvents.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Stack } from 'react-bootstrap';
import './App.css';

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

const Event = ({ event }) => (
  // <div>
  //   { event.title } hosted by { event.host } at { event.location }
  //   { event.date } : {event.start_time}-{event.end_time}
  // </div>
  <Card style={{ textAlign: 'left' }}>
  <Card.Body>
    <Card.Title>{ event.title }</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Host: { event.host } </Card.Subtitle>
    <Card.Subtitle className="mb-2 text-muted">Location: { event.location } </Card.Subtitle>
    <Card.Subtitle className="mb-2 text-muted">Minimum Players: { event.min_players } </Card.Subtitle>
    <Card.Subtitle className="mb-2 text-muted">
      Players Signed Up: { event.current_players }/{ event.max_players } 
      </Card.Subtitle>
    <Card.Subtitle className="mb-2 text-muted">
      Date: { event.date } : { event.start_time } - { event.end_time } 
      </Card.Subtitle>
    <Card.Text>
      {event.description}
    </Card.Text>
    <Button variant="primary">Join</Button>
  </Card.Body>
  </Card>
);

const EventsList = ({ events }) => (
  <Stack direction="vertical" gap={3}>
  { Object.values(events).map(event => <Event key={ event.id } event={ event } />) }
  </Stack>
);

const App = () => {
  return (
    <div className='App'>
      <Banner title={ fakeEvents.title } />
      <EventsList events={ fakeEvents.events } />
  </div>
  );
}

export default App;
