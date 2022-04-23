import { useState } from 'react';
import { Stack } from 'react-bootstrap';
import { useUserState } from '../utilities/firebase';
import Event from './Event';
import NavBar from './NavBar';
import SearchBar from './SearchBar';

const EventsList = ({ events, setEventsList, userData }) => {
  const [searchText, setSearchText] = useState('');
  const [checked, setChecked] = useState(false);
  const [user] = useUserState();

  const joined_condition = (event) => {return user && userData && userData[user.uid].joined_events && 
    userData[user.uid].joined_events.includes(event.id); };

  const filteredEvents = Object.values(events).filter(event =>
    String(event.title +
    event.description +
    event.sport +
    event.host +
    event.location).toLowerCase().includes(searchText.toLowerCase())).filter(checked ? joined_condition : e => true );

  return (
    <Stack direction="vertical" gap={3}>
      <SearchBar checked = {checked} setSearchText={setSearchText} setChecked={setChecked}/>
      {user ? <NavBar setChecked = {setChecked} setSearchText = {setSearchText}/> : null}
    { filteredEvents.map(event => <Event key={ event.id } event={ event } setEventsList={setEventsList} userData={userData} />) }
    </Stack>
  )};

export default EventsList;