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
import { connect } from 'react-redux';
import SearchBar from 'material-ui-search-bar';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';
import CreateTicket from 'src/modules/ticketing/views/create-ticket';
import CallIcon from '@material-ui/icons/Call';
import DealerCard from './DealerCard';
import TicketsList from './TicketsList';

import dealerAPICalls from './apiCalls';

import { setDistributorOrders } from '../../redux/action';
import DispositionForm from './DispositionForm';
import TimerComp from './TimerComp';

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
    // formControl: {
    //   minWidth: 350
    // },
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
      // paddingBottom: 20,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8
    },
    callWrapper: {
      left: 'calc(55% + 90px)'
    },
    callInbound: {
      backgroundColor: theme.palette.success.light
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

  // const handleChange = panel => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };

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
    get();
  }, []);

  return !loadingDetails ? (
    <div style={{ position: 'relative' }}>
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
        <Typography display="inline">Inbound Call In Progress</Typography>
      </Box>
      <CustomBreadcrumbs />
      <Page className={classes.root} title="Dashboard">
        <Container maxWidth={false}>
          {/* <Box display="flex" justifyContent="space-between">
          <Box />

          </Box>
        </Box> */}
          {/* <br /> */}
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
                  {/* <SearchBar style={{ marginTop: '1rem' }} /> */}
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
                      {/* <Box padding="1rem"> */}
                      <TicketsList />
                      {/* </Box> */}
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
                    // ...rootData[1].data[0],
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
        {/* {!!showCreateTicket && (
      <Dialog open onClose={() => setShowCreateTicket(false)}>
           <DialogTitle id="alert-dialog-title">Create a new Ticket</DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Select Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value=""
                  onChange={handleChange}
                  label="Select Category"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>First</MenuItem>
                  <MenuItem value={20}>Second</MenuItem>
                  <MenuItem value={30}>Third</MenuItem>
                </Select>
              </FormControl>
              <br />
              <br />
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Select Sub Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value=""
                  onChange={handleChange}
                  label="Select Sub Category"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>First</MenuItem>
                  <MenuItem value={20}>Second</MenuItem>
                  <MenuItem value={30}>Third</MenuItem>
                </Select>
              </FormControl>
              <br />
              <br />
              <TextField
                className={classes.formControl}
                id="outlined-multiline-static"
                label="Additional Comments"
                multiline
                rows={4}
                variant="outlined"
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button
              onClick={() => setShowCreateTicket(true)}
              color="primary"
              variant="contained"
            >
              Create Ticket
            </Button>
            <div style={{ flex: '1 0 0' }} />
          </DialogActions>
        </Dialog> */}
      </Page>
      {showCreateTicket ? (
        <Dialog
          open
          fullWidth
          maxWidth="md"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Create Ticket'}</DialogTitle>
          <DialogContent dividers>
            <CreateTicket />
          </DialogContent>
          <DialogActions>
            <Button
              onClose={() => setShowCreateTicket(false)}
              color="primary"
              variant="contained"
              size="small"
            >
              Create
            </Button>
            <Button
              onClose={() => setShowCreateTicket(false)}
              color="primary"
              size="small"
              variant="outlined"
              autoFocus
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        //   <Modal
        //     open
        //     onClose={() => setShowCreateTicket(false)}
        //     className={classes.modal}
        //     style={{ overflow: 'auto' }}
        //     aria-labelledby="simple-modal-title"
        //     aria-describedby="simple-modal-description"
        //   >
        //     <CreateTicket />
        //   </Modal>
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
