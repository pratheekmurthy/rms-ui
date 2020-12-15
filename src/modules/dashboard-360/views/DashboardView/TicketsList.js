import {
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  },
  floatRight: {
    float: 'right'
  },
  secondaryText: {
    letterSpacing: 0,
    fontSize: '0.9rem',
    color: theme.palette.grey[700]
  },
  linkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    fontWeight: 'bold'
  }
}));

export default function TicketsList() {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Link>#1234</Link>
              <Box my={1}>
                <Chip label="Escalated" color="secondary" />
              </Box>
            </Box>
          }
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Profile -&gt; Profile Update
              </Typography>
              <span className={classes.secondaryText}>
                {' '}
                — I moved my business to new location, Please update my address
              </span>
              <br />
              <Typography
                component="span"
                variant="subtitle2"
                className={`${classes.floatRight} ${classes.secondaryText}`}
              >
                23/11/2020
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider component="li" />
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Link>#1234</Link>
              <Box my={1}>
                <Chip label="Escalated" color="secondary" />
              </Box>
            </Box>
          }
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Profile -&gt; Profile Update
              </Typography>
              <span className={classes.secondaryText}>
                {' '}
                — I moved my business to new location, Please update my address
              </span>
              <br />
              <Typography
                component="span"
                variant="subtitle2"
                className={`${classes.floatRight} ${classes.secondaryText}`}
              >
                23/11/2020
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider component="li" />
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Link>#1234</Link>
              <Box my={1}>
                <Chip label="Escalated" color="secondary" />
              </Box>
            </Box>
          }
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Profile -&gt; Profile Update
              </Typography>
              <span className={classes.secondaryText}>
                {' '}
                — I moved my business to new location, Please update my address
              </span>
              <br />
              <Typography
                component="span"
                variant="subtitle2"
                className={`${classes.floatRight} ${classes.secondaryText}`}
              >
                23/11/2020
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider />
      <Box display="flex" justifyContent="flex-end" p={2} alignItems="center">
        <Link
          to="/ticketing/ticket-dashboard"
          className={classes.linkContainer}
        >
          View All
          <ArrowRightIcon />
        </Link>
      </Box>
    </List>
  );
}
