import { Navbar, Container, Button, ButtonGroup } from 'react-bootstrap';


const NavBar = ({setChecked}) => {


    return(
        <Navbar fixed = "bottom" bg="dark">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
                    <Button onClick = {() => setChecked(false)} active>Home</Button>
                    <Button onClick = {() => setChecked(true)} active>My Events</Button>
            </Container>
        </Navbar>
    )
}

export default NavBar;