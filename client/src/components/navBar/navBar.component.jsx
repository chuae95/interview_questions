import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import './navBar.styles.scss';

function NavBar() {

    return (
        <Navbar id='navBar' bg="light" expand="lg">
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/uen">Uen</Nav.Link>
                    <Nav.Link href="/weather">Weather</Nav.Link>
                </Nav>
                </Navbar.Collapse>
        </Navbar>
    )

}



export default NavBar;