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
          onKeyPress={(e) => e.key === 'Enter' ? setSearchText(e.target.value) : null}
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