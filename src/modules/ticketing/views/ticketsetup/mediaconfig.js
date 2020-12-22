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
function MediaConfig() {
  const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch'
      }
    }
  }));
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);

  const handleChange = event => {
    setChecked(event.target.checked);
  };
  const [newRow, setNewRow] = useState({ media: '', active: true });
  const [apiMedium, setApiMedium] = useState([]);
  const [medium, setMedium] = useState([]);
  const [isEditing, setIsEditing] = useState(-1);
  const [updatedRow, setUpdatedRow] = useState({
    media: '',
    active: false
  });

  const updateRow = () => {
    const val1 = JSON.stringify(updatedRow.media);
    const val2 = JSON.stringify(updatedRow.nameLabel);
    const val3 = JSON.stringify(updatedRow.idLabel);

    if (val1.length === 2 || val2.length === 2 || val3.length === 2) {
      alert('Please enter value');
    } else {
      setIsEditing(-1);
      const apiUrl = config.APIS_URL + '/medium';
      var apiParam = {
        method: 'PUT',
        headers: updatedRow
      };
      fetch(apiUrl, apiParam)
        .then(res => res.json())
        .then(repos => {
          setApiMedium([]);
        });
    }
  };

  const addRow = e => {
    const val1 = JSON.stringify(newRow.media);
    const val2 = JSON.stringify(newRow.nameLabel);
    const val3 = JSON.stringify(newRow.idLabel);

    if (val1.length === 2 || val2.length === 2 || val3.length === 2) {
      alert('Please enter value');
    } else {
      const apiUrl = config.APIS_URL + '/medium';
      var apiParam = {
        method: 'POST',
        headers: {
          media: newRow.media,
          nameLabel: newRow.nameLabel,
          idLabel: newRow.idLabel,
          active: newRow.active
        }
      };
      fetch(apiUrl, apiParam)
        .then(res => res.json())
        .then(repos => {
          setApiMedium([]);
          setNewRow({ media: '', active: true });
        });
    }
  };

  useEffect(() => {
    const apiUrl = config.APIS_URL + '/medium';
    fetch(apiUrl)
      .then(res => res.json())
      .then(repos => {
        setApiMedium(repos.data);
        setMedium(apiMedium);
      });
  }, [apiMedium]);

  useEffect(() => {
    setUpdatedRow(isEditing === '-1' ? {} : medium[isEditing]);
  }, [isEditing]);

  useEffect(() => {}, [medium]);

  const handleMediaChange = (index, event) => {
    setUpdatedRow({
      id: medium[index]._id,
      media: event.target.value,
      nameLabel: updatedRow.nameLabel,
      idLabel: updatedRow.idLabel,
      active: updatedRow.active
    });
  };
  const handleNameChange = (index, event) => {
    setUpdatedRow({
      id: medium[index]._id,
      media: updatedRow.media,
      nameLabel: event.target.value,
      idLabel: updatedRow.idLabel,
      active: updatedRow.active
    });
  };
  const handleIdChange = (index, event) => {
    setUpdatedRow({
      id: medium[index]._id,
      media: updatedRow.media,
      nameLabel: updatedRow.nameLabel,
      idLabel: event.target.value,
      active: updatedRow.active
    });
  };

  const handleActiveChange = (index, event) => {
    setUpdatedRow({
      id: medium[index]._id,
      media: updatedRow.media,
      nameLabel: updatedRow.nameLabel,
      idLabel: updatedRow.idLabel,
      active: event.target.checked
    });
  };

  return (
    <div>
      <div className="SectionHeader">Source Media</div>
      <Table className={classes.table} aria-label="simple table">
        <TableRow>
          <TableCell>Sl. No. </TableCell>
          <TableCell>Media </TableCell>
          <TableCell>Name Label </TableCell>
          <TableCell>Id Label </TableCell>
          <TableCell style={{ textAlign: 'center' }}>Active </TableCell>
          <TableCell> </TableCell>
        </TableRow>
        <TableRow>
          <TableCell> </TableCell>
          <TableCell>
            <TextField
              label="Media"
              id="outlined-size-small"
              value={newRow.media}
              onChange={e =>
                setNewRow({
                  media: e.target.value,
                  nameLabel: newRow.nameLabel,
                  idLabel: newRow.idLabel,
                  active: newRow.active
                })
              }
              variant="outlined"
              size="small"
            />
          </TableCell>
          <TableCell>
            <TextField
              label="Name Label"
              id="outlined-size-small"
              value={newRow.nameLabel}
              onChange={e =>
                setNewRow({
                  media: newRow.media,
                  nameLabel: e.target.value,
                  idLabel: newRow.idLabel,
                  active: newRow.active
                })
              }
              variant="outlined"
              size="small"
            />
          </TableCell>
          <TableCell>
            <TextField
              label="Id Label"
              id="outlined-size-small"
              value={newRow.idLabel}
              onChange={e =>
                setNewRow({
                  media: newRow.media,
                  nameLabel: newRow.nameLabel,
                  idLabel: e.target.value,
                  active: newRow.active
                })
              }
              variant="outlined"
              size="small"
            />
          </TableCell>
          <TableCell>
            <Checkbox
              checked={newRow.active}
              onChange={e =>
                setNewRow({
                  media: newRow.media,
                  nameLabel: newRow.nameLabel,
                  idLabel: newRow.idLabel,
                  active: e.target.checked
                })
              }
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
        {medium.map((item, idx) => {
          return (
            <TableRow key={idx}>
              <TableCell>{idx + 1} </TableCell>
              <TableCell>
                {isEditing === idx ? (
                  <TextField
                    label="Media"
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    defaultValue={item.media}
                    onChange={e => handleMediaChange(idx, e)}
                  />
                ) : (
                  item.media
                )}
              </TableCell>
              <TableCell>
                {isEditing === idx ? (
                  <TextField
                    label="Name Label"
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    defaultValue={item.nameLabel}
                    onChange={e => handleNameChange(idx, e)}
                  />
                ) : (
                  item.nameLabel
                )}
              </TableCell>
              <TableCell>
                {isEditing === idx ? (
                  <TextField
                    label="Id Label"
                    id="outlined-size-small"
                    defaultValue={item.idLabel}
                    onChange={e => handleIdChange(idx, e)}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  item.idLabel
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

export default MediaConfig;
