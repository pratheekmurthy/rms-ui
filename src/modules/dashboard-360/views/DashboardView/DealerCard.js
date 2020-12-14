import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Tooltip,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
  }
}));

export default function DealerCard({ dealerDetails }) {
  const classes = useStyles();
  const {
    distributor_name,
    distributor_id,
    lastInteractionId,
    lastInteractionDate,
    lastOrderReference,
    distributor_rank,
    Joiningdate,
    email_id
  } = dealerDetails;
  return (
    <Card>
      {/* <CardHeader
        title={
          <Grid container justify="space-between">
            <span>Distributor Details</span>
            <span
              className={`MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary ${classes.customLink}`}
              onClick={() => showCreateIssue(true)}
            >
              Create Issue
            </span>
          </Grid>
        }
      /> */}
      {/* <Divider />
      <List>
        <ListItem>
          <ListItemText
            primary={
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography variant="h5" className={classes.maxW50}>
                  Distr. ID
                </Typography>
                <span>{distributor_id}</span>
              </Box>
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography gutterBottom variant="h5" component="h2">
                  {distributor_name}
                </Typography>
              </Box>
            }
          />
        </ListItem> */}
      {/* <Divider /> */}
      <CardContent>
        <Grid container justify="center" className="position-relative">
          <Tooltip
            title="View More Details"
            className={`position-absolute ${classes.profileIcon} `}
          >
            <AccountCircleIcon color="primary" />
          </Tooltip>
          <Box>
            <Typography gutterBottom variant="h5" component="h2" align="center">
              {distributor_name}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              align="center"
            >
              {email_id}
              <br />
              {distributor_rank}
              <br />
              Member From - {Joiningdate}
            </Typography>
            <Box style={{ marginTop: '0.5rem' }}>
              <Tooltip title="Verified">
                <Chip
                  color="primary"
                  label="Aadhar"
                  className={`${classes.chipPrimary} ${classes.rootChip} `}
                />
              </Tooltip>
              &nbsp;
              <Tooltip title="Verification Pending">
                <Chip
                  color="secondary"
                  label="Cheque book"
                  className={`${classes.chipWarning} ${classes.rootChip} `}
                />
              </Tooltip>
              &nbsp;
              <Tooltip title="Not Verified">
                <Chip
                  color="secondary"
                  label="PAN"
                  className={` ${classes.rootChip} `}
                />
              </Tooltip>
            </Box>
          </Box>
          <Grid container spacing={4} className={classes.mt1}>
            <Grid item xs={6} className={classes.container1}>
              <Grid container direction="column" alignItems="flex-end">
                <Typography gutterBottom variant="h5" align="center">
                  Last Order
                </Typography>
                <Link to="/dash360/orders/1234">#1234</Link>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column" alignItems="flex-start">
                <Typography gutterBottom variant="h5" align="center">
                  Last Interaction
                </Typography>
                <Link to="/dash360/orders/1234">#1234</Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>

      {/* <ListItem>
          <ListItemText
            primary={
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography variant="h5" className={classes.maxW50}>
                  Display Name
                </Typography>
                <span>{distributor_name}</span>
              </Box>
            }
          />
        </ListItem> */}

      {/* <Divider />
        <ListItem>
          <ListItemText
            primary={
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography variant="h5" className={classes.maxW50}>
                  Email Id
                </Typography>
                <span>{email_id}</span>
              </Box>
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography variant="h5" className={classes.maxW50}>
                  Last Interaction ID
                </Typography>
                <span>{lastInteractionId}</span>
              </Box>
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography variant="h5" className={classes.maxW50}>
                  Last Interaction Date
                </Typography>
                <span>{lastInteractionDate}</span>
              </Box>
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography variant="h5" className={classes.maxW50}>
                  Last Order Reference
                </Typography>
                <span>#{lastOrderReference}</span>
              </Box>
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography variant="h5" className={classes.maxW50}>
                  Rank
                </Typography>
                <span>{distributor_rank}</span>
              </Box>
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography variant="h5" className={classes.maxW50}>
                  Membership Date
                </Typography>
                <span>{Joiningdate}</span>
              </Box>
            }
          />
        </ListItem> */}
      {/* </List> */}
    </Card>
  );
}
