import React, { useEffect, useState } from 'react';
import axios from 'axios'
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
  CardHeader,
  Box
} from '@material-ui/core';
import {
  GET_INBOUND_DASHBOARD_DATA,
} from 'src/modules/dashboard-360/utils/endpoints';
import moment from 'moment';
import CallIcon from '@material-ui/icons/Call';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import VoicemailIcon from '@material-ui/icons/Voicemail';
import { grey } from '@material-ui/core/colors';
import { callsinQueuecolumns, LiveCallscolumns, LiveCallscolumns2, omrIdleAgents, ChennaiIdleAgents } from '../../../dashboard-360/utils/columns-config'
import { MDBDataTable } from 'mdbreact';
import 'bootstrap/dist/css/bootstrap.css'
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
  const [agentdisposedCalls, setagentdisposedCalls] = useState([])
  const [currentstatus, setCurrentstatus] = useState([])
  const [allusers, setAllusers] = useState([])
  const [callsinQueue, setCallsInQueue] = useState([])
  const [liveCalls, setLivecalls] = useState([])

  const [data, setData] = useState({})


  const InboundDataList = [
    {
      icon: <CallIcon color="primary" />,
      data: data.callarrived,
      label: 'I/B Calls Arrived'
    },
    // {
    //   icon: <QueryBuilderIcon color="primary" />,
    //   data: Inbound.ooohourscalls,
    //   label: 'OOO Hours Calls'
    // },
    {
      icon: <AddIcCallIcon color="primary" />,
      data: data.callsoffered,
      label: 'I/B Calls Offered'
    },
    {
      icon: <CallReceivedIcon color="primary" />,
      data: data.callsanswered,
      label: 'I/B Calls Answered'
    },
    // {
    //   icon: <QueueIcon color="primary" />,
    //   data: Inbound.queuecalls,
    //   label: 'I/B Calls in Queue'
    // },
    // {
    //   icon: <SupervisorAccountIcon color="primary" />,
    //   data: '0',
    //   label: 'I/B Agents Available'
    // },
    // {
    //   icon: <AvTimerIcon color="primary" />,
    //   data: '0',
    //   label: 'I/B Ans within SL'
    // },
    {
      icon: <RecordVoiceOverIcon color="primary" />,
      data: data.callsabandoned,
      label: 'I/B IVR Aband'
    },
    {
      icon: <VoicemailIcon color="primary" />,
      data: data.callsabandonedinqueue,
      label: 'I/B Queue Aband'
    },
    {
      icon: <AddIcCallIcon color="primary" />,
      data: liveCalls.length,
      label: 'Live calls'
    },
    {
      icon: <AddIcCallIcon color="primary" />,
      data: callsinQueue.length,
      label: 'Queue calls'
    },

    // {
    //   icon: <QuestionAnswerRoundedIcon color="primary" />,
    //   data: Inbound.callsansweredwithin20,
    //   label: 'I/B Answer Level (SL-20)'
    // },
    // {
    //   icon: <TimelapseRoundedIcon color="primary" />,
    //   data: Inbound.aht,
    //   label: 'I/B AHT'
    // }
    // {
    //   icon: <Timer10RoundedIcon color="primary" />,
    //   data: '0',
    //   label: 'TeI/B Ans within SL=10 sec'
    // },
    // {
    //   icon: <HourglassEmptyRoundedIcon color="primary" />,
    //   data: '09',
    //   label: 'I/B Service Level (SL-10)'
    // },
    // {
    //   icon: <StarsIcon color="primary" />,
    //   data: '09',
    //   label: 'I/B Answer Level (SL-10)'
    // },
    // {
    //   icon: <StarsIcon color="primary" />,
    //   data: '09',
    //   label: 'I/B Answer Level (SL-10)'
    // }
  ];


  // console.log(allusers, "allusers")
  // console.log(currentstatus, "current status")



  useEffect(() => {
    getIb()


  }, [])



  // setInterval(window.location.reload(), 150000);
  // window.setTimeout(function () { document.location.reload(true); }, 25000);

  const getIb = () => {
    axios.get('http://192.168.3.36:4000/auth/apiM/allusers',)
      .then((response) => {
        // console.log(response, "allusers")
        setAllusers(response.data.userdetails)
      })
      .catch((error) => {
        console.log(error.message)
      })

    axios.get('http://192.168.3.36:42004/crm/currentstatus/report')
      .then((response) => {
        // console.log(response)
        setCurrentstatus(response.data.items)
      })
      .catch((error) => {
        console.log(error.message)
      })


  }

  var agentstatus = [];
  var obj1 = {};

  if (currentstatus.length && allusers.length > 0) {

    var i = 1;
    currentstatus.forEach(element1 => {
      allusers.forEach(element2 => {
        if (element1.agentID === element2.External_num && element1.loginStatus === "true") {

          obj1 = {
            'sl.no': i,
            'EmployeeName': element2.EmployeeName,
            'agentID': element1.agentID,
            'contactNumber': element1.contactNumber,
            'agentCallStatus': element1.agentCallStatus,
            'agentCallDispositionStatus': element1.agentCallDispositionStatus,
            'Location': element2.Location,
            'loginStatus': element1.loginStatus,
            'Server': element2.Server,
            'EmailID': element2.EmailID,
            'breakStatus': element1.breakStatus,
            'currentserver': element1.currentserver
          }
          i = i + 1;
          if (element1.agentCallStatus === 'disconnected' && element1.agentCallDispositionStatus === 'NotDisposed') {
            let difference = new Date() - new Date(element1.updatedAt)
            difference = moment.utc(difference).format('HH:mm:ss');
            obj1.difference = difference;
          }

          agentstatus.push(obj1);

        }
      });
    });

  }


  // console.log(agentstatus, "live agents")
  // console.log(agentliveStatus, "livestatus")

  const disposedInteractions = agentstatus.filter((record) => {
    return record.agentCallDispositionStatus === 'Disposed'
  })

  const onBreak = agentstatus.filter((agent) => {
    return agent.breakStatus === 'IN'
  })

  const getLiveCalls = () => {
    axios.get('http://106.51.86.75:7000/report/api/livecalls')
      .then((response) => {
        // console.log(response, "live callllllllsss")
        response.data.map((call) => {
          // return call.duration = moment.utc(new Date(call.duration)).format('HH:mm:ss');
          return call.duration = (new Date(call.duration * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
        })
        setLivecalls(response.data)
        // setCurrentstatus(response.data.items)
      })
      .catch((error) => {
        // console.log(error.message)
      })
  }

  const getCallsinQueue = () => {
    axios.get('http://106.51.86.75:7000/report/api/callinqueue')
      .then((response) => {
        // console.log(response, "queue callllllllsss")
        response.data.map((call) => {
          return call.duration = (new Date(call.duration * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
        })
        // console.log(response.data, "queue calllsss")
        setCallsInQueue(response.data)
        // setCurrentstatus(response.data.items)
      })
      .catch((error) => {
        // console.log(error.message)
      })
  }

  const getValues = () => {
    axios.get('http://106.51.86.75:7000/report/api/cdr')
      .then((response) => {
        // console.log(response, "live data")
        setData(response.data.count)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }



  // function getALF(startDate, endDate) {

  //   const axios = require('axios');
  //   let data = '';
  //   let u = Agent_service_url
  //   let config = {
  //     method: 'get',
  //     url: u + GET_INTERACTION_BY_AGENT_SIP_ID + localStorage.getItem('AgentSIPID') + '',
  //     headers: {},
  //     data: data
  //   };

  //   axios(config)
  //     .then(async (response) => {
  //       var ALFDATA = response.data;
  //       ALFDATA = ALFDATA.reverse();
  //       var filteredData = ALFDATA.filter(data => data.created.substring(0, 10) >= startDate.toISOString().substring(0, 10) && data.created.substring(0, 10) <= endDate.toISOString().substring(0, 10))
  //       setagentdisposedCalls(filteredData)
  //       return filteredData;
  //     })

  //     .catch((error) => {
  //       console.log(error);
  //     });


  // }
  // function handleChange() {
  //   setagentdisposedCalls([])
  // }


  function getIBdata() {
    const axios = require('axios');

    let config = {
      method: 'get',
      url: GET_INBOUND_DASHBOARD_DATA,
      headers: {}
    };

    axios(config)
      .then((response) => {

        var data = response.data;

        // setInbound(data[0][0])
      })
      .catch((error) => {
        console.log(error);
      });


  }
  // const SOCKETENDPOINT = SOCKETENDPOINT2;




  useEffect(() => {

    const interval = setInterval(() => {
      getLiveCalls()
      getCallsinQueue()
      getIb()

    }, 2000);



    const interval1 = setInterval(() => {
      getValues()
      // const socket = socketIOClient(SOCKETENDPOINT);

      // socket.on('AstriskEvent', data => {
      //   if (data.Event === 'Bridge' && data.Bridgestate === 'Link') {
      //     getIBdata()
      //   }
      //   if (data.Event === 'Hangup') {
      //     getIBdata()
      //   }
      // })

    }, 60000);

    const interval2 = setInterval(() => {
      getIb()

    }, 6000);

  }, [])

  useEffect(() => {

  }, [getIBdata])

  const options = {
    filterType: 'checkbox',
    rowsPerPage: 10,
  };

  const data1 = {}
  // console.log(agentstatus)
  data1.rows = agentstatus;
  data1.columns = LiveCallscolumns2;

  const chennaiIdleAgents = agentstatus.filter((Agent) => {
    return Agent.agentCallDispositionStatus === 'NotDisposed' && Agent.agentCallStatus === 'disconnected' && Agent.Location === 'Chennai'
  })

  // console.log(chennaiIdleAgents, "idleagents chennai")

  const OmrIdleAgents = agentstatus.filter((Agent) => {
    return Agent.agentCallDispositionStatus === 'NotDisposed' && Agent.agentCallStatus === 'disconnected' && Agent.Location === 'OMR'
  })

  // console.log(OmrIdleAgents, "idleagents OMR")


  const callsinQueueData = {}
  callsinQueueData.rows = callsinQueue
  callsinQueueData.columns = callsinQueuecolumns

  const chennaiIdleAgentsData = {}
  chennaiIdleAgentsData.rows = chennaiIdleAgents
  chennaiIdleAgentsData.columns = ChennaiIdleAgents

  const OmrIdleAgentsData = {}
  OmrIdleAgentsData.rows = OmrIdleAgents
  OmrIdleAgentsData.columns = omrIdleAgents

  const liveCallsData = {}
  liveCallsData.rows = liveCalls
  liveCallsData.columns = LiveCallscolumns


  // console.log(callsinQueueData, "callsinQueueData")


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
                <Grid item lg={3} sm={6} key={index}>
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
              {/* <DaterangeReport
                getALF={getALF}
                handleChange={handleChange}
              />
              <Grid item lg={3} sm={6}>
                <br />
                {agentstatus.length > 0 ? <DownloadReport
                  DownloadData={agentstatus}
                /> : <></>}
              </Grid> */}
            </Grid>
            <Grid item xs={3}>
              <Accordion>
                <AccordionSummary
                  // expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Calls in Queue ({callsinQueue.length})
                  </Typography>
                </AccordionSummary>
                {/* <AccordionDetails>
                  <Typography>Details</Typography>
                </AccordionDetails> */}
              </Accordion>
              <Accordion>
                <AccordionSummary
                  // expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Live Calls ({liveCalls.length})
                  </Typography>
                </AccordionSummary>
                {/* <AccordionDetails>
                  <Typography>Details</Typography>
                </AccordionDetails> */}
              </Accordion>
              <Accordion>
                <AccordionSummary
                  // expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Agents Live Status :: Logged in ({agentstatus.length}) / On Break ({onBreak.length})
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* <Typography>Details</Typography> */}
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Box>
        {/* <CurrentStatus/> */}
      </div>
      {/* {agentdisposedCalls.length > 0 ? <DispositionTable getALF={getALF} agentdisposedCalls={agentdisposedCalls} /> 
      : <></>} */}
      <Box component="span" m={1}>
        <Grid container spacing={3} justify={'space-around'}>
          <Grid item lg={6} md={12} xs={12}>
            <Card>
              <CardHeader
                title={
                  `Queue calls  :: ${callsinQueue.length}  `
                }
              />
              <CardContent>
                {/* <MUIDataTable
                  title={`calls in Queue - ${callsinQueue.length}`}
                  data={callsinQueue}
                  columns={callsinQueuecolumns}
                  options={options}
                /> */}
                <MDBDataTable
                  striped
                  hover
                  data={callsinQueueData}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={6} md={12} xs={12}>
            <Card>
              <CardHeader
                title={
                  `Live Calls ::  ${liveCalls.length}`
                }
              />
              <CardContent>
                {/* <MUIDataTable
                  title={`Live calls - ${liveCalls.length}`}
                  data={liveCalls}
                  columns={LiveCallscolumns}
                  options={options}
                /> */}
                <MDBDataTable
                  striped
                  hover
                  data={liveCallsData}
                />

              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box component="span" m={1}>
        <Grid container spacing={3} justify={'space-around'}>
          <Grid item lg={12} md={12} xs={12}>
            <Card>
              <CardHeader
                title={
                  `IDLE Agents OMR :: ${OmrIdleAgents.length}  `
                }
              />
              <CardContent>
                <MDBDataTable
                  striped
                  hover
                  data={OmrIdleAgentsData}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <Card>
              <CardHeader
                title={
                  `IDLE Agents Chennai ::  ${chennaiIdleAgents.length}`
                }
              />
              <CardContent>
                <MDBDataTable
                  striped
                  stripeRowsStyle={{ backgroundColor: 'red' }}
                  hover
                  data={chennaiIdleAgentsData}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid item lg={12} md={12} xs={12}>
          <Card>
            <CardHeader
              title={
                `Agent Live Status - Logged in (${agentstatus.length}) / Live Agents - (${agentstatus.length - onBreak.length}) /On Break (${onBreak.length})`
              }
            />
            <CardContent>
              {/* <MUIDataTable
                title={`calls in Queue - ${callsinQueue.length}`}
                data={callsinQueue}
                columns={callsinQueuecolumns}
                options={options}
              /> */}
              <MDBDataTable
                striped
                hover
                data={data1}
              />
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </>
  );
};
export default Inbound;