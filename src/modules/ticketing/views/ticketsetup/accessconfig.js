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
    { value: '-1', label: 'No Access' },
    { value: '0', label: 'Self Tickets Only' },
    { value: '1', label: "Self Team's Tickets Only" },
    { value: '2', label: "Self Department's Tickets Only" },
    { value: '3', label: 'Access to All Tickets' }
  ];
  const functionalities = [
    { value: '1', label: 'Create Ticket' },
    { value: '2', label: 'View Ticket' },
    { value: '3', label: 'Edit Ticket' },
    { value: '4', label: 'Assign Ticket' }
  ];
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);
  const [loading, setLoading] = useState(true);

  const [accessLevel, setAccessLevel] = useState({
    value: '',
    label: ''
  });
  const [accessLevelUpdate, setAccessLevelUpdate] = useState({
    value: '',
    label: ''
  });
  const [access, setAccess] = useState({});
  const [accesses, setAccesses] = useState([]);
  const [apiAccesses, setApiAccesses] = useState([]);
  const [functionality, setFunctionality] = useState({
    value: '',
    label: ''
  });
  const [functionalityUpdate, setFunctionalityUpdate] = useState({
    value: '',
    label: ''
  });
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState({});
  const [newRow, setNewRow] = useState({});
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

  useEffect(() => {
    const apiUrl = config.APIS_URL + '/access/' + role.value;
    fetch(apiUrl)
      .then(res => res.json())
      .then(repos => {
        setApiAccesses(repos.data);
        setAccesses(repos.data);
        setFunctionalityUpdate({
          value: functionalities[0].functionalityId,
          label: functionalities[0].functionality
        });
        setAccessLevelUpdate({
          value: accessLevels[0].accessLevelId,
          label: accessLevels[0].accessLevel
        });
      });
  }, [role.value, apiAccesses]);

  const addRow = e => {
    const apiUrl = config.APIS_URL + '/access';
    var apiParam = {
      method: 'POST',
      headers: newRow
    };
    fetch(apiUrl, apiParam)
      .then(res => res.json())
      .then(repos => {
        setApiAccesses([]);
        setNewRow({
          roleId: role.value,
          role: role.label,
          functionalityId: functionalities[0].value,
          functionality: functionalities[0].label,
          accessLevelId: accessLevels[0].value,
          accessLevel: accessLevels[0].label,
          active: true
        });
        setFunctionality(functionalities[0]);
        setAccessLevel(accessLevels[0]);
      });
  };

  const updateRow = () => {
    setIsEditing(-1);
    const apiUrl = config.APIS_URL + '/access';
    var apiParam = {
      method: 'PUT',
      headers: updatedRow
    };
    fetch(apiUrl, apiParam)
      .then(res => res.json())
      .then(repos => {
        setApiAccesses([]);
      });
  };

  useEffect(() => {
    setUpdatedRow(isEditing === '-1' ? {} : accesses[isEditing]);
    setFunctionalityUpdate(
      accesses[isEditing]
        ? {
            value: accesses[isEditing].functionalityId,
            label: accesses[isEditing].functionality
          }
        : {}
    );
    setAccessLevelUpdate(
      accesses[isEditing]
        ? {
            value: accesses[isEditing].accessLevelId,
            label: accesses[isEditing].accessLevel
          }
        : {}
    );
  }, [isEditing]);

  const handleFunctionalityChange = (index, event) => {
    setUpdatedRow({
      id: accesses[index]._id,
      roleId: role.value,
      role: role.label,
      functionalityId: event.target.value,
      functionality: functionalities.filter(
        functionality => functionality.value === event.target.value
      )[0].label,
      accessLevelId: updatedRow.accessLevelId,
      accessLevel: updatedRow.accessLevel,
      active: updatedRow.active
    });
  };
  const handleAccessLevelChange = (index, event) => {
    setUpdatedRow({
      id: accesses[index]._id,
      roleId: role.value,
      role: role.label,
      functionalityId: updatedRow.functionalityId,
      functionality: updatedRow.functionality,
      accessLevelId: event.target.value,
      accessLevel: accessLevels.filter(
        accessLevel => accessLevel.value === event.target.value
      )[0].label,
      active: updatedRow.active
    });
  };

  const handleActiveChange = (index, event) => {
    setUpdatedRow({
      id: accesses[index]._id,
      roleId: role.value,
      role: role.label,
      functionalityId: updatedRow.functionalityId,
      functionality: updatedRow.functionality,
      accessLevelId: updatedRow.accessLevelId,
      accessLevel: updatedRow.accessLevel,
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
              defaultValue={role.value}
              onChange={e => {
                setRole({
                  value: e.target.value,
                  label: roles.filter(role => role.value === e.target.value)[0]
                    .label
                });
                setApiAccesses([]);
                setIsEditing(-1);
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
          <TableCell>Functionality</TableCell>
          <TableCell>Access Level</TableCell>
          <TableCell style={{ textAlign: 'center' }}>Active</TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>
            <Select
              native
              label="functionalities"
              inputProps={{
                name: 'functionalities',
                id: 'functionalities'
              }}
              value={functionality.value}
              onChange={e => {
                setNewRow({
                  roleId: role.value,
                  role: role.label,
                  functionalityId: e.target.value,
                  functionality: functionalities.filter(
                    functionality => functionality.value === e.target.value
                  )[0].label,
                  accessLevelId: newRow.accessLevelId,
                  accessLevel: newRow.accessLevel,
                  active: newRow.active
                });
                setFunctionality({
                  value: e.target.value,
                  label: functionalities.filter(
                    functionality => functionality.value === e.target.value
                  )[0].label
                });
              }}
            >
              {functionalities.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </TableCell>
          <TableCell>
            <Select
              native
              label="accesslevel"
              inputProps={{
                name: 'accesslevel',
                id: 'accesslevel'
              }}
              value={accessLevel.value}
              onChange={e => {
                setAccessLevel({
                  value: e.target.value,
                  label: accessLevels.filter(
                    level => level.value === e.target.value
                  )[0].label
                });
                setNewRow({
                  roleId: role.value,
                  role: role.label,
                  functionalityId: newRow.functionalityId,
                  functionality: newRow.functionality,
                  accessLevelId: e.target.value,
                  accessLevel: accessLevels.filter(
                    level => level.value === e.target.value
                  )[0].label,
                  active: newRow.active
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
            <Checkbox
              onChange={e =>
                setNewRow({
                  roleId: role.value,
                  role: role.label,
                  functionalityId: newRow.functionalityId,
                  functionality: newRow.functionality,
                  accessLevelId: newRow.accessLevelId,
                  accessLevel: newRow.accessLevel,
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
                  <Select
                    native
                    label="functionalities"
                    inputProps={{
                      name: 'functionalities',
                      id: 'functionalities'
                    }}
                    defaultValue={item.functionalityId}
                    onChange={e => {
                      setFunctionalityUpdate({
                        value: e.target.value,
                        label: functionalities.filter(
                          functionality =>
                            functionality.value === e.target.value
                        )[0].label
                      });
                      handleFunctionalityChange(idx, e);
                    }}
                  >
                    {functionalities.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </Select>
                ) : (
                  item.functionality
                )}
              </TableCell>
              <TableCell>
                {isEditing === idx ? (
                  <Select
                    native
                    label="accesslevels"
                    inputProps={{
                      name: 'accesslevels',
                      id: 'accesslevels'
                    }}
                    defaultValue={item.accessLevelId}
                    onChange={e => {
                      setAccessLevelUpdate({
                        value: e.target.value,
                        label: accessLevels.filter(
                          level => level.value === e.target.value
                        )[0].label
                      });
                      handleAccessLevelChange(idx, e);
                    }}
                  >
                    {accessLevels.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </Select>
                ) : (
                  item.accessLevel
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
