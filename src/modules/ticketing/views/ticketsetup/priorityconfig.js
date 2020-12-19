import React, { useState, useEffect } from 'react';
import './App.css';
import config from '../config.json';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

function PriorityConfig() {
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
  const [newRow, setNewRow] = useState({ priority: '', sla: '', active: true });
  const [apiPriorities, setApiPriorities] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [isEditing, setIsEditing] = useState(-1);
  const [updatedRow, setUpdatedRow] = useState({
    priority: '',
    sla: 24,
    active: false
  });

  const updateRow = () => {
    const val1 = JSON.stringify(updatedRow.priority);
    const val2 = JSON.stringify(updatedRow.sla);

    if (val1.length === 2 || val2.length === 2) {
      alert('Please enter value');
    } else {
      setIsEditing(-1);
      const apiUrl = config.APIS_URL + '/priorities';
      var apiParam = {
        method: 'PUT',
        headers: updatedRow
      };
      fetch(apiUrl, apiParam)
        .then(res => res.json())
        .then(repos => {
          setApiPriorities([]);
        });
    }
  };

  const addRow = e => {
    const val1 = JSON.stringify(newRow.priority);
    const val2 = JSON.stringify(newRow.sla);

    if (val1.length === 2 || val2.length === 2) {
      alert('Please enter value');
    } else {
      const apiUrl = config.APIS_URL + '/priorities';
      var apiParam = {
        method: 'POST',
        headers: {
          priority: newRow.priority,
          sla: newRow.sla,
          active: newRow.active
        }
      };
      fetch(apiUrl, apiParam)
        .then(res => res.json())
        .then(repos => {
          setApiPriorities([]);
          setNewRow({ priority: '', sla: '', active: true });
        });
    }
  };

  useEffect(() => {
    const apiUrl = config.APIS_URL + '/priorities';
    fetch(apiUrl)
      .then(res => res.json())
      .then(repos => {
        setApiPriorities(repos.data);
        setPriorities(apiPriorities);
      });
  }, [apiPriorities]);

  useEffect(() => {
    setUpdatedRow(isEditing === '-1' ? {} : priorities[isEditing]);
  }, [isEditing]);

  useEffect(() => {}, [priorities]);

  const handlePriorityChange = (index, event) => {
    setUpdatedRow({
      id: priorities[index]._id,
      priority: event.target.value,
      sla: updatedRow.sla,
      active: updatedRow.active
    });
  };

  const handleSLAChange = (index, event) => {
    setUpdatedRow({
      id: priorities[index]._id,
      priority: updatedRow.priority,
      sla: event.target.value,
      active: updatedRow.active
    });
  };

  const handleActiveChange = (index, event) => {
    setUpdatedRow({
      id: priorities[index]._id,
      priority: updatedRow.priority,
      sla: updatedRow.sla,
      active: event.target.checked
    });
  };

  return (
    <div>
      <div className="SectionHeader">Priorities</div>
      <Table className={classes.table} aria-label="simple table">
        <TableRow>
          <TableCell>Sl. No.</TableCell>
          <TableCell>Priority</TableCell>
          <TableCell>SLA</TableCell>
          <TableCell style={{ textAlign: 'center' }}>Active</TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>
            <TextField
              label="Priority"
              id="outlined-size-small"
              value={newRow.priority}
              onChange={e =>
                setNewRow({
                  priority: e.target.value,
                  sla: newRow.sla,
                  active: newRow.active
                })
              }
              variant="outlined"
              size="small"
            />
          </TableCell>
          <TableCell>
            <TextField
              label="SLA in Hours"
              id="outlined-size-small"
              type="number"
              value={newRow.sla}
              onChange={e =>
                setNewRow({
                  priority: newRow.priority,
                  sla: e.target.value,
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
                  priority: newRow.priority,
                  sla: newRow.sla,
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
        {priorities.map((item, idx) => {
          return (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                {isEditing === idx ? (
                  <TextField
                    label="Priority"
                    id="outlined-size-small"
                    defaultValue={item.priority}
                    onChange={e => handlePriorityChange(idx, e)}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  item.priority
                )}
              </TableCell>
              <TableCell>
                {isEditing === idx ? (
                  <TextField
                    label="SLA"
                    id="outlined-size-small"
                    type="number"
                    defaultValue={item.sla}
                    onChange={e => handleSLAChange(idx, e)}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  item.sla
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

export default PriorityConfig;
