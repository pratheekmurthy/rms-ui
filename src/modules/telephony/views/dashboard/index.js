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
import { MDBDataTable, MDBDataTableV5 } from 'mdbreact';
import { DataGrid } from '@material-ui/data-grid';
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
  const [idleA, setIdleA] = useState([])

  const [data, setData] = useState({ callarrived: 0, callsabandoned: 0, callsabandonedinqueue: 0, callsanswered: 0, callsoffered: 0 })


  const InboundDataList = [
    {
      icon: <CallIcon color="primary" />,
      data: data.callarrived,
      label: 'I/B Calls Arrived'
    },
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
    }
  ]



  const getIb = () => {
    //Api for fetching All users 
    axios.get('http://106.51.86.75:4000/auth/apiM/allusers',)
      .then((response) => {
        // console.log(response, "allusers")
        setAllusers(response.data.userdetails)
      })
      .catch((error) => {
        console.log(error.message)
      })

    //Api for fetching currentstatus data
    axios.get('http://106.51.86.75:42004/crm/currentstatus/report')
      .then((response) => {
        // console.log(response)
        setCurrentstatus(response.data.items)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const getLiveCalls = () => {
    //Api call for fetching livecalls data
    axios.get('http://106.51.86.75:7000/report/api/livecalls')
      .then((response) => {
        // console.log(response, "live callllllllsss")
        if (response.data) {
          response.data.map((call) => {
            // return call.duration = moment.utc(new Date(call.duration)).format('HH:mm:ss');
            return call.duration = (new Date(call.duration * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
          })
          setLivecalls(response.data)
        }
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const getCallsinQueue = () => {
    //Api call for fetching queue calls data
    axios.get('http://106.51.86.75:7000/report/api/callinqueue')
      .then((response) => {
        // console.log(response, "queue callllllllsss")
        let data1 = response.data
        if (response.data) {
          data1.map((call) => {
            return (call.duration = (new Date(call.duration * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0]);
          })


        }
        setCallsInQueue(response.data)
      })
      .catch((error) => {
        // console.log(error.message)
      })
  }

  const getValues = () => {
    //Api call for fectching calls count data
    axios.get('http://106.51.86.75:7000/report/api/cdr')
      .then((response) => {
        // console.log(response, "live data")
        setData(response.data.count)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }


  //Mapping All users and current status for matching currentstatus of each user
  var agentstatus = [];
  var obj1 = {};

  if (currentstatus.length && allusers.length > 0) {

    var i = 1;
    currentstatus.forEach(element1 => {
      allusers.forEach(element2 => {
        if (element1.agentID === element2.External_num && element1.loginStatus === "true") {

          obj1 = {
            // 'sl.no': i,
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
            'currentserver': element1.currentserver,
            'missedCalls': element1.notAnsweredCalls,
            'answeredCalls': element1.AnsweredCalls
          }
          i = i + 1;
          if (element1.agentCallStatus === 'disconnected' && element1.agentCallDispositionStatus === 'NotDisposed') {
            let difference = new Date() - new Date(element1.updatedAt)
            // difference = moment.utc(difference).format('HH:mm:ss');
            obj1.difference = difference;
          }

          agentstatus.push(obj1);

        }
      });
    });

  }

  //filter method for disposed callstatus agents
  const disposedInteractions = agentstatus.filter((record) => {
    return record.agentCallDispositionStatus === 'Disposed'
  })

  //filter method for on Break Agents
  const onBreak = agentstatus.filter((agent) => {
    return agent.breakStatus === 'IN'
  })


  useEffect(() => {

    //calling live calls & Queuecalls every 3 seconds
    const interval = setInterval(() => {
      getLiveCalls()
      getCallsinQueue()

    }, 3000);

    //calling calls count api for every 5 seconds
    const interval1 = setInterval(() => {
      getValues()
    }, 5000);

    //calling current status & All users api for every 6 seconds
    const interval2 = setInterval(() => {
      getIb()
    }, 6000);

  }, [])

  useEffect(() => {

  }, [getIb])


  //filtering for ideal Agents is particular location
  const chennaiIdleAgents = agentstatus.filter((Agent) => {
    return Agent.agentCallDispositionStatus === 'NotDisposed' && Agent.agentCallStatus === 'disconnected' && Agent.Location === 'Chennai'
  })


  const OmrIdleAgents = agentstatus.filter((Agent) => {
    return Agent.agentCallDispositionStatus === 'NotDisposed' && Agent.agentCallStatus === 'disconnected' && Agent.Location === 'OMR'
  })

  let idleagentsAll1 = agentstatus.filter((Agent) => {
    return Agent.agentCallDispositionStatus === 'NotDisposed' && Agent.agentCallStatus === 'disconnected'
  })

  //sorting of Top 5 idle Agents
  idleagentsAll1 = idleagentsAll1.sort((a, b) => a.difference - b.difference)
  idleagentsAll1.sort((a, b) => (a.difference > b.difference) ? 1 : ((b.difference > a.difference) ? -1 : 0))
  idleagentsAll1 = idleagentsAll1.reverse().slice(0, 5)

  //sorting for Agent status table based on number of calls answered
  agentstatus.sort((a, b) => (a.answeredCalls > b.answeredCalls) ? 1 : ((b.answeredCalls > a.answeredCalls) ? -1 : 0))
  // idleagentsAll1 = idleagentsAll1.reverse()
  console.log(agentstatus, "before sorting")
  if (agentstatus.length > 0) {
    let id = 0;
    agentstatus.map((call) => {
      id = id + 1;
      return (call['sl.no'] = id);
    })
  }
  console.log(agentstatus, "After sorting")


  //converting milliseconds to required date format
  // if (idleagentsAll1.length > 0) {
  //   idleagentsAll1.forEach((ele) => {
  //     ele.difference = moment.utc(ele.difference).format('HH:mm:ss');
  //   })
  // }

  // if (OmrIdleAgents.length > 1) {
  //   OmrIdleAgents.forEach((ele) => {
  //     ele.difference = moment.utc(ele.difference).format('HH:mm:ss');
  //   })
  // }

  // if (chennaiIdleAgents.length > 0) {
  //   chennaiIdleAgents.forEach((ele) => {
  //     ele.difference = moment.utc(ele.difference).format('HH:mm:ss');
  //   })
  // }

  idleagentsAll1.forEach((ele) => {
    ele.difference = moment.utc(ele.difference).format('HH:mm:ss');
  })

  OmrIdleAgents.forEach((ele) => {
    ele.difference = moment.utc(ele.difference).format('HH:mm:ss');
  })

  chennaiIdleAgents.forEach((ele) => {
    ele.difference = moment.utc(ele.difference).format('HH:mm:ss');
  })

  // if(callsinQueue.length > 1){
  //   callsinQueue.forEach((ele) => {
  //     ele.difference = moment.utc(ele.difference).format('HH:mm:ss');
  //   })
  // }

  console.log(callsinQueue, "calls in queue")


  //Table configuring
  const data1 = {}
  data1.rows = agentstatus;
  data1.columns = LiveCallscolumns2;

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

  const idleagentsAll = {}
  idleagentsAll.rows = idleagentsAll1
  idleagentsAll.columns = omrIdleAgents



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
        <Grid container spacing={2} justify={'space-around'}>
          <Grid item lg={4} md={12} xs={12}>
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
                {/* <MDBDataTable
                  striped
                  hover
                  data={callsinQueueData}
                /> */}
                {/* <DataGrid rows={callsinQueue} columns={callsinQueuecolumns} pageSize={5} checkboxSelection /> */}
                <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={callsinQueueData} searching={false} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4} md={12} xs={12}>
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
                {/* <MDBDataTable
                  striped
                  hover
                  data={liveCallsData}
                /> */}
                <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={liveCallsData} searching={false} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4} md={12} xs={12}>
            <Card>
              <CardHeader
                title={
                  `Top -5 :: Idle Agents  `
                }
              />
              <CardContent>
                {/* <MUIDataTable
                  title={`calls in Queue - ${callsinQueue.length}`}
                  data={callsinQueue}
                  columns={callsinQueuecolumns}
                  options={options}
                /> */}
                {/* <MDBDataTable
                  striped
                  hover
                  data={callsinQueueData}
                /> */}
                {/* <DataGrid rows={callsinQueue} columns={callsinQueuecolumns} pageSize={5} checkboxSelection /> */}
                <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={idleagentsAll} searching={false} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box component="span" m={1}>
        <Grid container spacing={3} justify={'space-around'}>
          <Grid item lg={6} md={12} xs={12}>
            <Card>
              <CardHeader
                title={
                  `IDLE Agents OMR :: ${OmrIdleAgents.length}  `
                }
              />
              <CardContent>
                {/* <MDBDataTable
                  striped
                  hover
                  data={OmrIdleAgentsData}
                /> */}
                <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={OmrIdleAgentsData} searching={false} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={6} md={12} xs={12}>
            <Card>
              <CardHeader
                title={
                  `IDLE Agents Chennai ::  ${chennaiIdleAgents.length}`
                }
              />
              <CardContent>
                {/* <MDBDataTable
                  striped
                  stripeRowsStyle={{ backgroundColor: 'red' }}
                  hover
                  data={chennaiIdleAgentsData}
                /> */}
                <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={chennaiIdleAgentsData} searching={false} />
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
              {/* <MDBDataTable
                striped
                hover
                data={data1}
              /> */}
              <MDBDataTableV5 hover entriesOptions={[10, 20, 50]} entries={10} pagesAmount={4} data={data1} searchTop searchBottom={false} barReverse />
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </>
  );
};
export default Inbound;