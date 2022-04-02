import { Button, Stack, Form } from 'react-bootstrap';
import { useState } from 'react';

const handleSearch = (searchText, fakeEvents, setEventsList) => {
    //use searchText to filter cards
    //console.log(searchText);
    setEventsList(fakeEvents.events.filter(event => 
      (event.title + 
        event.description + 
        event.sport + 
        event.host + 
        event.location).toLowerCase().includes(searchText.toLowerCase())));
  }

  const handleKeyPress = (searchText, fakeEvents, setEventsList) => ( (e) => {
    if (e.key === "Enter") handleSearch(searchText, fakeEvents, setEventsList);
  })

const SearchBar = ({fakeEvents, setEventsList}) => {
    const [searchText, setSearchText] = useState('');

    return (
        <Stack direction="horizontal" gap={3}>
            <Form.Control
            className="me-auto"
            placeholder="Search events..."
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress = {handleKeyPress(searchText, fakeEvents, setEventsList)}
            />
            <Button
            variant="secondary"
            onClick={() => handleSearch(searchText, fakeEvents, setEventsList)}>
            Search
            </Button>
            <div className="vr" />
            <Button
            variant="outline-danger"
            onClick={() => setEventsList(fakeEvents.events)}>
            Reset
            </Button>
        </Stack>
  )
}

export default SearchBar;