import React, { useEffect, useState } from 'react';
import config from '../config.json';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Divider, Box } from '@material-ui/core';
import CategoryBarChart from './category-bar-chart';
import StatusPieChart from './status-pie-chart';
import TicketTypePieChart from './ticketType-pie-chart';
import DepartmentPieChart from './department-pie-chart';
import SourceMediaPieChart from './sourceMedia-pie-chart';
import TicketNumber from './ticketNumber-bar-chart';
import { blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
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
  const [reportsAccess, setReportsAccess] = useState(-1);
  const userData = useSelector(state => state.userData);

  useEffect(() => {
    const apiUrl = config.APIS_URL + '/access/email/' + userData.email;
    fetch(apiUrl)
      .then(res => res.json())
      .then(repos => {
        if (
          parseInt(
            (
              repos.data.filter(
                access => access.functionalityId === '5'
              )[0] || { accessLevelId: -1 }
            ).accessLevelId
          ) === -1
        ) {
          alert('You do not have access to this Page!');
        } else {
          setReportsAccess(
            parseInt(
              repos.data.filter(access => access.functionalityId === '5')[0] ||
                { accessLevelId: -1 }.accessLevelId
            )
          );
        }
      });
  }, []);

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
  const handleDayChange = event => {
    selectDays(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Box component="span" className={classes.displayFlex}></Box>
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
              Department
            </Typography>
            <Divider />
            <DepartmentPieChart />
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
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.belowMargin}>
              Category
            </Typography>
            <Divider />
            <CategoryBarChart />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
