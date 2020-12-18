import React, { useState, useEffect } from "react";
import "./App.css";
import config from "../config.json";
//table import
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
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
function CategoryConfig() {
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
  const [newRow, setNewRow] = useState({ category: "", active: true });
  const [apiCategories, setApiCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(-1);
  const [updatedRow, setUpdatedRow] = useState({ category: "", active: false });

  const updateRow = () => {
     const val = JSON.stringify(updatedRow.category);
      // alert(val);
     if (val.length === 2) {
       alert("Please enter value");
     }
     else{
    setIsEditing(-1);
    const apiUrl = config.APIS_URL + "/categories";
    var apiParam = {
      method: "PUT",
      headers: updatedRow,
    };
    fetch(apiUrl, apiParam)
      .then((res) => res.json())
      .then((repos) => {
        setApiCategories([]);
      });
     }
  };

  const addRow = (e) => {
     const val = JSON.stringify(newRow.category);
      // alert(val);
     if (val.length === 2) {
       alert("Please enter value");
     }
     else{
    const apiUrl = config.APIS_URL + "/categories";
    var apiParam = {
      method: "POST",
      headers: {
        category: newRow.category,
        active: newRow.active,
      },
    };
    fetch(apiUrl, apiParam)
      .then((res) => res.json())
      .then((repos) => {
        setApiCategories([]);
        setNewRow({ category: "", active: true });
      });
    }
  };

  useEffect(() => {
    const apiUrl = config.APIS_URL + "/categories";
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setApiCategories(repos.data);
        setCategories(apiCategories);
      });
  }, [apiCategories]);

  useEffect(() => {
    setUpdatedRow(isEditing === "-1" ? {} : categories[isEditing]);
  }, [isEditing]);

  useEffect(() => {}, [categories]);

  const handleCategoryChange = (index, event) => {
    setUpdatedRow({
      id: categories[index]._id,
      category: event.target.value,
      active: updatedRow.active,
    });
  };

  const handleActiveChange = (index, event) => {
    setUpdatedRow({
      id: categories[index]._id,
      category: updatedRow.category,
      active: event.target.checked,
    });
  };

  return (
    <div>
      <div className="SectionHeader">Categories</div>
      <Table className={classes.table} aria-label="simple table">
        <TableRow>
          <TableCell>Sl. No.</TableCell>
          <TableCell>Category</TableCell>
          <TableCell style={{ textAlign: "center" }}>Active</TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>
          <TextField
          label="Category"
          id="outlined-size-small"
          value={newRow.category}
              onChange={(e) =>
                setNewRow({ category: e.target.value, active: newRow.active })
              }
          variant="outlined"
          size="small"
        /> 

           
          </TableCell>
          <TableCell>
          <Checkbox
          onChange={(e) =>
            setNewRow({
              category: newRow.category,
              active: e.target.checked,
            })
          }
          checked={newRow.active}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
           
          </TableCell>
          <TableCell>
            <Button variant="contained" color="primary" onClick={addRow} className="SmallButton">
              Add
            </Button>
          </TableCell>
        </TableRow>
        {categories.map((item, idx) => {
          return (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                {isEditing === idx ? (
                  <TextField
                  label="Category"
                  id="outlined-size-small"
                  defaultValue={item.category}
                  onChange={(e) => handleCategoryChange(idx, e)}
                  variant="outlined"
                  size="small"
                /> 
                  
                ) : (
                  item.category
                )}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
              <Checkbox
           defaultChecked={item.active}
           disabled={isEditing === idx ? false : true}
           onChange={(e) => handleActiveChange(idx, e)}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
                
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary"
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

export default CategoryConfig;
