import { useState } from 'react';
import { signInWithGoogle, signOut, useUserState } from '../utilities/firebase';
import { Button, Stack, Form } from 'react-bootstrap';

const SearchBar = ({ setSearchText }) => {
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
    </div>
  )
}

export default SearchBar;