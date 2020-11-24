import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Page from 'src/modules/dashboard-360/components/Page';
import CustomTabs from 'src/modules/dashboard-360/components/CustomTabs';
import CustomTabPanel from 'src/modules/dashboard-360/components/CustomTabPanel';
import { ExpandMore } from '@material-ui/icons';
import BasicTable from 'src/modules/dashboard-360/components/BasicTable';
import DealerCard from './DealerCard';
import TicketsList from './TicketsList';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    },
    panelBody: {
      padding: 0
    }
  };
});

const orderColumns = [
  {
    selector: 'id',
    label: 'Order ID'
  },
  {
    selector: 'quantity',
    label: 'Quantity'
  },
  {
    selector: 'status',
    label: 'Status',
    isChip: true
  },
  {
    selector: 'pendingWith',
    label: 'Pending With'
  }
];
const invoicesColumns = [
  {
    selector: 'id',
    label: 'Invoice ID'
  },
  {
    selector: 'orderId',
    label: 'Order Id'
  },
  {
    selector: 'quantity',
    label: 'Quantity',
    isChip: true
  },
  {
    selector: 'status',
    label: 'Status'
  },
  {
    selector: 'pendingWith',
    label: 'Pending With'
  }
];

const Dashboard = () => {
  const classes = useStyles();
  const [orderTab, setOrderTab] = useState(0);
  const [invoicesTab, setInvoicesTab] = useState(0);

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
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
            <DealerCard />
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
                    <BasicTable columns={orderColumns} />
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
                    <BasicTable columns={invoicesColumns} />
                  </CustomTabPanel>
                  <CustomTabPanel value={orderTab} index={1}>
                    Item Three
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
  );
};

export default Dashboard;
