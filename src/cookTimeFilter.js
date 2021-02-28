import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import AccessTime from '@material-ui/icons/AccessTime';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

export default function CookTimeFilter() {
  const classes = useStyles();
  const [cookTime, setCookTime] = React.useState(30);

  const handleSliderChange = (event, newValue) => {
    setCookTime(newValue);
  };

  const handleInputChange = (event) => {
    setCookTime(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (cookTime < 0) {
      setCookTime(0);
    } else if (cookTime > 180) {
      setCookTime(180);
    }
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Cooking Time
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <AccessTime />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof cookTime === 'number' ? cookTime : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={0}
            max={180}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={cookTime}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 180,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          /> mins
        </Grid>
      </Grid>
    </div>
  );
}