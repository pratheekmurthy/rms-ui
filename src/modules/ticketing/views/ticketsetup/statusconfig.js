import React, { useState, useEffect } from "react";
import "./App.css";
import config from "../config.json";
//table import
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";

import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
function StatusConfig() {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [newRow, setNewRow] = useState({
    status: "",
    slahold: false,
    active: true,
  });
  const [apiStatuses, setApiStatuses] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [isEditing, setIsEditing] = useState(-1);
  const [updatedRow, setUpdatedRow] = useState({
    status: "",
    slahold: false,
    active: false,
  });

  const updateRow = () => {
    const val = JSON.stringify(updatedRow.status);
    // alert(val);
    if (val.length === 2) {
      alert("Please enter value");
    }
    // alert(JSON.stringify(updatedRow));
    else {
      setIsEditing(-1);
      const apiUrl = config.APIS_URL + "/statuses";
      var apiParam = {
        method: "PUT",
        headers: updatedRow,
      };
      fetch(apiUrl, apiParam)
        .then((res) => res.json())
        .then((repos) => {
          setApiStatuses([]);
        });
    }
  };

  const addRow = (e) => {
    const val = JSON.stringify(newRow.status);
    // alert(val);
    if (val.length === 2) {
      alert("Please enter value");
    }
    // alert(JSON.stringify(updatedRow));
    else {
      const apiUrl = config.APIS_URL + "/statuses";
      var apiParam = {
        method: "POST",
        headers: {
          status: newRow.status,
          slahold: newRow.slahold,
          active: newRow.active,
        },
      };
      fetch(apiUrl, apiParam)
        .then((res) => res.json())
        .then((repos) => {
          setApiStatuses([]);
          setNewRow({ status: "", slahold: false, active: true });
        });
    }
  };

  useEffect(() => {
    const apiUrl = config.APIS_URL + "/statuses";
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setApiStatuses(repos.data);
        setStatuses(apiStatuses);
      });
  }, [apiStatuses]);

  useEffect(() => {
    setUpdatedRow(isEditing === "-1" ? {} : statuses[isEditing]);
  }, [isEditing]);

  useEffect(() => {}, [statuses]);

  const handleStatusChange = (index, event) => {
    setUpdatedRow({
      id: statuses[index]._id,
      status: event.target.value,
      slahold: updatedRow.slahold,
      active: updatedRow.active,
    });
  };

  const handleSlaHoldChange = (index, event) => {
    setUpdatedRow({
      id: statuses[index]._id,
      status: updatedRow.status,
      slahold: event.target.checked,
      active: updatedRow.active,
    });
  };

  const handleActiveChange = (index, event) => {
    setUpdatedRow({
      id: statuses[index]._id,
      status: updatedRow.status,
      slahold: updatedRow.slahold,
      active: event.target.checked,
    });
  };

  return (
    <div>
      <div className="SectionHeader">Status</div>
      <Table>
        <TableRow>
          <TableCell>Sl. No.</TableCell>
          <TableCell>Status</TableCell>
          <TableCell style={{ textAlign: "center" }}>SLA on Hold</TableCell>
          <TableCell style={{ textAlign: "center" }}>Active</TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>
            <TextField
              label="Status"
              id="outlined-size-small"
              value={newRow.status}
              onChange={(e) =>
                setNewRow({
                  status: e.target.value,
                  slahold: newRow.slahold,
                  active: newRow.active,
                })
              }
              variant="outlined"
              size="small"
            />
          </TableCell>
          <TableCell>
            <Checkbox
              checked={newRow.slahold}
              onChange={(e) =>
                setNewRow({
                  status: newRow.status,
                  slahold: e.target.checked,
                  active: newRow.active,
                })
              }
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </TableCell>
          <TableCell>
            <Checkbox
              checked={newRow.active}
              onChange={(e) =>
                setNewRow({
                  status: newRow.status,
                  slahold: newRow.slahold,
                  active: e.target.checked,
                })
              }
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
        {statuses.map((item, idx) => {
          return (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                {isEditing === idx ? (
                  <TextField
                    label="Status"
                    id="outlined-size-small"
                    defaultValue={item.status}
                    onChange={(e) => handleStatusChange(idx, e)}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  item.status
                )}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                <Checkbox
                  defaultChecked={item.slahold}
                  disabled={isEditing === idx ? false : true}
                  onChange={(e) => handleSlaHoldChange(idx, e)}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                <Checkbox
                  defaultChecked={item.active}
                  disabled={isEditing === idx ? false : true}
                  onChange={(e) => handleActiveChange(idx, e)}
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
    </div>
  );
}

export default StatusConfig;
