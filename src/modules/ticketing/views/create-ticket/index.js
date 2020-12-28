import React from 'react';
import { Grid, TextField, Drawer } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import config from '../../views/config.json';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { useDropzone } from 'react-dropzone';
import { add } from 'lodash';

const useStyles = makeStyles(theme => ({
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
  },
  // new code
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function CreateTicket(props) {
  const classes = useStyles();
  //new code
  /* const [ticketNumber, setTicketNumber] = useState('');
  const [distributorName, setDistributorName] = useState('');
  const [distributorId, setDistributorId] = useState('');
  const [distributorEmail, setDistributorEmail] = useState('');
  const [distributorMobile, setDistributorMobile] = useState('');
  const [createdByName, setCreatedByName] = useState('');
  const [createdById, setCreatedById] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [remarks, setRemarks] = useState('');
  const [viewtkt, setViewtkt] = useState({});
  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketType, setTicketType] = useState({
    ticketTypeId: '',
    ticketType: ''
  });
  const [open, setOpen] = React.useState(true);
  const [medium, setMedium] = useState([]);
  const [media, setMedia] = useState({
    value: '',
    label: ''
  });
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    value: '',
    label: ''
  });
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

  const [loading, setLoading] = useState(true);
  const [createdTime, setCreatedTime] = useState();
  const [file, setFile] = useState('');
  const [updatedByName, setUpdatedByName] = useState('');
  const [updatedById, setUpdatedById] = useState('');
  const [updatedTime, setUpdatedTime] = useState();
  const [ticketHistory, setTicketHistory] = useState([]); */
  const [ticketNumber, setTicketNumber] = useState('');
  const [ticketHistory, setTicketHistory] = useState([]);
  const [distributorName, setDistributorName] = useState('');
  const [distributorId, setDistributorId] = useState('');
  const [distributorEmail, setDistributorEmail] = useState('');
  const [distributorMobile, setDistributorMobile] = useState('');
  const [createdByName, setCreatedByName] = useState('');
  const [createdById, setCreatedById] = useState('');
  const [updatedByName, setUpdatedByName] = useState('');
  const [updatedById, setUpdatedById] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [remarks, setRemarks] = useState('');
  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketType, setTicketType] = useState({
    ticketTypeId: '',
    ticketType: ''
  });
  const [medium, setMedium] = useState([]);
  const [media, setMedia] = useState({ value: '', label: '' });
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
  const [team, setTeam] = useState({ value: '', label: '' });
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
    slaOnHold: false,
    closed: false,
    color: 'green'
  });
  const [executives, setExecutives] = useState([]);
  const [executive, setExecutive] = useState({
    value: '',
    label: '',
    executiveEmail: '',
    executiveMobile: ''
  });

  const [loading, setLoading] = useState(true);
  const [createdTime, setCreatedTime] = useState();
  const [updatedTime, setUpdatedTime] = useState();
  const [file, setFile] = useState('');

  const handleChange = (ctrl, e) => {
    switch (ctrl) {
      case 'ticketNumber':
        setTicketNumber(e.target.value);
        return props.setClick(createTicket);
      case 'distributorName':
        setDistributorName(e.target.value);
        return props.setClick(createTicket);
      case 'distributorId':
        setDistributorId(e.target.value);
        return props.setClick(createTicket);
      case 'distributorEmail':
        setDistributorEmail(e.target.value);
        return props.setClick(createTicket);
      case 'distributorMobile':
        setDistributorMobile(e.target.value);
        return props.setClick(createTicket);
      case 'createdByName':
        setCreatedByName(e.target.value);
        return props.setClick(createTicket);
      case 'createdById':
        setCreatedById(e.target.value);
        return props.setClick(createTicket);
      case 'ticketSubject':
        setTicketSubject(e.target.value);
        return props.setClick(createTicket);
      case 'ticketDescription':
        setTicketDescription(e.target.value);
        return props.setClick(createTicket);
      case 'remarks':
        setRemarks(e.target.value);
        return props.setClick(createTicket);
      case 'file':
        setFile(e.target.files[0]);
        return props.setClick(createTicket);
      default:
        return props.setClick(createTicket);
    }

    // const file = e.target.files[0]; // accesing file
    // console.log(file);
    // setFile(file); // storing file
  };
  useEffect(() => {
    props.setClick(createTicket);
  }, [ticketNumber, distributorName]);
  useEffect(() => {
    //  alert(JSON.stringify(props))
    if (!props.ticket_id) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var charactersLength = characters.length;
      for (var i = 0; i < 5; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      let newDate = new Date();
      let date = newDate.getDate().toString();
      let month = (newDate.getMonth() + 1).toString();
      let year = newDate.getFullYear().toString();
      setTicketNumber('TKT' + year + month + date + result);

      setCreatedTime(new Date().toDateString());
      setUpdatedTime(new Date().toDateString());
      props.setClick(createTicket);
    } else {
      let unmounted = false;
      async function getItems() {
        const response = await fetch(
          config.APIS_URL + '/tickets/' + props.ticket_id
        );
        const tkt = (await response.json()).data[0];
        console.log('else ', tkt);
        // alert(JSON.stringify(tkt))
        if (!unmounted) {
          setTicketNumber(tkt.ticketNumber);
          setCreatedTime(tkt.createdTime);
          setUpdatedTime(new Date().toDateString());
          setDistributorName(tkt.distributorName);
          setDistributorId(tkt.distributorId);
          setDistributorEmail(tkt.distributorEmail);
          setDistributorMobile(tkt.distributorMobile);
          setCreatedByName(tkt.createdByName);
          setCreatedById(tkt.createdById);
          setUpdatedByName(tkt.createdByName);
          setUpdatedById(tkt.createdById);
          setTicketSubject(tkt.ticketSubject);
          setTicketDescription(tkt.ticketDescription);
          setRemarks(tkt.ticketRemarks);

          setTicketType({
            value: tkt.ticketTypeId,
            label: tkt.ticketType
          });
          setMedia({ value: tkt.mediaId, label: tkt.media });

          await setCategory({ value: tkt.categoryId, label: tkt.category });
          getSubCategories(tkt.categoryId);
          // alert(JSON.stringify(tkt))
          // alert(JSON.stringify(category));
          setSubCategory({
            value: tkt.subCategoryId,
            label: tkt.subCategory
          });

          setSubCategoryItem({
            value: tkt.subCategoryItemId,
            label: tkt.subCategoryItem
          });

          getSubCategoryItems(tkt.categoryId, tkt.subCategoryId);
          setDepartment({
            value: tkt.assignedDepartmentId,
            label: tkt.assignedDepartment
          });
          setTeam({ value: tkt.assignedTeamId, label: tkt.assignedTeam });
          setPriority({
            value: tkt.priorityId,
            label: tkt.priority,
            sla: tkt.sla
          });
          setStatus({
            value: tkt.statusId,
            label: tkt.status,
            slaOnHold: tkt.slaOnHold,
            closed: tkt.closed,
            color: tkt.color
          });
          setExecutive({
            value: tkt.assignedExecutiveId,
            label: tkt.assignedExecutive,
            executiveEmail: tkt.assignedExecutiveEmail,
            executiveMobile: tkt.assignedExecutiveMobile
          });
        }
      }
      getItems();
      // async function getHistoryItems() {
      //   const response = await fetch(
      //     config.APIS_URL + '/ticketHistory/' + props.ticket_id
      //   );
      //   const tktHistory = (await response.json()).data;

      //   if (!unmounted) {
      //     setTicketHistory(tktHistory);
      //   }
      // }
      // getHistoryItems();
      props.setClick(createTicket);
      return () => {
        unmounted = true;
      };
    }

    props.setClick(createTicket);
  }, []);

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/tickettypes');
      const body = await response.json();
      if (!unmounted) {
        setTicketTypes(
          body.data.map(({ _id, ticketType }) => ({
            label: ticketType,
            value: _id
          }))
        );
        setLoading(false);
        if (!props.ticket_id) {
          body.data[0]
            ? setTicketType({
                label: body.data[0].ticketType,
                value: body.data[0]._id
              })
            : setTicketType({});
        }
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
          body.data.map(({ _id, media, nameLabel, idLabel }) => ({
            label: media,
            value: _id,
            nameLabel: nameLabel,
            idLabel: idLabel
          }))
        );
        setLoading(false);
        if (!props.ticket_id) {
          body.data[0]
            ? setMedia({
                label: body.data[0].media,
                value: body.data[0]._id,
                nameLabel: body.data[0].nameLabel,
                idLabel: body.data[0].idLabel
              })
            : setMedia({});
        }
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
      const response = await fetch(config.APIS_URL + '/categories');
      const body = await response.json();
      if (!unmounted) {
        // alert(JSON.stringify(props))
        if (!props.ticket_id) {
          // alert("if")
          body.data[0]
            ? setCategory({
                label: body.data[0].category,
                value: body.data[0]._id
              })
            : setCategory({});
        }
        //  else {
        //   alert("useeffect", category)
        //   setCategory({
        //     label: category.label,
        //     value: category.value
        //   });
        // }
        setCategories(
          body.data.map(({ _id, category }) => ({
            label: category,
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

  const getSubCategories = cat => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/subcategories/' + cat);
      const body = await response.json();
      if (!unmounted) {
        setSubCategories(
          body.data.map(({ _id, subCategory }) => ({
            label: subCategory,
            value: _id
          }))
        );
        if (!props.ticket_id) {
          body.data[0]
            ? setSubCategory({
                label: body.data[0].subCategory,
                value: body.data[0]._id
              })
            : setSubCategory({});
        }
        setLoading(false);
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  };
  const getSubCategoryItems = (cat, sct) => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(
        config.APIS_URL + '/subcategoryitems/' + cat + '/' + sct
      );
      const body = await response.json();

      if (!unmounted) {
        setSubCategoryItems(
          body.data.map(({ _id, subCategoryItem }) => ({
            label: subCategoryItem,
            value: _id
          }))
        );

        setLoading(false);
        if (!props.ticket_id) {
          body.data[0]
            ? setSubCategoryItem({
                label: body.data[0].subCategoryItem,
                value: body.data[0]._id
              })
            : setSubCategoryItem({});
        }
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  };

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(
        config.APIS_URL + '/priorities/' + subCategory.value
      );
      const body = await response.json();
      if (!unmounted) {
        setPriorities(
          body.data.map(({ _id, priority, sla }) => ({
            label: priority,
            value: _id,
            sla
          }))
        );
        setLoading(false);
        if (!props.ticket_id) {
          body.data[0]
            ? setPriority({
                label: body.data[0].priority,
                value: body.data[0]._id,
                sla: body.data[0].sla
              })
            : setPriority({});
        }
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, [subCategory.value]);

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/statuses');
      const body = await response.json();
      if (!unmounted) {
        setStatuses(
          body.data.map(({ _id, status, slahold, closed, color }) => ({
            label: status,
            value: _id,
            slaOnHold: slahold,
            closed: closed,
            color: color
          }))
        );
        setLoading(false);
        if (!props.ticket_id) {
          body.data[0]
            ? setStatus({
                label: body.data[0].status,
                value: body.data[0]._id,
                slaOnHold: body.data[0].slahold,
                closed: body.data[0].closed,
                color: body.data[0].color
              })
            : setStatus({});
        }
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
        if (!props.ticket_id) {
          body.data[0]
            ? setDepartment({
                label: body.data[0].department,
                value: body.data[0]._id
              })
            : setDepartment({});
        }
        // else {
        //   setDepartment({
        //     label: props.ticket.assignedDepartment,
        //     value: props.ticket.assignedDepartmentId
        //   });
        // }
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

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(
        config.APIS_URL + '/teams/' + department.value
      );
      const body = await response.json();
      if (!unmounted) {
        if (!props.ticket_id) {
          body.data[0]
            ? setTeam({
                label: body.data[0].team,
                value: body.data[0]._id
              })
            : setTeam({});
        }
        //  else {
        //   setTeam({
        //     label: props.ticket.assignedTeam,
        //     value: props.ticket.assignedTeamId
        //   });
        // }
        setTeams(
          body.data.map(({ _id, team }) => ({
            label: team,
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
  }, [department]);
  useEffect(() => {
    props.setClick(createTicket);
  }, [executive]);
  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(
        config.APIS_URL + '/executives/' + department.value + '/' + team.value
      );
      const body = await response.json();
      if (!unmounted) {
        if (!props.ticket_id) {
          body.data[0]
            ? setExecutive({
                label: body.data[0].executiveName,
                value: body.data[0]._id,
                executiveEmail: body.data[0].executiveEmail,
                executiveMobile: body.data[0].executiveMobile
              })
            : setExecutive({});
          props.setClick(createTicket);
        }
        // else {
        //   setExecutive({
        //     label: props.ticket.assignedExecutiveName,
        //     value: props.ticket.assignedExecutiveId,
        //     executiveEmail: props.ticket.assignedExecutiveEmail,
        //     executiveMobile: props.ticket.assignedExecutiveMobile
        //   });
        // }
        setExecutives(
          body.data.map(
            ({ _id, executiveName, executiveEmail, executiveMobile }) => ({
              label: executiveName,
              value: _id,
              executiveEmail: executiveEmail,
              executiveMobile: executiveMobile
            })
          )
        );
        setLoading(false);
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, [team]);

  useEffect(() => {}, [media, distributorId, distributorMobile]);

  const getDistributorById = () => {
    const apiUrl = config.APIS_URL + '/boapi/distributorbyid';
    var apiParam = {
      method: 'POST',
      headers: { distid: distributorId, key: 'uZpsyVk4yc' }
    };
    fetch(apiUrl, apiParam)
      .then(res => res.json())
      .then(repos => {
        setDistributorId(
          JSON.parse(repos.data).data
            ? JSON.parse(repos.data).data[0].distributor_id || ''
            : ''
        );
        setDistributorName(
          JSON.parse(repos.data).data
            ? JSON.parse(repos.data).data[0].distributor_name || ''
            : ''
        );
        setDistributorMobile(
          JSON.parse(repos.data).data
            ? JSON.parse(repos.data).data[0].mob_no || ''
            : ''
        );
        setDistributorEmail(
          JSON.parse(repos.data).data
            ? JSON.parse(repos.data).data[0].email_id || ''
            : ''
        );
      });
  };
  const getDistributorByMobile = () => {
    const apiUrl = config.APIS_URL + '/boapi/distributorbymobile';
    var apiParam = {
      method: 'POST',
      headers: { mobile: distributorMobile, key: 'uZpsyVk4yc' }
    };
    fetch(apiUrl, apiParam)
      .then(res => res.json())
      .then(repos => {
        setDistributorName(
          JSON.parse(repos.data).data
            ? JSON.parse(repos.data).data[0].distributor_name || ''
            : ''
        );
        setDistributorId(
          JSON.parse(repos.data).data
            ? JSON.parse(repos.data).data[0].distributor_id || ''
            : ''
        );
        setDistributorMobile(
          JSON.parse(repos.data).data
            ? JSON.parse(repos.data).data[0].mob_no || ''
            : ''
        );
        setDistributorEmail(
          JSON.parse(repos.data).data
            ? JSON.parse(repos.data).data[0].email_id || ''
            : ''
        );
      });
  };

  const createTicket = () => {
    // alert(ticketSubject);
    // setTicketNumber('Adeeb');
    var result = addRow();
    // alert(result)
    props.setOpen(result);
    //  props.setOpenEdit(result);
  };
  const addRow = async () => {
    const apiUrl = config.APIS_URL + '/tickets';

    var apiParam = {
      method: props.ticket_id ? 'PUT' : 'POST',
      headers: {
        ticketNumber,
        createdTime,
        updatedTime,
        distributorName,
        distributorId,
        distributorEmail,
        distributorMobile,
        createdByName,
        createdById,
        updatedByName,
        updatedById,
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
        closed: status.closed,
        color: status.color,
        executiveId: executive.value,
        executive: executive.label,
        executiveEmail: executive.executiveEmail,
        executiveMobile: executive.executiveMobile
      }
    };
    if (props.ticket_id) {
      apiParam.headers = {
        ...apiParam.headers,
        ticketid: props.ticket_id
      };
    }
    // console.log(apiParam.headers);
    // alert(JSON.stringify(apiParam));
    await fetch(apiUrl, apiParam)
      .then(res => res.json())
      .then(repos => {
        alert(JSON.stringify(repos));

        if (JSON.stringify(repos.status) === '200') {
          return true;
        } else {
          return false;
        }
      });
  };

  const UploadFile = e => {
    var myHeaders = new Headers();
    myHeaders.append('ticketnumber', ticketNumber);

    var formdata = new FormData();
    formdata.append('SoftCopyFile', file);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    const apiUrl = config.APIS_URL + '/tickets/files';
    fetch(apiUrl, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
  return (
    <div className={classes.root}>
      <form noValidate autoComplete="off">
        <div style={{ width: '100%' }}>
          <TextField
            id="number"
            label="Ticket Number"
            value={ticketNumber}
            variant="outlined"
            size="small"
            style={{ width: '32%' }}
          />
          <TextField
            id="sm"
            size="small"
            label="Ticket Created Time"
            variant="outlined"
            style={{ width: '31%' }}
            value={createdTime}
          ></TextField>
          <br />
          <TextField
            error={distributorId === ''}
            id="dn"
            size="small"
            label="Distributor Id"
            variant="outlined"
            style={{ width: '32%' }}
            value={distributorId}
            onChange={e => {
              handleChange('distributorId', e);
            }}
          />
          <Button
            className="btn btn-primary"
            onClick={() => getDistributorById(distributorId)}
          >
            <SearchIcon color="primary" />
          </Button>
          <TextField
            error={distributorName === ''}
            id="dn"
            size="small"
            label="Distributor Name"
            variant="outlined"
            style={{ width: '31.4%' }}
            value={distributorName}
            onChange={e => {
              handleChange('distributorName', e);
            }}
          />
          <TextField
            error={distributorMobile === ''}
            id="dn"
            size="small"
            label="Distributor Mobile"
            variant="outlined"
            style={{ width: '32%' }}
            value={distributorMobile}
            onChange={e => {
              handleChange('distributorMobile', e);
            }}
          />
          <Button className="btn btn-primary" onClick={getDistributorByMobile}>
            <SearchIcon color="primary" />
          </Button>

          <TextField
            error={distributorEmail === ''}
            id="dn"
            size="small"
            label="Distributor Email"
            variant="outlined"
            style={{ width: '31%' }}
            value={distributorEmail}
            onChange={e => {
              handleChange('distributorEmail', e);
            }}
          />
          <br />

          <TextField
            id="type"
            select
            name="type"
            size="small"
            label="Ticket Type"
            SelectProps={{
              native: true
            }}
            variant="outlined"
            style={{ width: '32%' }}
            value={ticketType.value || ''}
            onChange={e => {
              setTicketType({
                value: e.target.value,
                label: ticketTypes.filter(
                  ticketType => ticketType.value === e.target.value
                )[0].label
              });

              /*  props.setTicketType({
                value: e.target.value,
                label: ticketTypes.filter(
                  ticketType => ticketType.value === e.target.value
                )[0].label
              }); */
            }}
          >
            {ticketTypes.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </TextField>

          <TextField
            id="priorities"
            select
            value={priority.value}
            disabled={loading}
            size="small"
            label="Priority"
            SelectProps={{
              native: true
            }}
            variant="outlined"
            style={{ width: '31%' }}
            onChange={e => {
              setPriority({
                value: e.target.value,
                label: priorities.filter(
                  priority => priority.value === e.target.value
                )[0].label,
                sla: priorities.filter(
                  priority => priority.value === e.target.value
                )[0].sla
              });
              props.setClick(createTicket);
              /* props.setPriority({
                value: e.target.value,
                label: priorities.filter(
                  priority => priority.value === e.target.value
                )[0].label,
                sla: priorities.filter(
                  priority => priority.value === e.target.value
                )[0].sla
              }); */
            }}
          >
            {priorities.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </TextField>
          <TextField
            id="sm"
            select
            size="small"
            label="Status"
            SelectProps={{
              native: true
            }}
            style={{ width: '31%' }}
            variant="outlined"
            value={status.value}
            onChange={e => {
              setStatus({
                value: e.target.value,
                label: statuses.filter(
                  status => status.value === e.target.value
                )[0].label,
                slaOnHold: statuses.filter(
                  status => status.value === e.target.value
                )[0].slaOnHold,
                closed: statuses.filter(
                  status => status.value === e.target.value
                )[0].closed,
                color: statuses.filter(
                  status => status.value === e.target.value
                )[0].color
              });
              props.setClick(createTicket);
              /*  props.setStatus({
                value: e.target.value,
                label: statuses.filter(
                  status => status.value === e.target.value
                )[0].label,
                slaOnHold: statuses.filter(
                  status => status.value === e.target.value
                )[0].slaOnHold
              }); */
            }}
          >
            {statuses.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </TextField>
          <br />

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
            value={category.value}
            onChange={e => {
              setCategory({
                value: e.target.value,
                label: categories.filter(
                  category => category.value === e.target.value
                )[0].label
              });
              props.setClick(createTicket);
              /* props.setCategory({
                value: e.target.value,
                label: categories.filter(
                  category => category.value === e.target.value
                )[0].label
              }); */
              getSubCategories(e.target.value);
            }}
          >
            {' '}
            {categories.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </TextField>
          {subCategories.length > 0 ? (
            <TextField
              id="subcategories"
              select
              size="small"
              label="Sub categories"
              SelectProps={{
                native: true
              }}
              variant="outlined"
              style={{ width: '31%' }}
              value={subCategory.value}
              onChange={e => {
                setSubCategory({
                  value: e.target.value,
                  label: subCategories.filter(
                    subCategory => subCategory.value === e.target.value
                  )[0].label
                });
                getSubCategoryItems(category.value, e.target.value);
                props.setClick(createTicket);
                /* props.setSubCategory({
                  value: e.target.value,
                  label: subCategories.filter(
                    subCategory => subCategory.value === e.target.value
                  )[0].label
                }); */
              }}
            >
              {' '}
              {subCategories.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </TextField>
          ) : (
            <></>
          )}
          {subCategoryItems.length > 0 ? (
            <TextField
              id="subcategoryitems"
              select
              size="small"
              label="Sub categories Items"
              SelectProps={{
                native: true
              }}
              variant="outlined"
              style={{ width: '31.4%' }}
              value={subCategoryItem.value}
              onChange={e => {
                setSubCategoryItem({
                  value: e.target.value,
                  label: subCategoryItems.filter(
                    subCategoryItem => subCategoryItem.value === e.target.value
                  )[0].label
                });
                props.setClick(createTicket);
                /* props.setSubCategoryItem({
                  value: e.target.value,
                  label: subCategoryItems.filter(
                    subCategoryItem => subCategoryItem.value === e.target.value
                  )[0].label
                }); */
              }}
            >
              {' '}
              {subCategoryItems.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </TextField>
          ) : (
            <></>
          )}
          <br />
          <TextField
            error={ticketSubject === ''}
            id="title"
            label="Subject"
            variant="outlined"
            size="small"
            style={{ width: '98%' }}
            value={ticketSubject}
            onChange={e => {
              handleChange('ticketSubject', e);
            }}
          />
          <br />
          <TextField
            error={ticketDescription === ''}
            id="dn"
            label="Description"
            multiline
            rows={5}
            size="small"
            variant="outlined"
            style={{ width: '98%' }}
            value={ticketDescription}
            onChange={e => {
              handleChange('ticketDescription', e);
            }}
          />
          <br />
          <TextField
            error={remarks === ''}
            id="remark"
            label="Remarks"
            multiline
            size="small"
            rows={5}
            variant="outlined"
            style={{ width: '48%' }}
            onChange={e => {
              handleChange('remarks', e);
            }}
            value={remarks}
          />

          <TextField
            id="SoftCopyFile"
            type="file"
            multiple={false}
            variant="outlined"
            style={{ width: '31.4%' }}
            onChange={e => {
              handleChange('file', e);
            }}
          />
          <Button onClick={UploadFile} className="primary" color="secondary">
            Upload
          </Button>
          <br />
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
            value={media.value || ''}
            onChange={e => {
              setMedia({
                value: e.target.value,
                label: medium.filter(media => media.value === e.target.value)[0]
                  .label,
                nameLabel: medium.filter(
                  media => media.value === e.target.value
                )[0].nameLabel,
                idLabel: medium.filter(
                  media => media.value === e.target.value
                )[0].idLabel
              });
              props.setClick(createTicket);
              /* props.setMedia({
                value: e.target.value,
                label: medium.filter(media => media.value === e.target.value)[0]
                  .label,
                nameLabel: medium.filter(
                  media => media.value === e.target.value
                )[0].nameLabel,
                idLabel: medium.filter(
                  media => media.value === e.target.value
                )[0].idLabel
              }); */
            }}
          >
            {medium.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </TextField>
          <TextField
            error={createdById === ''}
            id="snid"
            size="small"
            label={media.idLabel || 'Source Id'}
            variant="outlined"
            style={{ width: '32%' }}
            value={createdById}
            onChange={e => {
              handleChange('createdById', e);
            }}
          />
          <TextField
            error={createdByName === ''}
            id="sn"
            size="small"
            label={media.nameLabel || 'Source Name'}
            variant="outlined"
            style={{ width: '31.4%' }}
            value={createdByName}
            onChange={e => {
              handleChange('createdByName', e);
            }}
          />

          <br />
          <TextField
            id="sm"
            select
            size="small"
            label="Department"
            SelectProps={{
              native: true
            }}
            style={{ width: '31%' }}
            variant="outlined"
            value={department.value}
            onChange={e => {
              setDepartment({
                value: e.target.value,
                label: departments.filter(
                  department => department.value === e.target.value
                )[0].label
              });
              props.setClick(createTicket);
              /* props.setDepartment({
                value: e.target.value,
                label: departments.filter(
                  department => department.value === e.target.value
                )[0].label
              }); */
            }}
          >
            {departments.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </TextField>
          <TextField
            id="sm"
            select
            size="small"
            label="Team"
            variant="outlined"
            style={{ width: '32%' }}
            value={team.value}
            onChange={e => {
              setTeam({
                value: e.target.value,
                label: teams.filter(team => team.value === e.target.value)[0]
                  .label
              });
              props.setClick(createTicket);
              /* props.setTeam({
                value: e.target.value,
                label: teams.filter(team => team.value === e.target.value)[0]
                  .label
              }); */
            }}
          >
            {teams.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </TextField>
          <TextField
            error={executive.value === ''}
            id="sm"
            select
            size="small"
            label="Executive"
            variant="outlined"
            style={{ width: '31.4%' }}
            value={executive.value}
            onChange={e => {
              setExecutive({
                value: e.target.value,
                label: executives.filter(
                  executive => executive.value === e.target.value
                )[0].label,
                executiveEmail: executives.filter(
                  executive => executive.value === e.target.value
                )[0].executiveEmail,
                executiveMobile: executives.filter(
                  executive => executive.value === e.target.value
                )[0].executiveMobile
              });

              props.setClick(createTicket);
              /*  props.setExecutive({
                value: e.target.value,
                label: executives.filter(
                  executive => executive.value === e.target.value
                )[0].label,
                executiveEmail: executives.filter(
                  executive => executive.value === e.target.value
                )[0].executiveEmail,
                executiveMobile: executives.filter(
                  executive => executive.value === e.target.value
                )[0].executiveMobile
              }); */
            }}
          >
            {executives.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </TextField>
          <br />
        </div>
      </form>
    </div>
  );
}
