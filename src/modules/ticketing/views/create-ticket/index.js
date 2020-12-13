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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 15
  },
  textBold: {
    fontWeight: '600'
  },
  textWidth: {
    width: 400
  },
  paper: {
    width: '100%',
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    flexGrow: 1,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

export default function CreateTicket() {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Box component="div">
        <Typography variant="h5" style={{ fontWeight: '500' }}>
          Tickets Details
        </Typography>
        <Divider style={{ marginTop: 8 }} />
        <form style={{ marginTop: 8 }} noValidate autoComplete="off">
          <div>
            <TextField
              id="number"
              label="Ticket Number"
              variant="outlined"
              style={{ width: 400 }}
            />
            <br />
            <TextField
              id="title"
              label="Subject"
              variant="outlined"
              style={{ width: 400 }}
            />
            <br />
            <TextField
              id="type"
              select
              label="Ticket Type"
              SelectProps={{
                native: true
              }}
              variant="outlined"
              style={{ width: 400 }}
            ></TextField>
            <br />
            <TextField
              id="category"
              select
              label="Category"
              SelectProps={{
                native: true
              }}
              variant="outlined"
              style={{ width: 400 }}
            ></TextField>
            <br />
            <TextField
              id="priority"
              select
              label="Priority"
              SelectProps={{
                native: true
              }}
              variant="outlined"
              style={{ width: 400 }}
            ></TextField>
            <br />
            <TextField
              id="description"
              label="Description"
              multiline
              rows={7}
              variant="outlined"
              style={{ width: 400 }}
            />
            <br />
            <TextField
              id="dn"
              label="Distributor Name"
              variant="outlined"
              style={{ width: 400 }}
            />
            <br />
            <TextField
              id="sn"
              label="Source Name"
              variant="outlined"
              style={{ width: 400 }}
            />
            <br />
            <TextField
              id="remark"
              label="Remarks"
              multiline
              rows={5}
              variant="outlined"
              style={{ width: 400 }}
            />
            <br />
            <TextField
              id="attach"
              label="Drop a file"
              multiline
              rows={5}
              variant="outlined"
              style={{ width: 400 }}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              style={{ margin: 9 }}
            >
              Create Ticket
            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
}
