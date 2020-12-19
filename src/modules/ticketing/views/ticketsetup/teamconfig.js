import React, { useState, useEffect } from 'react';
import './App.css';
import config from '../config.json';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';

import TableCell from '@material-ui/core/TableCell';

import TableRow from '@material-ui/core/TableRow';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

import InputLabel from '@material-ui/core/InputLabel';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

function TeamConfig() {
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
  const [loading, setLoading] = React.useState(true);
  const [newRow, setNewRow] = useState({ team: '', active: true });
  const [apiTeams, setApiTeams] = useState([]);
  const [teams, setTeams] = useState([]);
  const [departments, setDepartments] = React.useState([]);
  const [department, setDepartment] = React.useState({});
  const [isEditing, setIsEditing] = useState(-1);
  const [updatedRow, setUpdatedRow] = useState({
    team: '',
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

  const updateRow = () => {
    const val = JSON.stringify(updatedRow.team);

    if (val.length === 2) {
      alert('Please enter value');
    } else {
      setIsEditing(-1);
      const apiUrl = config.APIS_URL + '/teams';
      var apiParam = {
        method: 'PUT',
        headers: updatedRow
      };
      fetch(apiUrl, apiParam)
        .then(res => res.json())
        .then(repos => {
          setApiTeams([]);
        });
    }
  };

  const addRow = e => {
    const val = JSON.stringify(newRow.team);

    if (val.length === 2) {
      alert('Please enter value');
    } else {
      const apiUrl = config.APIS_URL + '/teams/' + department.value;
      var apiParam = {
        method: 'POST',
        headers: {
          deptid: department.value,
          dept: department.label,
          team: newRow.team,
          active: newRow.active
        }
      };
      fetch(apiUrl, apiParam)
        .then(res => res.json())
        .then(repos => {
          setApiTeams([]);
          setNewRow({ team: '', active: true });
        });
    }
  };

  useEffect(() => {
    const apiUrl = config.APIS_URL + '/teams/' + department.value;
    fetch(apiUrl)
      .then(res => res.json())
      .then(repos => {
        setApiTeams(repos.data);
        setTeams(apiTeams);
      });
  }, [department.value, apiTeams]);

  useEffect(() => {
    setUpdatedRow(isEditing === '-1' ? {} : teams[isEditing]);
  }, [isEditing]);

  useEffect(() => {}, [teams]);

  const handleTeamChange = (index, event) => {
    setUpdatedRow({
      id: teams[index]._id,
      deptid: department.value,
      dept: department.label,
      team: event.target.value,
      active: updatedRow.active
    });
  };

  const handleActiveChange = (index, event) => {
    setUpdatedRow({
      id: teams[index]._id,
      deptid: department.value,
      dept: department.label,
      team: updatedRow.team,
      active: event.target.checked
    });
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <div className="SectionHeader">
          Teams of Department{' '}
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
                text: departments.filter(
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
          </Select>
        </div>
      </FormControl>
      <Table className={classes.table} aria-label="simple table">
        <TableRow>
          <TableCell>Sl. No.</TableCell>
          <TableCell>Team</TableCell>
          <TableCell style={{ textAlign: 'center' }}>Active</TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>
            <TextField
              label="Team"
              id="outlined-size-small"
              value={newRow.team}
              onChange={e =>
                setNewRow({ team: e.target.value, active: newRow.active })
              }
              variant="outlined"
              size="small"
            />
          </TableCell>
          <TableCell>
            <Checkbox
              onChange={e =>
                setNewRow({
                  team: newRow.team,
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
        {teams.map((item, idx) => {
          return (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
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

export default TeamConfig;
