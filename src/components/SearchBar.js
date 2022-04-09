import { useState } from 'react';
import { Button, Stack, Form } from 'react-bootstrap';

const SearchBar = ({ checked,  setSearchText, setChecked }) => {

  return (
    <div>
      <Stack direction="horizontal" gap={3}>
        <Form.Control
          className="me-auto"
          placeholder="Search events..."
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Stack>
      <Form.Check
        type="checkbox"
        label="My Events"
        style={{ textAlign: "left" }}
        onChange={() => {
          const nextState = checked ? false : true;
          setChecked(nextState);
        }}
      >
      </Form.Check>
    </div>
  )
}

export default SearchBar;