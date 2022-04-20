import { Navbar, Container, Button } from 'react-bootstrap';
import PostButton from './CreateEvent';

const NavBar = ({setChecked, setSearchText}) => {
    return(
        <Navbar fixed = "bottom" bg="dark">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
                    <Button onClick = {() => {setChecked(false); setSearchText('')}} active>Home</Button>
                    <PostButton/>
                    <Button onClick = {() => setChecked(true)} active>My Events</Button>

            </Container>
        </Navbar>
    )
}

export default NavBar;