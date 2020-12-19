import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 330
    }
  }
}));

export default function FilterTicket() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TextField
        id="outlined-search"
        label="Ticket Number"
        type="search"
        variant="outlined"
        size="small"
      />
      <br />
      <TextField
        id="outlined-search"
        label="Ticket Subject"
        type="search"
        variant="outlined"
        size="small"
      />
      <br />
      <TextField
        id="outlined-search"
        label="Ticket Description"
        type="search"
        variant="outlined"
        size="small"
      />
      <br />
      <TextField
        id="standard-select-currency-native"
        select
        label="Ticket Type"
        variant="outlined"
        size="small"
        SelectProps={{
          native: true
        }}
      ></TextField>
      <br />
      <TextField
        id="standard-select-currency-native"
        select
        label="Category"
        variant="outlined"
        size="small"
        SelectProps={{
          native: true
        }}
      ></TextField>
      <br />
      <TextField
        id="standard-select-currency-native"
        select
        variant="outlined"
        label="Priority"
        size="small"
        SelectProps={{
          native: true
        }}
      ></TextField>
      <br />
      <TextField
        id="standard-select-currency-native"
        select
        label="Status"
        size="small"
        variant="outlined"
        SelectProps={{
          native: true
        }}
      ></TextField>
      <br />
      <TextField
        id="standard-select-currency-native"
        select
        label="Source Media"
        variant="outlined"
        size="small"
        SelectProps={{
          native: true
        }}
      ></TextField>
      <br />
      <TextField
        id="outlined-search"
        label="Distributor Name"
        type="search"
        variant="outlined"
        size="small"
      />
      <br />
      <TextField
        id="outlined-search"
        label="Distributor Id"
        type="search"
        variant="outlined"
        size="small"
      />
      <br />
      <TextField
        id="standard-select-currency-native"
        select
        label="Created On"
        variant="outlined"
        size="small"
        SelectProps={{
          native: true
        }}
      ></TextField>
      <br />
      <TextField
        id="standard-select-currency-native"
        select
        label="Due On"
        variant="outlined"
        size="small"
        SelectProps={{
          native: true
        }}
      ></TextField>
    </div>
  );
}
