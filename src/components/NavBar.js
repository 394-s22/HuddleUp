import { Navbar, Container, Button } from 'react-bootstrap';
import PostButton from './CreateEvent';

const homeHandler = ({ setSearchText, setCurrentPage }) => {
    setSearchText('');
    const searchBar = document.getElementById('searchbar');
    searchBar.value = '';
    setCurrentPage('home');
}

const NavBar = ({ setSearchText, setCurrentPage }) => {
    return (
        <Navbar fixed="bottom" bg="dark">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
                <Button onClick={() => homeHandler({ setSearchText, setCurrentPage })}
                    active>Home</Button>
                <PostButton />
                <Button onClick={() => {
                    setCurrentPage('myevents');
                    setSearchText('');
                    const searchBar = document.getElementById('searchbar');
                    searchBar.value = '';
                }} active>My Events</Button>
            </Container>
        </Navbar>
    )
}

export default NavBar;