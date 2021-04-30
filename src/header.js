import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
export default function Header(props) {
    const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    return(
        <div className="header">
            
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

                      

        </div>
    )
}

