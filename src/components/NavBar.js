import { Navbar, Container, Button } from 'react-bootstrap';
import PostButton from './CreateEvent';

const homeHandler = ({ setChecked, setSearchText }) => {
    setChecked(false);
    setSearchText('');
    const searchBar = document.getElementById('searchbar');
    searchBar.value = '';
}

const NavBar = ({ setChecked, setSearchText }) => {
    return (
        <Navbar fixed="bottom" bg="dark">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
                <Button onClick={() => homeHandler({ setChecked, setSearchText })}
                    active>Home</Button>
                <PostButton />
                <Button onClick={() => setChecked(true)} active>My Events</Button>
            </Container>
        </Navbar>
    )
}

export default NavBar;