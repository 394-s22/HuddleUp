import fakeEvents from './fakeEvents.json';
import './App.css';

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

const Event = ({ event }) => (
  <div>
    { event.title } hosted by { event.host } at { event.location }
    { event.date } : {event.start_time}-{event.end_time}
  </div>
);

const EventsList = ({ events }) => (
  <div>
  { Object.values(events).map(event => <Event key={ event.id } event={ event } />) }
  </div>
);

const App = () => {
  return (
    <div>
      <Banner title={ fakeEvents.title } />
      <EventsList events={ fakeEvents.events } />
  </div>
  );
}

export default App;
