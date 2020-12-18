import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import config from '../../views/config.json';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Paper,
  Grid,
  List,
  ListItem,
  Divider,
  ListItemText,
  Typography,
  ListItemIcon,
  Box,
  Button,
  Avatar,
  TextField,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from '@material-ui/core';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import { purple, orange, green } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import LinkIcon from '@material-ui/icons/Link';
import AddIcon from '@material-ui/icons/Add';
import CreateTicket from '../create-ticket';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
//config file import
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
    height: 'auto'
  },
 
  paper: {
    padding: theme.spacing(1)
  },
  
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    color: 'blue',
    flexAlign: 'left'
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
      <Grid container spacing={2}>
        {/**
         * This is the ticket List block
         */}
        <Grid item sm={3}>
          {/* <Paper
            // className={classes.paper}
            // style={{ maxHeight: 720, overflow: 'auto' }}
          > */}

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
          {/* </Paper> */}
        </Grid>

        {/**
         * This is the ticket Detail block
         */}
      </Grid>
    </div>
  );
}
