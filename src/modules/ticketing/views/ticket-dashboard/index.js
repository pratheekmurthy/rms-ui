import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import config from '../../views/config.json';
import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
  Paper,
  Grid,

  Typography,
 
  Box,
 
  Avatar,
  TextField,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from '@material-ui/core';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import { purple, orange, green } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import LinkIcon from '@material-ui/icons/Link';
import AddIcon from '@material-ui/icons/Add';
import CreateTicket from '../create-ticket';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import FilterListIcon from '@material-ui/icons/FilterList';
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 15
  },
  textBold: {
    fontWeight: '600'
  },
  paper: {
    padding: theme.spacing(1)
  },
  listRow: {
    flexGrow: 1,
    fontSize: 10,
    padding: 0
  },
  ticketMargin: {
    marginLeft: 5
  },
  listItemClass: {
    paddingLeft: 10,
    paddingRight: 10
  },
  metadataClass: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 16
  },
  labelClass: {
    fontWeight: '500',
    float: 'left',
    width: '50%'
  },
  valueClass: {
    width: '50%'
  },
  belowMargin: {
    marginBottom: 20
  },
  dateMargin: {
    marginBottom: 5
  },
  green: {
    color: theme.palette.getContrastText(green[900]),
    backgroundColor: green[900],
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  avatarValue: {
    marginLeft: 5,
    marginTop: 5
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    color: '#fff',
    backgroundColor: green[500],
    marginTop: 10
  },
  button: {
    margin: 5,
    marginTop: 20,
    marginBottom: 20
  },
  boxDiv: {
    paddingBottom: 10,
    paddingTop: 10
  },
  detailTitle: {
    marginLeft: 5,
    marginTop: 5,
    fontWeight: 600
  },
  // drawer: {
  //   width: '100%',
  //   flexShrink: 0
  // },
  // drawerPaper: {
  //   width: '25%'
  // },
  drawer: {
    // width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    // width: drawerWidth,
    top: 62
  },
  modal: {
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  textField: {
    fontSize: 10,
    height: 22
  },
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 9
  }
}));

