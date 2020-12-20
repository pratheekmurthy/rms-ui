import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Grid } from '@material-ui/core';
import Page from 'src/components/Page';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

function createData(
  Id,
  Channel,
  CampaignDiscription,
  TotalTargets,
  DateAndTime,
  Remarks
) {
  return {
    Id,
    Channel,
    CampaignDiscription,
    TotalTargets,
    DateAndTime,
    Remarks
  };
}

const rows = [
  createData(
    'IV 25013',
    'SMS',
    'Product Promotion',
    1000,
    '19 Aug 2020; 20:00Hrs',
    'for Select Ruby group'
  ),
  createData(
    'IV 25014',
    'email',
    'New Product Launch',
    20000,
    '29 Aug 2020; 20:00Hrs',
    'for Kerala Region'
  ),
  createData('', '', '', '', '', ''),
  createData('', '', '', '', '', '')
];

const DeliveryChannels = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Page title="questions">
        <Box style={{ margin: '0.5rem 1rem 0 1rem' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.root}>
                <AppBar position="static">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="simple tabs example"
                    style={{ backgroundColor: 'white' }}
                  >
                    <Tab label="Scheduled" {...a11yProps(0)} />
                    <Tab label="Modify" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Id</TableCell>
                          <TableCell align="right">Channel</TableCell>
                          <TableCell align="right">
                            Campaign Discription
                          </TableCell>
                          <TableCell align="right">Total Targets</TableCell>
                          <TableCell align="right">Date & Time</TableCell>
                          <TableCell align="right">Remarks</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map(row => (
                          <TableRow key={row.Id}>
                            <TableCell>{row.Id}</TableCell>
                            <TableCell align="right">{row.Channel}</TableCell>
                            <TableCell align="right">
                              {row.CampaignDiscription}
                            </TableCell>
                            <TableCell align="right">
                              {row.TotalTargets}
                            </TableCell>
                            <TableCell align="right">
                              {row.DateAndTime}
                            </TableCell>
                            <TableCell align="right">{row.Remarks}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  Modify
                </TabPanel>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.root}>
                <AppBar position="static">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="simple tabs example"
                    style={{ backgroundColor: 'white' }}
                  >
                    <Tab label="Current" {...a11yProps(0)} />
                    <Tab label="Past" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Id</TableCell>
                          <TableCell align="right">Channel</TableCell>
                          <TableCell align="right">
                            Campaign Discription
                          </TableCell>
                          <TableCell align="right">Total Targets</TableCell>
                          <TableCell align="right">Date & Time</TableCell>
                          <TableCell align="right">Remarks</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map(row => (
                          <TableRow key={row.Id}>
                            <TableCell>{row.Id}</TableCell>
                            <TableCell align="right">{row.Channel}</TableCell>
                            <TableCell align="right">
                              {row.CampaignDiscription}
                            </TableCell>
                            <TableCell align="right">
                              {row.TotalTargets}
                            </TableCell>
                            <TableCell align="right">
                              {row.DateAndTime}
                            </TableCell>
                            <TableCell align="right">{row.Remarks}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  Past
                </TabPanel>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Page>
    </div>
  );
};

export default DeliveryChannels;
