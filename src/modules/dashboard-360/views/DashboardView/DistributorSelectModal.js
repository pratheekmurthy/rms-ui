import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Select,
    Tooltip,
    Typography,
    TextField
  } from '@material-ui/core';
  import { makeStyles } from '@material-ui/styles';
  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';
  import AccountCircleIcon from '@material-ui/icons/AccountCircle';
  import CallIcon from '@material-ui/icons/Call';
  import CheckCircleIcon from '@material-ui/icons/CheckCircle';
  import { getAddressFromObj } from '../../utils/util-functions';
  import SearchIcon from '@material-ui/icons/Search';
  const useStyles = makeStyles(theme => ({
    maxW50: {
      maxWidth: '50%',
      width: '50%'
    },
    customLink: {
      '&:hover': {
        cursor: 'pointer'
      }
    },
    chipPrimary: {
      backgroundColor: theme.palette.success.light
    },
    rootChip: {
      color: theme.palette.common.white
    },
    chipWarning: {
      backgroundColor: theme.palette.warning.light
    },
    mt1: {
      marginTop: '0.25rem'
    },
    container1: {
      position: 'relative',
      '&::after': {
        content: 'no-open-quote',
        borderRight: '1px solid rgba(0,0,0,0.2)',
        height: '60%',
        position: 'absolute',
        right: 0,
        top: '50%',
        bottom: '50%',
        transform: 'translateY(-50%)'
      }
    },
    profileIcon: {
      right: 5
    },
    dialog: {
      minWidth: 400
    }
  }));
  
  export default function DistSelect({ dealerDetails }) {
    const classes = useStyles();
    const {
        distributor_name,
        distributor_id,
        // lastInteractionId,
        // lastInteractionDate,
        // lastOrderReference,
        distributor_rank,
        Joiningdate,
        distributor_status,
        email_id,
        display_name,
        mob_no,
        pan_no,
        adhar_no,
        phone_no,
        SelfDOB
      } = dealerDetails;
  
    const [showFullDetailsModal, setShowFullDetailsModal] = useState(false);
    const [showDistributorDetailsModal, setShowDistributorDetailsModal] = useState(false);
    const SOCKETENDPOINT = 'http://127.0.0.1:42002/';
    const getIconColor = () => {
      return 'primary';
    };
  
    function makeCall(Number) {
      if (Number.length === 10) {
        const axios = require('axios');
  
        const config = {
          method: 'get',
          // eslint-disable-next-line prefer-template
          url: SOCKETENDPOINT + 'ami/actions/orginatecall?sipAgentID=SIP%2F' + localStorage.getItem('AgentSIPID') + '&NumbertobeCalled=5' + Number,
          headers: {}
        };
        axios(config)
          .then(response => {
            console.log(JSON.stringify(response.data));
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        console.log('Invalide number');
      }
    }
    return (
     <div>
              <SearchIcon
              onClick={() => setShowDistributorDetailsModal(true)}/>
           
        {showDistributorDetailsModal && (
          <Dialog
            open
            onClose={() => setShowDistributorDetailsModal(false)}
            classes={{ paper: classes.dialog }}
          >
            <DialogTitle>Select User Profile</DialogTitle>
            <Divider light />
            <DialogContent>
              <Typography variant="h6">
                {/* {display_name} */}
                <TextField
                fullWidth
                label="Select Name"
                name="state"
                // onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={display_name}
                variant="outlined"
              >
                   <option
                    key={display_name}
                    value={display_name}
                  >
                    {display_name}
                  </option>
                {/* {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))} */}
              </TextField>
              <Box style={{ flexBasis: '100%' }}>
                  <br />
                </Box>
              <TextField
                fullWidth
                label="Select Mobile"
                name="state"
                // onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={mob_no}
                variant="outlined"
              >
                    <option
                    key={mob_no}
                    value={mob_no}
                  >
                    {mob_no}
                  </option>
                {/* {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))} */}
              </TextField>
                {/* <Tooltip title={distributor_status}>
                  <CheckCircleIcon
                    color={getIconColor()}
                    style={{ marginBottom: -3, marginLeft: 5 }}
                  />
                </Tooltip> */}
              </Typography>
              {/* <Typography color="textSecondary">{distributor_id}</Typography> */}
              {/* <Typography color="textSecondary" display="inline" variant="p">
                Distributor Name:
              </Typography>
              <Typography color="textSecondary" display="inline">
                {display_name}
              </Typography> */}
              <br />
              {/* <Grid container wrap>
                <Grid container item xs={12} wrap>
                  <Box style={{ flexBasis: '100%' }}>
                    <Typography variant="h4">Contact Details</Typography>
                  </Box>
                  <Box style={{ flexBasis: '100%' }} marginTop={2} />
                  <Grid item container>
                    <Grid item xs={5}>
                      <Typography variant="h5">Email Id:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="h5" color="textSecondary">
                        {email_id}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={5}>
                      <Typography variant="h5">Mobile Number:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="h5" color="textSecondary">
                        {mob_no}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={5}>
                      <Typography variant="h5">Phone Number:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="h5" color="textSecondary">
                        {phone_no || '-'}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={5}>
                      <Typography variant="h5">Billing Address:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="h5" color="textSecondary">
                        {getAddressFromObj(dealerDetails)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Box style={{ flexBasis: '100%' }}>
                  <br />
                </Box>
                <Grid container item xs={12}>
                  <Box style={{ flexBasis: '100%' }}>
                    <Typography variant="h4">Personal Details</Typography>
                  </Box>
                  <Box style={{ flexBasis: '100%' }} marginTop={2} />
                  <Grid item container>
                    <Grid item xs={5}>
                      <Typography variant="h5">Distributor Name:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="h5" color="textSecondary">
                        {distributor_name}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={5}>
                      <Typography variant="h5">Aadhar Number:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="h5" color="textSecondary">
                        {adhar_no}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={5}>
                      <Typography variant="h5">PAN Number:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="h5" color="textSecondary">
                        {pan_no}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={5}>
                      <Typography variant="h5">Date Of Birth:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="h5" color="textSecondary">
                        {SelfDOB.substring(0, 10)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid> */}
            </DialogContent>
            <DialogActions>
            <Button
                color="primary"
                variant="contained"
                onClick={() => setShowDistributorDetailsModal(false)}
              >
                Submit
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={() => setShowDistributorDetailsModal(false)}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
  
        </div>
    );
  }
  