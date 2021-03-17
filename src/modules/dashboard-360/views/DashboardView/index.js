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
  Typography,
  TextField,
} from '@material-ui/core';
import {
  PUT_BREAK_AGENT,
  GET_INTERACTION_BY_DISTRIBUTOR_ID,
  GET_INTERACTION_BY_AGENT_SIP_ID,
  UPDATE_CURRENT_STATUS,
  GET_CURRENT_STATUS_BY_AGENT_SIP_ID,
  ORIGINATE_CALL_WITH_SIP_ID,
  SOCKETENDPOINT1,
  SOCKETENDPOINT5,
  // SOCKETENDPOINT2,
  SOCKETENDPOINT3,
  SOCKETENDPOINT4,
  Agent_service_url
} from 'src/modules/dashboard-360/utils/endpoints';
import AdvancedTable from '../../components/Advancedtable'
import Iframe from 'react-iframe'
import SearchIcon from '@material-ui/icons/Search';
import { ExpandMore } from '@material-ui/icons';
import FAQ from './FAQ'
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import Page from 'src/components/Page';
import CustomTabs from 'src/modules/dashboard-360/components/CustomTabs';
import CustomTabPanel from 'src/modules/dashboard-360/components/CustomTabPanel';
import BasicTable from 'src/modules/dashboard-360/components/BasicTable';
import MainLoader from 'src/components/MainLoader';
import DialogContentText from '@material-ui/core/DialogContentText';
import axios from 'axios'
import {
  invoicesColumns,
  orderColumns,
  lastFiveCallData,
  CallerInteractioncolumns
} from 'src/modules/dashboard-360/utils/columns-config';
import CommonAlert from 'src/components/CommonAlert';
import EditIcon from '@material-ui/icons/Edit';
import { connect, useSelector, useDispatch } from 'react-redux';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';
// import CreateTicket from 'src/modules/ticketing/views/create-ticket';
import CallIcon from '@material-ui/icons/Call';
import DealerCard from './DealerCard';
// import TicketsList from './TicketsList';
import dealerAPICalls from './apiCalls';
import { setDistributorOrders } from '../../redux/action';
import { setSearchDistributor, setSelecteddata } from '../../../../redux/action';
import { searchDistributor } from '../../../../redux/action';
import DispositionForm from './DispositionForm';
import socketIOClient from 'socket.io-client';
import { setAgentCurrentStatus } from 'src/redux/action';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
// import CreateCaller from '../../../agentForm/views/dashboard/Createcaller'


// const socket1 = socketIOClient(SOCKETENDPOINT1, { transports: ['websocket'] });
// const socket2 = socketIOClient(SOCKETENDPOINT2 , { transports: ['websocket'] });
// const socket3 = socketIOClient(SOCKETENDPOINT3, { transports: ['websocket'] });
// const socket4 = socketIOClient(SOCKETENDPOINT4, { transports: ['websocket'] });

const SOCKETENDPOINT2 = "http://localhost:42002"
// const socket1 = socketIOClient(SOCKETENDPOINT1, { transports: ['websocket'], 'reconnection limit': 1000, 'max reconnection attempts': 'Infinity' });
const socket2 = socketIOClient(SOCKETENDPOINT5, { transports: ['websocket'], 'reconnection limit': 1000, 'max reconnection attempts': 'Infinity' });
// const socket3 = socketIOClient(SOCKETENDPOINT3, { transports: ['websocket'], 'reconnection limit': 1000, 'max reconnection attempts': 'Infinity' });
// const socket4 = socketIOClient(SOCKETENDPOINT4, { transports: ['websocket'], 'reconnection limit': 1000, 'max reconnection attempts': 'Infinity' });





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

