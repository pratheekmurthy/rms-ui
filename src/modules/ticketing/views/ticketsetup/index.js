import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Grid, Typography, Box, Paper } from '@material-ui/core';
import MediaConfig from './mediaconfig';
import TicketType from './tickettypeconfig';
import CategoryConfig from './categoryconfig';
import SubCategoryConfig from './subcategoryconfig';
import SubCategoryItemConfig from './subcategoryitemconfig';
import PriorityConfig from './priorityconfig';
import StatusConfig from './statusconfig';
import DepartmentConfig from './departmentconfig';
import TeamConfig from './teamconfig';
import ExecutiveConfig from './executiveconfig';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 'auto',
    margin: 15
  },

  paper: {
    padding: theme.spacing(1)
  },

  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    color: 'blue'
  }
}));

export default function TicketDashboard() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item sm={12} md={12}>
          <Paper className={classes.paper} style={{ overflow: 'auto' }}>
            <Grid container spacing={2}>
              <Grid item sm={2}>
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  className={classes.tabs}
                >
                  <Tab label="Ticket Type" {...a11yProps(0)} />
                  <Tab label="Media" {...a11yProps(1)} />
                  <Tab label="Category" {...a11yProps(2)} />
                  <Tab label="Sub category" {...a11yProps(3)} />
                  <Tab label="Sub Category Item" {...a11yProps(4)} />
                  <Tab label="Priority" {...a11yProps(5)} />
                  <Tab label="Status" {...a11yProps(6)} />
                  <Tab label="Department" {...a11yProps(7)} />
                  <Tab label="Team" {...a11yProps(8)} />
                  <Tab label="Excutive" {...a11yProps(9)} />
                </Tabs>
              </Grid>
              <Grid item sm={8}>
                <TabPanel value={value} index={0}>
                  <TicketType />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <MediaConfig />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <CategoryConfig />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <SubCategoryConfig />
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <SubCategoryItemConfig />
                </TabPanel>
                <TabPanel value={value} index={5}>
                  <PriorityConfig />
                </TabPanel>
                <TabPanel value={value} index={6}>
                  <StatusConfig />
                </TabPanel>
                <TabPanel value={value} index={7}>
                  <DepartmentConfig />
                </TabPanel>
                <TabPanel value={value} index={8}>
                  <TeamConfig />
                </TabPanel>
                <TabPanel value={value} index={9}>
                  <ExecutiveConfig />
                </TabPanel>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
