import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 150
    }
  },
  paper: {
    padding: theme.spacing(1),
    marginBottom: 15
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-start'
  }
}));

export default function FilterTicket() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Box component="div" className={classes.alignCenter}>
          <Typography variant="h6" style={{ marginRight: 10, marginLeft: 5 }}>
            Filter :
          </Typography>
          <TextField
            id="standard-select-currency-native"
            select
            label="Ticket No."
            size="small"
            InputLabelProps={{
              shrink: true
            }}
            SelectProps={{
              native: true
            }}
          ></TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Ticket Type"
            size="small"
            InputLabelProps={{
              shrink: true
            }}
            SelectProps={{
              native: true
            }}
          ></TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Category"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
          ></TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Priority"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
          ></TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Status"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
          ></TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Source Media"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
          ></TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Distributor Name"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
          ></TextField>{' '}
          <TextField
            id="standard-select-currency-native"
            select
            label="Distributor Id"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
          ></TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Created On"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
          ></TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Due On"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
          ></TextField>
        </Box>
      </Paper>
    </div>
  );
}
