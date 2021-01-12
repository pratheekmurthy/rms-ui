import React, { useState, useEffect } from 'react';
import './App.css';
import config from '../config.json';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import Select from '@material-ui/core/Select';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
function AccessConfig() {
  const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch'
      }
    }
  }));
  const accessLevels = [
    { value: '-1', label: 'None' },
    { value: '0', label: 'Self' },
    { value: '1', label: 'All' }
  ];
  const accessTypes = [
    { value: '-1', label: 'No Access' },
    { value: '0', label: 'Read Only Access' },
    { value: '1', label: 'Full Acess' }
  ];
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);
  const [loading, setLoading] = useState(true);

  const [department, setDepartment] = useState({ value: -1, label: 'None' });
  const [team, setTeam] = useState({ value: -1, label: 'None' });
  const [access, setAccess] = useState({ value: 1, label: 'Full Acess' });
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState({});
  const handleChange = event => {
    setChecked(event.target.checked);
  };
  const [newRow, setNewRow] = useState({ access: '', active: true });
  const [apiAccesses, setApiAccesses] = useState([]);
  const [accesses, setAccesses] = useState([]);
  const [isEditing, setIsEditing] = useState(-1);
  const [updatedRow, setUpdatedRow] = useState({ access: '', active: false });
  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/roles');
      const body = await response.json();
      if (!unmounted) {
        setRoles(
          body.data.map(({ _id, role }) => ({
            label: role,
            value: _id
          }))
        );
        setLoading(false);
        body.data[0]
          ? setRole({
              label: body.data[0].role,
              value: body.data[0]._id
            })
          : setRole({});
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, []);
  const updateRow = () => {
    const val = JSON.stringify(updatedRow.access);

    if (val.length === 2) {
      alert('Please enter value');
    } else {
      setIsEditing(-1);
      const apiUrl = config.APIS_URL + '/accesses';
      var apiParam = {
        method: 'PUT',
        headers: updatedRow
      };
      fetch(apiUrl, apiParam)
        .then(res => res.json())
        .then(repos => {
          setApiAccesses([]);
        });
    }
  };

  const addRow = e => {
    const val = JSON.stringify(newRow.access);

    if (val.length === 2) {
      alert('Please enter value');
    } else {
      const apiUrl = config.APIS_URL + '/accesses';
      var apiParam = {
        method: 'POST',
        headers: {
          access: newRow.access,
          active: newRow.active
        }
      };
      fetch(apiUrl, apiParam)
        .then(res => res.json())
        .then(repos => {
          setApiAccesses([]);
          setNewRow({ access: '', active: true });
        });
    }
  };

  useEffect(() => {
    const apiUrl = config.APIS_URL + '/accesses';
    fetch(apiUrl)
      .then(res => res.json())
      .then(repos => {
        setApiAccesses(repos.data);
        setAccesses(apiAccesses);
      });
  }, [apiAccesses]);

  useEffect(() => {
    setUpdatedRow(isEditing === '-1' ? {} : accesses[isEditing]);
  }, [isEditing]);

  useEffect(() => {}, [accesses]);

  const handleFormChange = (index, event) => {
    setUpdatedRow({
      id: accesses[index]._id,
      form: event.target.value,
      department: updatedRow.department,
      team: updatedRow.team,
      access: updatedRow.access,
      active: updatedRow.active
    });
  };
  const handleDepartmentChange = (index, event) => {
    setUpdatedRow({
      id: accesses[index]._id,
      form: updatedRow.form,
      department: event.target.value,
      team: updatedRow.team,
      access: updatedRow.access,
      active: updatedRow.active
    });
  };
  const handleTeamChange = (index, event) => {
    setUpdatedRow({
      id: accesses[index]._id,
      form: updatedRow.form,
      department: updatedRow.department,
      team: event.target.value,
      access: updatedRow.access,
      active: updatedRow.active
    });
  };
  const handleAccessChange = (index, event) => {
    setUpdatedRow({
      id: accesses[index]._id,
      form: updatedRow.form,
      department: updatedRow.department,
      team: updatedRow.team,
      access: event.target.value,
      active: updatedRow.active
    });
  };

  const handleActiveChange = (index, event) => {
    setUpdatedRow({
      id: accesses[index]._id,
      form: updatedRow.form,
      department: updatedRow.department,
      team: updatedRow.team,
      access: updatedRow.access,
      active: event.target.checked
    });
  };

  return (
    <div>
      <div className="SectionHeader">
        <FormControl variant="outlined" className={classes.formControl}>
          <div className="SectionHeader">
            <InputLabel htmlFor="outlined-age-native-simple" shrink={true}>
              Role
            </InputLabel>
            <Select
              native
              disabled={loading}
              label="roles"
              inputProps={{
                name: 'roles',
                id: 'roles'
              }}
              value={role.value}
              onChange={e => {
                setRole({
                  value: e.target.value,
                  label: roles.filter(role => role.value === e.target.value)[0]
                    .label
                });
              }}
            >
              {roles.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </div>
        </FormControl>
      </div>
      <Table className={classes.table} aria-label="simple table">
        <TableRow>
          <TableCell>Sl. No.</TableCell>
          <TableCell>Form</TableCell>
          <TableCell>Department</TableCell>
          <TableCell>Team</TableCell>
          <TableCell>Access</TableCell>
          <TableCell style={{ textAlign: 'center' }}>Active</TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>
            <TextField
              label="Form"
              id="outlined-size-small"
              value={newRow.form}
              onChange={e =>
                setNewRow({
                  form: e.target.value,
                  department: newRow.department,
                  team: newRow.team,
                  access: newRow.access,
                  active: newRow.active
                })
              }
              variant="outlined"
              size="small"
            />
          </TableCell>
          <TableCell>
            <Select
              native
              label="departments"
              inputProps={{
                name: 'departments',
                id: 'departments'
              }}
              value={department.value}
              onChange={e => {
                setDepartment({
                  value: e.target.value,
                  label: accessLevels.filter(
                    level => level.value === e.target.value
                  )[0].label
                });
              }}
            >
              {accessLevels.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </TableCell>
          <TableCell>
            <Select
              native
              label="teams"
              inputProps={{
                name: 'teams',
                id: 'teams'
              }}
              value={team.value}
              onChange={e => {
                setTeam({
                  value: e.target.value,
                  label: accessLevels.filter(
                    level => level.value === e.target.value
                  )[0].label
                });
              }}
            >
              {accessLevels.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </TableCell>
          <TableCell>
            <Select
              native
              label="access"
              inputProps={{
                name: 'access',
                id: 'access'
              }}
              value={access.value}
              onChange={e => {
                setAccess({
                  value: e.target.value,
                  label: accessTypes.filter(
                    level => level.value === e.target.value
                  )[0].label
                });
              }}
            >
              {accessTypes.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </TableCell>
          <TableCell>
            <Checkbox
              onChange={e =>
                setNewRow({
                  form: newRow.form,
                  department: newRow.department,
                  team: newRow.team,
                  access: newRow.access,
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
        {accesses.map((item, idx) => {
          return (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                {isEditing === idx ? (
                  <TextField
                    label="Form"
                    id="outlined-size-small"
                    defaultValue={item.form}
                    onChange={e => handleFormChange(idx, e)}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  item.form
                )}
              </TableCell>
              <TableCell>
                {isEditing === idx ? (
                  <TextField
                    label="Department"
                    id="outlined-size-small"
                    defaultValue={item.department}
                    onChange={e => handleDepartmentChange(idx, e)}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  item.department
                )}
              </TableCell>
              <TableCell>
                {isEditing === idx ? (
                  <TextField
                    label="Team"
                    id="outlined-size-small"
                    defaultValue={item.team}
                    onChange={e => handleTeamChange(idx, e)}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  item.team
                )}
              </TableCell>
              <TableCell>
                {isEditing === idx ? (
                  <TextField
                    label="Access"
                    id="outlined-size-small"
                    defaultValue={item.access}
                    onChange={e => handleAccessChange(idx, e)}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  item.access
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

export default AccessConfig;
