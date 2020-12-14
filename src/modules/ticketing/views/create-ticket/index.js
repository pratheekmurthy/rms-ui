import React from 'react';
import {
  Divider,
  Typography,
  Box,
  Button,
  Avatar,
  TextField,
  Drawer
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 15
  },
  textWidth: {
    width: 400
  },
  paper: {
    width: '50%',
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    margin: 15,
    flexGrow: 1,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

export default function CreateTicket() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  return (
    <div className={classes.paper} style={modalStyle}>
      <Box component="div">
        <Typography variant="h5" style={{ fontWeight: '500' }}>
          Tickets Details
        </Typography>
        <Divider style={{ marginTop: 8 }} />
        <form style={{ marginTop: 8 }} noValidate autoComplete="off">
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
              style={{ width: '31%' }}
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
              style={{ width: '31%' }}
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
              style={{ width: '31%' }}
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
            <br />
            <div display="flex" flexDirection="row">
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                style={{ margin: 9 }}
              >
                Create Ticket
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                className={classes.button}
                style={{ margin: 9 }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Box>
    </div>
  );
}
