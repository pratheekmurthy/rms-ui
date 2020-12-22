import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Typography,
  Divider,
  Box,
  TextField
} from '@material-ui/core';
import CategoryBarChart from './category-bar-chart';
import StatusPieChart from './status-pie-chart';
import TicketTypePieChart from './ticketType-pie-chart';
import PriorityPieChart from './priority-pie-chart';
import SubCategoryBarChart from './subCategory-bar-chart';
import SourceMediaPieChart from './sourceMedia-pie-chart';
import TicketNumber from './ticketNumber-bar-chart';
import { blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 15,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200
    }
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  belowMargin: {
    marginBottom: 10,
    color: blueGrey[500]
  },
  displayFlex: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 5
  },
  gridClass: {
    marginBottom: theme.spacing(1)
  }
}));

export default function TicketReport() {
  const classes = useStyles();

  const days = [
    {
      value: 'week',
      label: '7 days'
    },
    {
      value: 'month',
      label: '30 days'
    },

    {
      value: 'twoMonth',
      label: '60 days'
    },
    {
      value: 'threeMonth',
      label: '90 days'
    },
    {
      value: 'year',
      label: '1 Year'
    }
  ];
  const [day, selectDays] = React.useState('year');
  const handleDayChange = (event) => {
    selectDays(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Box component="span" className={classes.displayFlex}>
        <TextField
          id="standard-select-currency-native"
          select
          size="small"
          value={day}
          onChange={handleDayChange}
          variant="outlined"
          label="Days"
          SelectProps={{
            native: true
          }}
        >
          {days.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </Box>
      <Grid container spacing={2} className={classes.gridClass}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.belowMargin}>
              Number of Tickets
            </Typography>
            <Divider />
            <TicketNumber />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.gridClass}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.belowMargin}>
              Ticket Type
            </Typography>
            <Divider />
            <TicketTypePieChart />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.belowMargin}>
              Priority
            </Typography>
            <Divider />
            <PriorityPieChart />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.belowMargin}>
              Source Media
            </Typography>
            <Divider />
            <SourceMediaPieChart />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.belowMargin}>
              Status
            </Typography>
            <Divider />
            <StatusPieChart />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.gridClass}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.belowMargin}>
              Category
            </Typography>
            <Divider />
            <CategoryBarChart />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.belowMargin}>
              Sub Category
            </Typography>
            <Divider />
            <SubCategoryBarChart />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
