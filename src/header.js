import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'



export default function Header(props) {

    return(
        <div>
            <header>
                <Container>
                <Row>
                    <Col>
                        <Navbar.Brand href="#home">Home Page</Navbar.Brand>
                    </Col>
                    <Col>
                        <Nav.Link className='link' href="/">Profile</Nav.Link>
                    </Col>
                        <Col>
                        <Nav.Link className='link' href="/search">Search</Nav.Link>
                        </Col>
                        <Col>
                        <Nav.Link className='link' href="/signIn">Sign In</Nav.Link>
                        </Col> 
                    <Col>
                        <Nav.Link className='link' href="/">Events</Nav.Link>
                    </Col>
                    
                        
                    
                </Row>
               
                </Container>
            
            </header>
        </div>
    )
}

