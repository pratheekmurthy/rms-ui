import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import Input from '@material-ui/core/Input';

import PropTypes from 'prop-types';

import Page from 'src/components/Page';
import CustomTabs from 'src/modules/dashboard-360/components/CustomTabs';
import CustomTabPanel from 'src/modules/dashboard-360/components/CustomTabPanel';
import BasicTable from 'src/modules/dashboard-360/components/BasicTable';
import MainLoader from 'src/components/MainLoader';
import {
  invoicesColumns,
  orderColumns,
  lastFiveCallData
} from 'src/modules/dashboard-360/utils/columns-config';

import CommonAlert from 'src/components/CommonAlert';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';
import CreateTicket from 'src/modules/ticketing/views/create-ticket';
import CallIcon from '@material-ui/icons/Call';
import DealerCard from './DealerCard';
import TicketsList from './TicketsList';

import dealerAPICalls from './apiCalls';

import { setDistributorOrders } from '../../redux/action';
import DispositionForm from './DispositionForm';
import TimerComp from './TimerComp';

import socketIOClient from 'socket.io-client';
import { update } from 'lodash';
import { setAgentCurrentStatus } from 'src/redux/action';
import { agentCurrentStatus } from 'src/redux/reducers';

const SOCKETENDPOINT = 'http://192.168.3.45:42002/';

const socket = socketIOClient(SOCKETENDPOINT);

const useStyles = makeStyles(theme => {
  return {
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    },
    panelBody: {
      padding: 0
    },
    dialogActions: {
      padding: '0 1.5rem 1rem'
    },

    modal: {
      alignItems: 'center',
      width: '100%',
      height: '100%'
    },
    timerComp: {
      position: 'absolute',
      top: 0,
      left: '55%',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      backgroundColor: theme.palette.secondary.light,
      padding: '8px 10px',
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8
    },
    callWrapper: {
      left: 'calc(55% + 90px)'
    },
    callInbound: {
      backgroundColor: theme.palette.success.light
    },
    callOutbound: {
      backgroundColor: theme.palette.secondary.light
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: theme.spacing(1, 1)
    }
  };
});

