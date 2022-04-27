import { useState } from 'react';
import { Stack } from 'react-bootstrap';
import { useUserState } from '../utilities/firebase';
import Event from './Event';
import NavBar from './NavBar';
import SearchBar from './SearchBar';

const EventsList = ({ events, searchText, userData, currentPage, filterCondition}) => {
  const [user] = useUserState();

  const joined_condition = (event) => {return user && userData && userData[user.uid].joined_events && 
    userData[user.uid].joined_events.includes(event.id);};

  const hosted_condition = (event) => {return user && userData && userData[user.uid].hosted_events && 
    Object.values(userData[user.uid].hosted_events).includes(event.id);};

  const filteredEvents = Object.values(events).filter(event =>
    String(event.title +
    event.description +
    event.sport +
    event.host +
    event.location).toLowerCase().includes(searchText.toLowerCase()))
            .filter(currentPage === "myevents" ? 
                    (filterCondition === "joined_events" ? joined_condition : hosted_condition ): e => true );

  return (
    <Stack direction="vertical" gap={3}>
    { filteredEvents.map(event => <Event key={ event.id } event={ event } events={events} userData={userData} />) }
    </Stack>
  )};

export default EventsList;