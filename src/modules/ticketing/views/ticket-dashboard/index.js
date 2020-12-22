import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
  Drawer,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip
} from '@material-ui/core';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import { purple, orange, green, grey } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import LinkIcon from '@material-ui/icons/Link';
import AddIcon from '@material-ui/icons/Add';
import CreateTicket from '../create-ticket';
import FilterTicket from '../filter-ticket';
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';

import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 350;
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
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(1, 1)
  },
  rounded: {
    color: '#fff',
    backgroundColor: '#303030',
    float: 'right',
    marginBottom: 15,
    marginRight: 10,
    height: 30,
    width: 30
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

  const ticketTypes = [
    {
      value: 'complaint',
      label: 'Complaint'
    },
    {
      value: 'request',
      label: 'Request'
    },
    {
      value: 'info',
      label: 'Information'
    }
  ];
  const [type, setTicketType] = React.useState('complaint');
  const handleTicketTypeChange = (event) => {
    setTicketType(event.target.value);
  };

  const priorityList = [
    {
      value: 'low',
      label: 'Low'
    },
    {
      value: 'medium',
      label: 'Medium'
    },
    {
      value: 'high',
      label: 'High'
    }
  ];
  const [priority, setPriority] = React.useState('medium');
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const categoryList = [
    {
      value: 'delay',
      label: 'Delayed dispatch'
    },
    {
      value: 'dispute',
      label: 'Dispute'
    },
    {
      value: 'replacement',
      label: 'Replacement'
    }
  ];
  const [category, setCategory] = React.useState('delay');
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const statusList = [
    {
      value: 'open',
      label: 'Open'
    },
    {
      value: 'wip',
      label: 'Work in Progress'
    },
    {
      value: 'resolved',
      label: 'Resolved'
    },
    {
      value: 'close',
      label: 'Closed'
    }
  ];
  const [status, setStatus] = React.useState('wip');
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const [isEditable, makeEditable] = React.useState(false);
  const [filter, openFilter] = React.useState(false);

  function getTicketList() {
    return (
      <List className={classes.listRow}>
        {ticketListData.map((ticket) => (
          <>
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
                  noWrap
                >
                  {ticket.title}
                </Typography>
              </ListItemText>
            </ListItem>
            <Divider light />
          </>
        ))}
      </List>
    );
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const configureEditable = () => {
    if (isEditable) {
      makeEditable(false);
    } else {
      makeEditable(true);
    }
  };
  const makeEditableFalse = () => {
    makeEditable(false);
  };

  const configureFilter = () => {
    if (filter) {
      openFilter(false);
    } else {
      openFilter(true);
    }
  };

  return (
    <div className={classes.root}>
      <Box component="span">
        <Button
          variant="outlined"
          color="primary"
          size="small"
          style={{ marginBottom: 15 }}
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Create Ticket
        </Button>
        <Tooltip title="Filter">
          <Avatar variant="rounded" className={classes.rounded}>
            <FilterListIcon onClick={configureFilter} />
          </Avatar>
        </Tooltip>
        {/* <Button
          variant="outlined"
          color="primary"
          size="small"
          style={{ marginBottom: 15, marginLeft: 10 }}
          startIcon={<FilterListIcon />}
          onClick={configureFilter}
        ></Button> */}
      </Box>
      {(() => {
        if (filter) {
          return <FilterTicket />;
        }
      })()}

      <Dialog
        open={open}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box component="span" className={classes.drawerHeader}>
            <EditIcon />
            <Typography
              variant="h4"
              color="textPrimary"
              style={{ marginLeft: 10 }}
            >
              Create Ticket
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <CreateTicket />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            variant="contained"
            size="small"
          >
            Create
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
            size="small"
            variant="outlined"
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={1}>
        {/**
         * This is the ticket List block
         */}
        <Grid item sm={12} md={3}>
          <Paper
            className={classes.paper}
            style={{ maxHeight: 720, overflow: 'auto' }}
          >
            <Box component="div" overflow="auto">
              {getTicketList()}
            </Box>
          </Paper>
        </Grid>

        {/**
         * This is the ticket Detail block
         */}
        <Grid item sm={12} md={6}>
          <Paper
            className={classes.paper}
            style={{ maxHeight: 720, overflow: 'auto' }}
          >
            <div className={classes.listItemClass}>
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
                <Tooltip title="Edit">
                  <EditIcon
                    onClick={configureEditable}
                    style={{ marginTop: 25, cursor: 'pointer' }}
                  />
                </Tooltip>
              </Box>
              <Box component="div" display="flex" flexDirection="row">
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
              </Box>
              <div className={classes.boxDiv}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  fontWeight="fontWeightMedium"
                  className={classes.detailTitle}
                >
                  Details
                </Typography>
                <div style={{ paddingRight: 15, paddingLeft: 15 }}>
                  <Grid container spacing={0}>
                    <Grid container item xs={12} spacing={1}>
                      <Grid item xs={6}>
                        <Box
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                        >
                          <Typography
                            variant="body1"
                            style={{
                              fontWeight: '500',
                              float: 'left',
                              width: '35%'
                            }}
                          >
                            Type :
                          </Typography>
                          {isEditable ? (
                            <TextField
                              id="type"
                              select
                              value={type}
                              onChange={handleTicketTypeChange}
                              SelectProps={{
                                native: true
                              }}
                            >
                              {ticketTypes.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          ) : (
                            <Box
                              display="flex"
                              flexDirection="row"
                              className={classes.valueClass}
                            >
                              {/* <OfflineBoltIcon style={{ color: purple[500] }} /> */}
                              <Typography
                                variant="body1"
                                className={classes.ticketMargin}
                                component="span"
                              >
                                Complaint
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                        >
                          <Typography
                            variant="body1"
                            style={{
                              fontWeight: '500',
                              float: 'left',
                              width: '35%'
                            }}
                          >
                            Priority :
                          </Typography>
                          {isEditable ? (
                            <TextField
                              id="priority"
                              select
                              value={priority}
                              onChange={handlePriorityChange}
                              SelectProps={{
                                native: true
                              }}
                            >
                              {priorityList.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          ) : (
                            <Box
                              display="flex"
                              flexDirection="row"
                              className={classes.valueClass}
                            >
                              <ArrowUpwardIcon style={{ color: orange[500] }} />
                              <Typography
                                variant="body1"
                                className={classes.ticketMargin}
                                component="span"
                              >
                                Medium
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={1}>
                      <Grid item xs={6}>
                        <Box
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                        >
                          <Typography
                            variant="body1"
                            style={{
                              fontWeight: '500',
                              float: 'left',
                              width: '35%'
                            }}
                          >
                            Category :
                          </Typography>
                          {isEditable ? (
                            <TextField
                              id="category"
                              select
                              value={category}
                              onChange={handleCategoryChange}
                              SelectProps={{
                                native: true
                              }}
                            >
                              {categoryList.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          ) : (
                            <Box
                              display="flex"
                              flexDirection="row"
                              className={classes.valueClass}
                            >
                              <Typography
                                variant="body1"
                                className={classes.ticketMargin}
                                component="span"
                              >
                                Delayed dispatch
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                        >
                          <Typography
                            variant="body1"
                            style={{
                              fontWeight: '500',
                              float: 'left',
                              width: '35%'
                            }}
                          >
                            Status :
                          </Typography>
                          {isEditable ? (
                            <TextField
                              id="status"
                              select
                              value={status}
                              onChange={handleStatusChange}
                              SelectProps={{
                                native: true
                              }}
                            >
                              {statusList.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          ) : (
                            <Box
                              display="flex"
                              flexDirection="row"
                              className={classes.valueClass}
                            >
                              <Typography
                                component="span"
                                variant="body1"
                                className={classes.ticketMargin}
                              >
                                Work in Progress
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
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
                {isEditable ? (
                  <TextField
                    id="outlined-textarea"
                    placeholder="Add a description..."
                    defaultValue="Distributor has not received the incentive for the week 12."
                    rows={5}
                    fullWidth
                    multiline
                    variant="outlined"
                  />
                ) : (
                  <TextField
                    id="outlined-textarea"
                    placeholder="Add a description..."
                    defaultValue="The distributor has not received the incentive for week 12."
                    rows={5}
                    fullWidth
                    multiline
                    variant="outlined"
                    InputProps={{
                      readOnly: true
                    }}
                  />
                )}
              </div>
              <div component="div" className={classes.boxDiv}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  className={classes.detailTitle}
                >
                  Attachments
                </Typography>
                {isEditable ? (
                  <TextField
                    id="outlined-textarea"
                    defaultValue="Drop files to attach, or browse"
                    rows={5}
                    rowsMax={20}
                    multiline
                    fullWidth
                    variant="outlined"
                  />
                ) : (
                  <TextField
                    id="outlined-textarea"
                    defaultValue="Drop files to attach, or browse"
                    rows={5}
                    rowsMax={20}
                    multiline
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true
                    }}
                  />
                )}
              </div>
              {(() => {
                if (isEditable) {
                  return (
                    <div className={classes.boxDiv}>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        style={{
                          float: 'right'
                        }}
                        onClick={makeEditableFalse}
                      >
                        Save
                      </Button>
                    </div>
                  );
                }
              })()}
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
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                  >
                    Sandra Adams
                  </Typography>
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
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                  >
                    SA26744
                  </Typography>
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
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                  >
                    Adams Sandra
                  </Typography>
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
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                  >
                    SA23344
                  </Typography>
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
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                  >
                    Whatsapp
                  </Typography>
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
                <Typography
                  variant="body1"
                  className={classes.ticketMargin}
                  component="span"
                >
                  20/12/2020
                </Typography>
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
                <Typography
                  variant="body1"
                  className={classes.ticketMargin}
                  component="span"
                >
                  12/12/2020, 9:40 AM
                </Typography>
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
                <Typography
                  variant="body1"
                  className={classes.ticketMargin}
                  component="span"
                >
                  12/12/2020, 12:40 PM
                </Typography>
              </Box>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
