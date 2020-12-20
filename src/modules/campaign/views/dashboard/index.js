import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const columns = [
  { field: 'status', headerName: 'Status', width: 90 },
  { field: 'campaignName', headerName: 'Campaign Name', width: 230 },
  {
    field: 'currentResponses',
    headerName: 'Current Responses',
    width: 160,
    type: 'number'
  },
  {
    field: 'targetDistributors',
    headerName: 'Target Distributors',
    width: 160,
    type: 'number'
  },
  { field: 'action', headerName: 'Action', width: 100 }
];

const rows = [
  {
    id: 1,
    status: 'Active',
    campaignName: 'Promotions-iCoffee:Kerala',
    currentResponses: 51020,
    targetDistributors: 1500000,
    action: 'Actions'
  },
  {
    id: 2,
    status: 'Active',
    campaignName: 'New Product Lunch: Training',
    currentResponses: 25510,
    targetDistributors: 411000,
    action: 'Actions'
  },
  {
    id: 3,
    status: 'Active',
    campaignName: 'Campaign #3',
    currentResponses: 6000,
    targetDistributors: 17020,
    action: 'Actions'
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  div: {
    margin: '0.5rem 1rem 0 1rem'
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.div}>
      <div style={{ height: 400, width: '100%' }} className={classes.root}>
        <DataGrid rows={rows} columns={columns} pageSize={5} pagination />
      </div>
    </div>
  );
};

export default Dashboard;