const Dashboard = ({ distributorOrders, setDistributorOrdersAction, setAgentCurrentStatusAction }) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [rootData, setRootData] = useState(null);
  const [expanded, setExpanded] = React.useState('panel1');
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const [distributorName, setDistributorName] = useState('');
  const [distributorId, setDistributorId] = useState('');
  const [distributorEmail, setDistributorEmail] = useState('');
  const [distributorMobile, setDistributorMobile] = useState('');
  const [createdByName, setCreatedByName] = useState('');
  const [createdById, setCreatedById] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [remarks, setRemarks] = useState('');

  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketType, setTicketType] = useState({});

  const [medium, setMedium] = useState([]);
  const [media, setMedia] = useState({
    value: '',
    label: ''
  });
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState({
    value: '',
    label: ''
  });
  const [subCategoryItems, setSubCategoryItems] = useState([]);
  const [subCategoryItem, setSubCategoryItem] = useState({
    value: '',
    label: ''
  });
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState({
    value: '',
    label: ''
  });
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState({
    value: '',
    label: ''
  });
  const [priorities, setPriorities] = useState([]);
  const [priority, setPriority] = useState({
    value: '',
    label: '',
    sla: 0
  });
  const [statuses, setStatuses] = useState([]);
  const [status, setStatus] = useState({
    value: '',
    label: '',
    slaOnHold: false
  });
  const [executives, setExecutives] = useState([]);
  const [executive, setExecutive] = useState({
    value: '',
    label: '',
    executiveEmail: '',
    executiveMobile: ''
  });
  const [ticket, setTicket] = useState({});
  const [loading, setLoading] = useState(true);
  const [createdTime, setCreatedTime] = useState();
  const [file, setFile] = useState('');
  const [currentCall, setCurrentCall] = useState({
    callUniqueId: '',
    callType: '',
    callStatus: '',
    callDetails: '',
    callDispositionStatus: '',
    callerNumber: ''
  });
  const [user, setUserDetails] = useState({
    userType: 'Agent'
  });
  const [agent, setAgent] = useState({
    AgentId: '1234',
    AgentType: localStorage.getItem('AgentType'),
    AgentSipId: localStorage.getItem('AgentSIPID')
  });
  const [ALF, setALF] = useState([]);
  const [DLF, setDLF] = useState([]);
  const agentServiceURL = 'http://192.168.3.45:42004/';
  const [disForm, setdisForm] = useState({});
  const [mobile, setmobile] = useState('');

  function getDLF() {
    // console.log("ALF is callled")
    const axios = require('axios');
    let data = '';
    let config = {
      method: 'get',
      url:
        agentServiceURL +
        'crm/interactions/getByDistributerID?distributerID=' +
        localStorage.getItem('distributer_id') +
        '',
      headers: {},
      data: data
    };

    axios(config)
      .then(async response => {
        var DLFDATA = response.data;
        DLFDATA = DLFDATA.reverse();
        setDLF(DLFDATA);
      })

      .catch(error => {
        console.log(error);
      });
  }

  function getALF() {
    // console.log("ALF is callled")
    const axios = require('axios');
    let data = '';

    let config = {
      method: 'get',
      url:
        agentServiceURL +
        'crm/interactions/getByAgentSIPID?SipID=' +
        agent.AgentSipId +
        '',
      headers: {},
      data: data
    };

    axios(config)
      .then(async response => {
        // console.log(JSON.stringify(response.data));
        var ALFDATA = response.data;

        //   ALFDATA = ALFDATA.filter(function (e) {
        //     return e.agentExtension === agent.AgentSipId;
        // })
        // ALFDATA.sort(function(a,b){
        //   console.log("a",a);
        //   console.log("b",b)
        //   // Turn your strings into dates, and then subtract them
        //   // to get a value that is either negative, positive, or zero.
        //   console.log(new Date(b.created) - new Date(a.created))
        //   return new Date(b.created) - new Date(a.created);
        // });

        ALFDATA = ALFDATA.reverse();
        // var sortedActivities = await ALFDATA.sort((a, b) => b.created - a.created)

        // //  sortedActivities = sortedActivities.reverse();
        //  sortedActivities = await sortedActivities.filter(function (e) {
        //       return e.agentExtension === agent.AgentSipId;
        //   })
        //   console.log("ALFDATA", sortedActivities)
        console.log("ALFDATA", ALFDATA)
        setALF(ALFDATA);
      })

      .catch(error => {
        console.log(error);
      });
  }

  function setCurrentCallDetails(
    callStatusId,
    callUniqueId,
    callType,
    callStatus,
    callEvent,
    callDispositionStatus,
    callerNumber
  ) {
    setCurrentCall({
      callStatusId: callStatusId,
      callUniqueId: callUniqueId,
      callType: callType,
      callStatus: callStatus,
      callEvent: callEvent,
      callDispositionStatus: callDispositionStatus,
      callerNumber: callerNumber
    });
    localStorage.setItem('callStatusId', callStatusId);
    localStorage.setItem('callUniqueId', callUniqueId);
    localStorage.setItem('callType', callType);
    localStorage.setItem('callStatus', callStatus);
    localStorage.setItem('callEvent', callEvent);
    localStorage.setItem('callDispositionStatus', callDispositionStatus);
    localStorage.setItem('callerNumber', callerNumber);
    // updateAgentCallStatus({
    //   callStatusId: callStatusId,
    //   callUniqueId: callUniqueId,
    //   callType: callType,
    //   callStatus: callStatus,
    //   callEvent: callEvent,
    //   callDispositionStatus: callDispositionStatus,
    //   callerNumber: callerNumber
    // });
  }

  var APIENDPOINT = 'http://192.168.3.45:42002';
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// addToQueue start //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function addToQueue(agentId, queue) {
    var axios = require('axios');
    var data = JSON.stringify({
      agentId: agentId,
      queue: queue,
      action: 'QueueAdd'
    });

    var config = {
      method: 'get',
      url:
        APIENDPOINT +
        '/ami/actions/addq?Interface=SIP%2F' +
        agentId +
        '&Queue=' +
        queue +
        '',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios(config)
      .then(function (response) {
        // console.log("addQueue",JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// addToQueue end //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// removeFromQueue start //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function removeFromQueue(agentId, queue) {
    var axios = require('axios');
    var data = JSON.stringify({
      agentId: agentId,
      queue: queue,
      action: 'QueueRemove'
    });

    var config = {
      method: 'get',
      url:
        APIENDPOINT +
        '/ami/actions/rmq?Queue=' +
        queue +
        '&Interface=SIP%2F' +
        agentId +
        '',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios(config)
      .then(function (response) {
        // console.log("Removed Queue",JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// removeFromQueue end //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function updateAgentCallStatus(updateData) {
    var axios = require('axios');
    var data = {
      agentCallStatus: updateData.callStatus,
      agentCallEvent: updateData.callEvent,
      agentCallUniqueId: updateData.callUniqueId,
      agentCallType: updateData.callType,
      agentCallDispositionStatus: updateData.callDispositionStatus,
      callerNumber: updateData.callerNumber
    };
    var config = {
      method: 'put',
      url: agentServiceURL + 'crm/currentstatuses/' + updateData.callStatusId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log("update", JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getAgentCallStatus(agentSipID) {
    var axios = require('axios');

    var config = {
      method: 'get',
      url:
        agentServiceURL +
        'crm/currentstatuses/agentSipID?agentSipID=' +
        agentSipID,
      headers: {}
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        if (response.data) {
          console.log('getAgentCallStatus....................', response.data);
          var callStatusId = JSON.stringify(response.data[0]._id);

          // console.log('callStatusId', callStatusId);

          setCurrentCallDetails(
            response.data[0]._id,
            response.data[0].agentCallUniqueId,
            response.data[0].agentCallType,
            response.data[0].agentCallStatus,
            response.data[0].agentCallEvent,
            response.data[0].agentCallDispositionStatus,
            response.data[0].contactNumber
          );
          setAgentCurrentStatusAction({
            "AgentType": agent.AgentType,
            "role": user.userType,
            "callUniqueId": response.data[0].agentCallUniqueId,
            "distributer_id": "",
            "callStatusId": response.data[0]._id,
            "callDispositionStatus": response.data[0].agentCallDispositionStatus,
            "callType": response.data[0].agentCallType,
            "callEvent": response.data[0].agentCallEvent,
            "callerNumber": response.data[0].contactNumber,
            "callStatus": response.data[0].agentCallStatus,
            "AgentSIPID": agent.AgentSipId
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const onClick = event => {
    console.log('mobile', mobile);
    if (mobile.length === 10) {
      console.log('valid number', SOCKETENDPOINT +
        'ami/actions/orginatecall?sipAgentID=SIP%2F' +
        agent.AgentSipId +
        '&NumbertobeCalled=5' +
        mobile);

      const axios = require('axios');

      let config = {
        method: 'get',
        url: SOCKETENDPOINT + "ami/actions/orginatecall?sipAgentID=SIP%2F" + agent.AgentSipId + "&NumbertobeCalled=5" + mobile,
        headers: {}
      };

      axios(config)
        .then(response => {
          console.log(JSON.stringify(response.data));
        })
        .catch(error => {
          console.log(error);
        });

      // before code
      // var data = JSON.stringify({ "mobile": mobile });

      // var config = {
      //   method: 'get',
      //   url: 'http://192.168.3.45:3003/makeCall',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   data: data
      // };

      // axios(config)
      //   .then(function (response) {
      //     console.log(JSON.stringify(response.data));
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    } else {
      console.log('Invalide number');
    }
    // alert('clicked', mobile);
  };

  const onChange = event => {
    setmobile(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  async function disProfileByNum(mobile) {
    // console.log("disProfileByNum", mobile);
    mobile = mobile.substring(1);
    const axios = require('axios');

    let config = {
      method: 'get',
      url: '/bo/boapi/profile?mobilenumber=' + mobile,
      headers: {}
    };

    // const response =      await axios(config)
    // .then((response) => {
    //   console.log(JSON.stringify(response.data));
    //   if (response.data.status === "1") {
    //     console.log("response", response.data)

    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
    // console.log("res", response)
    const response = await axios.get(config.url);
    // console.log("res", response)
    if (response.data.status === '1') {
      // console.log("response", response.data)
      var data1 = response.data.data;
      if (data1.length) {
        // console.log('data1', data1)
        get(data1[0].distributor_id);
        localStorage.setItem('distributer_id', data1[0].distributor_id);
      }
    }
    // const data = await response.json();

    // return data;
  }

  async function get(distributor_id) {
    try {
      const response = await Promise.allSettled(dealerAPICalls(distributor_id));
      setRootData(
        response.map(res => (res.status === 'fulfilled' ? res.value.data : {}))
      );
      setDistributorOrdersAction(
        response[2].status === 'fulfilled' ? response[2].value.data.data : null
      );
      setLoadingDetails(false);
    } catch (err) {
      console.log(err.response);
    }
  }

  ///socket start 

  if (user.userType === 'Agent') {
    socket.on('AstriskEvent', data => {
      // console.log('AstriskEvent', data);

      if (data.Event === 'Bridge') {
        // getInitialData();
        // localStorage.clear()
        if (
          data.CallerID2 === agent.AgentSipId &&
          data.Bridgestate === 'Link'
        ) {
          if (localStorage.getItem('callEvent') !== 'Bridge') {
            removeFromQueue(agent.AgentSipId, '9002');
            // removeFromQueue(agent.AgentSipId, '9002');
            console.log('Normal Bridge', data);
            // console.log('inside the bridge event current call', this.currentCall);
            setCurrentCallDetails(
              localStorage.getItem('callStatusId'),
              data.Uniqueid1,
              agent.AgentType,
              'connected',
              'Bridge',
              'NotDisposed',
              data.CallerID1
            );

            updateAgentCallStatus({
              callStatusId: localStorage.getItem('callStatusId'),
              callUniqueId: localStorage.getItem('callUniqueId'),
              callType: localStorage.getItem('callType'),
              callStatus: 'connected',
              callEvent: 'Bridge',
              callDispositionStatus: 'NotDisposed',
              callerNumber: localStorage.getItem('callerNumber')
            });
            // disProfileByNum(localStorage.getItem("callerNumber"));
          }
        }
        var Channel1 = data.Channel1;
        // if(str.includes("world")){}
        // console.log("mobile", '5'+mobile)
        if (
          data.Bridgestate === 'Link' &&
          Channel1.includes('SIP/' + agent.AgentSipId + '')
        ) {
          if (localStorage.getItem('callEvent') !== 'Bridge') {
            removeFromQueue(agent.AgentSipId, '9002');
            console.log('Link wala Bridge', data);
            // console.log('inside the bridge event current call', this.currentCall);
            var callerNumber = data.CallerID1;
            // callerNumber = callerNumber.substring(1);
            setCurrentCallDetails(
              localStorage.getItem('callStatusId'),
              data.Uniqueid1,
              agent.AgentType,
              'connected',
              'Bridge',
              'NotDisposed',
              callerNumber
            );
            updateAgentCallStatus({
              callStatusId: localStorage.getItem('callStatusId'),
              callUniqueId: localStorage.getItem('callUniqueId'),
              callType: localStorage.getItem('callType'),
              callStatus: 'connected',
              callEvent: 'Bridge',
              callDispositionStatus: 'NotDisposed',
              callerNumber: localStorage.getItem('callerNumber')
            });
            // disProfileByNum(localStorage.getItem("callerNumber"));
          }
        }
      }

      if (data.Event === 'Hangup') {
        if (data.ConnectedLineNum === agent.AgentSipId) {
          if (localStorage.getItem('callEvent') !== 'Hangup' || localStorage.getItem('callEvent') !== 'Unlink') {
            console.log('Hangup', data);
            setCurrentCallDetails(
              localStorage.getItem('callStatusId'),
              localStorage.getItem('callUniqueId'),
              localStorage.getItem('callType'),
              'disconnected',
              'Hangup',
              localStorage.getItem('callDispositionStatus'),
              localStorage.getItem('callerNumber')
            );
            updateAgentCallStatus({
              callStatusId: localStorage.getItem('callStatusId'),
              callUniqueId: localStorage.getItem('callUniqueId'),
              callType: localStorage.getItem('callType'),
              callStatus: 'disconnected',
              callEvent: 'Hangup',
              callDispositionStatus: localStorage.getItem('callDispositionStatus'),
              callerNumber: localStorage.getItem('callerNumber')
            });


          }

        }
      }
      var Channel1 = data.Channel1;
      var unlinkcounter = 0;
      if (
        data.Bridgestate === 'Unlink' &&
        Channel1.includes('SIP/' + agent.AgentSipId + '')
      ) {
        unlinkcounter++
        if (localStorage.getItem('callEvent') === 'Bridge' && unlinkcounter === 1) {
          console.log('Unlink wala hai', data);
          setCurrentCallDetails(
            localStorage.getItem('callStatusId'),
            localStorage.getItem('callUniqueId'),
            localStorage.getItem('callType'),
            'disconnected',
            'Hangup',
            localStorage.getItem('callDispositionStatus'),
            localStorage.getItem('callerNumber')
          );
          updateAgentCallStatus({
            callStatusId: localStorage.getItem('callStatusId'),
            callUniqueId: localStorage.getItem('callUniqueId'),
            callType: localStorage.getItem('callType'),
            callStatus: 'disconnected',
            callEvent: 'Hangup',
            callDispositionStatus: localStorage.getItem('callDispositionStatus'),
            callerNumber: localStorage.getItem('callerNumber')
          });


        }
      }
    });
  }



  ///socket ends
  useEffect(() => {
    window.addEventListener('storage', function (e) {
      // console.log('storage event', e.storageArea.search);
      var Dnumber = localStorage.getItem("search");
      if (Dnumber !== '' && Dnumber.length === 4) {
        //  getDistributorById(Dnumber);
        get(Dnumber);
      } else {
        get(Dnumber);
      }
    });
    // if (localStorage.getItem('callDispositionStatus') === 'Disposed') {
    //   // removeFromQueue(agent.AgentSipId, '9002');
    //   addToQueue(agent.AgentSipId, '9002');
    // }
    getALF();
    async function getInitialData() {
      try {
        const response = await getAgentCallStatus(agent.AgentSipId);
      } catch (err) {
        console.log('err', err);
      }
    }
    getInitialData();
    setRootData(
      [[], [], [], [], []].map(res =>
        res.status === 'fulfilled' ? res.value.data : {}
      )
    );
    setLoadingDetails(false);

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    console.log('data second useEffect', currentCall);
    console.log('currentCall.callerNumber', currentCall.callerNumber);

    // updateAgentCallStatus({
    //     callStatusId: localStorage.getItem('callStatusId'),
    //     callUniqueId: localStorage.getItem('callUniqueId'),
    //     callType: localStorage.getItem('callType'),
    //     callStatus: localStorage.getItem('callStatus'),
    //     callEvent: localStorage.getItem('callEvent'),
    //     callDispositionStatus: localStorage.getItem('callDispositionStatus'),
    //     callerNumber: localStorage.getItem('callerNumber')
    //   });
    if (
      currentCall.callerNumber !== '' &&
      currentCall.callDispositionStatus === 'NotDisposed'
    ) {
      disProfileByNum(currentCall.callerNumber);
      getDLF();
      // removeFromQueue(agent.AgentSipId, '9002');
    }
    getALF();
  }, [currentCall.callDispositionStatus, currentCall.callStatus]);
  var createTicket = () => { };
  return !loadingDetails ? (
    <div style={{ position: 'relative' }}>
      {currentCall.callStatus === 'connected' ? (
        <div>
          {/* <div className={classes.timerComp}>
            <TimerComp />
          </div> */}
          <Box
            alignItems="center"
            display="flex"
            className={`${classes.timerComp} ${classes.callWrapper} ${classes.callInbound}`}
          >
            <CallIcon />
            &nbsp;
            <Typography display="inline">
              {currentCall.callType} Call In Progress
            </Typography>
          </Box>{' '}
        </div>
      ) : null}
      {currentCall.callDispositionStatus === 'NotDisposed' &&
        currentCall.callStatus === 'disconnected' ? (
          <div>
            {/* <div className={classes.timerComp}>
            <TimerComp />
          </div> */}
            <Box
              alignItems="center"
              display="flex"
              className={`${classes.timerComp} ${classes.callWrapper} ${classes.callOutbound}`}
            >
              <CallIcon />
            &nbsp;
            <Typography display="inline">
                {currentCall.callType} Call Is Disconnected
            </Typography>
            </Box>{' '}
          </div>
        ) : null}
      <CustomBreadcrumbs />
      {agent.AgentType === 'Outbound' && localStorage.getItem('callDispositionStatus') === 'Disposed' && localStorage.getItem('callStatus') === 'disconnected' ? (
        <div>

          <Input value={mobile} onChange={onChange} margin='dense' />
          <CallIcon onClick={onClick} />
          {/* <Button
            variant="contained"
            className="jr-btn bg-light-green jr-btn-label left  text-white"
            onClick={onClick}
          >
            {/* <QueuePlayNext /> */}
          {/* <span><CallIcon  onClick={onClick} /></span>
          </Button> */}
        </div>
      ) : null}
      <Page className={classes.root} title="Dashboard">
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => setShowCreateTicket(true)}
                  >
                    Create Ticket
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    color="secondary"
                    variant="contained"
                    style={{ color: 'white' }}
                  >
                    BreakIn/BreakOut
                  </Button>
                </Grid>
                <Grid item>
                  <Card>
                    <CustomTabs
                      variant="fullWidth"
                      indicatorColor="primary"
                      textColor="primary"
                      tabNames={['Tickets', 'Incentives', 'E-Wallet']}
                      setCurrent={val => setTab(val)}
                    />
                    <CustomTabPanel value={tab} index={0}>
                      <TicketsList />
                    </CustomTabPanel>
                  </Card>
                  <br />
                  <Card>
                    <CardHeader title={'Distributor last five interactions'} />
                    {DLF.length ? (
                      <div>
                        <BasicTable
                          columns={lastFiveCallData}
                          records={ALF.slice(0, 3)}
                          redirectLink="/dash360/admin/distributerDisposedCallList"
                          redirectLabel="View All"
                        />
                      </div>
                    ) : (
                        <CommonAlert text="Unable to get distributor details" />
                      )}
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            <Grid item lg={3} md={6} xs={12}>
              {rootData[0].data ? (
                <DealerCard
                  dealerDetails={{
                    ...rootData[0].data[0],
                    lastOrderReference: rootData[2].data
                      ? rootData[2].data[0] || { OrderNumber: '' }.OrderNumber
                      : ''
                  }}
                />
              ) : (
                  <CommonAlert text="Unable to get distributor details" />
                )}
              {currentCall.callDispositionStatus === 'NotDisposed' &&
                user.userType === 'Agent' ? (
                  <Box mt={2}>
                    <Card>
                      <CardHeader title="Disposition Details" />
                      <Divider />
                      <CardContent>
                        <DispositionForm
                          agentSipID={agent.AgentSipId}
                          setCurrentCallDetails={setCurrentCallDetails}
                          addToQueue={addToQueue}
                          removeFromQueue={removeFromQueue}
                          getALF={getALF}
                          disForm={disForm}
                          setdisForm={form => {
                            setdisForm(form);
                          }}
                          category={category}
                          setCategory={cat => {
                            setCategory(cat);
                          }}
                          ticketType={ticketType}
                          setTicketType={tkstyp => {
                            setTicketType(tkstyp);
                          }}
                          subCategory={subCategory}
                          setSubCategory={subcat => {
                            setSubCategory(subcat);
                          }}
                          subCategoryItem={subCategoryItem}
                          setSubCategoryItem={subcatitem => {
                            setSubCategoryItem(subcatitem);
                          }}
                          remarks={remarks}
                          setRemarks={rks => {
                            setRemarks(rks);
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Box>
                ) : (
                  <Box mt={2}>
                    <Card>
                      <CardHeader
                        title={
                          'My last five interactions (' + agent.AgentSipId + ')'
                        }
                      />
                      {ALF.length ? (
                        <div>
                          <BasicTable
                            columns={lastFiveCallData}
                            records={ALF.slice(0, 3)}
                            redirectLink="/dash360/admin/agentlastfive"
                            redirectLabel="View All"
                          />
                        </div>
                      ) : (
                          <CommonAlert text="Unable to get distributor details" />
                        )}
                    </Card>
                  </Box>
                )}
            </Grid>
            <Grid item lg={5} xs={12}>
              <Card>
                <CardHeader title="Orders" />
                {rootData[2].data ? (
                  <BasicTable
                    columns={orderColumns}
                    records={rootData[2].data.slice(0, 3)}
                    redirectLink="/dash360/admin/orders"
                    redirectLabel="View All"
                  />
                ) : (
                    <CommonAlert text="Unable to get distributor details" />
                  )}
              </Card>
              <br />
              <Card>
                <CardHeader title="Invoices" />
                {rootData[3].data ? (
                  <div>
                    <BasicTable
                      columns={invoicesColumns}
                      records={rootData[3].data.slice(0, 3)}
                      redirectLink="/dash360/admin/invoices"
                      redirectLabel="View All"
                    />
                  </div>
                ) : (
                    <CommonAlert text="Unable to get distributor details" />
                  )}
              </Card>
              {/* <br />
              <Card>
                <CardHeader title={"My last five interactions ("+agent.AgentSipId+")"} />
                {ALF.length ? (
                  <div>
                    <BasicTable
                      columns={AgentLastFiveColumns}
                      records={ALF.slice(0, 3)}
                      redirectLink="/dash360/admin/agentlastfive"
                      redirectLabel="View All"
                    />
                  </div>
                ) : (
                    <CommonAlert />
                  )}
              </Card> */}
            </Grid>
          </Grid>
        </Container>
      </Page>
      {showCreateTicket ? (
        <Dialog
          open
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
            {rootData[0].data ? (
              <CreateTicket
                dealerDetails={
                  rootData[0].data[0]
                  // rootData[0].data[0].length ?
                  // ...rootData[0].data[0]: "",
                  // lastOrderReference: rootData[2].data
                  //   ? rootData[2].data[0].OrderNumber
                  //   : ''
                }
                setOpen={open => setOpen(open)}
                disForm={disForm}
                setClick={click => (createTicket = click)}
                ticket={ticket}
                formtype="telephony"
                setTicket={ticket => setTicket(ticket)}
                ticketNumber={ticketNumber}
                setTicketNumber={tks => {
                  setTicketNumber(tks);
                }}
                distributorName={distributorName}
                setDistributorName={disname => {
                  setDistributorName(disname);
                }}
                distributorId={distributorId}
                setDistributorId={disid => {
                  setDistributorId(disid);
                }}
                distributorEmail={distributorEmail}
                setDistributorEmail={disemail => {
                  setDistributorEmail(disemail);
                }}
                distributorMobile={distributorMobile}
                setDistributorMobile={dismob => {
                  setDistributorMobile(dismob);
                }}
                createdByName={createdByName}
                setCreatedByName={crename => {
                  setCreatedByName(crename);
                }}
                createdById={createdById}
                setCreatedById={creid => {
                  setCreatedById(creid);
                }}
                ticketSubject={ticketSubject}
                setTicketSubject={tktsub => {
                  setTicketSubject(tktsub);
                }}
                ticketDescription={ticketDescription}
                setTicketDescription={tktdisp => {
                  setTicketDescription(tktdisp);
                }}
                remarks={remarks}
                setRemarks={rks => {
                  setRemarks(rks);
                }}
                ticketTypes={ticketTypes}
                setTicketTypes={tkstyps => {
                  setTicketTypes(tkstyps);
                }}
                ticketType={ticketType}
                setTicketType={tkstyp => {
                  setTicketType(tkstyp);
                }}
                medium={medium}
                setMedium={mdm => {
                  setMedium(mdm);
                }}
                media={media}
                setMedia={media => {
                  setMedia(media);
                }}
                categories={categories}
                setCategories={catgs => {
                  setCategories(catgs);
                }}
                category={category}
                setCategory={cat => {
                  setCategory(cat);
                }}
                subCategories={subCategories}
                setSubCategories={subcats => {
                  setSubCategories(subcats);
                }}
                subCategory={subCategory}
                setSubCategory={subcat => {
                  setSubCategory(subcat);
                }}
                subCategoryItems={subCategoryItems}
                setSubCategoryItems={subcatitems => {
                  setSubCategoryItems(subcatitems);
                }}
                subCategoryItem={subCategoryItem}
                setSubCategoryItem={subcatitem => {
                  setSubCategoryItem(subcatitem);
                }}
                departments={departments}
                setDepartments={deps => {
                  setDepartments(deps);
                }}
                department={department}
                setDepartment={dept => {
                  setDepartment(dept);
                }}
                teams={teams}
                setTeams={tms => {
                  setTeams(tms);
                }}
                team={team}
                setTeam={tm => {
                  setTeam(tm);
                }}
                priorities={priorities}
                setPriorities={prts => {
                  setPriorities(prts);
                }}
                priority={priority}
                setPriority={prt => {
                  setPriority(prt);
                }}
                statuses={statuses}
                setStatuses={stses => {
                  setStatuses(stses);
                }}
                status={status}
                setStatus={sts => {
                  setStatus(sts);
                }}
                executives={executives}
                setExecutives={exts => {
                  setExecutives(exts);
                }}
                executive={executive}
                setExecutive={ext => {
                  setExecutive(ext);
                }}
                createdTime={createdTime}
                setCreatedTime={cretime => {
                  setCreatedTime(cretime);
                }}
              />
            ) : (
                ''
              )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                createTicket();
                setOpen(false);
              }}
              //  onClick={() => setShowCreateTicket(false)}
              color="primary"
              variant="contained"
              size="small"
            //  onClick={handleOpen}
            >
              Create
            </Button>
            <Button
              onClick={() => setShowCreateTicket(false)}
              color="primary"
              size="small"
              variant="outlined"
              autoFocus
              onClick={() => setShowCreateTicket(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
          ''
        )}
    </div>
  ) : (
      <MainLoader />
    );
};
Dashboard.propTypes = {
  distributorOrders: PropTypes.arrayOf(PropTypes.object),
  agentCurrentStatus: PropTypes.arrayOf(PropTypes.object),
  setDistributorOrdersAction: PropTypes.func,
  setAgentCurrentStatusAction: PropTypes.func
};

const mapStateToProps = state => {
  return {
    distributorOrders: state.distributorOrders,
    agentCurrentStatus: state.currentCall
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDistributorOrdersAction: orders => dispatch(setDistributorOrders(orders)),
    setAgentCurrentStatusAction: currentCall => dispatch(setAgentCurrentStatus(currentCall))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
