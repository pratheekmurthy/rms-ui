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
  LinearProgress,
  Button,
  Avatar,
  TextareaAutosize
} from '@material-ui/core';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import { purple, orange, green } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import LinkIcon from '@material-ui/icons/Link';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700]
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff'
  }
}))(LinearProgress);

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
  textareaClass: {
    padding: 5
  },
  subtaskClass: {
    margin: 0,
    padding: 0
  }
}));

export default function TicketDashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {/**
         * This is the ticket List block
         */}
        <Grid item sm={12} md={3}>
          <Paper className={classes.paper}>
            <box component="div" overflow="auto">
              <List className={classes.listRow} overflow="auto">
                <ListItem
                  alignItems="flex-start"
                  className={classes.listItemClass}
                >
                  <ListItemText>
                    <div className={classes.textBold}>
                      <ListItemIcon>
                        <OfflineBoltIcon style={{ color: purple[500] }} />
                        <ListItemText className={classes.ticketMargin}>
                          IV-382648
                        </ListItemText>
                      </ListItemIcon>
                    </div>
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      textOverflow="ellipsis"
                    >
                      All function and features required for a survey tic...
                    </Typography>
                  </ListItemText>
                </ListItem>
                <Divider light />

                <ListItem
                  alignItems="flex-start"
                  className={classes.listItemClass}
                >
                  <ListItemText>
                    <div className={classes.textBold}>
                      <ListItemIcon>
                        <OfflineBoltIcon style={{ color: purple[500] }} />
                        <span className={classes.ticketMargin}>IV-382648</span>
                      </ListItemIcon>
                    </div>
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      textOverflow="ellipsis"
                    >
                      All function and features required for a survey tic...
                    </Typography>
                  </ListItemText>
                </ListItem>
                <Divider light />

                <ListItem
                  alignItems="flex-start"
                  className={classes.listItemClass}
                >
                  <ListItemText>
                    <div className={classes.textBold}>
                      <ListItemIcon>
                        <OfflineBoltIcon style={{ color: purple[500] }} />
                        <span className={classes.ticketMargin}>IV-382648</span>
                      </ListItemIcon>
                    </div>
                    <Typography variant="body2" color="textPrimary">
                      All function and features required for a survey tic...
                    </Typography>
                  </ListItemText>
                </ListItem>
                <Divider light />

                <ListItem
                  alignItems="flex-start"
                  className={classes.listItemClass}
                >
                  <ListItemText>
                    <div className={classes.textBold}>
                      <ListItemIcon>
                        <OfflineBoltIcon style={{ color: purple[500] }} />
                        <span className={classes.ticketMargin}>IV-382648</span>
                      </ListItemIcon>
                    </div>
                    <Typography variant="body2" color="textPrimary">
                      All function and features required for a survey tic...
                    </Typography>
                  </ListItemText>
                </ListItem>
                <Divider light />

                <ListItem
                  alignItems="flex-start"
                  className={classes.listItemClass}
                >
                  <ListItemText>
                    <div className={classes.textBold}>
                      <ListItemIcon>
                        <OfflineBoltIcon style={{ color: purple[500] }} />
                        <span className={classes.ticketMargin}>IV-382648</span>
                      </ListItemIcon>
                    </div>
                    <Typography variant="body2" color="textPrimary">
                      All function and features required for a survey tic...
                    </Typography>
                  </ListItemText>
                </ListItem>
                <Divider light />

                <ListItem
                  alignItems="flex-start"
                  className={classes.listItemClass}
                >
                  <ListItemText>
                    <div className={classes.textBold}>
                      <ListItemIcon>
                        <OfflineBoltIcon style={{ color: purple[500] }} />
                        <span className={classes.ticketMargin}>IV-382648</span>
                      </ListItemIcon>
                    </div>
                    <Typography variant="body2" color="textPrimary">
                      All function and features required for a survey tic...
                    </Typography>
                  </ListItemText>
                </ListItem>
                <Divider light />

                <ListItem
                  alignItems="flex-start"
                  className={classes.listItemClass}
                >
                  <ListItemText>
                    <div className={classes.textBold}>
                      <ListItemIcon>
                        <OfflineBoltIcon style={{ color: purple[500] }} />
                        <span className={classes.ticketMargin}>IV-382648</span>
                      </ListItemIcon>
                    </div>
                    <Typography variant="body2" color="textPrimary">
                      All function and features required for a survey tic...
                    </Typography>
                  </ListItemText>
                </ListItem>
                <Divider light />

                <ListItem
                  alignItems="flex-start"
                  className={classes.listItemClass}
                >
                  <ListItemText>
                    <div className={classes.textBold}>
                      <ListItemIcon>
                        <OfflineBoltIcon style={{ color: purple[500] }} />
                        <span className={classes.ticketMargin}>IV-382648</span>
                      </ListItemIcon>
                    </div>
                    <Typography variant="body2" color="textPrimary">
                      All function and features required for a survey tic...
                    </Typography>
                  </ListItemText>
                </ListItem>
                <Divider light />

                <ListItem
                  alignItems="flex-start"
                  className={classes.listItemClass}
                >
                  <ListItemText>
                    <div className={classes.textBold}>
                      <ListItemIcon>
                        <OfflineBoltIcon style={{ color: purple[500] }} />
                        <span className={classes.ticketMargin}>IV-382648</span>
                      </ListItemIcon>
                    </div>
                    <Typography variant="body2" color="textPrimary">
                      All function and features required for a survey tic...
                    </Typography>
                  </ListItemText>
                </ListItem>
                <Divider light />

                <ListItem
                  alignItems="flex-start"
                  className={classes.listItemClass}
                >
                  <ListItemText>
                    <div className={classes.textBold}>
                      <ListItemIcon>
                        <OfflineBoltIcon style={{ color: purple[500] }} />
                        <span className={classes.ticketMargin}>IV-382648</span>
                      </ListItemIcon>
                    </div>
                    <Typography variant="body2" color="textPrimary">
                      All function and features required for a survey tic...
                    </Typography>
                  </ListItemText>
                </ListItem>
              </List>
            </box>
          </Paper>
        </Grid>

        {/**
         * This is the ticket Detail block
         */}
        <Grid item sm={12} md={6}>
          <Paper className={classes.paper}>
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
                  startIcon={<AccountTreeIcon />}
                >
                  Create issue in epic
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
                  className={classes.avatarValue}
                >
                  Description
                </Typography>
                <TextareaAutosize
                  width="auto"
                  aria-label="textArea"
                  rowsMin={12}
                  rowsMax={30}
                  placeholder="Add a description..."
                />
              </div>
              <div component="div" className={classes.boxDiv}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  className={classes.avatarValue}
                >
                  Attachments
                </Typography>
                <TextareaAutosize
                  aria-label="textArea"
                  className={classes.textareaClass}
                  rowsMin={5}
                  rowsMax={30}
                  placeholder="Drop files to attach, or browse"
                />
              </div>
              <div component="div" className={classes.boxDiv}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  className={classes.avatarValue}
                >
                  Sub-Tasks
                </Typography>
                <List className={classes.subtaskClass} overflow="auto">
                  <ListItem button>
                    <ListItemIcon>
                      <CheckBoxIcon style={{ color: green[500] }} />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        textOverflow="ellipsis"
                      >
                        IV-382648 - All function and features req...
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <Divider light />

                  <ListItem button>
                    <ListItemIcon>
                      <CheckBoxIcon style={{ color: green[500] }} />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        textOverflow="ellipsis"
                      >
                        IV-382648 - All function and features req...
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <Divider light />

                  <ListItem button>
                    <ListItemIcon>
                      <CheckBoxIcon style={{ color: green[500] }} />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        textOverflow="ellipsis"
                      >
                        IV-382648 - All function and features req...
                      </Typography>
                    </ListItemText>
                  </ListItem>

                  <Divider light />
                  <ListItem button>
                    <ListItemIcon>
                      <CheckBoxIcon style={{ color: green[500] }} />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        textOverflow="ellipsis"
                      >
                        IV-382648 - All function and features req...
                      </Typography>
                    </ListItemText>
                  </ListItem>
                </List>
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
                  Assignee
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
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  Reporter
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
                  Label
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  {/* <OfflineBoltIcon style={{ color: purple[500] }} /> */}
                  <span className={classes.ticketMargin}>None</span>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
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
                <Typography variant="h5" className={classes.labelClass}>
                  Epic Name
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  {/* <ArrowUpwardIcon style={{ color: orange[500] }} /> */}
                  <span className={classes.ticketMargin}>AWS Framework</span>
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
            <Divider light />
            <div className={classes.metadataClass}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.dateMargin}
              >
                <Typography variant="body1" className={classes.valueClass}>
                  Estimated:
                </Typography>
                <BorderLinearProgress variant="determinate" value={50} />
              </Box>

              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.dateMargin}
              >
                <Typography variant="body1" className={classes.valueClass}>
                  Remaining:
                </Typography>
                <BorderLinearProgress variant="determinate" value={50} />
              </Box>

              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.dateMargin}
              >
                <Typography variant="body1" className={classes.valueClass}>
                  Logged:
                </Typography>
                <BorderLinearProgress variant="determinate" value={50} />
              </Box>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
