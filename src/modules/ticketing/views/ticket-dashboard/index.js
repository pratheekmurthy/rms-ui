import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import config from '../../views/config.json';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import HistoryIcon from '@material-ui/icons/History';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import {
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

import { purple, orange, green } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import LinkIcon from '@material-ui/icons/Link';
import AddIcon from '@material-ui/icons/Add';
import CreateTicket from '../create-ticket';
import FilterTicket from '../filter-ticket';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import FilterListIcon from '@material-ui/icons/FilterList';
import Timeline from './timeline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

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

  drawer: {
    flexShrink: 0
  },
  drawerPaper: {
    top: 62
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(1, 1)
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
    fontSize: 9
  }
}));

export default function TicketDashboard() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [opentimeline, setOpentimeline] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [tickets, setTickets] = useState([]);
  const [viewticket, setviewTickets] = useState({});
  const [apiTickets, setApiTickets] = useState([]);
  const [ticketHistory, setTicketHistory] = useState([]);
  const [ticketNumber, setTicketNumber] = useState('');
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
  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketType, setTicketType] = useState({
    ticketTypeId: '',
    ticketType: ''
  });

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
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [createdTime, setCreatedTime] = useState();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
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
        console.log('tickets', repos.data);
        setTickets(repos.data);
        setviewTickets(repos.data[0]);
      });
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
  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/departments');
      const body = await response.json();
      if (!unmounted) {
        //  if (!viewtkt) {
        body.data[0]
          ? setDepartment({
              label: body.data[0].department,
              value: body.data[0]._id
            })
          : setDepartment({});
        //  }

        setDepartments(
          body.data.map(({ _id, department }) => ({
            label: department,
            value: _id
          }))
        );
        setLoading(false);
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, []);
  const viewTicket = item => {
    setviewTickets(item);
    setTicketNumber(item.ticketNumber);
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
    // setStatus({
    //   value: item.statusId,
    //   label: item.status,
    //   slaOnHold: item.slaOnHold
    // });
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
          .map(ticket => (
            <>
              <ListItem
                alignItems="flex-start"
                className={classes.listItemClass}
              >
                <ListItemText>
                  <div className={classes.textBold}>
                    <ListItemIcon>
                      <Avatar className={classes.green}>
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
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };
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
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleTimelineOpen = () => {
    setOpentimeline(true);
  };
  const handleTimelineClose = () => {
    setOpentimeline(false);
  };
  const handleEditOpen = () => {
    setOpenEdit(true);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
  };
  const handleClose = () => {
    setOpen(false);
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
            />
          </ListItem>
        ))}
        {['Inbox'].map((text, index) => (
          <ListItem button key={text}>
            <TextField
              label="Distributor Name"
              id="outlined-size-small"
              value={filterDistributorName}
              onChange={e => setFilterDistributorName(e.target.value)}
              variant="outlined"
              size="small"
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
            />
          </ListItem>
        ))}
        {['Inbox'].map((text, index) => (
          <ListItem button key={text}>
            <TextField
              id="outlined-size-small"
              select
              size="large"
              label="Department"
              SelectProps={{
                native: true
              }}
              // style={{ width: '31%' }}
              variant="outlined"
              value={department.value}
              onChange={e => {
                setDepartment({
                  value: e.target.value,
                  label: departments.filter(
                    department => department.value === e.target.value
                  )[0].label
                });
              }}
            >
              {departments.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </TextField>
          </ListItem>
        ))}
      </List>
      <Divider />
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
          });
        }}
        color="primary"
      >
        All(30)
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
          });
        }}
      >
        New(20)
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
          });
        }}
      >
        Open(5)
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
          });
        }}
      >
        Work In Progress(0)
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
          });
        }}
      >
        Resolved(0)
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
          });
        }}
      >
        Closed(0)
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
          });
        }}
        color="secondary"
      >
        Escalation(0)
      </Button>
      {['right'].map(anchor => (
        <React.Fragment key={anchor}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<FilterListIcon />}
            style={{ marginBottom: 15, float: 'right' }}
            onClick={handleDrawerOpen}
            // onClick={toggleDrawer(anchor, true)}
          >
            Filter
          </Button>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={openDrawer}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              <FilterListIcon />
              <Typography
                variant="h4"
                color="textPrimary"
                style={{ marginLeft: 10 }}
              >
                Filter
              </Typography>
              <div style={{ marginLeft: '64%' }}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </div>
            </div>
            <Divider />
            <FilterTicket />
            <Divider />
            <Button
              variant="contained"
              color="primary"
              size="small"
              width="50"
              style={{ margin: 12 }}
              onClick={handleDrawerClose}
            >
              Save
            </Button>
          </Drawer>
        </React.Fragment>
      ))}
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

      <Dialog
        open={opentimeline}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Timeline'}</DialogTitle>
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
      <Dialog
        open={openEdit}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Edit Ticket'}</DialogTitle>
        <DialogContent dividers>
          <CreateTicket
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
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleEditClose}
            color="primary"
            size="small"
            variant="outlined"
            autoFocus
          >
            Update
          </Button>
          <Button
            onClick={handleEditClose}
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
                  {/* <Tooltip title="Edit">
                    <EditIcon
                      onClick={configureEditable}
                      style={{ marginTop: 25, cursor: 'pointer' }}
                    />
                  </Tooltip> */}
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
                  startIcon={<HistoryIcon />}
                  onClick={handleTimelineOpen}
                >
                  History
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<EditIcon />}
                  onClick={handleEditOpen}
                >
                  Edit
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
                        <Grid item xs={4}>
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
                                width: '40%'
                              }}
                            >
                              Type :
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
                                {viewticket.ticketType}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
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
                                width: '40%'
                              }}
                            >
                              Priority :
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
                                {viewticket.priority}
                              </Typography>
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
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
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
                                width: '40%'
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
                                className={classes.ticketMargin}
                              >
                                {viewticket.status}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </React.Fragment>
                    </Grid>
                    <Grid container item xs={12} spacing={1}>
                      <React.Fragment>
                        <Grid item xs={4}>
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
                                width: '40%'
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
                        {viewticket.subCategory !== '' ? (
                          <Grid item xs={4}>
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
                                  width: '40%'
                                }}
                              >
                                Sub-Category :
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
                                  {viewticket.subCategory}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        ) : (
                          <></>
                        )}
                        {viewticket.subCategoryItem !== '' ? (
                          <Grid item xs={4}>
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
                                  width: '40%'
                                }}
                              >
                                Sub-Category Item :
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
                                  {viewticket.subCategoryItem}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        ) : (
                          <> </>
                        )}
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
              </Box>
            </div>
          </Paper>
        </Grid>
      </Grid>

      <br />
    </div>
  );
}
