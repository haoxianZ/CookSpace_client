import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom' 
import MenuIcon from '@material-ui/icons/Menu';
import SearchRecipe from '../searchRecipe/searchRecipe';
import './visitorHeader.css'
export default function VisitorHeader() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="header">
      <Button 
      className="subcontainer"
      aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon/>
      </Button>
      <SearchRecipe/>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to='/' ><MenuItem onClick={handleClose}>Home</MenuItem></Link>
        <Link to='/signIn' ><MenuItem onClick={handleClose}>Sign In</MenuItem></Link>
      </Menu>
      
    </div>
  );
}
