import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
export default function Header(props) {
    console.log(props.profile, props.events)
    const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    return(
        <div>
            <header>
            <Button 
      aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to={props.profile? props.home:'/' } ><MenuItem onClick={handleClose}>Home</MenuItem></Link>
        <Link to='/' ><MenuItem onClick={handleClose}>Sign Out</MenuItem></Link>
        <Link to={props.profile? props.profile:'/' } ><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
        <Link to={props.events? props.events:'/' } ><MenuItem onClick={handleClose}>Events</MenuItem></Link>
        <Link to={props.list? props.list:'/' } ><MenuItem onClick={handleClose}>Shopping List</MenuItem></Link>

      </Menu>
                {/* <Container>
                <Row>
                    <Col>
                        <Navbar.Brand href={props.home? props.home:'/' }>Home Page</Navbar.Brand>
                    </Col>
                    <Col>
                        <Nav.Link className='link' href={props.profile? props.profile:'/' } >Profile</Nav.Link>
                    </Col>
                        <Col>
                        <Nav.Link className='link' href="/search">Search</Nav.Link>
                        </Col>
                        <Col>
                        <Nav.Link className='link' href="/signIn">Sign In</Nav.Link>
                        </Col> 
                    <Col>
                        <Nav.Link className='link' href={props.events? props.events:'/' }>Events</Nav.Link>
                    </Col>
                    <Col>
                        <Nav.Link className='link' href={props.list? props.list:'/' }>Shopping List</Nav.Link>
                    </Col>
                        
                    
                </Row>
               
                </Container> */}
            
            </header>
        </div>
    )
}

