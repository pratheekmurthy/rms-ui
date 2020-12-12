import React from 'react';
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Drawer,
  Divider,
  AppBar,
  Toolbar
} from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import QueueIcon from '@material-ui/icons/Queue';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import VoicemailIcon from '@material-ui/icons/Voicemail';
import ListAltIcon from '@material-ui/icons/ListAlt';
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
import TimelapseRoundedIcon from '@material-ui/icons/TimelapseRounded';
import Timer10RoundedIcon from '@material-ui/icons/Timer10Rounded';
import HourglassEmptyRoundedIcon from '@material-ui/icons/HourglassEmptyRounded';
import StarsIcon from '@material-ui/icons/Stars';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { deepOrange, grey } from '@material-ui/core/colors';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

const drawerWidth = '30%';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex'
  },
  grey: {
    color: theme.palette.getContrastText(grey[50]),
    backgroundColor: grey[50]
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  paper: {
    textAlign: 'center'
  },
  list: {
    minWidth: '250px'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}%)`,
    marginRight: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    marginRight: '0.5vw'
  }
}));

const InboundDataList = [
  {
    icon: <CallIcon color="primary" />,
    data: '09',
    label: 'I/B Calls Arrived'
  },
  {
    icon: <QueryBuilderIcon color="primary" />,
    data: '257',
    label: 'OOO Hours Calls'
  },
  {
    icon: <AddIcCallIcon color="primary" />,
    data: '247',
    label: 'I/B Calls Offered'
  },
  {
    icon: <CallReceivedIcon color="primary" />,
    data: '09',
    label: 'I/B Calls Answered'
  },
  {
    icon: <QueueIcon color="primary" />,
    data: '09',
    label: 'I/B Calls in Queue'
  },
  {
    icon: <SupervisorAccountIcon color="primary" />,
    data: '257',
    label: 'I/B Agents Available'
  },
  {
    icon: <AvTimerIcon color="primary" />,
    data: '247',
    label: 'I/B Ans within SL'
  },
  {
    icon: <RecordVoiceOverIcon color="primary" />,
    data: '09',
    label: 'I/B IVR Aband'
  },
  {
    icon: <VoicemailIcon color="primary" />,
    data: '09',
    label: 'I/B Queue Aband'
  },
  {
    icon: <ListAltIcon color="primary" />,
    data: '257',
    label: 'I/B Service Level (SL-20)'
  },
  {
    icon: <QuestionAnswerRoundedIcon color="primary" />,
    data: '247',
    label: 'I/B Answer Level (SL-20)'
  },
  {
    icon: <TimelapseRoundedIcon color="primary" />,
    data: '09',
    label: 'I/B AHT'
  },
  {
    icon: <Timer10RoundedIcon color="primary" />,
    data: '247',
    label: 'TeI/B Ans within SL=10 sec'
  },
  {
    icon: <HourglassEmptyRoundedIcon color="primary" />,
    data: '09',
    label: 'I/B Service Level (SL-10)'
  },
  {
    icon: <StarsIcon color="primary" />,
    data: '09',
    label: 'I/B Answer Level (SL-10)'
  },
  {
    icon: <StarsIcon color="primary" />,
    data: '09',
    label: 'I/B Answer Level (SL-10)'
  }
];

const Inbound = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <main className={classes.content} style={{ height: '100vh' }}>
          <Grid container>
            {InboundDataList.map((array, index) => (
              <Grid container item xs={12} sm={4}>
                <List key={index} className={classes.list}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.grey}>{array.icon}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={array.data}
                      secondary={array.label}
                    />
                  </ListItem>
                </List>
              </Grid>
            ))}
          </Grid>
        </main>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="right"
        >
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Calls in Queue (0)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Details</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Live Calls (0)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Details</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Agents Live Status :: Logged in (34) / On Break (17)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Details</Typography>
            </AccordionDetails>
          </Accordion>
        </Drawer>
      </div>
    </>
  );
};

export default Inbound;
