import React, { useState, useEffect } from 'react';
import './App.css';
import config from '../config.json';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
function DepartmentConfig() {
  const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch'
      }
    }
  }));
  const classes = useStyles();
  const [newRow, setNewRow] = useState({ department: '', active: true });
  const [apiDepartments, setApiDepartments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isEditing, setIsEditing] = useState(-1);
  const [updatedRow, setUpdatedRow] = useState({
    department: '',
    active: false
  });

  const updateRow = () => {
    const val = JSON.stringify(updatedRow.department);

    if (val.length === 2) {
      alert('Please enter value');
    } else {
      setIsEditing(-1);
      const apiUrl = config.APIS_URL + '/departments';
      var apiParam = {
        method: 'PUT',
        headers: updatedRow
      };
      fetch(apiUrl, apiParam)
        .then(res => res.json())
        .then(repos => {
          setApiDepartments([]);
        });
    }
  };

  const addRow = e => {
    const val = JSON.stringify(newRow.department);

    if (val.length === 2) {
      alert('Please enter value');
    } else {
      const apiUrl = config.APIS_URL + '/departments';
      var apiParam = {
        method: 'POST',
        headers: {
          department: newRow.department,
          escalationemail: newRow.escalationEmail,
          escalationmobile: newRow.escalationMobile,
          active: newRow.active
        }
      };
      fetch(apiUrl, apiParam)
        .then(res => res.json())
        .then(repos => {
          setApiDepartments([]);
          setNewRow({ department: '', active: true });
        });
    }
  };

  useEffect(() => {
    const apiUrl = config.APIS_URL + '/departments';
    fetch(apiUrl)
      .then(res => res.json())
      .then(repos => {
        setApiDepartments(repos.data);
        setDepartments(repos.data);
      });
  }, [apiDepartments]);

  useEffect(() => {
    setUpdatedRow(isEditing === '-1' ? {} : departments[isEditing]);
  }, [isEditing]);

  useEffect(() => {}, [departments]);

  const handleDepartmentChange = (index, event) => {
    setUpdatedRow({
      id: departments[index]._id,
      department: event.target.value,
      escalationEmail: updatedRow.escalationEmail,
      escalationMobile: updatedRow.escalationMobile,
      active: updatedRow.active
    });
  };
  const handleEmailChange = (index, event) => {
    setUpdatedRow({
      id: departments[index]._id,
      department: updatedRow.department,
      escalationEmail: event.target.value,
      escalationMobile: updatedRow.escalationMobile,
      active: updatedRow.active
    });
  };

  const handleMobileChange = (index, event) => {
    setUpdatedRow({
      id: departments[index]._id,
      department: updatedRow.department,
      escalationEmail: updatedRow.escalationEmail,
      escalationMobile: event.target.value,
      active: updatedRow.active
    });
  };

  const handleActiveChange = (index, event) => {
    setUpdatedRow({
      id: departments[index]._id,
      department: updatedRow.department,
      escalationEmail: updatedRow.escalationEmail,
      escalationMobile: updatedRow.escalationMobile,
      active: event.target.checked
    });
  };

  return (
    <div>
      <div className="SectionHeader">Departments</div>
      <Table className={classes.table} aria-label="simple table">
        <TableRow>
          <TableCell>Sl. No.</TableCell>
          <TableCell>Department</TableCell>
          <TableCell>Escalation eMail</TableCell>
          <TableCell>Escalation Mobile</TableCell>
          <TableCell style={{ textAlign: 'center' }}>Active</TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>
            <TextField
              label="Department"
              id="outlined-size-small"
              value={newRow.department}
              onChange={e =>
                setNewRow({ department: e.target.value, active: newRow.active })
              }
              variant="outlined"
              size="small"
            />
          </TableCell>
          <TableCell>
            <TextField
              label="eMail"
              id="outlined-size-small"
              value={newRow.escalationEmail}
              onChange={e =>
                setNewRow({
                  department: newRow.department,
                  escalationEmail: e.target.value,
                  escalationMobile: newRow.escalationMobile,
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
              value={newRow.escalationMobile}
              onChange={e =>
                setNewRow({
                  executive: newRow.executive,
                  escalationEmail: newRow.escalationEmail,
                  escalationMobile: e.target.value,
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
                  department: newRow.department,
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
        {departments.map((item, idx) => {
          return (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
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
                    label="eMail"
                    id="outlined-size-small"
                    defaultValue={item.escalationEmail}
                    onChange={e => handleEmailChange(idx, e)}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  item.escalationEmail
                )}
              </TableCell>
              <TableCell>
                {isEditing === idx ? (
                  <TextField
                    label="Mobile"
                    id="outlined-size-small"
                    defaultValue={item.escalationMobile}
                    onChange={e => handleMobileChange(idx, e)}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  item.escalationMobile
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

export default DepartmentConfig;
