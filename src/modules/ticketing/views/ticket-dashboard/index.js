import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  List,
  ListItem,
  Divider,
  ListItemText,
  Typography,
  ListItemIcon,
  Box,
  Button,
  Avatar,
  TextField,
  Drawer
} from '@material-ui/core';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import { purple, orange, green } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import LinkIcon from '@material-ui/icons/Link';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 15
  },
  textBold: {
    fontWeight: '600'
  },
  paper: {
    padding: theme.spacing(1)
  },
  listRow: {
    flexGrow: 1,
    fontSize: 10,
    padding: 0
  },
  ticketMargin: {
    marginLeft: 5
  },
  listItemClass: {
    paddingLeft: 10,
    paddingRight: 10
  },
  metadataClass: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 16
  },
  labelClass: {
    fontWeight: '500',
    float: 'left',
    width: '50%'
  },
  valueClass: {
    width: '50%'
  },
  belowMargin: {
    marginBottom: 20
  },
  dateMargin: {
    marginBottom: 5
  },
  green: {
    color: theme.palette.getContrastText(green[900]),
    backgroundColor: green[900],
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  avatarValue: {
    marginLeft: 5,
    marginTop: 5
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    color: '#fff',
    backgroundColor: green[500],
    marginTop: 10
  },
  button: {
    margin: 5,
    marginTop: 20,
    marginBottom: 20
  },
  boxDiv: {
    paddingBottom: 10,
    paddingTop: 10
  },
  detailTitle: {
    marginLeft: 5,
    marginTop: 5,
    fontWeight: 600
  },
  drawer: {
    width: '100%',
    flexShrink: 0
  },
  drawerPaper: {
    width: '25%'
  }
}));

