import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
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

import ErrorAlert from 'src/components/ErrorAlert';
import { connect } from 'react-redux';
import DealerCard from './DealerCard';
import TicketsList from './TicketsList';

import dealerAPICalls from './apiCalls';

import { setDistributorOrders } from '../../../redux/action';

const useStyles = makeStyles(theme => {
  console.log(theme);
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
    chipPrimary: {
      backgroundColor: theme.palette.success.light
    },
    rootChip: {
      color: theme.palette.common.white
    },
    chipWarning: {
      backgroundColor: theme.palette.warning.light
    },
    formControl: {
      minWidth: 350
    },
    dialogActions: {
      padding: '0 1.5rem 1rem'
    }
  };
});

const Dashboard = ({ distributorOrders, setDistributorOrdersAction }) => {
  const classes = useStyles();
  const [orderTab, setOrderTab] = useState(0);
  const [invoicesTab, setInvoicesTab] = useState(0);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [rootData, setRootData] = useState(null);

  const [expanded, setExpanded] = React.useState('panel1');

  const [showCreateIssue, setShowCreateIssue] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
        console.log(err.response, 'error');
      }
    }
    get();
  }, []);

  return !loadingDetails ? (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Box display="flex" justifyContent="space-between">
          <Box />
          <Box>
            <Tooltip title="Verified">
              <Chip
                color="primary"
                label="Aadhar"
                className={`${classes.chipPrimary} ${classes.rootChip} `}
              />
            </Tooltip>
            &nbsp;
            <Tooltip title="Not Verified">
              <Chip
                color="secondary"
                label="PAN"
                className={` ${classes.rootChip} `}
              />
            </Tooltip>
            &nbsp;
            <Tooltip title="Verification Pending">
              <Chip
                color="secondary"
                label="Cheque book"
                className={`${classes.chipWarning} ${classes.rootChip} `}
              />
            </Tooltip>
          </Box>
        </Box>
        <br />
        <Grid container spacing={3}>
          <Grid item lg={4} md={12} xs={12}>
            {rootData[0].data && rootData[1].data ? (
              <DealerCard
                dealerDetails={{
                  ...rootData[0].data[0],
                  ...rootData[1].data[0],
                  lastOrderReference: rootData[2].data
                    ? rootData[2].data[0].OrderNumber
                    : ''
                }}
                showCreateIssue={e => setShowCreateIssue(e)}
              />
            ) : (
              <ErrorAlert text="Unable to get dealer details" />
            )}
            <Box mt={2}>
              <Card>
                <TicketsList />
              </Card>
            </Box>
          </Grid>
          <Grid item lg={8} xs={12}>
            <Accordion
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Orders</Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.panelBody}>
                <Box width="100%">
                  <CustomTabs
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    tabNames={['Open Orders', 'History']}
                    setCurrent={val => setOrderTab(val)}
                  />
                  <CustomTabPanel value={orderTab} index={0}>
                    {rootData[2].data ? (
                      <BasicTable
                        columns={orderColumns}
                        records={rootData[2].data.slice(0, 5)}
                        redirectLink="/dash360/admin/orders"
                        redirectLabel="View All"
                      />
                    ) : (
                      <ErrorAlert />
                    )}
                  </CustomTabPanel>
                  <CustomTabPanel value={orderTab} index={1}>
                    Item Three
                  </CustomTabPanel>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === 'panel2'}
              onChange={handleChange('panel2')}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>Invoices</Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.panelBody}>
                <Box width="100%">
                  <CustomTabs
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    tabNames={['Invoices', 'History']}
                    setCurrent={val => setOrderTab(val)}
                  />
                  <CustomTabPanel value={orderTab} index={0}>
                    {rootData[3].data ? (
                      <BasicTable
                        columns={invoicesColumns}
                        records={rootData[3].data.slice(0, 5)}
                        redirectLink="/dash360/admin/invoices"
                        redirectLabel="View All"
                      />
                    ) : (
                      <ErrorAlert />
                    )}
                  </CustomTabPanel>
                  <CustomTabPanel value={orderTab} index={1}>
                    Item Three
                  </CustomTabPanel>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === 'panel3'}
              onChange={handleChange('panel3')}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography className={classes.heading}>Incentives</Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.panelBody}>
                <Box width="100%">
                  <CustomTabs
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    tabNames={['Incentives']}
                  />
                  <CustomTabPanel value={orderTab} index={0}>
                    <Box padding="1rem">Incentives will appear here</Box>
                  </CustomTabPanel>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === 'panel4'}
              onChange={handleChange('panel4')}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography className={classes.heading}>Profile</Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.panelBody}>
                <Box width="100%">
                  <CustomTabs
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    tabNames={['Profile']}
                  />
                  <CustomTabPanel value={orderTab} index={0}>
                    <Box padding="1rem">Profile details will appear here</Box>
                  </CustomTabPanel>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === 'panel5'}
              onChange={handleChange('panel5')}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography className={classes.heading}>E-wallet</Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.panelBody}>
                <Box width="100%">
                  <CustomTabs
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    tabNames={['Summary']}
                  />
                  <CustomTabPanel value={orderTab} index={0}>
                    <Box padding="1rem">E-wallet summary will appear here</Box>
                  </CustomTabPanel>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Grid>
          {/* <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          /> */}
        </Grid>
      </Container>
      {!!showCreateIssue && (
        <Dialog open onClose={() => setShowCreateIssue(false)}>
          <DialogTitle id="alert-dialog-title">Create a new Issue</DialogTitle>
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
              onClick={() => setShowCreateIssue(false)}
              color="primary"
              variant="contained"
            >
              Create Issue
            </Button>
            <div style={{ flex: '1 0 0' }} />
          </DialogActions>
        </Dialog>
      )}
    </Page>
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
