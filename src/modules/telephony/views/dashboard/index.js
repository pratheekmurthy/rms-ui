import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Drawer,
  Card,
  CardContent,
  Box
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
import { grey } from '@material-ui/core/colors';

import socketIOClient from 'socket.io-client';

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
  list: {},
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    marginRight: '0.5vw'
  },
  listItem: {
    padding: 0
  },
  cardcontent: {
    padding: '0 0 0 5%',
    '&:last-child': {
      paddingBottom: 0
    }
  }
}));


const Inbound = () => {
  const classes = useStyles();
  const [Inbound, setInbound] = useState(
    {
      "callarrived": 0,
      "callsoffered": 0,
      "callsanswered": 0,
      "callsabandonedonivr": 0,
      "callsabandonedonqueue": 0,
      "shortabandoned": 0,
      "shortabandoned_ten": 0,
      "callsansweredwithin20": 0,
      "callsansweredwithin10": 0,
      "servicelevel": null,
      "answerlevel": null,
      "servicelevel_ten": null,
      "answerlevel_ten": null,
      "aht": null,
      "ooohourscalls": 0,
      "livecalls": 0,
      "queuecalls": 0,
      "callstransferedtoCSAT": 0,
      "GaveCSAT": 0,
      "totalcsatscore": null
    }
  )

  const InboundDataList = [
    {
      icon: <CallIcon color="primary" />,
      data: Inbound.callarrived,
      label: 'I/B Calls Arrived'
    },
    {
      icon: <QueryBuilderIcon color="primary" />,
      data: Inbound.ooohourscalls,
      label: 'OOO Hours Calls'
    },
    {
      icon: <AddIcCallIcon color="primary" />,
      data: Inbound.callsoffered,
      label: 'I/B Calls Offered'
    },
    {
      icon: <CallReceivedIcon color="primary" />,
      data: Inbound.callsanswered,
      label: 'I/B Calls Answered'
    },
    {
      icon: <QueueIcon color="primary" />,
      data: Inbound.queuecalls,
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

  function getIBdata(){
    const axios = require('axios');

    let config = {
      method: 'get',
      url: 'http://192.168.3.45:42005/service/dashboardcount?AccessKeys=123',
      headers: {}
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        var data = response.data;
        console.log("data", data[0])
        setInbound(data[0][0])
      })
      .catch((error) => {
        console.log(error);
      });
      

  }
const SOCKETENDPOINT = 'http://192.168.3.45:42002/';

  useEffect(() => {
    console.log("data inside the useEffect");
getIBdata();
const socket = socketIOClient(SOCKETENDPOINT);

socket.on('AstriskEvent', data => {
  if (data.Event === 'Bridge'&& data.Bridgestate === 'Link') {
    getIBdata()
  }
  if (data.Event === 'Hangup') {
    getIBdata()
  }
})

  }, [])

  return (
    <>
      <div className={classes.root}>
        <Box css={{ margin: '0.5rem' }}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={1}
          >
            <Grid container item xs={9} spacing={1}>
              {InboundDataList.map((array, index) => (
                <Grid item lg={3} sm={6}>
                  <Card>
                    <CardContent className={classes.cardcontent}>
                      <List key={index} className={classes.list}>
                        <ListItem classes={{ root: classes.listItem }}>
                          <ListItemAvatar>
                            <Avatar className={classes.grey}>
                              {array.icon}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={array.data}
                            secondary={array.label}
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Grid item xs={3}>
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
                    Live Calls ({Inbound.livecalls})
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
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Inbound;