export default function TicketDashboard() {
  const classes = useStyles();
  const ticketListData = [
    {
      id: 'IV-10202',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10222',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10122',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10732',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10312',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-12302',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10232',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10122',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10732',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10312',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-12302',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10232',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    }
  ];

  function getTicketList() {
    return (
      <List className={classes.listRow}>
        {ticketListData.map((ticket) => (
          <ListItem alignItems="flex-start" className={classes.listItemClass}>
            <ListItemText>
              <div className={classes.textBold}>
                <ListItemIcon>
                  <OfflineBoltIcon style={{ color: purple[500] }} />
                  <span className={classes.ticketMargin}>{ticket.id}</span>
                </ListItemIcon>
              </div>
              <Typography
                variant="body2"
                color="textPrimary"
                style={{ textOverflow: 'ellipsis' }}
              >
                {ticket.title}
              </Typography>

              <Divider light></Divider>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    );
  }

  return (
    <div className={classes.root}>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<AddIcon />}
      >
        Create Ticket
      </Button>
      <Grid container spacing={1}>
        {/**
         * This is the ticket List block
         */}
        <Grid item sm={12} md={3}>
          <Paper
            className={classes.paper}
            style={{ maxHeight: 820, overflow: 'auto' }}
          >
            <box component="div" overflow="auto">
              {getTicketList()}
            </box>
          </Paper>
        </Grid>

        {/**
         * This is the ticket Detail block
         */}
        <Grid item sm={12} md={6}>
          <Paper
            className={classes.paper}
            style={{ maxHeight: 820, overflow: 'auto' }}
          >
            <div className={classes.metadataClass}>
              <Box display="flex" flexDirection="row">
                <Avatar
                  alt="IV"
                  src="/static/images/products/product_1.png"
                  className={classes.large}
                />
                <Box
                  display="flex"
                  flexDirection="column"
                  className={classes.ticketMargin}
                >
                  <Typography variant="body1" className={classes.textBold}>
                    IV-38648
                  </Typography>
                  <Typography variant="h3" color="textPrimary">
                    This captures all user stories and tasks related to the
                    Cloud Deployment Framework.
                  </Typography>
                </Box>
              </Box>
              <div display="flex" flexDirection="row">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<AttachFileIcon />}
                >
                  Attach
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<LinkIcon />}
                >
                  Link issue
                </Button>
              </div>
              <div className={classes.boxDiv}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  fontWeight="fontWeightMedium"
                  className={classes.detailTitle}
                >
                  Details
                </Typography>
                <div className={classes.metadataClass}>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    className={classes.belowMargin}
                  >
                    <Typography variant="body1" className={classes.labelClass}>
                      Type
                    </Typography>
                    <Box
                      display="flex"
                      flexDirection="row"
                      className={classes.valueClass}
                    >
                      <OfflineBoltIcon style={{ color: purple[500] }} />
                      <span className={classes.ticketMargin}>Epic</span>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    className={classes.belowMargin}
                  >
                    <Typography variant="body1" className={classes.labelClass}>
                      Priority
                    </Typography>
                    <Box
                      display="flex"
                      flexDirection="row"
                      className={classes.valueClass}
                    >
                      <ArrowUpwardIcon style={{ color: orange[500] }} />
                      <span className={classes.ticketMargin}>Medium</span>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    className={classes.belowMargin}
                  >
                    <Typography variant="body1" className={classes.labelClass}>
                      Category
                    </Typography>
                    <Box
                      display="flex"
                      flexDirection="row"
                      className={classes.valueClass}
                    >
                      <span className={classes.ticketMargin}>Survey</span>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    className={classes.belowMargin}
                  >
                    <Typography variant="body1" className={classes.labelClass}>
                      Status
                    </Typography>
                    <Box
                      display="flex"
                      flexDirection="row"
                      className={classes.valueClass}
                    >
                      <Typography
                        component="span"
                        variant="body1"
                        style={{ color: green[500] }}
                        className={classes.ticketMargin}
                      >
                        Active
                      </Typography>
                    </Box>
                  </Box>
                </div>
              </div>
              <div className={classes.boxDiv}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  fontWeight="fontWeightMedium"
                  className={classes.detailTitle}
                >
                  Description
                </Typography>
                <TextField
                  id="outlined-textarea"
                  placeholder="Add a description..."
                  rows={10}
                  fullWidth
                  multiline
                  variant="outlined"
                />
              </div>
              <div component="div" className={classes.boxDiv}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  className={classes.detailTitle}
                >
                  Attachments
                </Typography>
                <TextField
                  id="outlined-textarea"
                  placeholder="Drop files to attach, or browse"
                  rows={5}
                  multiline
                  fullWidth
                  variant="outlined"
                />
              </div>
            </div>
          </Paper>
        </Grid>

        {/**
         * This is the ticket Metadata block
         */}
        <Grid item sm={12} md={3}>
          <Paper className={classes.paper}>
            <div className={classes.metadataClass}>
              <Box
                display="flex"
                flexDirection="row"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  Distributor
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  <Avatar className={classes.green}>SA</Avatar>
                  <span className={classes.avatarValue}>Sandra Adams</span>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  Distributor Id
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  <span className={classes.ticketMargin}>SA26744</span>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  Source
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  <Avatar className={classes.green}>AS</Avatar>
                  <span className={classes.avatarValue}>Adams Sandra</span>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  Source Id
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  {/* <OfflineBoltIcon style={{ color: purple[500] }} /> */}
                  <span className={classes.ticketMargin}>AS23784</span>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  Source Media
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  <span className={classes.ticketMargin}>ABC</span>
                </Box>
              </Box>
            </div>
            <Divider light />
            <div className={classes.metadataClass}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.dateMargin}
              >
                <Typography variant="body1" className={classes.valueClass}>
                  Due:
                </Typography>
                <span className={classes.ticketMargin}>20/12/2020</span>
              </Box>

              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.dateMargin}
              >
                <Typography variant="body1" className={classes.valueClass}>
                  Created:
                </Typography>
                <span className={classes.ticketMargin}>
                  12/12/2020, 9:40 AM
                </span>
              </Box>

              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.dateMargin}
              >
                <Typography variant="body1" className={classes.valueClass}>
                  Updated:
                </Typography>
                <span className={classes.ticketMargin}>
                  12/12/2020, 12:40 PM
                </span>
              </Box>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
