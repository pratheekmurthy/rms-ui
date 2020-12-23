import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
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
const mediaList = [
  {
    value: 'call',
    label: 'Call'
  },
  {
    value: 'vmail',
    label: 'Vmail'
  },
  {
    value: 'email',
    label: 'Email'
  },
  {
    value: 'facebook',
    label: 'Facebook'
  },
  {
    value: 'whatsapp',
    label: 'Whatsapp'
  },
  {
    value: 'twitter',
    label: 'Twitter'
  }
];
  const ticketTypes = [
    {
      value: 'complaint',
      label: 'Complaint'
    },
    {
      value: 'request',
      label: 'Request'
    },
    {
      value: 'info',
      label: 'Information'
    }
  ];
  const [type, setTicketType] = React.useState('complaint');
  const handleTicketTypeChange = event => {
    setTicketType(event.target.value);
  };

  const priorityList = [
    {
      value: 'low',
      label: 'Low'
    },
    {
      value: 'medium',
      label: 'Medium'
    },
    {
      value: 'high',
      label: 'High'
    }
  ];
  const [priority, setPriority] = React.useState('medium');
  const handlePriorityChange = event => {
    setPriority(event.target.value);
  };
   const statusList = [
     {
       value: 'open',
       label: 'Open'
     },
     {
       value: 'wip',
       label: 'Work in Progress'
     },
     {
       value: 'resolved',
       label: 'Resolved'
     },
     {
       value: 'close',
       label: 'Closed'
     }
   ];
    const categoryList = [
      {
        value: 'delay',
        label: 'Delayed dispatch'
      },
      {
        value: 'dispute',
        label: 'Dispute'
      },
      {
        value: 'replacement',
        label: 'Replacement'
      }
    ];
    const [category, setCategory] = React.useState('delay');
    const handleCategoryChange = event => {
      setCategory(event.target.value);
    };
   const [status, setStatus] = React.useState('wip');
     const [open, setOpen] = React.useState(false);
    
     const toggle = () => setOpen(!open);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Box component="div" className={classes.alignCenter}>
          <Typography variant="h6" style={{ marginRight: 10, marginLeft: 5 }}>
            Filter :
          </Typography>
          <TextField
            id="standard-select-currency-native"
            label="Ticket No."
            size="small"
            InputLabelProps={{
              shrink: true
            }}
            SelectProps={{
              native: true
            }}
            InputProps={{
              style: { fontSize: 13 },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
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
            inputProps={{ style: { fontSize: 13 } }}
          >
            {ticketTypes.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
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
            inputProps={{ style: { fontSize: 13 } }}
          >
            {categoryList.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
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
            inputProps={{ style: { fontSize: 13 } }}
          >
            {priorityList.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
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
            inputProps={{ style: { fontSize: 13 } }}
          >
            {statusList.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Media"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{ style: { fontSize: 13 } }}
          >
            {mediaList.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency-native"
            label="Dist Name"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              style: { fontSize: 13 },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          ></TextField>{' '}
          <TextField
            id="standard-select-currency-native"
            label="Dist Id"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              style: { fontSize: 13 },

              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          ></TextField>
          <TextField
            label="Created On"
            type="date"
            defaultValue="2020-12-23"
            id="standard-select-currency-native"
            size="medium"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            style={{ width: 200 }}
            inputProps={{ style: { fontSize: 13 } }}
          ></TextField>
          <TextField
            id="standard-select-currency-native"
            type="date"
            label="Due On"
            size="small"
            defaultValue="2020-12-23"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            style={{ width: 200 }}
            inputProps={{ style: { fontSize: 13 } }}
          ></TextField>
          
        </Box>
      </Paper>
    </div>
  );
}
