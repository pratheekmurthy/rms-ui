import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Chip,
  Container,
  Divider,
  Grid,
  makeStyles,
  Tooltip,
  Typography,
} from '@material-ui/core';
import Page from 'src/modules/dashboard-360/components/Page';
import CustomTabs from 'src/modules/dashboard-360/components/CustomTabs';
import CustomTabPanel from 'src/modules/dashboard-360/components/CustomTabPanel';
import { ExpandMore } from '@material-ui/icons';
import BasicTable from 'src/modules/dashboard-360/components/BasicTable';
import DealerCard from './DealerCard';
import TicketsList from './TicketsList';
import Axios from 'axios';
import { getDealerDetails, getDealerInvoiceDetails, getDealerJoiningDetails, getDealerKYCDetails, getDealerOrderDetails } from './apiCalls';
import MainLoader from 'src/components/MainLoader';

const useStyles = makeStyles((theme) => {
  console.log(theme)
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
    }
  };
});

const orderColumns = [
  {
    selector: 'OrderNumber',
    label: 'Order ID'
  },
  {
    selector: 'CreatedType',
    label: 'Created Type'
  },
  {
    selector: 'StatusKey',
    label: 'Status',
    isChip: true
  },
  {
    selector: 'CreatedOn',
    label: 'Created On'
  }
];
const invoicesColumns = [
  {
    selector: 'InvoiceNumber',
    label: 'Invoice Number'
  },
  {
    selector: 'InvoiceAmount',
    label: 'Amount',
  },
  {
    selector: 'Status',
    label: 'Status'
  },
  {
    selector: 'BillingMobile',
    label: 'Billing Mobile'
  }
];

const Dashboard = () => {
  const classes = useStyles();
  const [orderTab, setOrderTab] = useState(0);
  const [invoicesTab, setInvoicesTab] = useState(0);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [rootData, setRootData] = useState(null);

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    Axios.all([
      getDealerDetails, getDealerJoiningDetails,
      getDealerOrderDetails, getDealerInvoiceDetails, getDealerKYCDetails
    ]).then((response) => {
      console.log(response);
      setRootData(response.map((res) => res.data));
      setLoadingDetails(false);
    });
  }, []);
  console.log(rootData)

  return !loadingDetails ? (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Box display="flex" justifyContent="space-between">
          <Box />
          <Box>
            <Tooltip title="Verified">
              <Chip color="primary" label="Aadhar" className={`${classes.chipPrimary} ${classes.rootChip} `} />
            </Tooltip>
            &nbsp;
            <Tooltip title="Not Verified">
              <Chip color="secondary" label="PAN" className={` ${classes.rootChip} `} />
            </Tooltip>
            &nbsp;
            <Tooltip title="Verification Pending">
              <Chip color="secondary" label="Cheque book" className={`${classes.chipWarning} ${classes.rootChip} `}/>
            </Tooltip>
          </Box>
        </Box>
        <br />
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={12}
            xs={12}
          >
            <DealerCard dealerDetails={{ ...rootData[0].data[0], ...rootData[1].data[0], lastOrderReference: rootData[2].data[0].OrderNumber }} />
            <Box mt={2}>
              <Card>
                <TicketsList />
              </Card>
            </Box>
          </Grid>
          <Grid
            item
            lg={8}
            xs={12}
          >
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
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
                    setCurrent={(val) => setOrderTab(val)}
                  />
                  <CustomTabPanel value={orderTab} index={0}>
                    <BasicTable columns={orderColumns} records={rootData[2].data.slice(0, 5)} />
                  </CustomTabPanel>
                  <CustomTabPanel value={orderTab} index={1}>
                    Item Three
                  </CustomTabPanel>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
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
                    setCurrent={(val) => setOrderTab(val)}
                  />
                  <CustomTabPanel value={orderTab} index={0}>
                    <BasicTable columns={invoicesColumns} records={rootData[3].data.slice(0, 5)} />
                  </CustomTabPanel>
                  <CustomTabPanel value={orderTab} index={1}>
                    Item Three
                  </CustomTabPanel>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
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
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
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
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
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
    </Page>
  ) : <MainLoader />;
};

export default Dashboard;
