import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import config from '../../views/config.json';
import {
  Paper,
  Grid,
  List,
  ListItem,
  Divider,
  ListItemText,
  Typography,
  ListItemIcon,
  Box,
  Button,
  Avatar,
  TextField,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip
} from '@material-ui/core';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import { purple, orange, green, grey } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import LinkIcon from '@material-ui/icons/Link';
import AddIcon from '@material-ui/icons/Add';
import CreateTicket from '../create-ticket';
import FilterTicket from '../filter-ticket';
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Timeline from './timeline';
import HistoryIcon from '@material-ui/icons/History';
import { blue, teal, lime } from '@material-ui/core/colors';

const drawerWidth = 350;
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
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(1, 1)
  },
  rounded: {
    color: '#fff',
    backgroundColor: '#303030',
    float: 'right',
    marginBottom: 15,
    marginRight: 10,
    height: 30,
    width: 30
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    backgroundColor: purple[700]
  }
}));

export default function TicketDashboard(props) {
  const classes = useStyles();
  const [ticket, setTicket] = useState({});
  const [clickChild, setClickChild] = useState();
  const [apiTickets, setApiTickets] = useState([]);
  const [viewticket, setviewTickets] = useState({});
  const [opentimeline, setOpentimeline] = React.useState(false);
  //const [ticketNumber, setTicketNumber] = useState('');
  const [distributorName, setDistributorName] = useState('');
  const [filterDistributorName, setFilterDistributorName] = useState('');
  const [distributorId, setDistributorId] = useState('');
  const [distributorEmail, setDistributorEmail] = useState('');
  const [distributorMobile, setDistributorMobile] = useState('');
  const [createdByName, setCreatedByName] = useState('');
  const [createdById, setCreatedById] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [remarks, setRemarks] = useState('');
  const [ticketTypes, setTicketTypes] = useState({ value: '', label: '' });
  const [createdTime, setCreatedTime] = useState();
  const [ticketType, setTicketType] = useState({ value: '', label: '' });
  // const [ticketType, setTicketType] = useState({
  //   ticketTypeId: '',
  //   ticketType: ''
  // });

  const [ticketHistory, setTicketHistory] = useState([]);
  const [medium, setMedium] = useState([]);
  const [media, setMedia] = useState({
    value: '',
    label: ''
  });
  const [subCategory, setSubCategory] = useState({
    value: '',
    label: ''
  });
  const [subCategoryItems, setSubCategoryItems] = useState([]);
  const [subCategoryItem, setSubCategoryItem] = useState({
    value: '',
    label: ''
  });
  const [categories, setCategories] = useState([]);

  const [subCategories, setSubCategories] = useState([]);

  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState({
    value: '',
    label: ''
  });
  const [priorities, setPriorities] = useState([]);
  const [priority, setPriority] = useState({
    value: '',
    label: '',
    sla: 0
  });
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState({
    value: '',
    label: ''
  });
  const [executives, setExecutives] = useState([]);
  const [executive, setExecutive] = useState({
    value: '',
    label: '',
    executiveEmail: '',
    executiveMobile: ''
  });
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleTimelineOpen = () => {
    setOpentimeline(true);
  };
  const handleTimelineClose = () => {
    setOpentimeline(false);
  };

  const [type, setTickettype] = React.useState({});
  const handleTicketTypeChange = event => {
    setTicketTypes(ticketTypes);
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

  const handlePriorityChange = event => {
    setPriority(event.target.value);
  };

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
  const [category, setCategory] = React.useState({});
  const handleCategoryChange = event => {
    setCategory(category);
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
  const [status, setStatus] = React.useState({});
  const handleStatusChange = event => {
    setStatus(status);
  };

  const [open, setOpen] = React.useState(false);
  const [isEditable, makeEditable] = React.useState(false);
  const [filter, openFilter] = React.useState(false);
  const [tickets, setTickets] = useState([]);
 const [openEdit, setOpenEdit] = React.useState(false);

 const handleClickOpenEdit = () => {
   setOpenEdit(true);
 };

 const handleCloseEdit = () => {
   setOpenEdit(false);
 };
  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/tickets');
      const body = await response.json();
      if (!unmounted) {
        setApiTickets(body.data);
        console.log('tickets', body.data);
        setTickets(body.data);
        setviewTickets(body.data[0]);

        //  setLoading(false);
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, []);

  const viewTicket = item => {
    console.log('item', item);
    setviewTickets(item);
    //setTicketNumber(item.ticketNumber);
    setCreatedTime(item.createdTime);
    setTicketDescription(item.ticketDescription);
    setRemarks(item.ticketRemarks);
    setTicketSubject(item.ticketSubject);
    setCategory({
      label: item.category,
      value: item.categoryId
    });
    setSubCategory({
      label: item.subCategory,
      value: item.subCategoryId
    });
    setSubCategoryItems({
      label: item.subCategoryItem,
      value: item.subCategoryItemId
    });
    setPriority({
      label: item.priority,
      value: item.priorityId
    });
    setMedia({
      label: item.media,
      value: item.mediaId
    });
    setDistributorEmail(item.distributorEmail);
    setDistributorId(item.distributorId);
    setDistributorMobile(item.distributorMobile);
    setDistributorName(item.distributorName);
    setTicketType({
      label: item.ticketType,
      value: item.ticketTypeId
    });

    console.log('item', item);
    let unmounted = false;
    async function getHistoryItems() {
      const response = await fetch(
        config.APIS_URL + '/ticketHistory/' + item._id
      );
      const tktHistory = (await response.json()).data;

      if (!unmounted) {
        setTicketHistory(tktHistory);
      }
    }
    getHistoryItems();
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
          .filter(tkt =>
            category.label === 'All'
              ? tkt.category === tkt.category
              : tkt.category === category.label
          )
          .filter(tkt =>
            media.label === 'All'
              ? tkt.media === tkt.media
              : tkt.media === media.label
          )
          .filter(tkt =>
            ticketType.label === 'All'
              ? tkt.ticketType === tkt.ticketType
              : tkt.ticketType === ticketType.label
          )
          .filter(tkt =>
            priority.label === 'All'
              ? tkt.priority === tkt.priority
              : tkt.priority === priority.label
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
                      <Avatar
                        className={classes.small}
                        style={{ backgroundColor: ticket.color|| purple[700] }}
                      >
                        {ticket.status.substring(0, 1)}
                      </Avatar>

                      <span
                        className={classes.ticketMargin}
                        onClick={() => viewTicket(ticket)}
                      >
                        {ticket.ticketNumber}
                      </span>
                    </ListItemIcon>
                  </div>
                  <Typography
                    variant="body2"
                    color="textPrimary"
                    style={{ textOverflow: 'ellipsis' }}
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
  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/categories');
      const body = await response.json();
      if (!unmounted) {
        setCategories(
          ...[{ label: 'All', value: '' }],
          ...body.data.map(({ _id, category }) => ({
            label: category,
            value: _id
          }))
        );
        setLoading(false);

        setCategory({
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
  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/priorities');
      const body = await response.json();
      if (!unmounted) {
        setPriorities(
          ...[{ label: 'All', value: '' }],
          ...body.data.map(({ _id, priority }) => ({
            label: priority,
            value: _id
          }))
        );
        setLoading(false);
        setPriority({
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

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/tickettypes');
      const body = await response.json();
      if (!unmounted) {
        setTicketTypes(
          ...[{ label: 'All', value: '' }],
          ...body.data.map(({ _id, ticketType }) => ({
            label: ticketType,
            value: _id
          }))
        );
        setLoading(false);
        setTicketType({
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

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/medium');
      const body = await response.json();
      if (!unmounted) {
        setMedium(
          ...[{ label: 'All', value: '' }],
          ...body.data.map(({ _id, media }) => ({
            label: media,
            value: _id
          }))
        );
        setLoading(false);
        setMedia({
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
  /* 
  const addRow = () => {
    const viewtkt = JSON.parse(localStorage.getItem('viewtkt'));

    const apiUrl = config.APIS_URL + '/tickets';
    var apiParam = {
      method: viewtkt ? 'PUT' : 'POST',
      headers: {
        ticketNumber,
        createdTime,
        distributorName,
        distributorId,
        distributorEmail,
        distributorMobile,
        createdByName,
        createdById,
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

    fetch(apiUrl, apiParam)
      .then(res => res.json())
      .then(repos => {
        console.log('api res', repos);

        if (repos.status === 200) {
          setOpen(false);
        }
      });
    console.log('apiParam', apiParam);
    if (viewtkt) {
      apiParam.headers = {
        ...apiParam.headers,
        ticketid: viewtkt._id
      };
    }
  }; */

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const configureEditable = () => {
    if (isEditable) {
      makeEditable(false);
    } else {
      makeEditable(true);
    }
  };
  const makeEditableFalse = () => {
    makeEditable(false);
  };

  const configureFilter = () => {
    if (filter) {
      openFilter(false);
    } else {
      openFilter(true);
    }
  };
  var createTicket = () => {};
  return (
    <div className={classes.root}>
      <Box component="span">
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
        <Button
          variant="outlined"
          color="primary"
          size="small"
          style={{ marginBottom: 15, marginLeft: 10 }}
          startIcon={<EqualizerIcon />}
        >
          <Link to="/ticket-report">Report</Link>
        </Button>
        <Tooltip title="Filter">
          <Avatar variant="rounded" className={classes.rounded}>
            <FilterListIcon onClick={configureFilter} />
          </Avatar>
        </Tooltip>
        {/* <Button
          variant="outlined"
          color="primary"
          size="small"
          style={{ marginBottom: 15, marginLeft: 10 }}
          startIcon={<FilterListIcon />}
          onClick={configureFilter}
        ></Button> */}
      </Box>
      {(() => {
        if (filter) {
          return (
            <FilterTicket
              //ticketNumber={ticketNumber}
              /*  setTicketNumber={tks => {
                setTicketNumber(tks);
              }} */
              ticketTypes={ticketTypes}
              setTicketTypes={tkstyps => {
                setTicketTypes(tkstyps);
              }}
              ticketType={ticketType}
              setTicketType={tkstyp => {
                setTicketType(tkstyp);
              }}
              medium={medium}
              setMedium={mdm => {
                setMedium(mdm);
              }}
              media={media}
              setMedia={media => {
                setMedia(media);
              }}
              categories={categories}
              setCategories={catgs => {
                setCategories(catgs);
              }}
              category={category}
              setCategory={cat => {
                setCategory(cat);
              }}
              subCategories={subCategories}
              setSubCategories={subcats => {
                setSubCategories(subcats);
              }}
              subCategory={subCategory}
              setSubCategory={subcat => {
                setSubCategory(subcat);
              }}
              subCategoryItems={subCategoryItems}
              setSubCategoryItems={subcatitems => {
                setSubCategoryItems(subcatitems);
              }}
              subCategoryItem={subCategoryItem}
              setSubCategoryItem={subcatitem => {
                setSubCategoryItem(subcatitem);
              }}
              priorities={priorities}
              setPriorities={prts => {
                setPriorities(prts);
              }}
              priority={priority}
              setPriority={prt => {
                setPriority(prt);
              }}
              statuses={statuses}
              setStatuses={stses => {
                setStatuses(stses);
              }}
              status={status}
              setStatus={sts => {
                setStatus(sts);
              }}
            />
          );
        }
      })()}

      <Dialog
        open={open}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box component="span" className={classes.drawerHeader}>
            <EditIcon />
            <Typography
              variant="h4"
              color="textPrimary"
              style={{ marginLeft: 10 }}
            >
              Create Ticket
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <CreateTicket
            setClick={click => (createTicket = click)}
            setOpen={open => setOpen(open)}
            ticket={ticket}
          />
          {/*    <CreateTicket
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
              setRemarks(rks);
            }}
            ticketTypes={ticketTypes}
            setTicketTypes={tkstyps => {
              setTicketTypes(tkstyps);
            }}
            ticketType={ticketType}
            setTicketType={tkstyp => {
              setTicketType(tkstyp);
            }}
            medium={medium}
            setMedium={mdm => {
              setMedium(mdm);
            }}
            media={media}
            setMedia={media => {
              setMedia(media);
            }}
            categories={categories}
            setCategories={catgs => {
              setCategories(catgs);
            }}
            category={category}
            setCategory={cat => {
              setCategory(cat);
            }}
            subCategories={subCategories}
            setSubCategories={subcats => {
              setSubCategories(subcats);
            }}
            subCategory={subCategory}
            setSubCategory={subcat => {
              setSubCategory(subcat);
            }}
            subCategoryItems={subCategoryItems}
            setSubCategoryItems={subcatitems => {
              setSubCategoryItems(subcatitems);
            }}
            subCategoryItem={subCategoryItem}
            setSubCategoryItem={subcatitem => {
              setSubCategoryItem(subcatitem);
            }}
            departments={departments}
            setDepartments={deps => {
              setDepartments(deps);
            }}
            department={department}
            setDepartment={dept => {
              setDepartment(dept);
            }}
            teams={teams}
            setTeams={tms => {
              setTeams(tms);
            }}
            team={team}
            setTeam={tm => {
              setTeam(tm);
            }}
            priorities={priorities}
            setPriorities={prts => {
              setPriorities(prts);
            }}
            priority={priority}
            setPriority={prt => {
              setPriority(prt);
            }}
            statuses={statuses}
            setStatuses={stses => {
              setStatuses(stses);
            }}
            status={status}
            setStatus={sts => {
              setStatus(sts);
            }}
            executives={executives}
            setExecutives={exts => {
              setExecutives(exts);
            }}
            executive={executive}
            setExecutive={ext => {
              setExecutive(ext);
            }}
            createdTime={createdTime}
            setCreatedTime={cretime => {
              setCreatedTime(cretime);
            }}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => createTicket()}
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
            Close
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
            {tickets.length > 0 ? (
              <Box component="div" overflow="auto">
                <h3>All</h3>
                {getTicketList()}
              </Box>
            ) : (
              <></>
            )}
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
                {/* <Tooltip title="Edit"> */}
                <Button onClick={handleClickOpenEdit}>
                  <EditIcon style={{ marginTop: 25, cursor: 'pointer' }} />
                </Button>
                {/* dialog */}
                <Dialog
                  open={openEdit}
                  fullWidth
                  maxWidth="md"
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    <Box component="span" className={classes.drawerHeader}>
                      <EditIcon />
                      <Typography
                        variant="h4"
                        color="textPrimary"
                        style={{ marginLeft: 10 }}
                      >
                        Edit Ticket
                      </Typography>
                    </Box>
                  </DialogTitle>
                  <DialogContent dividers>
                    <CreateTicket
                      setClick={click => (createTicket = click)}
                      setOpen={open => setOpenEdit(open)}
                      ticket_id={viewticket._id}
                    />
                   
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => createTicket()}
                      color="primary"
                      variant="contained"
                      size="small"
                    >
                      Create
                    </Button>
                    <Button
                      onClick={handleCloseEdit}
                      color="primary"
                      size="small"
                      variant="outlined"
                      autoFocus
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
                {/* </Tooltip> */}
              </Box>
              <Box component="div" display="flex" flexDirection="row">
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
                  startIcon={<HistoryIcon />}
                  onClick={handleTimelineOpen}
                >
                  History
                </Button>
                <Dialog
                  open={opentimeline}
                  fullWidth
                  maxWidth="md"
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {'Timeline'}
                  </DialogTitle>
                  <DialogContent dividers>
                    <Timeline />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleTimelineClose}
                      color="primary"
                      size="small"
                      variant="outlined"
                      autoFocus
                    >
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
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
                          {isEditable ? (
                            <TextField
                              id="type"
                              select
                              value={type}
                              onChange={handleTicketTypeChange}
                              SelectProps={{
                                native: true
                              }}
                            >
                              {ticketTypes.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          ) : (
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
                          )}
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
                          {isEditable ? (
                            <TextField
                              id="priority"
                              select
                              value={priority}
                              onChange={handlePriorityChange}
                              SelectProps={{
                                native: true
                              }}
                            >
                              {priorityList.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          ) : (
                            <Box
                              display="flex"
                              flexDirection="row"
                              className={classes.valueClass}
                            >
                              <ArrowUpwardIcon style={{ color: orange[500] }} />
                              <Typography
                                variant="body1"
                                className={classes.ticketMargin}
                                component="span"
                              >
                                {viewticket.priority}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={1}>
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
                          {isEditable ? (
                            <TextField
                              id="category"
                              select
                              value={category}
                              onChange={handleCategoryChange}
                              SelectProps={{
                                native: true
                              }}
                            >
                              {categoryList.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          ) : (
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
                          )}
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
                          {isEditable ? (
                            <TextField
                              id="status"
                              select
                              value={status}
                              onChange={handleStatusChange}
                              SelectProps={{
                                native: true
                              }}
                            >
                              {statusList.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          ) : (
                            <Box
                              display="flex"
                              flexDirection="row"
                              className={classes.valueClass}
                            >
                              <Typography
                                component="span"
                                variant="body1"
                                className={classes.ticketMargin}
                              >
                                {viewticket.status}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Grid>
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
                {isEditable ? (
                  <TextField
                    id="outlined-textarea"
                    placeholder="Add a description..."
                    value={viewticket.ticketDescription}
                    rows={5}
                    fullWidth
                    multiline
                    variant="outlined"
                  />
                ) : (
                  <TextField
                    id="outlined-textarea"
                    placeholder="Add a description..."
                    value={viewticket.ticketDescription}
                    rows={5}
                    fullWidth
                    multiline
                    variant="outlined"
                    InputProps={{
                      readOnly: true
                    }}
                  />
                )}
              </div>
              <div className={classes.boxDiv}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  fontWeight="fontWeightMedium"
                  className={classes.detailTitle}
                >
                  Comments
                </Typography>
                {isEditable ? (
                  <TextField
                    id="outlined-textarea"
                    placeholder="Add a comment..."
                    value={viewticket.remarks}
                    rows={5}
                    fullWidth
                    multiline
                    variant="outlined"
                  />
                ) : (
                  <TextField
                    id="outlined-textarea"
                    placeholder="Add a comment..."
                    value={viewticket.remarks}
                    rows={5}
                    fullWidth
                    multiline
                    variant="outlined"
                    InputProps={{
                      readOnly: true
                    }}
                  />
                )}
              </div>
              {(() => {
                if (isEditable) {
                  return (
                    <div className={classes.boxDiv}>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        style={{
                          float: 'right'
                        }}
                        onClick={makeEditableFalse}
                      >
                        Save
                      </Button>
                    </div>
                  );
                }
              })()}
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
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                  ></Typography>
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
                    {viewticket.assignedExecutive}
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
                  Created By
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
                    {viewticket.createdByName}
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
                ></Typography>
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
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.ticketMargin}
                  component="span"
                ></Typography>
              </Box>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
