import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexGrow: 1,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200
    }
  },
  textWidth: {
    width: 400
  }
}));

export default function CreateTicket() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <form noValidate autoComplete="off">
        <div style={{ width: '100%' }}>
          <TextField
            id="number"
            label="Ticket Number"
            variant="outlined"
            size="small"
            style={{ width: '32%' }}
          />
          <br />
          <TextField
            id="title"
            label="Subject"
            variant="outlined"
            size="small"
            style={{ width: '98%' }}
          />
          <br />

          <TextField
            id="type"
            select
            size="small"
            label="Ticket Type"
            SelectProps={{
              native: true
            }}
            variant="outlined"
            style={{ width: '32%' }}
          ></TextField>
          <TextField
            id="category"
            select
            size="small"
            label="Category"
            SelectProps={{
              native: true
            }}
            variant="outlined"
            style={{ width: '31.4%' }}
          ></TextField>
          <TextField
            id="priority"
            select
            size="small"
            label="Priority"
            SelectProps={{
              native: true
            }}
            variant="outlined"
            style={{ width: '31%' }}
          ></TextField>
          <br />
          <TextField
            id="description"
            label="Description"
            multiline
            rows={5}
            size="small"
            variant="outlined"
            style={{ width: '98%' }}
          />
          <br />
          <TextField
            id="dn"
            size="small"
            label="Distributor Id"
            variant="outlined"
            style={{ width: '32%' }}
          />
          <TextField
            id="dn"
            size="small"
            label="Distributor Name"
            variant="outlined"
            style={{ width: '31.4%' }}
          />
          <TextField
            id="dn"
            size="small"
            label="Distributor Email"
            variant="outlined"
            style={{ width: '31%' }}
          />
          <br />
          <TextField
            id="snid"
            size="small"
            label="Source Id"
            variant="outlined"
            style={{ width: '32%' }}
          />
          <TextField
            id="sn"
            size="small"
            label="Source Name"
            variant="outlined"
            style={{ width: '31.4%' }}
          />
          <TextField
            id="sm"
            select
            size="small"
            label="Source Media"
            SelectProps={{
              native: true
            }}
            style={{ width: '31%' }}
            variant="outlined"
          ></TextField>
          <br />
          <TextField
            id="remark"
            label="Remarks"
            multiline
            size="small"
            rows={5}
            variant="outlined"
            style={{ width: '48%' }}
          />
          <TextField
            id="attach"
            label="Drop a file"
            multiline
            size="small"
            rows={5}
            variant="outlined"
            style={{ width: '48%' }}
          />
        </div>
      </form>
    </div>
  );
}
