import React, {useContext, useState} from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
// import { blue } from '@material-ui/core/colors';
import SearchForEventRecipe from './searchForEventRecipe';
import context from'./context';
// const useStyles = makeStyles({
//   avatar: {
//     backgroundColor: blue[100],
//     color: blue[600],
//   },
// });


export default function SelectRecipeForEvent(props) {
  const Context =useContext(context);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] =useState(Context.eventRecipe);

function SimpleDialog(props) {
  // const classes = useStyles();
  const { onClose, selectedValue, open,event_id } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  // const handleListItemClick = (value) => {
  //   onClose(value);
  // };
  // const handleSelect=(value)=>{
  //   setSelectedValue(value)
  // }
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth>
        <SearchForEventRecipe event_id={props.event_id} selectedValue={props.selected} user_id={props.user_id} setEventRecipe={props.setEventRecipe}
       />
      {/* <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <List>
        {emails.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}

        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List> */}
    </Dialog>
  );
}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography variant="subtitle1">Selected Recipe: 
      {Context.eventRecipe?Context.eventRecipe.title:null}</Typography>
      <br />
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <AddIcon/>
        Search and Add a Recipe
      </Button>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} event_id={props.event_id} />
    </div>
  );
}