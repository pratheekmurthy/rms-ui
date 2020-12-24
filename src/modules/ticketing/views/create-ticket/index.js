import React from 'react';
import { Grid, TextField, Drawer } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import config from '../../views/config.json';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { useDropzone } from 'react-dropzone';

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
  const [ticketHistory, setTicketHistory] = useState([]);
  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/categories');
      const body = await response.json();
      if (!unmounted) {
        if (!props.ticket) {
          body.data[0]
            ? setCategory({
                label: body.data[0].category,
                value: body.data[0]._id
              })
            : setCategory({});
        } else {
          setCategory({
            label: props.ticket.category,
            value: props.ticket.categoryId
          });
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
  const handleChange = (ctrl, e) => {
    switch (ctrl) {
      case 'ticketNumber':
        props.setTicketNumber(e.target.value);
        return setTicketNumber(e.target.value);
      case 'distributorName':
        props.setDistributorName(e.target.value);
        return setDistributorName(e.target.value);
      case 'distributorId':
        props.setDistributorId(e.target.value);
        return setDistributorId(e.target.value);
      case 'distributorEmail':
        props.setDistributorEmail(e.target.value);
        return setDistributorEmail(e.target.value);
      case 'distributorMobile':
        props.setDistributorMobile(e.target.value);
        return setDistributorMobile(e.target.value);
      case 'createdByName':
        props.setCreatedByName(e.target.value);
        return setCreatedByName(e.target.value);
      case 'createdById':
        props.setCreatedById(e.target.value);
        return setCreatedById(e.target.value);
      case 'ticketSubject':
        props.setTicketSubject(e.target.value);
        return setTicketSubject(e.target.value);
      case 'ticketDescription':
        props.setTicketDescription(e.target.value);
        return setTicketDescription(e.target.value);

      case 'remarks':
        props.setRemarks(e.target.value);
        return setRemarks(e.target.value);

      case 'file':
        return setFile(e.target.files[0]);
      default:
        return;
    }
  };
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  const getSubCategories = cat => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/subcategories/' + cat);
      const body = await response.json();
      if (!unmounted) {
        if (!props.ticket) {
          body.data[0]
            ? setSubCategory({
                label: body.data[0].subCategory,
                value: body.data[0]._id
              })
            : setSubCategory({});
        }
        setSubCategories(
          body.data.map(({ _id, subCategory }) => ({
            label: subCategory,
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
        body.data[0]
          ? setSubCategoryItem({
              label: body.data[0].subCategoryItem,
              value: body.data[0]._id
            })
          : setSubCategoryItem({});
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  };

  useEffect(() => {
    // const distid = localStorage.getItem('search');
    // setDistributorId(distid);

    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let newDate = new Date();
    let date = newDate.getDate().toString();
    let month = (newDate.getMonth() + 1).toString();
    let year = newDate.getFullYear().toString();

    getCategory();

    setTicketNumber('TKT' + year + month + date + result);
    setCreatedTime(new Date().toDateString());
 props.setTicketNumber('TKT' + year + month + date + result);
 props.setCreatedTime(new Date().toDateString());
    // getDistributorByIdd(distid);
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
        body.data[0]
          ? setTicketType({
              label: body.data[0].ticketType,
              value: body.data[0]._id
            })
          : setTicketType({});
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, []);
  // useEffect(() => {},[props.ticketNumber])
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
    getItems();
    return () => {
      unmounted = true;
    };
  }, []);

  const getCategory = () => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/categories');
      const body = await response.json();
      if (!unmounted) {
        setCategories(
          body.data.map(({ _id, category }) => ({
            label: category,
            value: _id
          }))
        );

        setLoading(false);
        localStorage.getItem('setCategory');

        // const cat = localStorage.getItem('setCategory');
        // const value = JSON.parse(cat);
        // if (value.category) {
        //   setCategory(value.category);
        // } else {
        body.data[0]
          ? setCategory({
              label: body.data[0].category,
              value: body.data[0]._id
            })
          : setCategory({});
      }
    }
    // }
    getItems();
    return () => {
      unmounted = true;
    };
  };

  // const getSubCategories =(categoryId) => {
  //   let unmounted = false;
  //   async function getItems() {
  //     const response = await fetch(
  //       config.APIS_URL + '/subcategories/' + categoryId
  //     );
  //     const body = await response.json();
  //     if (!unmounted) {
  //       setSubCategories(
  //         body.data.map(({ _id, subCategory }) => ({
  //           label: subCategory,
  //           value: _id
  //         }))
  //       );
  //       setLoading(false);
  //       localStorage.getItem('setCategory');

  //       const cat = localStorage.getItem('setSubCategory');
  //       const value = JSON.parse(cat);
  //       if (value.subCategory) {
  //         setSubCategory(value.subCategory);
  //       } else {
  //         body.data[0]
  //           ? setSubCategory({
  //               label: body.data[0].subCategory,
  //               value: body.data[0]._id
  //             })
  //           : setSubCategory({});
  //       }
  //     }
  //   }
  //   getItems();
  //   return () => {
  //     unmounted = true;
  //   };
  // };

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(
        config.APIS_URL +
          '/subcategoryitems/' +
          category.value +
          '/' +
          subCategory.value
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
        localStorage.getItem('setSubCategoryItem');

        // const cat = localStorage.getItem('setSubCategoryItem');
        // const value = JSON.parse(cat);

        // if (value.subCategoryItem) {
        //   setSubCategoryItem(value.subCategoryItem);
        // } else {
        body.data[0]
          ? setSubCategoryItem({
              label: body.data[0].subCategoryItem,
              value: body.data[0]._id
            })
          : setSubCategoryItem({});
      }
    }
    // }
    getItems();
    return () => {
      unmounted = true;
    };
  }, [category.value, subCategory.value]);

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/priorities');
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
        body.data[0]
          ? setPriority({
              label: body.data[0].priority,
              value: body.data[0]._id,
              sla: body.data[0].sla
            })
          : setPriority({});
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
        setStatuses(
          body.data.map(({ _id, status, slahold }) => ({
            label: status,
            value: _id,
            slaOnHold: slahold
          }))
        );
        setLoading(false);
        body.data[0]
          ? setStatus({
              label: body.data[0].status,
              value: body.data[0]._id,
              slaOnHold: body.data[0].slahold
            })
          : setStatus({});
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
        setDepartments(
          body.data.map(({ _id, department }) => ({
            label: department,
            value: _id
          }))
        );
        setLoading(false);

        body.data[0]
          ? setDepartment({
              label: body.data[0].department,
              value: body.data[0]._id
            })
          : setDepartment({});
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
        setTeams(
          body.data.map(({ _id, team }) => ({
            label: team,
            value: _id
          }))
        );
        setLoading(false);

        body.data[0]
          ? setTeam({
              label: body.data[0].team,
              value: body.data[0]._id
            })
          : setTeam({});
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, [department.value]);

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(
        config.APIS_URL + '/executives/' + department.value + '/' + team.value
      );
      const body = await response.json();
      if (!unmounted) {
        setExecutives(
          body.data.map(
            ({ _id, executiveName, executiveEmail, executiveMobile }) => ({
              label: executiveName,
              value: _id,
              executiveEmail,
              executiveMobile
            })
          )
        );
        setLoading(false);

        body.data[0]
          ? setExecutive({
              label: body.data[0].executiveName,
              value: body.data[0]._id,
              executiveEmail: body.data[0].executiveEmail,
              executiveMobile: body.data[0].executiveMobile
            })
          : setExecutive({});
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, [team]);

  const getDistributorByIdd = distid => {
    async function getItems() {
      const apiUrl = config.APIS_URL + '/boapi/distributorbyid';
      var apiParam = {
        method: 'POST',
        headers: { distid: distid, key: 'uZpsyVk4yc' }
      };
      fetch(apiUrl, apiParam)
        .then(res => res.json())
        .then(repos => {
          setDistributorId(
            JSON.parse(repos.data).data
              ? JSON.parse(repos.data).data[0].distributor_id || ''
              : ''
          );
 props.setDistributorId(
   JSON.parse(repos.data).data
     ? JSON.parse(repos.data).data[0].distributor_id || ''
     : ''
 );
          setDistributorName(
            JSON.parse(repos.data).data
              ? JSON.parse(repos.data).data[0].distributor_name || ''
              : ''
          );
           props.setDistributorName(
             JSON.parse(repos.data).data
               ? JSON.parse(repos.data).data[0].distributor_name || ''
               : ''
           );

          setDistributorMobile(
            JSON.parse(repos.data).data
              ? JSON.parse(repos.data).data[0].mob_no || ''
              : ''
          );
            props.setDistributorMobile(
              JSON.parse(repos.data).data
                ? JSON.parse(repos.data).data[0].mob_no || ''
                : ''
            );

          setDistributorEmail(
            JSON.parse(repos.data).data
              ? JSON.parse(repos.data).data[0].email_id || ''
              : ''
          );
           props.setDistributorEmail(
             JSON.parse(repos.data).data
               ? JSON.parse(repos.data).data[0].email_id || ''
               : ''
           );
        });
    }
    getItems();
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
  const addRow = e => {
    const apiUrl = config.APIS_URL + '/tickets';
    var apiParam = {
      method: 'POST',
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
        if (repos.status === 200) {
          props.setOpen(false);
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
            onClick={() => getDistributorByIdd(distributorId)}
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
              props.setTicketType({
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
              props.setPriority({
                value: e.target.value,
                label: priorities.filter(
                  priority => priority.value === e.target.value
                )[0].label,
                sla: priorities.filter(
                  priority => priority.value === e.target.value
                )[0].sla
              });
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
                )[0].slaOnHold
              });
              props.setStatus({
                value: e.target.value,
                label: statuses.filter(
                  status => status.value === e.target.value
                )[0].label,
                slaOnHold: statuses.filter(
                  status => status.value === e.target.value
                )[0].slaOnHold
              });
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
            value={category.value || ''}
            onChange={e => {
              setCategory({
                value: e.target.value,
                label: categories.filter(
                  category => category.value === e.target.value
                )[0].label
              });

              props.setCategory({
                value: e.target.value,
                label: categories.filter(
                  category => category.value === e.target.value
                )[0].label
              });
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
                props.setSubCategory({
                  value: e.target.value,
                  label: subCategories.filter(
                    subCategory => subCategory.value === e.target.value
                  )[0].label
                });
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
          {subCategoryItems.length > 1 ? (
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
                props.setSubCategoryItem({
                  value: e.target.value,
                  label: subCategoryItems.filter(
                    subCategoryItem => subCategoryItem.value === e.target.value
                  )[0].label
                });
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
          <br/>
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
              props.setMedia({
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
              props.setDepartment({
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
              props.setTeam({
                value: e.target.value,
                label: teams.filter(team => team.value === e.target.value)[0]
                  .label
              });
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
              props.setExecutive({
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
