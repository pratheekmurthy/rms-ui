import React, { useState, useEffect } from 'react';
import './App.css';
import config from '../config.json';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
function ExecutiveConfig() {
  const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch'
      }
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 220
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }));
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);

  const handleChange = event => {
    setChecked(event.target.checked);
  };
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState({});
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState({});
  const [newRow, setNewRow] = useState({
    executive: '',
    email: '',
    mobile: '',
    active: true
  });
  const [apiExecutives, setApiExecutives] = useState([]);
  const [executives, setExecutives] = useState([]);
  const [isEditing, setIsEditing] = useState(-1);
  const [updatedRow, setUpdatedRow] = useState({
    executive: '',
    active: false
  });

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

  const updateRow = () => {
    const val1 = JSON.stringify(updatedRow.executive);
    const val2 = JSON.stringify(updatedRow.email);
    const val3 = JSON.stringify(updatedRow.mobile);

    if (val1.length === 2 || val2.length === 2 || val3.length === 2) {
      alert('Please enter value');
    } else {
      setIsEditing(-1);
      const apiUrl = config.APIS_URL + '/executives';
      var apiParam = {
        method: 'PUT',
        headers: updatedRow
      };
      fetch(apiUrl, apiParam)
        .then(res => res.json())
        .then(repos => {
          setApiExecutives([]);
        });
    }
  };

  const addRow = e => {
    const val1 = JSON.stringify(newRow.executive);
    const val2 = JSON.stringify(newRow.email);
    const val3 = JSON.stringify(newRow.mobile);

    if (val1.length === 2 || val2.length === 2 || val3.length === 2) {
      alert('Please enter value');
    } else {
      const apiUrl = config.APIS_URL + '/executives';
      var apiParam = {
        method: 'POST',
        headers: {
          deptid: department.value,
          dept: department.label,
          teamid: team.value,
          team: team.label,
          executive: newRow.executive,
          email: newRow.email,
          mobile: newRow.mobile,
          active: newRow.active
        }
      };
      fetch(apiUrl, apiParam)
        .then(res => res.json())
        .then(repos => {
          setApiExecutives([]);
          setNewRow({
            executive: '',
            email: '',
            mobile: '',
            active: true
          });
        });
    }
  };

  useEffect(() => {
    const apiUrl =
      config.APIS_URL + '/executives/' + department.value + '/' + team.value;
    fetch(apiUrl)
      .then(res => res.json())
      .then(repos => {
        setApiExecutives(repos.data);
        setExecutives(apiExecutives);
      });
  }, [team.value, apiExecutives]);

  useEffect(() => {
    isEditing === -1
      ? setUpdatedRow({
          id: '',
          deptid: '',
          dept: '',
          teamid: '',
          team: '',
          executive: '',
          email: '',
          mobile: '',
          active: false
        })
      : setUpdatedRow({
          id: executives[isEditing]._id,
          deptid: department.value,
          dept: department.label,
          teamid: team.value,
          team: team.label,
          executive: executives[isEditing].executiveName,
          email: executives[isEditing].executiveEmail,
          mobile: executives[isEditing].executiveMobile,
          active: executives[isEditing].active
        });
  }, [isEditing]);

  useEffect(() => {}, [executives]);

  const handleExecutiveChange = (index, event) => {
    setUpdatedRow({
      id: executives[index]._id,
      deptid: department.value,
      dept: department.label,
      teamid: team.value,
      team: team.label,
      executive: event.target.value,
      email: updatedRow.email,
      mobile: updatedRow.mobile,
      active: updatedRow.active
    });
  };

  const handleEmailChange = (index, event) => {
    setUpdatedRow({
      id: executives[index]._id,
      deptid: department.value,
      dept: department.label,
      teamid: team.value,
      team: team.label,
      executive: updatedRow.executive,
      email: event.target.value,
      mobile: updatedRow.mobile,
      active: updatedRow.active
    });
  };

  const handleMobileChange = (index, event) => {
    setUpdatedRow({
      id: executives[index]._id,
      deptid: department.value,
      dept: department.label,
      teamid: team.value,
      team: team.label,
      executive: updatedRow.executive,
      email: updatedRow.email,
      mobile: event.target.value,
      active: updatedRow.active
    });
  };

  const handleActiveChange = (index, event) => {
    setUpdatedRow({
      id: executives[index]._id,
      deptid: department.value,
      dept: department.label,
      teamid: team.value,
      team: team.label,
      executive: updatedRow.executive,
      email: updatedRow.email,
      mobile: updatedRow.mobile,
      active: event.target.checked
    });
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <div className="SectionHeader">
          Executives of Department{' '}
          <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
          <Select
            native
            disabled={loading}
            label="categories"
            inputProps={{
              name: 'departments',
              id: 'departments'
            }}
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
          </Select>{' '}
          &amp; Team{' '}
          <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
          <Select
            native
            disabled={loading}
            label="teams"
            inputProps={{
              name: 'teams',
              id: 'teams'
            }}
            value={team.value}
            onChange={e => {
              setTeam({
                value: e.target.value,
                text: teams.filter(team => team.value === e.target.value)[0]
                  .label
              });
            }}
          >
            {teams.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </div>
      </FormControl>
      <Table className={classes.table} aria-label="simple table">
        <TableRow>
          <TableCell>Sl. No.</TableCell>
          <TableCell>Executive</TableCell>
          <TableCell>eMail</TableCell>
          <TableCell>Mobile</TableCell>
          <TableCell style={{ textAlign: 'center' }}>Active</TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>
            <TextField
              label="Executive"
              id="outlined-size-small"
              value={newRow.executive}
              onChange={e =>
                setNewRow({
                  executive: e.target.value,
                  email: newRow.email,
                  mobile: newRow.mobile,
                  active: newRow.active
                })
              }
              variant="outlined"
              size="small"
            />
          </TableCell>
          <TableCell>
            <TextField
              label="eMail"
              id="outlined-size-small"
              value={newRow.email}
              onChange={e =>
                setNewRow({
                  executive: newRow.executive,
                  email: e.target.value,
                  mobile: newRow.mobile,
                  active: newRow.active
                })
              }
              variant="outlined"
              size="small"
            />
          </TableCell>
          <TableCell>
            <TextField
              label="Mobile"
              id="outlined-size-small"
              value={newRow.mobile}
              onChange={e =>
                setNewRow({
                  executive: newRow.executive,
                  email: newRow.email,
                  mobile: e.target.value,
                  active: newRow.active
                })
              }
              variant="outlined"
              size="small"
            />
          </TableCell>
          <TableCell>
            <Checkbox
              onChange={e =>
                setNewRow({
                  executive: newRow.executive,
                  email: newRow.email,
                  mobile: newRow.mobile,
                  active: e.target.checked
                })
              }
              checked={newRow.active}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </TableCell>
          <TableCell>
            <Button
              variant="contained"
              color="primary"
              onClick={addRow}
              className="SmallButton"
            >
              Add
            </Button>
          </TableCell>
        </TableRow>
        {executives.map((item, idx) => {
          return (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                {isEditing === idx ? (
                  <TextField
                    label="Executive"
                    id="outlined-size-small"
                    defaultValue={item.executiveName}
                    onChange={e => handleExecutiveChange(idx, e)}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  item.executiveName
                )}
              </TableCell>
              <TableCell>
                {isEditing === idx ? (
                  <TextField
                    label="eMail"
                    id="outlined-size-small"
                    defaultValue={item.executiveEmail}
                    onChange={e => handleEmailChange(idx, e)}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  item.executiveEmail
                )}
              </TableCell>
              <TableCell>
                {isEditing === idx ? (
                  <TextField
                    label="Mobile"
                    id="outlined-size-small"
                    efaultValue={item.executiveMobile}
                    onChange={e => handleMobileChange(idx, e)}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  item.executiveMobile
                )}
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <Checkbox
                  defaultChecked={item.active}
                  disabled={isEditing === idx ? false : true}
                  onChange={e => handleActiveChange(idx, e)}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={e =>
                    isEditing === idx ? updateRow(item) : setIsEditing(idx)
                  }
                  className="SmallButton"
                >
                  {isEditing === idx ? 'Update' : 'Edit'}
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </Table>
    </div>
  );
}

export default ExecutiveConfig;
