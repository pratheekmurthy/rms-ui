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
  Card,
  CardContent,
  Container,
  CardHeader,
  Box
} from '@material-ui/core';
import {
  GET_INBOUND_DASHBOARD_DATA,  
  GET_INTERACTION_BY_AGENT_SIP_ID
} from 'src/modules/dashboard-360/utils/endpoints';
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
import DaterangeReport from './DaterangeReport';
import DownloadReport from '../../../dashboard-360/views/DashboardView/DownloadReport';
import DispositionTable from './DispositionTable';
import { DataGrid } from '@material-ui/data-grid';
import {

  lastFiveCallData
} from 'src/modules/dashboard-360/utils/columns-config';
import CreateAgent from './CreateAgentform'
import AgentTable from './AgentTable'
import CreateCaller from './Createcaller'
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


const AgentDashboard = () => {
  const classes = useStyles();


  useEffect(() => {

 

  }, [])

  return (
    // <>
    <Container maxWidth={false}>
        <div className={classes.root}>
      <Grid container spacing={3}>
    
        <Grid item xs={12} sm={4}>
        <div>
       
         <Card>
                  <CardHeader title={'Create Agent'} />
                  <CardContent>
                    <CreateAgent/>
                    </CardContent>
                    </Card>
                  
               </div>
        
        </Grid>
        <Grid item xs={12} sm={8}>
        <div>
        <Card>
                  <CardHeader title={'Agent Details'} />
                  <CardContent>
        <AgentTable/>
        </CardContent>
           </Card>
               </div>
         
        </Grid>
      
      </Grid>
    </div>
  
     </Container>
    // </>
  );
};

export default AgentDashboard;
