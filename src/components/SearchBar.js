import { Button, Stack, Form } from 'react-bootstrap';
import { useState } from 'react';

const handleSearch = (searchText, eventsList, setEventsList, checked) => {
  setEventsList(eventsList.filter(event =>
    (event.title +
    event.description +
    event.sport +
    event.host +
    event.location).toLowerCase().includes(searchText.toLowerCase())).filter(checked ? e => e.join_status : e => true ));
}

const handleKeyPress = (searchText, eventsList, setEventsList, checked) => ((e) => {
  if (e.key === "Enter") handleSearch(searchText, eventsList, setEventsList, checked);
})

const SearchBar = ({ eventsList, curEvents, setEventsList }) => {
  const [searchText, setSearchText] = useState('');
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <Stack direction="horizontal" gap={3}>
        <Form.Control
          className="me-auto"
          placeholder="Search events..."
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={handleKeyPress(searchText, eventsList, setEventsList, checked)}
        />
        <Button
          variant="secondary"
          onClick={() => handleSearch(searchText, eventsList, setEventsList, checked)}>
          Search
        </Button>
        <div className="vr" />
        <Button
          variant="outline-danger"
          onClick={() => setEventsList(eventsList)}>
          Reset
        </Button>
      </Stack>
      <Form.Check
        type="checkbox"
        label="My Events"
        style={{ textAlign: "left" }}
        onChange={() => {
          const nextState = checked? false : true;
          setChecked(nextState);
          handleSearch(searchText, eventsList, setEventsList, nextState);
        }}
      >
      </Form.Check>
    </div>
  )
}

export default SearchBar;