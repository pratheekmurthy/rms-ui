import React from 'react';
import { useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import config from '../../views/config.json';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';

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
    minWidth: 220,
    shrink: false
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  searchIcon: {
    cursor: 'pointer',
    marginRight: 10,
    marginTop: 15
  }
}));

export default function CreateTicket(props, dealerDetails) {
  const classes = useStyles();

  const [createAccess, setCreateAccess] = useState(-1);
  const [viewAccess, setViewAccess] = useState(-1);
  const [assignAccess, setAssignAccess] = useState(-1);
  const [editAccess, setEditAccess] = useState(-1);
  const [roleAccess, setRoleAccess] = useState();
  const [ticketNumber, setTicketNumber] = useState('');
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
    value: '',
    label: ''
  });
  const [medium, setMedium] = useState([]);
  const [media, setMedia] = useState({ value: '', label: '' });
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
  const [files, setFiles] = useState([]);
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
        UploadFile(e.target.files[0]);

        return props.setClick(createTicket);
      default:
        return props.setClick(createTicket);
    }
  };
  useEffect(() => {
    const apiUrl = config.APIS_URL + '/access/email/' + userData.email;
    fetch(apiUrl)
      .then(res => res.json())
      .then(repos => {
        /* alert(JSON.stringify(repos.data));
        alert(
          JSON.stringify(
            repos.data.filter(access => access.functionalityId === '1')
          )
        ); */
        setCreateAccess(
          parseInt(
            repos.data.filter(access => access.functionalityId === '1')[0]
              .accessLevelId
          )
        );
        setViewAccess(
          repos.data.filter(access => access.functionalityId === '2')[0]
            .accessLevelId
        );
        setEditAccess(
          repos.data.filter(access => access.functionalityId === '3')[0]
            .accessLevelId
        );
        setAssignAccess(
          repos.data.filter(access => access.functionalityId === '4')[0]
            .accessLevelId
        );
        setRoleAccess(repos.role);
        getDepartments();

        if (!props.ticket_id) {
          if (
            parseInt(
              repos.data.filter(access => access.functionalityId === '1')[0]
                .accessLevelId
            ) < 0
          ) {
            alert('You do not have access to create a ticket!');
            props.setOpen(false);
          }
          setDepartment({
            label: repos.role.department,
            value: repos.role.departmentId
          });
          setTeam({
            label: repos.role.team,
            value: repos.role.teamId
          });
          setExecutive({
            label: repos.role.executive,
            value: repos.role.executiveId
          });
        }

        /*  if (parseInt(viewAccess) < 0) {
          alert('You do not have view access to this Page!');
        }
        if (parseInt(editAccess) < 0) {
          alert('You do not have edit access to this Page!');
        }
        if (parseInt(assignAccess) < 0) {
          alert('You do not have assign access to this Page!');
        } */
      });
  }, []);
  useEffect(() => {
    props.setClick(createTicket);
  }, [
    ticketNumber,
    distributorName,
    status,
    category,
    priority,
    ticketType,
    department,
    executive,
    team,
    subCategory,
    remarks,
    roleAccess
  ]);
  const userData = useSelector(state => state.userData);

  useEffect(() => {
    if (!props.ticket_id) {
      setCreatedByName(localStorage.getItem('AgentName'));
      setCreatedById(localStorage.getItem('AgentEmail'));
      if (props.formtype === 'telephony') {
        setDistributorMobile(props.dealerDetails.mob_no);
        setDistributorEmail(props.dealerDetails.email_id);
        setDistributorId(props.dealerDetails.distributor_id);
        setDistributorName(props.dealerDetails.distributor_name);
        // console.log('disform', props);
        setCategory({
          label: props.category.label,
          value: props.category.value
        });
        setTicketType({
          value: props.ticketType.value,
          label: props.ticketType.label
        });
        setSubCategory({
          value: props.subCategory.value,
          label: props.subCategory.label
        });
        setSubCategoryItem({
          value: props.subCategoryItem.value,
          label: props.subCategoryItem.label
        });
        getSubCategories(props.category.value);
        getSubCategoryItems(props.category.value, props.subCategory.value);
      }

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
      setCreatedByName(userData.username);
      setCreatedById(userData.email);
      setCreatedTime(
        new Date().toLocaleString(undefined, {
          timeZone: 'Asia/Kolkata'
        })
      );
      // setCreatedTime(new Date().toDateString());
      setUpdatedTime(new Date().toDateString());
      props.setClick(createTicket);
    } else {
      let unmounted = false;
      async function getItems() {
        const response = await fetch(
          config.APIS_URL + '/tickets/' + props.ticket_id
        );
        const tkt = (await response.json()).data[0];

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
          // setRemarks(tkt.ticketRemarks);

          setTicketType({
            value: tkt.ticketTypeId,
            label: tkt.ticketType
          });
          setMedia({
            value: tkt.mediaId,
            label: tkt.media,
            idLabel: '',
            nameLabel: ''
          });

          setCategory({
            value: tkt.categoryId,
            label: tkt.category
          });
          getSubCategories(tkt.categoryId);

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
          setTeam({
            value: tkt.assignedTeamId,
            label: tkt.assignedTeam
          });
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
        if (props.formtype === 'telephony') {
          setTicketType({
            value: props.ticketType.value,
            label: props.ticketType.label
          });
        }
        setTicketTypes(
          body.data.map(({ _id, ticketType }) => ({
            label: ticketType,
            value: _id
          }))
        );
        setLoading(false);

        if (!props.ticket_id && props.formtype !== 'telephony') {
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
  useEffect(() => {}, [createdById]);
  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/categories');
      const body = await response.json();

      if (!unmounted) {
        if (props.formtype === 'telephony') {
          setCategory({
            label: props.category.label,
            value: props.category.value
          });
        }
        if (!props.ticket_id && props.formtype !== 'telephony') {
          body.data[0]
            ? setCategory({
                label: body.data[0].category,
                value: body.data[0]._id
              })
            : setCategory({});
        }

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
        if (props.formtype === 'telephony') {
          setSubCategory({
            value: props.subCategory.value,
            label: props.subCategory.label
          });
        }
        if (!props.ticket_id && props.formtype !== 'telephony') {
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

      if (!unmounted && body.data) {
        setSubCategoryItems(
          body.data.map(({ _id, subCategoryItem }) => ({
            label: subCategoryItem,
            value: _id
          }))
        );

        setLoading(false);
        if (props.formtype === 'telephony') {
          setSubCategoryItem({
            value: props.subCategoryItem.value,
            label: props.subCategoryItem.label
          });
        }
        if (!props.ticket_id && props.formtype !== 'telephony') {
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
  }, [subCategory, category]);

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
  const getDepartments = () => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/departments');
      const body = await response.json();
      if (!unmounted) {
        /*  if (!props.ticket_id) {
          body.data[0]
            ? setDepartment({
                label: body.data[0].department,
                value: body.data[0]._id
              })
            : setDepartment({});
        } */

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
  };

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(
        config.APIS_URL + '/teams/' + department.value
      );
      const body = await response.json();
      if (!unmounted) {
        if (!props.ticket_id && roleAccess.departmentId !== department.value) {
          body.data[0]
            ? setTeam({
                label: body.data[0].team,
                value: body.data[0]._id
              })
            : setTeam({});
        }

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
    let unmounted = false;
    async function getFiles() {
      console.log('tktnumber', ticketNumber);

      const apiUrl = config.APIS_URL + '/tickets/fetchfiles';
      var apiParam = {
        method: 'POST',
        headers: { ticketnumber: ticketNumber }
      };

      const response = await fetch(apiUrl, apiParam);

      const fils = await response.json();

      if (fils.length && props.ticket_id) {
        setFiles(fils);
      }
    }

    getFiles();

    return () => {
      unmounted = true;
    };
  }, [file, ticketNumber]);
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
        if (
          !props.ticket_id &&
          roleAccess.departmentId !== department.value &&
          roleAccess.teamId !== team.value
        ) {
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
    var result = addRow();
    props.setOpen(result);
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
        ticketid: props.ticket_id,
        _id: props.ticket_id
      };
      props.setClick(createTicket);
      props.updateTicket(apiParam.headers);
    }

    await fetch(apiUrl, apiParam)
      .then(res => res.json())
      .then(repos => {
        if (JSON.stringify(repos.status) === '200') {
          alert(repos.message);
          return true;
        } else {
          return false;
        }
      });
  };

  const UploadFile = e => {
    var myHeaders = new Headers();
    myHeaders.append('ticketnumber', ticketNumber);

    setFile(e);
    var formdata = new FormData();
    formdata.append('SoftCopyFile', e);
    console.log('tkt', ticketNumber, e);
    console.log('files', e);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    const apiUrl = config.APIS_URL + '/tickets/uploadfiles';
    fetch(apiUrl, requestOptions)
      .then(response => response.text())
      .then(result => {
        alert('Uploaded Sucessfully');
      })
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
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id="sm"
            size="small"
            label="Ticket Created Time"
            variant="outlined"
            style={{ width: '31%' }}
            value={createdTime}
            InputProps={{
              readOnly: true
            }}
            type="text"
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
            id="category"
            select
            size="small"
            label="Category"
            SelectProps={{
              native: true
            }}
            variant="outlined"
            style={{ width: '31.4%' }}
            value={category.value || ''}
            InputLabelProps={{ shrink: true }}
            onChange={e => {
              setCategory({
                value: e.target.value,
                label: categories.filter(
                  category => category.value === e.target.value
                )[0].label
              });
              props.setClick(createTicket);

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
              InputLabelProps={{ shrink: true }}
              style={{ width: '31%' }}
              value={subCategory.value}
              onChange={e => {
                setSubCategory({
                  value: e.target.value,
                  label: subCategories.filter(
                    subCategory => subCategory.value === e.target.value
                  )[0].label
                });
                props.setClick(createTicket);

                getSubCategoryItems(category.value, e.target.value);
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
              InputLabelProps={{ shrink: true }}
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
            id="type"
            select
            name="type"
            size="small"
            label="Ticket Type"
            InputLabelProps={{ shrink: true }}
            SelectProps={{
              native: true
            }}
            variant="outlined"
            style={{ width: '32%' }}
            value={ticketType.value}
            onChange={e => {
              setTicketType({
                value: e.target.value,
                label: ticketTypes.filter(
                  ticketType => ticketType.value === e.target.value
                )[0].label
              });
              props.setClick(createTicket);
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
            InputLabelProps={{ shrink: true }}
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
            InputLabelProps={{ shrink: true }}
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
            }}
          >
            {statuses.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </TextField>
          <br />
          {props.ticket_id ? (
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
              InputProps={{
                readOnly: true
              }}
            />
          ) : (
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
          )}
          <br />
          {props.ticket_id ? (
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
              InputProps={{
                readOnly: true
              }}
            />
          ) : (
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
          )}
          <br />
          <TextField
            error={remarks === ''}
            validators={['required']}
            id="remark"
            label="Remarks"
            multiline
            size="small"
            rows={5}
            variant="outlined"
            style={{ width: '100%' }}
            onChange={e => {
              handleChange('remarks', e);
              props.setClick(createTicket);
            }}
            value={remarks}
          />
          <div
            style={{
              maxHeight: '150px',
              overflow: 'scroll',
              width: '100%'
            }}
          >
            {/* <TextField
              id="SoftCopyFile"
              type="file"
              multiple={false}
              variant="outlined"
              // style={{ width: '31.4%' }}
              onChange={e => {
                handleChange('file', e);
              }}
            />

            <Button onClick={UploadFile} className="primary" color="secondary">
              Upload
            </Button> */}
            <input
              id="SoftCopyFile"
              onChange={e => {
                handleChange('file', e);
              }}
              className={classes.input}
              style={{ display: 'none' }}
              // id="raised-button-file"
              multiple
              type="file"
            />
            <label htmlFor="SoftCopyFile">
              <Button
                variant="contained"
                color="primary"
                size="small"
                component="span"
                className={classes.button}
                startIcon={<AttachFileIcon />}
                // onClick={(e) => UploadFile(e)}
              >
                Attach
              </Button>
            </label>
            <br />

            <ol>
              {files.map(fil => (
                <li>
                  <a
                    href={'http://14.98.23.204:8083' + fil.filePath}
                    target="_blank"
                  >
                    {JSON.stringify(fil.fileName)}
                  </a>
                </li>
              ))}
            </ol>
          </div>
          <br />
          <TextField
            id="sm"
            select
            size="small"
            label="Source Media"
            InputLabelProps={{ shrink: true }}
            SelectProps={{
              native: true
            }}
            style={{ width: '31%' }}
            variant="outlined"
            disabled
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
            disabled
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
            disabled
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
            InputLabelProps={{ shrink: true }}
            SelectProps={{
              native: true
            }}
            style={{ width: '31%' }}
            variant="outlined"
            value={department.value}
            disabled={
              assignAccess < 3 &&
              !(
                assignAccess === 2 &&
                roleAccess.departmentId === department.value
              )
            }
            onChange={e => {
              setDepartment({
                value: e.target.value,
                label: departments.filter(
                  department => department.value === e.target.value
                )[0].label
              });
              props.setClick(createTicket);
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
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            style={{ width: '32%' }}
            value={team.value}
            disabled={
              assignAccess < 2 &&
              !(assignAccess === 1 && roleAccess.teamId === team.value)
            }
            onChange={e => {
              setTeam({
                value: e.target.value,
                label: teams.filter(team => team.value === e.target.value)[0]
                  .label
              });
              props.setClick(createTicket);
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
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            style={{ width: '31.4%' }}
            value={executive.value}
            disabled={
              assignAccess < 1 &&
              !(
                assignAccess === 0 && roleAccess.executiveId === executive.value
              )
            }
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
