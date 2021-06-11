import React from 'react';
import {Nav, Navbar, NavLink} from "react-bootstrap";

const NavBar = () => {
    return (

        <Navbar bg="dark" variant="dark">
            <NavLink to="/" style={{color:'white'}}>НПО Энергодиагностика</NavLink>
            <Nav className="ml-auto">
                <Nav.Link href="#features">Авторизация</Nav.Link>
            </Nav>
        </Navbar>

    );
};

export default NavBar;