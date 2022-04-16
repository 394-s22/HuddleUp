import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import fakeEvents from './fakeEvents.json';
import EventsList from './components/EventsList';
import NavBar from './components/NavBar';
import { useEffect, useState } from 'react';
import { useData } from './utilities/firebase';

const Banner = ({ title }) => (
  <h1 className='banner' >{title}</h1>
);

const App = () => {
  const [eventsList, setEventsList, loading] = useData("/events");
  const [curEvents, setCurEvents] = useState([]);
  useEffect(() => {
    setCurEvents(eventsList);
  }, [eventsList]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <Banner title={fakeEvents.title} />
      <div className='App'>
        <EventsList events={curEvents} setEventsList={setEventsList} />
      </div>
        <br />
        <br />
    </>
  );
};

export default App;