const Dashboard = ({
  distributorOrders,
  setDistributorOrdersAction,
  setAgentCurrentStatusAction,
  setSearchDistributor,
  searchDistributor
}) => {
  const classes = useStyles();
  const user_Details = useSelector(state => state.userData)
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [currentCall, setCurrentCall] = useState({
    callUniqueId: '',
    callType: '',
    callStatus: '',
    callDetails: '',
    callDispositionStatus: '',
    callerNumber: '',
    breakStatus: ''
  });
  const [ALF, setALF] = useState([]);
  const [distributorModal, setDistributorModal] = useState({});
  const [selectedData1, setSelectedData1] = useState({})
  const [selectedItem, setSelectedItem] = useState({
    CallerName: "",
    agentExtension: "",
    agentID: "",
    asterixUniqueID: "",
    callerapplication: "",
    callermobilenumber: "",
    category: "",
    comments: "",
    contactedNumber: "",
    created: "",
    createdAt: "",
    issuetype: "",
    seccategory: "",
    secsubcategory: "",
    subcategory: "",
    type: "",
    updatedAt: "",
    _id: "",
  })
  const [user, setUserDetails] = useState({
    userType: 'Agent'
  });
  const [agent, setAgent] = useState({
    AgentId: '1234',
    AgentType: localStorage.getItem('AgentType'),
    AgentSipId: localStorage.getItem('AgentSIPID')
  });

  const dispatch = useDispatch()

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const handleClose = () => {
    setOpen(false);
  };


  function makeCall() {
    setOpen(false);
    console.log(selectedData1, "selected data")
    var Number = selectedData1.callerNumber
    // console.log('make call', Number)
    Number = Number.substr(Number.length - 10);
    console.log(Number)
    if (Number.length === 10) {
      var axios = require('axios');

      var config = {
        method: 'get',
        url: `${SOCKETENDPOINT5}/ami/actions/orginatecall?sipAgentID=Local%2F5${localStorage.getItem('AgentSIPID')}%40from-internal&NumbertobeCalled=5${Number}`,
        headers: {}
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log('Invalid number');
      console.log('make call errororrrr')
    }
  }

  // function getDLF() {
  //   const axios = require('axios');
  //   let data = '';
  //   let config = {
  //     method: 'get',
  //     url:
  //       GET_INTERACTION_BY_DISTRIBUTOR_ID +
  //       localStorage.getItem('callerNumber') +
  //       '',
  //     headers: {},
  //     data: data
  //   };

  //   axios(config)
  //     .then(async response => {
  //       var DLFDATA = response.data;
  //       DLFDATA = DLFDATA.reverse();
  //       console.log("DLF", DLFDATA)
  //       setDLF(DLFDATA);
  //     })

  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  // function getALF() {
  //   console.log("i am in get alf")
  //   const axios = require('axios');
  //   let data = '';
  //   let config = {
  //     method: 'get',
  //     url: GET_INTERACTION_BY_AGENT_SIP_ID + agent.AgentSipId + '',
  //     headers: {},
  //     data: data
  //   };

  //   axios(config)
  //     .then(async response => {
  //       var ALFDATA = response.data;
  //       console.log(ALFDATA)
  //       // ALFDATA = ALFDATA.reverse();
  //       setALF(ALFDATA);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  function getOpenTickets(agentType, status) {

    var axios = require('axios');

    var config = {
      method: 'get',
      url: `${Agent_service_url}/crm/interactions/getByAgentStatus?type=` + agentType + '&status=' + status + '',
      headers: {}
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        var ALFDATA = response.data;
        console.log('calling the open tickets', ALFDATA)
        // ALFDATA = ALFDATA.reverse();
        setALF(ALFDATA);
      })
      .catch(function (error) {
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
    callerNumber,
    breakStatus
  ) {
    setCurrentCall({
      callStatusId: callStatusId,
      callUniqueId: callUniqueId,
      callType: callType,
      callStatus: callStatus,
      callEvent: callEvent,
      callDispositionStatus: callDispositionStatus,
      callerNumber: callerNumber,
      breakStatus: breakStatus
    });
    localStorage.setItem('callStatusId', callStatusId);
    localStorage.setItem('callUniqueId', callUniqueId);
    localStorage.setItem('callType', callType);
    localStorage.setItem('callStatus', callStatus);
    localStorage.setItem('callEvent', callEvent);
    localStorage.setItem('callDispositionStatus', callDispositionStatus);
    localStorage.setItem('callerNumber', callerNumber);
    localStorage.setItem('breakStatus', breakStatus);
  }

  var APIENDPOINT = SOCKETENDPOINT2;
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// addToQueue start //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // function addToQueue(agentId, queue, user_Details) {
  //   var axios = require('axios');

  //   var APIENDPOINT = '';
  //   console.log('userDetails sdsdfgsdfgsdf', user_Details)
  //   if (user_Details.Server === 'server1') {
  //     APIENDPOINT = SOCKETENDPOINT1
  //   }
  //   if (user_Details.Server === 'server2') {
  //     APIENDPOINT = SOCKETENDPOINT2
  //   }
  //   if (user_Details.Server === 'server3') {
  //     APIENDPOINT = SOCKETENDPOINT3
  //   }
  //   if (user_Details.Server === 'server4') {
  //     APIENDPOINT = SOCKETENDPOINT4
  //   }


  //   const config = {
  //     method: 'get',
  //     url:
  //       `${APIENDPOINT
  //       }/ami/actions/addq?Interface=${agentId}&Queue=${queue
  //       }`,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   };

  //   axios(config)
  //     .then((response) => { })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  // }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// addToQueue end //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// removeFromQueue start //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // function removeFromQueue(agentId, queue, user_Details) {
  //   const axios = require('axios');
  //   var APIENDPOINT = '';
  //   console.log('userDetails sdsdfgsdfgsdf', user_Details)
  //   if (user_Details.Server === 'server1') {
  //     APIENDPOINT = SOCKETENDPOINT1
  //   }
  //   if (user_Details.Server === 'server2') {
  //     APIENDPOINT = SOCKETENDPOINT2
  //   }
  //   if (user_Details.Server === 'server3') {
  //     APIENDPOINT = SOCKETENDPOINT3
  //   }
  //   if (user_Details.Server === 'server4') {
  //     APIENDPOINT = SOCKETENDPOINT4
  //   }
  //   console.log('remove', agentId);
  //   const config = {
  //     method: 'get',
  //     url:
  //       `${APIENDPOINT
  //       }/ami/actions/rmq?Queue=${queue
  //       }&Interface=${agentId}`,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   };

  //   axios(config)
  //     .then((response) => {

  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// removeFromQueue end //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // function updateAgentCallStatus(updateData) {
  //   console.log("updateData", updateData)
  //   var axios = require('axios');
  //   var data = {
  //     agentCallStatus: updateData.callStatus,
  //     agentCallEvent: updateData.callEvent,
  //     agentCallUniqueId: updateData.callUniqueId,
  //     agentCallType: updateData.callType,
  //     agentCallDispositionStatus: updateData.callDispositionStatus,
  //     callerNumber: updateData.callerNumber,
  //     breakStatus: updateData.breakStatus
  //   };
  //   var config = {
  //     method: 'put',
  //     url: UPDATE_CURRENT_STATUS + updateData.callStatusId,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     data: data
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       console.log('update', JSON.stringify(response.data));
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }


  function updateAgentCallStatusV2(callStatusId, data) {
    // console.log("updateData", updateData)
    var axios = require('axios');
    var config = {
      method: 'put',
      url: UPDATE_CURRENT_STATUS + callStatusId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        // console.log('update', JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getAgentCallStatus(agentSipID) {
    console.log('calling the', agentSipID)
    var axios = require('axios');
    var config = {
      method: 'get',
      url: GET_CURRENT_STATUS_BY_AGENT_SIP_ID + agentSipID,
      headers: {}
    };

    axios(config)
      .then(function (response) {

        if (response.data) {
          console.log('getAgentCallStatus....................', response.data);
          updateAgentCallStatusV2(response.data[0]._id, { loginStatus: 'true' })
          setCurrentCallDetails(
            response.data[0]._id,
            response.data[0].agentCallUniqueId,
            response.data[0].agentCallType,
            response.data[0].agentCallStatus,
            response.data[0].agentCallEvent,
            response.data[0].agentCallDispositionStatus,
            response.data[0].contactNumber,
            response.data[0].breakStatus
          );
          setAgentCurrentStatusAction({
            AgentType: agent.AgentType,
            role: user.userType,
            callUniqueId: response.data[0].agentCallUniqueId,
            distributer_id: '',
            callStatusId: response.data[0]._id,
            callDispositionStatus: response.data[0].agentCallDispositionStatus,
            callType: response.data[0].agentCallType,
            callEvent: response.data[0].agentCallEvent,
            callerNumber: response.data[0].contactNumber,
            callStatus: response.data[0].agentCallStatus,
            AgentSIPID: agent.AgentSipId,
            breakStatus: response.data[0].breakStatus
          });
          if (response.data[0].channel !== null || response.data[0].channel !== undefined) {
            // localStorage.setItem('channel', response.data[0].channel);
          }

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // const onClick = event => {
  //   console.log('mobile', mobile);
  //   if (mobile.length === 10) {
  //     console.log(
  //       'valid number',
  //       ORIGINATE_CALL_WITH_SIP_ID +
  //       'sipAgentID=SIP%2F' +
  //       agent.AgentSipId +
  //       '&NumbertobeCalled=5' +
  //       mobile
  //     );

  //     const axios = require('axios');

  //     let config = {
  //       method: 'get',
  //       url:
  //         ORIGINATE_CALL_WITH_SIP_ID +
  //         'sipAgentID=SIP%2F' +
  //         agent.AgentSipId +
  //         '&NumbertobeCalled=5' +
  //         mobile,
  //       headers: {}
  //     };

  //     axios(config)
  //       .then(response => {
  //         console.log(JSON.stringify(response.data));
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   } else {
  //     console.log('Invalide number');
  //   }
  //   // alert('clicked', mobile);
  // };

  // const onChange = event => {
  //   setmobile(event.target.value);
  // };



  // async function disProfileByNum(mobile) {

  //   // const axios = require('axios');

  //   // let config = {
  //   //   method: 'get',
  //   //   url: '/bo/boapi/profile?mobilenumber=' + mobile,
  //   //   headers: {}
  //   // };


  //   // const response = await axios.get(config.url);
  //   // if (response.data.status === '1') {
  //   //   var data1 = response.data.data;
  //   //   if (data1.length) {
  //   //     if (data1.length > 1) {
  //   //       multipleDistributorDetails(data1, true);
  //   //       setShowDistributorDetailsModal(true);
  //   //     } else {
  //   //       get(data1[0].distributor_id);
  //   //     }
  //   //     localStorage.setItem('distributer_id', data1[0].distributor_id);
  //   //   }
  //   // }

  // }
  // function multipleDistributorDetails(distData, popUp) {
  //   setDistributorModal({ distrtbutorDetails: distData, modalValue: popUp });
  // }
  // async function get(distributor_id) {
  //   try {
  //     const response = await Promise.allSettled(dealerAPICalls(distributor_id));
  //     setRootData(
  //       response.map(res => (res.status === 'fulfilled' ? res.value.data : {}))
  //     );
  //     setDistributorOrdersAction(
  //       response[2].status === 'fulfilled' ? response[2].value.data.data : null
  //     );
  //     setLoadingDetails(false);
  //   } catch (err) {
  //     console.log(err.response);
  //   }
  // }

  // function selectedDataForInbound(data) {
  //   console.log(data)
  //   // console.log(localStorage.getItem('AgentType'))
  //   // if(localStorage.getItem('AgentType') === 'Outbound'){
  //   //   console.log('selected')
  //   // }else{
  //   //   console.log('You can not make a call')
  //   // }

  // }

  ///socket1 start
  // if (user.userType === 'Agent') {
  //   socket1.on('AstriskEvent', data => {


  //     if (data.Event === 'Bridge') {

  //     }

  //     if (data.Event === 'Hangup') {

  //     }
  //     var Channel1 = data.Channel1;
  //     var unlinkcounter = 0;
  //     if (
  //       data.Bridgestate === 'Unlink' &&
  //       Channel1.includes('SIP/' + agent.AgentSipId + '')
  //     ) {
  //       unlinkcounter++;
  //       if (
  //         localStorage.getItem('callEvent') === 'Bridge' &&
  //         unlinkcounter === 1
  //       ) {

  //       }
  //     }
  //   });
  // }

  // function breakService(e) {
  //   console.log('Break', localStorage.getItem('breakStatus'));
  //   var BreakStatus = localStorage.getItem('breakStatus');
  //   if (BreakStatus === 'NA') {
  //     console.log('Inside the NA');
  //     addToQueue('Local/5' + localStorage.getItem('AgentSIPID') + '@from-queue\n', 7001, user_Details)
  //     localStorage.setItem('breakStatus', 'IN');
  //   }
  //   if (BreakStatus === 'IN') {
  //     console.log('Inside the IN');
  //     addToQueue('Local/5' + localStorage.getItem('AgentSIPID') + '@from-queue\n', 7001, user_Details)
  //     localStorage.setItem('breakStatus', 'OUT');
  //   }
  //   if (BreakStatus === 'OUT') {
  //     console.log('Inside the OUT');
  //     localStorage.setItem('breakStatus', 'IN');
  //     removeFromQueue(`Local/5${localStorage.getItem('AgentSIPID')}@from-queue`, 7001, user_Details);
  //   }

  //   updateAgentCallStatus({
  //     callStatusId: localStorage.getItem('callStatusId'),
  //     callUniqueId: localStorage.getItem('callUniqueId'),
  //     callType: localStorage.getItem('callType'),
  //     callStatus: localStorage.getItem('callStatus'),
  //     callEvent: localStorage.getItem('callEvent'),
  //     callDispositionStatus: localStorage.getItem('callDispositionStatus'),
  //     callerNumber: localStorage.getItem('callerNumber'),
  //     breakStatus: localStorage.getItem('breakStatus')
  //   });

  //   setCurrentCallDetails(
  //     localStorage.getItem('callStatusId'),
  //     localStorage.getItem('callUniqueId'),
  //     localStorage.getItem('callType'),
  //     localStorage.getItem('callStatus'),
  //     localStorage.getItem('callEvent'),
  //     localStorage.getItem('callDispositionStatus'),
  //     localStorage.getItem('callerNumber'),
  //     localStorage.getItem('breakStatus')
  //   );

  //   var axios = require('axios');
  //   var data = JSON.stringify({
  //     agentID: agent.AgentId,
  //     agentSIPID: agent.AgentSipId,
  //     breakStatus: localStorage.getItem('breakStatus')
  //   });

  //   var config = {
  //     method: 'post',
  //     url: PUT_BREAK_AGENT,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     data: data
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  ///socket1 ends
  useEffect(() => {
    getOpenTickets('L1', 'open')
    async function getInitialData() {
      try {
        const response = await getAgentCallStatus(agent.AgentSipId);
      } catch (err) {
        console.log('err', err);
      }
    }
    getInitialData();
    // setRootData(
    //   [[], [], [], [], []].map(res =>
    //     res.status === 'fulfilled' ? res.value.data : {}
    //   )
    // );
    setLoadingDetails(false);
    ///socket1 1///////////////////////////////
    // socket1.on('AstriskEvent', data => {
    //   if (data.Event === 'Hangup') {
    //     // console.log('AstriskEvent', data)
    //   }
    //   if (data.Event === 'Bridge') {
    //     // console.log('AstriskEvent', data)
    //   }

    // })
    // socket1.on('ringing1', data => {
    //   console.log('ringing1', data);
    //   // var Channel1 = data.Channel1;
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {

    //     localStorage.setItem('channel', data.event.Channel)
    //     //   console.log('AstriskEventBridgeOutbound', data);

    //     // setCurrentCallDetails(
    //     //   localStorage.getItem('callStatusId'),
    //     //   data.Uniqueid,
    //     //   agent.AgentType,
    //     //   'connected',
    //     //   'Bridge',
    //     //   'NotDisposed',
    //     //   '',
    //     //   localStorage.getItem('breakStatus')
    //     // );
    //   }
    // });

    // socket1.on('ringing2', data => {
    //   console.log('ringing2', data)
    //   // var Channel1 = data.Channel1;
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {

    //     localStorage.setItem('callUniqueId', data.event.Uniqueid)
    //     localStorage.setItem('callerNumber', data.event.ConnectedLineNum)
    //     // //   console.log('AstriskEventBridgeOutbound', data);

    //     //   setCurrentCallDetails(
    //     //     localStorage.getItem('callStatusId'),
    //     //     localStorage.getItem('callUniqueId'),
    //     //     agent.AgentType,
    //     //     'connected',
    //     //     'Bridge',
    //     //     'NotDisposed',
    //     //     data.contactNumber,
    //     //     localStorage.getItem('breakStatus')
    //     //   );
    //   }
    // });
    // socket1.on('transfercallnumber', data => {
    //   if (localStorage.getItem('Agenttype') === 'L2') {
    //     localStorage.setItem('callerNumber', data.contactnumber)
    //   }

    // })
    // socket1.on('connected', data => {
    //   console.log('connected', data);
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {
    //     // getInitialData();
    //     // console.log('AstriskEventBridgeInbound', data);
    //     localStorage.setItem('distributer_id', agent.AgentSipId);
    //     setCurrentCallDetails(
    //       localStorage.getItem('callStatusId'),
    //       localStorage.getItem('callUniqueId'),
    //       agent.AgentType,
    //       'connected',
    //       'Bridge',
    //       'NotDisposed',
    //       localStorage.getItem('callerNumber'),
    //       localStorage.getItem('breakStatus')
    //     );
    //     // removeFromQueue(agent.AgentSipId, '7001');
    //   }
    // });
    // socket1.on('hangup', data => {
    //   console.log('hangup', data);
    //   // var str = data.Channel;
    //   // var agentsipid = str.substring(4, 8);
    //   // console.log('agentsipid', agentsipid);
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {
    //     // console.log('AstriskEventHangup', data);
    //     setCurrentCallDetails(
    //       localStorage.getItem('callStatusId'),
    //       localStorage.getItem('callUniqueId'),
    //       localStorage.getItem('callType'),
    //       'disconnected',
    //       'Hangup',
    //       localStorage.getItem('callDispositionStatus'),
    //       localStorage.getItem('callerNumber'),
    //       localStorage.getItem('breakStatus')
    //     );
    //   }
    // });
    /////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////////////////
    //1//////////////////////////////////////////////////////////////////////////////////
    socket2.on('AstriskEvent', data => {
      if (data.Event === 'Hangup') {
        // console.log('AstriskEvent', data)
      }
      if (data.Event === 'Bridge') {
        // console.log('AstriskEvent', data)
      }

    })
    socket2.on('ringing1', data => {
      console.log('ringing1', data);
      // var Channel1 = data.Channel1;
      var agentExtension = data.agentNumber;
      if (agentExtension === agent.AgentSipId) {

        localStorage.setItem('channel', data.event.Channel)
        //   console.log('AstriskEventBridgeOutbound', data);

        // setCurrentCallDetails(
        //   localStorage.getItem('callStatusId'),
        //   data.Uniqueid,
        //   agent.AgentType,
        //   'connected',
        //   'Bridge',
        //   'NotDisposed',
        //   '',
        //   localStorage.getItem('breakStatus')
        // );
      }
    });

    socket2.on('ringing2', data => {
      console.log('ringing2', data)
      // var Channel1 = data.Channel1;
      var agentExtension = data.agentNumber;
      if (agentExtension === agent.AgentSipId) {

        localStorage.setItem('callUniqueId', data.event.Uniqueid)
        localStorage.setItem('callerNumber', data.event.ConnectedLineNum)
        // //   console.log('AstriskEventBridgeOutbound', data);

        //   setCurrentCallDetails(
        //     localStorage.getItem('callStatusId'),
        //     localStorage.getItem('callUniqueId'),
        //     agent.AgentType,
        //     'connected',
        //     'Bridge',
        //     'NotDisposed',
        //     data.contactNumber,
        //     localStorage.getItem('breakStatus')
        //   );
      }
    });
    socket2.on('transfercallnumber', data => {
      if (localStorage.getItem('Agenttype') === 'L2') {
        localStorage.setItem('callerNumber', data.contactnumber)
      }

    })
    socket2.on('connected', data => {
      console.log('connected', data);
      var agentExtension = data.agentNumber;
      if (agentExtension === agent.AgentSipId) {
        // getInitialData();
        // console.log('AstriskEventBridgeInbound', data);
        localStorage.setItem('distributer_id', agent.AgentSipId);
        setCurrentCallDetails(
          localStorage.getItem('callStatusId'),
          localStorage.getItem('callUniqueId'),
          agent.AgentType,
          'connected',
          'Bridge',
          'NotDisposed',
          localStorage.getItem('callerNumber'),
          localStorage.getItem('breakStatus')
        );
        // removeFromQueue(agent.AgentSipId, '7001');
      }
    });
    socket2.on('hangup', data => {
      console.log('hangup', data);
      // var str = data.Channel;
      // var agentsipid = str.substring(4, 8);
      // console.log('agentsipid', agentsipid);
      var agentExtension = data.agentNumber;
      if (agentExtension === agent.AgentSipId) {
        // console.log('AstriskEventHangup', data);
        setCurrentCallDetails(
          localStorage.getItem('callStatusId'),
          localStorage.getItem('callUniqueId'),
          localStorage.getItem('callType'),
          'disconnected',
          'Hangup',
          localStorage.getItem('callDispositionStatus'),
          localStorage.getItem('callerNumber'),
          localStorage.getItem('breakStatus')
        );
      }
    });


    /////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////////////////
    //socket3//////////////////////////////////////////////////////////////////////////////////
    // socket3.on('AstriskEvent', data => {
    //   if (data.Event === 'Hangup') {
    //     // console.log('AstriskEvent', data)
    //   }
    //   if (data.Event === 'Bridge') {
    //     // console.log('AstriskEvent', data)
    //   }

    // })
    // socket3.on('ringing1', data => {
    //   console.log('ringing1', data);
    //   // var Channel1 = data.Channel1;
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {

    //     localStorage.setItem('channel', data.event.Channel)
    //     //   console.log('AstriskEventBridgeOutbound', data);

    //     // setCurrentCallDetails(
    //     //   localStorage.getItem('callStatusId'),
    //     //   data.Uniqueid,
    //     //   agent.AgentType,
    //     //   'connected',
    //     //   'Bridge',
    //     //   'NotDisposed',
    //     //   '',
    //     //   localStorage.getItem('breakStatus')
    //     // );
    //   }
    // });

    // socket3.on('ringing2', data => {
    //   console.log('ringing2', data)
    //   // var Channel1 = data.Channel1;
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {

    //     localStorage.setItem('callUniqueId', data.event.Uniqueid)
    //     localStorage.setItem('callerNumber', data.event.ConnectedLineNum)
    //     // //   console.log('AstriskEventBridgeOutbound', data);

    //     //   setCurrentCallDetails(
    //     //     localStorage.getItem('callStatusId'),
    //     //     localStorage.getItem('callUniqueId'),
    //     //     agent.AgentType,
    //     //     'connected',
    //     //     'Bridge',
    //     //     'NotDisposed',
    //     //     data.contactNumber,
    //     //     localStorage.getItem('breakStatus')
    //     //   );
    //   }
    // });
    // socket3.on('transfercallnumber', data => {
    //   if (localStorage.getItem('Agenttype') === 'L2') {
    //     localStorage.setItem('callerNumber', data.contactnumber)
    //   }

    // })
    // socket3.on('connected', data => {
    //   console.log('connected', data);
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {
    //     // getInitialData();
    //     // console.log('AstriskEventBridgeInbound', data);
    //     localStorage.setItem('distributer_id', agent.AgentSipId);
    //     setCurrentCallDetails(
    //       localStorage.getItem('callStatusId'),
    //       localStorage.getItem('callUniqueId'),
    //       agent.AgentType,
    //       'connected',
    //       'Bridge',
    //       'NotDisposed',
    //       localStorage.getItem('callerNumber'),
    //       localStorage.getItem('breakStatus')
    //     );
    //     // removeFromQueue(agent.AgentSipId, '7001');
    //   }
    // });
    // socket3.on('hangup', data => {
    //   console.log('hangup', data);
    //   // var str = data.Channel;
    //   // var agentsipid = str.substring(4, 8);
    //   // console.log('agentsipid', agentsipid);
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {
    //     // console.log('AstriskEventHangup', data);
    //     setCurrentCallDetails(
    //       localStorage.getItem('callStatusId'),
    //       localStorage.getItem('callUniqueId'),
    //       localStorage.getItem('callType'),
    //       'disconnected',
    //       'Hangup',
    //       localStorage.getItem('callDispositionStatus'),
    //       localStorage.getItem('callerNumber'),
    //       localStorage.getItem('breakStatus')
    //     );
    //   }
    // });


    // /////////////////////////////////////////////////////////////////////////////////////////

    // ////////////////////////////////////////////////////////////////////////////////////////////
    // //socket4//////////////////////////////////////////////////////////////////////////////////
    // socket4.on('AstriskEvent', data => {
    //   if (data.Event === 'Hangup') {
    //     // console.log('AstriskEvent', data)
    //   }
    //   if (data.Event === 'Bridge') {
    //     // console.log('AstriskEvent', data)
    //   }

    // })
    // socket4.on('ringing1', data => {
    //   console.log('ringing1', data);
    //   // var Channel1 = data.Channel1;
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {

    //     localStorage.setItem('channel', data.event.Channel)
    //     //   console.log('AstriskEventBridgeOutbound', data);

    //     // setCurrentCallDetails(
    //     //   localStorage.getItem('callStatusId'),
    //     //   data.Uniqueid,
    //     //   agent.AgentType,
    //     //   'connected',
    //     //   'Bridge',
    //     //   'NotDisposed',
    //     //   '',
    //     //   localStorage.getItem('breakStatus')
    //     // );
    //   }
    // });

    // socket4.on('ringing2', data => {
    //   console.log('ringing2', data)
    //   // var Channel1 = data.Channel1;
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {

    //     localStorage.setItem('callUniqueId', data.event.Uniqueid)
    //     localStorage.setItem('callerNumber', data.event.ConnectedLineNum)
    //     // //   console.log('AstriskEventBridgeOutbound', data);

    //     //   setCurrentCallDetails(
    //     //     localStorage.getItem('callStatusId'),
    //     //     localStorage.getItem('callUniqueId'),
    //     //     agent.AgentType,
    //     //     'connected',
    //     //     'Bridge',
    //     //     'NotDisposed',
    //     //     data.contactNumber,
    //     //     localStorage.getItem('breakStatus')
    //     //   );
    //   }
    // });
    // socket4.on('transfercallnumber', data => {
    //   if (localStorage.getItem('Agenttype') === 'L2') {
    //     localStorage.setItem('callerNumber', data.contactnumber)
    //   }

    // })
    // socket4.on('connected', data => {
    //   console.log('connected', data);
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {
    //     // getInitialData();
    //     // console.log('AstriskEventBridgeInbound', data);
    //     localStorage.setItem('distributer_id', agent.AgentSipId);
    //     setCurrentCallDetails(
    //       localStorage.getItem('callStatusId'),
    //       localStorage.getItem('callUniqueId'),
    //       agent.AgentType,
    //       'connected',
    //       'Bridge',
    //       'NotDisposed',
    //       localStorage.getItem('callerNumber'),
    //       localStorage.getItem('breakStatus')
    //     );
    //     // removeFromQueue(agent.AgentSipId, '7001');
    //   }
    // });
    // socket4.on('hangup', data => {
    //   console.log('hangup', data);
    //   // var str = data.Channel;
    //   // var agentsipid = str.substring(4, 8);
    //   // console.log('agentsipid', agentsipid);
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {
    //     // console.log('AstriskEventHangup', data);
    //     setCurrentCallDetails(
    //       localStorage.getItem('callStatusId'),
    //       localStorage.getItem('callUniqueId'),
    //       localStorage.getItem('callType'),
    //       'disconnected',
    //       'Hangup',
    //       localStorage.getItem('callDispositionStatus'),
    //       localStorage.getItem('callerNumber'),
    //       localStorage.getItem('breakStatus')
    //     );
    //   }
    // });



    /////////////////////////////////////////////////////////////////////////////////////////


    return () => {
      // socket1.off('ringing');
      // socket1.off('connected');
      // socket1.off('hangup');
      // socket1.off('transfercallnumber');

      socket2.off('ringing');
      socket2.off('connected');
      socket2.off('hangup');
      socket2.off('transfercallnumber');

      // socket3.off('ringing');
      // socket3.off('connected');
      // socket3.off('hangup');
      // socket3.off('transfercallnumber');

      // socket4.off('ringing');
      // socket4.off('connected');
      // socket4.off('hangup');
      // socket4.off('transfercallnumber');

    };
  }, []);

  useEffect(() => {
    // console.log('data second useEffect', currentCall);
    // console.log('currentCall.callerNumber', currentCall.callerNumber);
    // getALF();

    // if (
    //   currentCall.callerNumber !== '' &&
    //   currentCall.callDispositionStatus === 'NotDisposed'
    // ) {
    //   disProfileByNum(currentCall.callerNumber);
    //   // getDLF();

    // }
    // getALF();
    // if (localStorage.getItem('Agenttype') === 'L1') {
    //   // getOpenTickets(localStorage.getItem('Agenttype'), 'open');
    // }
    // if (localStorage.getItem('Agenttype') === 'L2') {
    //   getOpenTickets('L1', 'open');
    // }
    // if (localStorage.getItem('Agenttype') === 'L3') {
    //   getOpenTickets('L2', 'open');
    // }

  }, [
    currentCall.callDispositionStatus,
    currentCall.callStatus,
    currentCall.breakStatus
  ]);

  // useEffect(() => {
  //   console.log("currentCall", currentCall)
  //   if (reduxState.searchDistributor.length >= 4) {
  //     get(reduxState.searchDistributor);
  //   } else {
  //     get();
  //   }
  // }, [reduxState.searchDistributor]);

  function selectedDataForObutbound(data) {
    console.log(data, "dispatch one")
    dispatch(setSelecteddata(data))
    localStorage.setItem('L1ID', data.asterixUniqueID)

    // console.log(localStorage.getItem('AgentType'))
    if (localStorage.getItem('AgentType') === 'Outbound' && localStorage.getItem('callDispositionStatus') === 'Disposed') {
      // console.log('selected', data)
      localStorage.setItem('L1ID', data.asterixUniqueID)
      setSelectedItem(data)

      setOpen(true);
    } else {
      console.log('You cannot make a call')
    }
  }

  // const handleSearch = (e) => {
  //   setSearchItem(e.target.value)
  // }

  // const searchaction = (e) => {
  //   let config = {
  //     method: 'get',

  //     url: `http://106.51.86.75:52004/crm/callermobilenumber?callermobilenumber=${searchItem}`,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },

  //   };
  //   axios(config)
  //     .then(response => {
  //       console.log('Response data', JSON.stringify(response.data));
  //       setCustomertable(response.data)
  //       // props.getALF();
  //     })
  //     .catch(error => {
  //       console.log('dispostionFrom', error);
  //     });
  // }


  return !loadingDetails ? (
    <div style={{ position: 'relative' }}>
      {currentCall.callStatus === 'connected' && currentCall.callDispositionStatus != 'Disposed' ? (
        <div>

          <Box
            alignItems="center"
            display="flex"
            className={`${classes.timerComp} ${classes.callWrapper} ${classes.callInbound}`}
          >
            <CallIcon />
          &nbsp;
          <Typography display="inline">
              Inbound Call In Progress
          </Typography>
          </Box>{' '}
        </div>
      ) : null}
      {currentCall.callDispositionStatus === 'NotDisposed' &&
        currentCall.callStatus === 'disconnected' ? (
        <div>

          <Box
            alignItems="center"
            display="flex"
            className={`${classes.timerComp} ${classes.callWrapper} ${classes.callOutbound}`}
          >
            <CallIcon />
          &nbsp;
          <Typography display="inline">
              Inbound Call Is Disconnected
          </Typography>
          </Box>{' '}
        </div>
      ) : null}
      <CustomBreadcrumbs /><br />
      <Page className={classes.root} title="Dashboard">
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>

              <Card>
                <CardHeader title="Disposition Details" />
                <CardContent>
                  <DispositionForm
                    setCurrentCallDetails={setCurrentCallDetails}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item lg={12} md={12} xs={12}>
              <Card>
                <CardHeader title={'Agent Open Ticket'} />
                <CardContent>
                  <AdvancedTable
                    records={ALF.filter((e) => e.type === 'open')}
                    selectedData={selectedDataForObutbound}
                  />
                </CardContent>
              </Card>
            </Grid>

          </Grid>

        </Container>
      </Page>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Outbound Call"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are You sure, You Want to make a Outbound Call ?
      </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
      </Button>
          <Button onClick={makeCall} color="primary" autoFocus>
            Make A Call
      </Button>
        </DialogActions>
      </Dialog>

    </div >
  ) : (
    <MainLoader />
  );
};
Dashboard.propTypes = {
  distributorOrders: PropTypes.arrayOf(PropTypes.object),
  agentCurrentStatus: PropTypes.arrayOf(PropTypes.object),
  setDistributorOrdersAction: PropTypes.func,
  setAgentCurrentStatusAction: PropTypes.func,
  searchDistributor: PropTypes.string
};

const mapStateToProps = state => {
  return {
    distributorOrders: state.distributorOrders,
    agentCurrentStatus: state.currentCall,
    searchDistributor: state.searchDistributor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDistributorOrdersAction: orders =>
      dispatch(setDistributorOrders(orders)),
    setAgentCurrentStatusAction: currentCall =>
      dispatch(setAgentCurrentStatus(currentCall)),
    setSearchDistributor: dist => dispatch(setSearchDistributor(dist))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
