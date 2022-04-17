import { useState } from 'react';
import { Stack } from 'react-bootstrap';
import { useUserState } from '../utilities/firebase';
import Event from './Event';
import NavBar from './NavBar';
import SearchBar from './SearchBar';

const EventsList = ({ events, setEventsList }) => {
  const [searchText, setSearchText] = useState('');
  const [checked, setChecked] = useState(false);
  const [user] = useUserState();
  const filteredEvents = Object.values(events).filter(event =>
    (event.title +
    event.description +
    event.sport +
    event.host +
    event.location).toLowerCase().includes(searchText.toLowerCase())).filter(checked ? e => e.join_status : e => true );

  return (
    <Stack direction="vertical" gap={3}>
      <SearchBar checked = {checked} setSearchText={setSearchText} setChecked={setChecked}/>
      {user ? <NavBar setChecked = {setChecked}/> : null}
    { filteredEvents.map(event => <Event key={ event.id } event={ event } setEventsList={setEventsList} />) }
    </Stack>
  )};

export default EventsList;