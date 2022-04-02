import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Stack, Button } from 'react-bootstrap';
import fakeEvents from './fakeEvents.json';
import EventsList from './components/EventsList';
import { useState, useEffect } from 'react';

const Banner = ({ title }) => (
  <h1>{title}</h1>
);

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [eventsList, setEventsList] = useState(fakeEvents.events)

  const handleSearch = () => {
    //use searchText to filter cards
    console.log(searchText);
    setEventsList(fakeEvents.events.filter(event => 
      (event.title + 
        event.description + 
        event.sport + 
        event.host + 
        event.location).toLowerCase().includes(searchText.toLowerCase())));
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <div className='App'>
      <Banner title={fakeEvents.title} />
      <Stack direction="horizontal" gap={3}>
        <Form.Control
          className="me-auto"
          placeholder="Search events..."
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress = {handleKeyPress}
        />
        <Button
          variant="secondary"
          onClick={handleSearch}>
          Search
        </Button>
        <div className="vr" />
        <Button
          variant="outline-danger"
          onClick={() => setEventsList(fakeEvents.events)}>
          Reset
        </Button>
      </Stack>
      <EventsList events={eventsList} />
    </div>
  );
}

export default App;
