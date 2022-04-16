import { useState } from 'react';
import { signInWithGoogle, signOut, useUserState } from '../utilities/firebase';
import { Button, Stack, Form } from 'react-bootstrap';

const SearchBar = ({ checked, setSearchText, setChecked }) => {
  const [user] = useUserState();

  return (
    <div>
      <Stack direction="horizontal" gap={3}>
        <Form.Control
          className="me-auto"
          placeholder="Search events..."
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          variant="primary"
          style={{
            width: "fit-content",
            whiteSpace: "nowrap"
          }}
          onClick={() => user ? signOut() : signInWithGoogle()}>
          {user ? "Sign Out" : "Sign In"}
        </Button>
      </Stack>
      <Form.Check
        type="checkbox"
        label="My Events"
        style={{ textAlign: "left",
                 display: user ? null : 'none'}}
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