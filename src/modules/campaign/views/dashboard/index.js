import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  div: {
    margin: '0.5rem 1rem 0 1rem'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    height: 35,
    marginBottom: '5%'
  }
}));

const Dashboard = () => {
  const [action, setAction] = React.useState('');

  const handleChange = event => {
    setAction(event.target.value);
  };

  const classes = useStyles();

  const columns = [
    {
      field: 'status',
      headerName: 'Status',
      width: 90,
      renderCell: rowData => <Chip color="primary" label={rowData.row.status} />
    },
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
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: rowData => (
        <FormControl
          variant="filled"
          className={classes.formControl}
          style={{ marginBottom: 10 }}
        >
          <InputLabel id="demo-simple-select-filled-label">Actions</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={action}
            onChange={handleChange}
          >
            <MenuItem value={'active'}>Active</MenuItem>
            <MenuItem value={'deactive'}>Deactive</MenuItem>
            <MenuItem value={'stats'}>Stats</MenuItem>
          </Select>
        </FormControl>
      )
    }
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
    },
    {
      id: 4,
      status: 'Active',
      campaignName: 'Campaign #4',
      currentResponses: 2564165,
      targetDistributors: 127020,
      action: 'Actions'
    }
  ];

  return (
    <div className={classes.div}>
      <div>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight="true"
          pageSize={5}
          style={{ width: '100%' }}
          className={classes.root}
        />
      </div>
    </div>
  );
};

export default Dashboard;