export default function TicketDashboard() {
  const classes = useStyles();
  const ticketListData = [
    {
      id: 'IV-10202',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10222',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10122',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10732',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10312',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-12302',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10232',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10122',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10732',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10312',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-12302',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10232',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    }
  ];

  const [open, setOpen] = React.useState(false);
   const [opentimeline, setOpentimeline] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
    const [tickets, setTickets] = useState([]);
     const [viewticket, setviewTickets] = useState({});
     const [apiTickets, setApiTickets] = useState([]);
       const [ticketHistory, setTicketHistory] = useState([]);



       //new code
  const [ticketNumber, setTicketNumber] = useState('');
  const [distributorName, setDistributorName] = useState('');
  const [distributorId, setDistributorId] = useState('');
  const [distributorEmail, setDistributorEmail] = useState('');
  const [distributorMobile, setDistributorMobile] = useState('');
  const [createdByName, setCreatedByName] = useState('');
  const [createdById, setCreatedById] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [remarks, setRemarks] = useState('');
  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketType, setTicketType] = useState({
    ticketTypeId: '',
    ticketType: ''
  });
  // const [open, setOpen] = React.useState(true);
  const [medium, setMedium] = useState([]);
  const [media, setMedia] = useState({
    value: '',
    label: ''
  });
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ value: '', label: '' });
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState({
    value: '',
    label: ''
  });
  const [subCategoryItems, setSubCategoryItems] = useState([]);
  const [subCategoryItem, setSubCategoryItem] = useState({
    value: '',
    label: ''
  });
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState({
    value: '',
    label: ''
  });
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState({
    value: '',
    label: ''
  });
  const [priorities, setPriorities] = useState([]);
  const [priority, setPriority] = useState({
    value: '',
    label: '',
    sla: 0
  });
  const [statuses, setStatuses] = useState([]);
  const [status, setStatus] = useState({
    value: '',
    label: '',
    slaOnHold: false
  });
  const [executives, setExecutives] = useState([]);
  const [executive, setExecutive] = useState({
    value: '',
    label: '',
    executiveEmail: '',
    executiveMobile: ''
  });


  // alert("all" + distributorId);

  const [loading, setLoading] = useState(true);
  const [createdTime, setCreatedTime] = useState();
  const [file, setFile] = useState('');
   const [state, setState] = React.useState({
     top: false,
     left: false,
     bottom: false,
     right: false
   });

   const toggleDrawer = (anchor, open) => event => {
     if (
       event.type === 'keydown' &&
       (event.key === 'Tab' || event.key === 'Shift')
     ) {
       return;
     }

     setState({ ...state, [anchor]: open });
   };

  useEffect(() => {
    const apiUrl = config.APIS_URL + '/tickets';
    fetch(apiUrl)
      .then(res => res.json())
      .then(repos => {
        setApiTickets(repos.data);
        setTickets(repos.data);
      });
  }, [apiTickets]);
   useEffect(() => {
     let unmounted = false;
     async function getItems() {
       const response = await fetch(config.APIS_URL + '/statuses');
       const body = await response.json();
       if (!unmounted) {
         setStatuses([
           ...[{ label: 'All', value: '' }],
           ...body.data.map(({ _id, status }) => ({
             label: status,
             value: _id
           }))
         ]);
         setLoading(false);
         setStatus({
           label: 'All',
           value: ''
         });
       }
     }
     getItems();
     return () => {
       unmounted = true;
     };
   }, []);

  const viewTicket = item => {
    console.log('item', item);
     setviewTickets(item)
let unmounted = false;
     async function getHistoryItems() {
     
       const response = await fetch(
         config.APIS_URL + '/ticketHistory/' + item._id
       );
       const tktHistory = (await response.json()).data;
       console.log("ticket history", tktHistory)
       if (!unmounted) {
         setTicketHistory(tktHistory);
       }
     }
     getHistoryItems();
    
    // localStorage.setItem('viewtkt', JSON.stringify(item));
    // let path = `CreateTicket`;

    // history.push(path);
  };
  function getTicketList() {
    return (
      <List className={classes.listRow}>
        {tickets
          .filter(tkt =>
            status.label === 'All'
              ? tkt.status === tkt.status
              : tkt.status === status.label
          )
          .map(ticket => (
            <>
              <ListItem
                alignItems="flex-start"
                className={classes.listItemClass}
              >
                <ListItemText>
                  <div className={classes.textBold}>
                    <ListItemIcon>
                      {/* <OfflineBoltIcon style={{ color: purple[500] }} /> */}
                      <Avatar className={classes.green}>
                        {ticket.status.substring(0, 1)}
                      </Avatar>
                      <span
                        className={classes.ticketMargin}
                        onClick={e => viewTicket(ticket)}
                      >
                        {ticket.ticketNumber}
                      </span>
                    </ListItemIcon>
                  </div>
                  <Typography
                    variant="body2"
                    color="textPrimary"
                    style={{ textOverflow: 'ellipsis' }}
                    noWrap
                  >
                    {ticket.ticketSubject}
                  </Typography>
                </ListItemText>
              </ListItem>
              <Divider light />
            </>
          ))}
      </List>
    );
  }

  const addRow = () => {
    // console.log("data on click", ticketNumber,distributorName,distributorId,distributorEmail,distributorMobile,createdByName)
    
  //  code is added above
    const viewtkt = JSON.parse(localStorage.getItem('viewtkt'));
    setOpen(false);
     const apiUrl = config.APIS_URL + '/tickets';
     var apiParam = {
       method: viewtkt ? 'PUT' : 'POST',
       headers: {
         ticketNumber,
         createdTime,
        //  updatedTime,
         distributorName,
         distributorId,
         distributorEmail,
         distributorMobile,
         createdByName,
         createdById,
        //  updatedByName,
        //  updatedById,
         ticketSubject,
         ticketDescription,
         remarks,
         ticketTypeId: ticketType.value,
         ticketType: ticketType.label,
         mediaId: media.value,
         media: media.label,
         categoryId: category.value,
         category: category.label,
         subCategoryId: subCategory.value,
         subCategory: subCategory.label,
         subCategoryItemId: subCategoryItem.value,
         subCategoryItem: subCategoryItem.label,
         departmentId: department.value,
         department: department.label,
         teamId: team.value,
         team: team.label,
         priorityId: priority.value,
         priority: priority.label,
         sla: priority.sla,
         elapsedSLA: 0,
         statusId: status.value,
         status: status.label,
         slaOnHold: status.slaOnHold,
         executiveId: executive.value,
         executive: executive.label,
         executiveEmail: executive.executiveEmail,
         executiveMobile: executive.executiveMobile
       }
     };
     console.log("apiParam", apiParam)
      // alert(apiParam);
     if (viewtkt) {
       apiParam.headers = {
         ...apiParam.headers,
         ticketid: viewtkt._id
       };
     }
    //  fetch(apiUrl, apiParam)
    //    .then(res => res.json())
    //    .then(repos => {
    //       alert(JSON.stringify(repos));
    //    });
    
  };
  const handleOpen = () => {
    setOpen(true);
    
  };
  const handleClose = () => {
    setOpen(false);
    // alert(remarks)
  };
   const list = anchor => (
     <div
       className={clsx(classes.list, {
         [classes.fullList]: anchor === 'top' || anchor === 'bottom'
       })}
       role="presentation"
       onClick={toggleDrawer(anchor, false)}
       onKeyDown={toggleDrawer(anchor, false)}
     >
       <List>
         <center>
           {' '}
           <h3>Filter By</h3>
         </center>
         <Divider />
         {['Inbox'].map((text, index) => (
           <ListItem button key={text}>
             <TextField
               label="Ticket Number"
               id="outlined-size-small"
               value={ticketNumber}
               onChange={e => setTicketNumber(e.target.value)}
               variant="outlined"
               size="small"
               //  style={{ fontSize: 6 }}
               //  className={classes.textField}
             />
           </ListItem>
         ))}
         {['Inbox'].map((text, index) => (
           <ListItem button key={text}>
             <TextField
               label="Distributor Name"
               id="outlined-size-small"
               value={distributorName}
               onChange={e => setDistributorName(e.target.value)}
               variant="outlined"
               size="small"
               //  className={classes.textField}
             />
           </ListItem>
         ))}
         {['Inbox'].map((text, index) => (
           <ListItem button key={text}>
             <TextField
               label="Distributor Id"
               id="outlined-size-small"
               value={distributorId}
               onChange={e => setDistributorId(e.target.value)}
               variant="outlined"
               size="small"
               //  className={classes.textField}
             />
           </ListItem>
         ))}
         {['Inbox'].map((text, index) => (
           <ListItem button key={text}>
             <TextField
               label="Ticket Subject"
               id="outlined-size-small"
               value={ticketSubject}
               onChange={e => setTicketSubject(e.target.value)}
               variant="outlined"
               size="small"
               //  className={classes.textField}
             />
           </ListItem>
         ))}
         {/* {['Inbox'].map((text, index) => (
           <ListItem button key={text}>
             <TextField
               label="Ticket Description"
               id="outlined-size-small"
               value={ticketDescription}
               onChange={e => setTicketDescription(e.target.value)}
               variant="outlined"
               size="small"
               //  className={classes.textField}
             />
           </ListItem>
         ))} */}
         {/* {['Inbox'].map((text, index) => (
           <ListItem button key={text}>
             <FormControl variant="outlined" className={classes.formControl}>
               <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
               <Select
                 native
                 disabled={loading}
                 label="Ticket Type"
                 inputProps={{
                   name: 'tickettype',
                   id: 'tickettype'
                 }}
                 defaultValue={ticketType.value}
                 onChange={e => {
                   setTicketType({
                     value: e.target.value,
                     label: ticketTypes.filter(
                       ticketType => ticketType.value === e.target.value
                     )[0].label
                   });
                 }}
               >
                 {ticketTypes.map(({ label, value }) => (
                   <option key={value} value={value}>
                     {label}
                   </option>
                 ))}
               </Select>
             </FormControl>
           </ListItem>
         ))} */}
       </List>
       <Divider />
       {/* <List>
         {['All mail', 'Trash', 'Spam'].map((text, index) => (
           <ListItem button key={text}>
             <ListItemIcon>
               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
             </ListItemIcon>
             <ListItemText primary={text} />
           </ListItem>
         ))}
       </List> */}
     </div>
   );
  return (
    <div className={classes.root}>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        style={{ marginBottom: 15 }}
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Create Ticket
      </Button>
      {['right'].map(anchor => (
        <React.Fragment key={anchor}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<FilterListIcon />}
            style={{ marginBottom: 15 }}
            onClick={toggleDrawer(anchor, true)}
          >
            Filter
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            className={classes.drawer}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
      <Button
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<FilterListIcon />}
        style={{ marginBottom: 15 }}
        onClick={() => {
          setStatus({
            value: 'All',
            label: 'All'
            // slaOnHold: statuses.filter(status => status.value === 'New')[0]
            //   .slaOnHold
          });
        }}
      >
        All
      </Button>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<FilterListIcon />}
        style={{ marginBottom: 15 }}
        onClick={() => {
          setStatus({
            value: 'New',
            label: 'New'
            // slaOnHold: statuses.filter(status => status.value === 'New')[0]
            //   .slaOnHold
          });
        }}
      >
        New
      </Button>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<FilterListIcon />}
        style={{ marginBottom: 15 }}
        onClick={() => {
          setStatus({
            value: 'Open',
            label: 'Open'
            // slaOnHold: statuses.filter(status => status.value === 'New')[0]
            //   .slaOnHold
          });
        }}
      >
        Open
      </Button>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<FilterListIcon />}
        style={{ marginBottom: 15 }}
        onClick={() => {
          setStatus({
            value: 'Work In Progress',
            label: 'Work In Progress'
            // slaOnHold: statuses.filter(status => status.value === 'New')[0]
            //   .slaOnHold
          });
        }}
      >
        Work In Progress
      </Button>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<FilterListIcon />}
        style={{ marginBottom: 15 }}
        onClick={() => {
          setStatus({
            value: 'Resolved',
            label: 'Resolved'
            // slaOnHold: statuses.filter(status => status.value === 'New')[0]
            //   .slaOnHold
          });
        }}
      >
        Resolved
      </Button>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<FilterListIcon />}
        style={{ marginBottom: 15 }}
        onClick={() => {
          setStatus({
            value: 'Closed',
            label: 'Closed'
            // slaOnHold: statuses.filter(status => status.value === 'New')[0]
            //   .slaOnHold
          });
        }}
      >
        Closed
      </Button>
      {/* <TextField
        id="sm"
        select
        size="small"
        label="Status"
        SelectProps={{
          native: true
        }}
        style={{ width: '31%' }}
        variant="outlined"
        value={status.value || ''}
        onChange={e => {
          setStatus({
            value: e.target.value,
            label: statuses.filter(status => status.value === e.target.value)[0]
              .label,
            slaOnHold: statuses.filter(
              status => status.value === e.target.value
            )[0].slaOnHold
          });
          // props.setStatus({
          //   value: e.target.value,
          //   label: statuses.filter(status => status.value === e.target.value)[0]
          //     .label,
          //   slaOnHold: statuses.filter(
          //     status => status.value === e.target.value
          //   )[0].slaOnHold
          // });
        }}
      >
        {statuses.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </TextField> */}
      <Dialog
        open={open}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Create Ticket'}</DialogTitle>
        <DialogContent dividers>
          <CreateTicket
            //new code
            ticketNumber={ticketNumber}
            setTicketNumber={tks => {
              setTicketNumber(tks);
            }}
            distributorName={distributorName}
            setDistributorName={disname => {
              setDistributorName(disname);
            }}
            distributorId={distributorId}
            setDistributorId={disid => {
              setDistributorId(disid);
            }}
            distributorEmail={distributorEmail}
            setDistributorEmail={disemail => {
              setDistributorEmail(disemail);
            }}
            distributorMobile={distributorMobile}
            setDistributorMobile={dismob => {
              setDistributorMobile(dismob);
            }}
            createdByName={createdByName}
            setCreatedByName={crename => {
              setCreatedByName(crename);
            }}
            createdById={createdById}
            setCreatedById={creid => {
              setCreatedById(creid);
            }}
            ticketSubject={ticketSubject}
            setTicketSubject={tktsub => {
              setTicketSubject(tktsub);
            }}
            ticketDescription={ticketDescription}
            setTicketDescription={tktdisp => {
              setTicketDescription(tktdisp);
            }}
            remarks={remarks}
            setRemarks={rks => {
              // alert(JSON.stringify(cmts))
              setRemarks(rks);
            }}
            ticketTypes={ticketTypes}
            setTicketTypes={tkstyps => {
              // alert(JSON.stringify(cmts))
              setTicketTypes(tkstyps);
            }}
            ticketType={ticketType}
            setTicketType={tkstyp => {
              // alert(JSON.stringify(cmts))
              setTicketType(tkstyp);
            }}
            medium={medium}
            setMedium={mdm => {
              // alert(JSON.stringify(cmts))
              setMedium(mdm);
            }}
            media={media}
            setMedia={media => {
              // alert(JSON.stringify(cmts))
              setMedia(media);
            }}
            categories={categories}
            setCategories={catgs => {
              // alert(JSON.stringify(cmts))
              setCategories(catgs);
            }}
            category={category}
            setCategory={cat => {
              // alert(JSON.stringify(cmts))
              setCategory(cat);
            }}
            subCategories={subCategories}
            setSubCategories={subcats => {
              // alert(JSON.stringify(cmts))
              setSubCategories(subcats);
            }}
            subCategory={subCategory}
            setSubCategory={subcat => {
              // alert(JSON.stringify(cmts))
              setSubCategory(subcat);
            }}
            subCategoryItems={subCategoryItems}
            setSubCategoryItems={subcatitems => {
              // alert(JSON.stringify(cmts))
              setSubCategoryItems(subcatitems);
            }}
            subCategoryItem={subCategoryItem}
            setSubCategoryItem={subcatitem => {
              // alert(JSON.stringify(cmts))
              setSubCategoryItem(subcatitem);
            }}
            departments={departments}
            setDepartments={deps => {
              // alert(JSON.stringify(cmts))
              setDepartments(deps);
            }}
            department={department}
            setDepartment={dept => {
              // alert(JSON.stringify(cmts))
              setDepartment(dept);
            }}
            teams={teams}
            setTeams={tms => {
              // alert(JSON.stringify(cmts))
              setTeams(tms);
            }}
            team={team}
            setTeam={tm => {
              // alert(JSON.stringify(cmts))
              setTeam(tm);
            }}
            priorities={priorities}
            setPriorities={prts => {
              // alert(JSON.stringify(cmts))
              setPriorities(prts);
            }}
            priority={priority}
            setPriority={prt => {
              // alert(JSON.stringify(cmts))
              setPriority(prt);
            }}
            statuses={statuses}
            setStatuses={stses => {
              // alert(JSON.stringify(cmts))
              setStatuses(stses);
            }}
            status={status}
            setStatus={sts => {
              // alert(JSON.stringify(cmts))
              setStatus(sts);
            }}
            executives={executives}
            setExecutives={exts => {
              // alert(JSON.stringify(cmts))
              setExecutives(exts);
            }}
            executive={executive}
            setExecutive={ext => {
              // alert(JSON.stringify(cmts))
              setExecutive(ext);
            }}
            createdTime={createdTime}
            setCreatedTime={cretime => {
              // alert(JSON.stringify(cmts))
              setCreatedTime(cretime);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={addRow}
            color="primary"
            variant="contained"
            size="small"
          >
            Create
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
            size="small"
            variant="outlined"
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* timeline modal */}

      <Dialog
        open={opentimeline}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Create Ticket'}</DialogTitle>
        <DialogContent dividers>
          {/* <CreateTicket
            //new code
            
          /> */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={addRow}
            color="primary"
            variant="contained"
            size="small"
          >
            Create
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
            size="small"
            variant="outlined"
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={1}>
        {/**
         * This is the ticket List block
         */}
        <Grid item sm={12} md={3}>
          <Paper
            className={classes.paper}
            style={{ maxHeight: 720, overflow: 'auto' }}
          >
            <box component="div" overflow="auto">
              <h3>{status.label}</h3>
              {getTicketList()}
            </box>
          </Paper>
        </Grid>

        {/**
         * This is the ticket Detail block
         */}
        <Grid item sm={12} md={6}>
          <Paper
            className={classes.paper}
            style={{ maxHeight: 720, overflow: 'auto' }}
          >
            <div className={classes.listItemClass}>
              <Box display="flex" flexDirection="row">
                <Avatar
                  alt="IV"
                  src="/static/images/products/product_1.png"
                  className={classes.large}
                />
                <Box
                  display="flex"
                  flexDirection="column"
                  className={classes.ticketMargin}
                >
                  <Typography variant="body1" className={classes.textBold}>
                    {viewticket.ticketNumber}
                  </Typography>
                  <Typography variant="h3" color="textPrimary">
                    {viewticket.ticketSubject}
                  </Typography>
                </Box>
              </Box>
              <div display="flex" flexDirection="row">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<AttachFileIcon />}
                >
                  Attach
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<LinkIcon />}
                >
                  Link issue
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  // startIcon={<LinkIcon />}
                  // onClick={setOpentimeline(true)}
                >
                  History
                </Button>
              </div>
              <div className={classes.boxDiv}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  fontWeight="fontWeightMedium"
                  className={classes.detailTitle}
                >
                  Details
                </Typography>
                <div style={{ paddingRight: 15, paddingLeft: 15 }}>
                  <Grid container spacing={0}>
                    <Grid container item xs={12} spacing={1}>
                      <React.Fragment>
                        <Grid item xs={6}>
                          <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                          >
                            <Typography
                              variant="body1"
                              style={{
                                fontWeight: '500',
                                float: 'left',
                                width: '35%'
                              }}
                            >
                              Type :
                            </Typography>
                            <Box
                              display="flex"
                              flexDirection="row"
                              className={classes.valueClass}
                            >
                              {/* <OfflineBoltIcon style={{ color: purple[500] }} /> */}
                              <Typography
                                variant="body1"
                                className={classes.ticketMargin}
                                component="span"
                              >
                                {viewticket.ticketType}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                          >
                            <Typography
                              variant="body1"
                              style={{
                                fontWeight: '500',
                                float: 'left',
                                width: '35%'
                              }}
                            >
                              Priority :
                            </Typography>
                            <Box
                              display="flex"
                              flexDirection="row"
                              className={classes.valueClass}
                            >
                              {viewticket.priority === 'Medium' ? (
                                <ArrowUpwardIcon
                                  style={{ color: purple[500] }}
                                />
                              ) : (
                                <></>
                              )}
                              {viewticket.priority === 'High' ? (
                                <ArrowUpwardIcon
                                  style={{ color: orange[500] }}
                                />
                              ) : (
                                <></>
                              )}
                              {viewticket.priority === 'Low' ? (
                                <ArrowDownwardIcon
                                  style={{ color: green[500] }}
                                />
                              ) : (
                                <></>
                              )}
                              <Typography
                                variant="body1"
                                className={classes.ticketMargin}
                                component="span"
                              >
                                {viewticket.priority}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </React.Fragment>
                    </Grid>
                    <Grid container item xs={12} spacing={1}>
                      <React.Fragment>
                        <Grid item xs={6}>
                          <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                          >
                            <Typography
                              variant="body1"
                              style={{
                                fontWeight: '500',
                                float: 'left',
                                width: '35%'
                              }}
                            >
                              Category :
                            </Typography>
                            <Box
                              display="flex"
                              flexDirection="row"
                              className={classes.valueClass}
                            >
                              <Typography
                                variant="body1"
                                className={classes.ticketMargin}
                                component="span"
                              >
                                {viewticket.category}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                          >
                            <Typography
                              variant="body1"
                              style={{
                                fontWeight: '500',
                                float: 'left',
                                width: '35%'
                              }}
                            >
                              Status :
                            </Typography>
                            <Box
                              display="flex"
                              flexDirection="row"
                              className={classes.valueClass}
                            >
                              <Typography
                                component="span"
                                variant="body1"
                                // style={{ color: green[500] }}
                                className={classes.ticketMargin}
                              >
                                {viewticket.status}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </React.Fragment>
                    </Grid>
                  </Grid>
                </div>
              </div>
              <div className={classes.boxDiv}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  fontWeight="fontWeightMedium"
                  className={classes.detailTitle}
                >
                  Description
                </Typography>
                <TextField
                  id="outlined-textarea"
                  placeholder="Add a description..."
                  rows={10}
                  fullWidth
                  multiline
                  variant="outlined"
                  value={viewticket.ticketDescription}
                />
              </div>
              {/* <div component="div" className={classes.boxDiv}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  className={classes.detailTitle}
                >
                  Attachments
                </Typography>
                <TextField
                  id="outlined-textarea"
                  placeholder="Drop files to attach, or browse"
                  rows={5}
                  rowsMax={20}
                  multiline
                  fullWidth
                  variant="outlined"
                />
              </div> */}
            </div>
          </Paper>
        </Grid>

        {/**
         * This is the ticket Metadata block
         */}
        <Grid item sm={12} md={3}>
          <Paper className={classes.paper}>
            <div className={classes.metadataClass}>
              <Box
                display="flex"
                flexDirection="row"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  Distributor
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  {/* <Avatar className={classes.green}>SA</Avatar> */}
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                  >
                    {viewticket.distributorName}
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  Distributor Id
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                  >
                    {viewticket.distributorId}
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  Escalation
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  {/* <Avatar className={classes.green}>AS</Avatar> */}
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                  >
                    {/* {viewticket.media} */}
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  Source Id
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                  >
                    {viewticket.mediaId}
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  Source Media
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                  >
                    {viewticket.media}
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  Assigned To
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                  >
                    {/* {viewticket.media} */}
                  </Typography>
                </Box>
              </Box>
            </div>
            <Divider light />
            <div className={classes.metadataClass}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.dateMargin}
              >
                <Typography variant="body1" className={classes.valueClass}>
                  Due:
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.ticketMargin}
                  component="span"
                >
                  {/* 20/12/2020 */}
                </Typography>
              </Box>

              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.dateMargin}
              >
                <Typography variant="body1" className={classes.valueClass}>
                  Created:
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.ticketMargin}
                  component="span"
                >
                  {new Date(viewticket.createdAt).toLocaleString(undefined, {
                    timeZone: 'Asia/Kolkata'
                  })}
                  {/* {viewticket.createdAt} */}
                </Typography>
              </Box>

              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.dateMargin}
              >
                <Typography variant="body1" className={classes.valueClass}>
                  Updated:
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.ticketMargin}
                  component="span"
                >
                  {new Date(viewticket.updatedAt).toLocaleString(undefined, {
                    timeZone: 'Asia/Kolkata'
                  })}
                  {/* {viewticket.updatedAt} */}
                </Typography>
              </Box>
            </div>
          </Paper>
        </Grid>
      </Grid>

      <br />
      <ExpansionPanel defaultColapsed>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            Ticket History{' '}
            {/* {TouchPoint.length ? (
                <lablel>
                  {Distributer.DistributerId} {Distributer.DistributerName}
                </lablel>
              ) : null} */}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style={{ width: '100%' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableRow>
                <TableCell className="GridCell">Time</TableCell>
                <TableCell className="GridCell">Updated By</TableCell>
                <TableCell className="GridCell">Status</TableCell>
                <TableCell className="GridCell">Assigned</TableCell>
                <TableCell className="GridCell">Category</TableCell>
                <TableCell className="GridCell">Priority</TableCell>
                <TableCell className="GridCell">Remarks</TableCell>
              </TableRow>
              {ticketHistory.map((item, idx) => (
                <TableRow>
                  <TableCell>{item.createdTime}</TableCell>
                  <TableCell>{item.updatedByName}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.assignedExecutiveName}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.priority}</TableCell>
                  <TableCell>{item.remarks}</TableCell>
                </TableRow>
              ))}
            </Table>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
