import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import fakeEvents from './fakeEvents.json';
import EventsList from './components/EventsList';
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useData, useUserState } from './utilities/firebase';

const Banner = ({ title }) => (
  <h1 className='banner' >{title}</h1>
);

const App = () => {
  const [eventsList, setEventsList, loading] = useData("/events");
  const [userData, setUserData, loadingUser] = useData(`/users`);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [filterCondition, setFilterCondition] = useState('joined_events');
  const [user] = useUserState();

  const [curEvents, setCurEvents] = useState([]);
  useEffect(() => {
    setCurEvents(eventsList);
  }, [eventsList]);

  if (loading || loadingUser) return <h1>Loading...</h1>;

  return (
    <>
      <Banner title={fakeEvents.title} />
      { currentPage === 'home'?
        <div className='App'>
          <SearchBar setSearchText={setSearchText} setCurrentPage={setCurrentPage} setFilterCondition={setFilterCondition}/>
          <br />
          <EventsList events={curEvents} searchText={searchText} userData={userData} currentPage={currentPage} filterCondition={filterCondition}/>
          {user ? <NavBar setSearchText = {setSearchText} setCurrentPage={setCurrentPage}/> : null}
          <br />
          <br />
        </div> :
        
        <div className='App'>
          <SearchBar setSearchText={setSearchText} setCurrentPage={setCurrentPage} setFilterCondition={setFilterCondition}/>
          <br />
          <Button
            variant="primary"
            style={{
              width: "fit-content",
              whiteSpace: "nowrap",
              backgroundColor: filterCondition === 'joined_events' ? '#00C87F' : '#0d6efd'
            }}
            onClick={() => {setFilterCondition('joined_events')}}>
            Joined Events
          </Button>
          {" "}
          <Button
            variant="primary"
            style={{
              width: "fit-content",
              whiteSpace: "nowrap",
              backgroundColor: filterCondition === 'hosted_events' ? '#00C87F' : '#0d6efd'
            }}
            onClick={() => {setFilterCondition('hosted_events')}}>
            Hosted Events
          </Button>
          <br />
          <br />
          <EventsList events={curEvents} searchText={searchText} userData={userData} currentPage={currentPage} filterCondition={filterCondition}/>
          {user ? <NavBar setSearchText = {setSearchText} setCurrentPage={setCurrentPage}/> : null}
          <br />
          <br />
        </div>
      }
    </>
  );
};

export default App;