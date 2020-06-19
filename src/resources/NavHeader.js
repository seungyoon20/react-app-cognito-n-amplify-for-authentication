import React, {Component} from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import {IndexLinkContainer} from "react-router-bootstrap"

class NavHeader extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    render () {
        return (
            <Navbar bg='light' variant="light" expand='lg'>
                <Navbar.Brand>
                    <IndexLinkContainer to='/'>
                        <NavItem>Home</NavItem>
                    </IndexLinkContainer>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Nav.Link>
                            <Nav.Item>
                                Repository
                            </Nav.Item>
                        </Nav.Link>
                        <Nav.Link href="https://yixuewang.me/">
                            <Nav.Item>
                                About Us
                            </Nav.Item>
                        </Nav.Link>
                    </Nav>
                    <Nav className="mr-auto"></Nav>
                    {
                        this.props.isAuthenticated ? (<Nav.Link onClick={this.props.handleLogout}>Logout</Nav.Link>) :
                        (   
                            <Nav>
                            <IndexLinkContainer to="/login" className="mx-1">
                                <NavItem>
                                    Sign In
                                </NavItem>
                            </IndexLinkContainer>
                            <IndexLinkContainer to='/signup' className="mx-1">
                                <NavItem>
                                    Sign Up
                                </NavItem>
                            </IndexLinkContainer>
                            </Nav>
                        )
                    }
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavHeader;