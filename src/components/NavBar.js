import { Navbar, Container, Button } from 'react-bootstrap';


const NavBar = (checked, setChecked) => {
    

    return(
        <Navbar fixed = "bottom" bg="dark">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
                <Button>Home</Button>
                <Button>My Events</Button>
            </Container>
        </Navbar>
    )
}

export default NavBar;