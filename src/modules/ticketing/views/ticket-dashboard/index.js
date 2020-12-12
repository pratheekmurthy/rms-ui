import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 15
  },
  textBold: {
    fontWeight: "600"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function TicketDashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {/**
         * This is the ticket List block
         */}
        <Grid item sm={12} md={4}>
          <Paper className={classes.paper}><span className={classes.textBold}>Divya</span></Paper>
        </Grid>
        {/**
         * This is the ticket Detail block
         */}
        <Grid item sm={12} md={6}>
          <Paper className={classes.paper}><span className={classes.textBold}>Divya</span></Paper>
        </Grid>
        {/**
         * This is the ticket Metadata block
         */}
        <Grid item sm={12} md={2}>
          <Paper className={classes.paper}><span className={classes.textBold}>Divya</span></Paper>
        </Grid>
        {/* <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid> */}
      </Grid>
    </div>
  );
}
