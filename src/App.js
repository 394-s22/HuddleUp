import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import fakeEvents from './fakeEvents.json';
import EventsList from './components/EventsList';
import SearchBar from './components/SearchBar';
import { useEffect, useState } from 'react';
import { useData } from './utilities/firebase';

const Banner = ({ title }) => (
  <h1>{title}</h1>
);

const App = () => {
  const [eventsList, setEventsList, loading] = useData("/events");
  const [curEvents, setCurEvents] = useState([]);
  useEffect( () =>  {
    setCurEvents(eventsList);
  }, [eventsList]);
  //const [joinedEvents, setJoinedEvents] = useState([]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className='App'>
      <Banner title={fakeEvents.title} />
      <SearchBar eventsList={eventsList} curEvents={curEvents} setEventsList={setCurEvents}/>
      <EventsList events={curEvents} setEventsList={setEventsList}/>
    </div>
  );
};

export default App;