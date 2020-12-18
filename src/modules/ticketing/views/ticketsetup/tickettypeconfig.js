import React, { useState, useEffect } from "react";
import "./App.css";
import config from "../config.json";
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
function TicketTypeConfig() {
  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
   
  })); 
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [newRow, setNewRow] = useState({ tickettype: "", active: true });
  const [apiTicketTypes, setApiTicketTypes] = useState([]);
  const [tickettypes, setTicketTypes] = useState([]);
  const [isEditing, setIsEditing] = useState(-1);
  const [updatedRow, setUpdatedRow] = useState({
    tickettype: "",
    active: false,
  });

  const updateRow = () => {
   
    const val = JSON.stringify(updatedRow.tickettype);
    //  alert(val.length);
    if (val.length === 2) {
      alert("Please enter value")
    }
    else{
    setIsEditing(-1);
    const apiUrl = config.APIS_URL + "/tickettypes";
    var apiParam = {
      method: "PUT",
      headers: updatedRow,
    };
    fetch(apiUrl, apiParam)
      .then((res) => res.json())
      .then((repos) => {
        setApiTicketTypes([]);
      });
    }
  };

  const addRow = (e) => {
     const val = JSON.stringify(newRow.tickettype);
     //  alert(val.length);
     if (val.length === 2) {
       alert("Please enter value");
     }
    // alert(JSON.stringify(newRow.tickettype));
    else{
    const apiUrl = config.APIS_URL + "/tickettypes";
    var apiParam = {
      method: "POST",
      headers: {
        tickettype: newRow.tickettype,
        active: newRow.active,
      },
    };
    fetch(apiUrl, apiParam)
      .then((res) => res.json())
      .then((repos) => {
        setApiTicketTypes([]);
        setNewRow({ tickettype: "", active: true });
      });
    }
  };

  useEffect(() => {
    const apiUrl = config.APIS_URL + "/tickettypes";
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setApiTicketTypes(repos.data);
        setTicketTypes(apiTicketTypes);
      });
  }, [apiTicketTypes]);

  useEffect(() => {
    setUpdatedRow(isEditing === "-1" ? {} : tickettypes[isEditing]);
  }, [isEditing]);

  useEffect(() => {}, [tickettypes]);

  const handleTicketTypeChange = (index, event) => {
    
    setUpdatedRow({
      id: tickettypes[index]._id,
      tickettype: event.target.value,
      active: updatedRow.active,
    });
  };

  const handleActiveChange = (index, event) => {
    setUpdatedRow({
      id: tickettypes[index]._id,
      tickettype: updatedRow.tickettype,
      active: event.target.checked,
    });
  };

  return (
    <div>
      <form className={classes.root} Validate>
        <div className="SectionHeader">TicketTypes</div>
        <Table className={classes.table} aria-label="simple table">
          <TableRow>
            <TableCell>Sl. No. </TableCell>
            <TableCell>TicketType </TableCell>
            <TableCell style={{ textAlign: "center" }}>Active </TableCell>
            <TableCell> </TableCell>
          </TableRow>
          <TableRow>
            <TableCell> </TableCell>
            <TableCell>
              <TextField
                type="text"
                value={newRow.tickettype}
                onChange={(e) =>
                  setNewRow({
                    tickettype: e.target.value,
                    active: newRow.active,
                  })
                }
                label="TicketType"
                id="outlined-size-small"
                variant="outlined"
                size="small"
              />
            </TableCell>
            <TableCell>
              <Checkbox
                onChange={(e) =>
                  setNewRow({
                    tickettype: newRow.tickettype,
                    active: e.target.checked,
                  })
                }
                checked={newRow.active}
                inputProps={{ "aria-label": "primary checkbox" }}
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
          {tickettypes.map((item, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell>{idx + 1} </TableCell>
                <TableCell>
                  {isEditing === idx ? (
                    <TextField
                      error={item.ticketType === ""}
                      type="text"
                      defaultValue={item.ticketType}
                      onChange={(e) => {
                        handleTicketTypeChange(idx, e)}}
                      label="TicketType"
                      id="outlined-size-small"
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    item.ticketType
                  )}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <Checkbox
                    defaultChecked={item.active}
                    disabled={isEditing === idx ? false : true}
                    onChange={(e) => handleActiveChange(idx, e)}
                    checked={newRow.active}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) =>
                      isEditing === idx ? updateRow(item) : setIsEditing(idx)
                    }
                    className="SmallButton"
                  >
                    {isEditing === idx ? "Update" : "Edit"}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </Table>
      </form>
    </div>
  );
}

export default TicketTypeConfig;
