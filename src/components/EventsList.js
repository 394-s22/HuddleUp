import { useState } from 'react';
import { Stack, Container, Button } from 'react-bootstrap';
import Event from './Event';
import NavBar from './NavBar';
import SearchBar from './SearchBar';

const EventsList = ({ events, setEventsList }) => {
  const [searchText, setSearchText] = useState('');
  const [checked, setChecked] = useState(false);
  const filteredEvents = Object.values(events).filter(event =>
    (event.title +
    event.description +
    event.sport +
    event.host +
    event.location).toLowerCase().includes(searchText.toLowerCase())).filter(checked ? e => e.join_status : e => true );

  return (
    <Stack direction="vertical" gap={3}>
      <SearchBar checked = {checked} setSearchText={setSearchText} setChecked={setChecked}/>
      <NavBar setChecked = {setChecked}/>
    { filteredEvents.map(event => <Event key={ event.id } event={ event } setEventsList={setEventsList} />) }
    </Stack>
  )};

export default EventsList;