import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Modal,
  Select,
  TextField,
  Tooltip,
  Typography
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import PropTypes from 'prop-types';

import Page from 'src/components/Page';
import CustomTabs from 'src/modules/dashboard-360/components/CustomTabs';
import CustomTabPanel from 'src/modules/dashboard-360/components/CustomTabPanel';
import BasicTable from 'src/modules/dashboard-360/components/BasicTable';
import MainLoader from 'src/components/MainLoader';
import {
  invoicesColumns,
  orderColumns
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

const SOCKETENDPOINT = 'http://192.168.3.45:42002/';

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
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: theme.spacing(1, 1)
    }
  };
});

const Dashboard = ({ distributorOrders, setDistributorOrdersAction }) => {
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
  const [ticketType, setTicketType] = useState({
    ticketTypeId: '',
    ticketType: ''
  });

  const [medium, setMedium] = useState([]);
  const [media, setMedia] = useState({
    value: '',
    label: ''
  });
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ value: '', label: '' });
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

  const [loading, setLoading] = useState(true);
  const [createdTime, setCreatedTime] = useState();
  const [file, setFile] = useState('');
  const [currentCall, setCurrentCall] = useState({
    callUniqueId: localStorage.getItem('callUniqueId'),
    callType: localStorage.getItem('callType'),
    callStatus: localStorage.getItem('callStatus'),
    callDetails: localStorage.getItem('callDetails'),
    callDispositionStatus: localStorage.getItem('callDispositionStatus')
  });
  const [agent, setAgent] = useState({
    AgentId: '1234',
    AgentSipId: '9999'
  });

  function setCurrentCallDetails(
    callUniqueId,
    callType,
    callStatus,
    callDetails,
    callDispositionStatus
  ) {
    localStorage.setItem('callUniqueId', callUniqueId);
    localStorage.setItem('callType', callType);
    localStorage.setItem('callStatus', callStatus);
    localStorage.setItem('callDetails', callDetails);
    localStorage.setItem('callDispositionStatus', callDispositionStatus);
    setCurrentCall({
      callUniqueId: localStorage.getItem('callUniqueId'),
      callType: localStorage.getItem('callType'),
      callStatus: localStorage.getItem('callStatus'),
      callDetails: localStorage.getItem('callDetails'),
      callDispositionStatus: localStorage.getItem('callDispositionStatus')
    });
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    async function get() {
      try {
        const response = await Promise.allSettled(dealerAPICalls(1001));
        setRootData(
          response.map(res =>
            res.status === 'fulfilled' ? res.value.data : {}
          )
        );
        setDistributorOrdersAction(
          response[2].status === 'fulfilled'
            ? response[2].value.data.data
            : null
        );
        setLoadingDetails(false);
      } catch (err) {
        console.log(err.response);
      }
    }
    const socket = socketIOClient(SOCKETENDPOINT);
    socket.on('AstriskEvent', data => {
      if (data.Event === 'Bridge') {
        if (
          data.CallerID2 === agent.AgentSipId &&
          data.Bridgestate === 'Link'
        ) {
          setCurrentCallDetails(
            data.Uniqueid2,
            'Inbound',
            'connected',
            data,
            'NotDisposed'
          );
          get();
        }
      }

      if (data.Event === 'Hangup') {
        if (data.ConnectedLineNum === agent.AgentSipId) {
          console.log('data', data);
          setCurrentCallDetails(
            localStorage.getItem('callUniqueId'),
            localStorage.getItem('callType'),
            'disconnected',
            data,
            localStorage.getItem('callDispositionStatus')
          );
        }
      }
    });
    setRootData(
      [[], [], [], [], []].map(res =>
        res.status === 'fulfilled' ? res.value.data : {}
      )
    );
    setLoadingDetails(false);
  }, [currentCall.callDispositionStatus]);

  return !loadingDetails ? (
    <div style={{ position: 'relative' }}>
      {currentCall.callStatus === 'connected' ? (
        <div>
          <div className={classes.timerComp}>
            <TimerComp />
          </div>
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
      <CustomBreadcrumbs />
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
                </Grid>
              </Grid>
            </Grid>

            <Grid item lg={3} md={6} xs={12}>
              {rootData[0].data ? (
                <DealerCard
                  dealerDetails={{
                    ...rootData[0].data[0],
                    lastOrderReference: rootData[2].data
                      ? rootData[2].data[0].OrderNumber
                      : ''
                  }}
                />
              ) : (
                <CommonAlert text="Unable to get dealer details" />
              )}
              <Box mt={2}>
                <Card>
                  <CardHeader title="Disposition Details" />
                  <Divider />
                  <CardContent>
                    <DispositionForm />
                  </CardContent>
                </Card>
              </Box>
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
                  <CommonAlert />
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
                  <CommonAlert />
                )}
              </Card>
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
            <CreateTicket
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
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setShowCreateTicket(false)}
              color="primary"
              variant="contained"
              size="small"
              onClick={handleOpen}
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
  setDistributorOrdersAction: PropTypes.func
};

const mapStateToProps = state => {
  return {
    distributorOrders: state.distributorOrders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDistributorOrdersAction: orders => dispatch(setDistributorOrders(orders))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
