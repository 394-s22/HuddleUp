import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Stack, Button } from 'react-bootstrap';
import fakeEvents from './fakeEvents.json';
import EventsList from './components/EventsList';
import SearchBar from './components/SearchBar';
import { useState, useEffect } from 'react';

const Banner = ({ title }) => (
  <h1>{title}</h1>
);

const App = () => {
  const [eventsList, setEventsList] = useState(fakeEvents.events);
  const [joinedEvents, setJoinedEvents] = useState([]);

  return (
    <div className='App'>
      <Banner title={fakeEvents.title} />
      <SearchBar fakeEvents={fakeEvents} setEventsList={setEventsList}/>
      <EventsList events={eventsList} setEventsList={setEventsList}/>
    </div>
  );
}

export default App;