import React, { useState, useEffect } from "react";
import "./App.css";
import config from "../config.json";
//Table import
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
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
function SubCategoryItemConfig() {
  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 220,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
   
  })); 
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState({});
  const [newRow, setNewRow] = useState({
    categoryid: category.value,
    category: category.label,
    subCategoryId: subCategory.value,
    subCategory: subCategory.label,
    subCategoryItem: "",
    active: true,
  });
  const [apiSubCategoryItems, setApiSubCategoryItems] = useState([]);
  const [subCategoryItems, setSubCategoryItems] = useState([]);
  const [isEditing, setIsEditing] = useState(-1);
  const [updatedRow, setUpdatedRow] = useState({
    categoryid: category.value,
    category: category.label,
    subCategoryId: subCategory.value,
    subCategory: subCategory.label,
    subCategoryItem: "",
    active: false,
  });

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL+"/categories");
      const body = await response.json();
      if (!unmounted) {
        setCategories(
          body.data.map(({ _id, category }) => ({
            label: category,
            value: _id,
          }))
        );
        setLoading(false);
        body.data[0]
          ? setCategory({
              label: body.data[0].category,
              value: body.data[0]._id,
            })
          : setCategory({});
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
        config.APIS_URL+"/subcategories/" + category.value
      );
      const body = await response.json();

      if (!unmounted) {
        setSubCategories(
          body.data.map(({ _id, subCategory }) => ({
            label: subCategory,
            value: _id,
          }))
        );
        setLoading(false);
        body.data[0]
          ? setSubCategory({
              label: body.data[0].subCategory,
              value: body.data[0]._id,
            })
          : setSubCategory({});
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, [category.value]);

  /*  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(
        config.APIS_URL+"/subcategoryitems/" +
          category.value +
          "/" +
          subCategory.value
      );
      const body = await response.json();
      if (!unmounted) {
        setSubCategoryItems(
          body.data.map(({ _id, subCategoryItem }) => ({
            label: subCategoryItem,
            value: _id,
          }))
        );
        setLoading(false);
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, [subCategory.value, apiSubCategoryItems]); */

  const updateRow = () => {
      const val = JSON.stringify(updatedRow.subCategoryItem);
      // alert(val);
      if (val.length === 2) {
        alert("Please enter value");
      }
      else{
    setIsEditing(-1);
    const apiUrl = config.APIS_URL + "/subcategoryitems";
    var apiParam = {
      method: "PUT",
      headers: updatedRow,
    };
    fetch(apiUrl, apiParam)
      .then((res) => res.json())
      .then((repos) => {
        setApiSubCategoryItems([]);
      });
    }
  };

  const addRow = (e) => {
    const val = JSON.stringify(newRow.subCategoryItem);
      // alert(val);
      if (val.length === 2) {
        alert("Please enter value");
      }
      else{
    const apiUrl = config.APIS_URL + "/subcategoryitems";
    var apiParam = {
      method: "POST",
      headers: {
        categoryid: category.value,
        category: category.label,
        subCategoryId: subCategory.value,
        subCategory: subCategory.label,
        subCategoryItem: newRow.subCategoryItem,
        active: newRow.active,
      },
    };
    fetch(apiUrl, apiParam)
      .then((res) => res.json())
      .then((repos) => {
        setApiSubCategoryItems([]);
        setNewRow({
          categoryid: category.value,
          category: category.label,
          subCategoryId: subCategory.value,
          subCategory: subCategory.label,
          subCategoryItem: "",
          active: true,
        });
      });
    }
  };

  useEffect(() => {
    const apiUrl =
      config.APIS_URL +
      "/subcategoryitems/" +
      category.value +
      "/" +
      subCategory.value;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setApiSubCategoryItems(repos.data);
        setSubCategoryItems(apiSubCategoryItems);
      });
  }, [subCategory.value, apiSubCategoryItems]);

  useEffect(() => {
    isEditing === -1
      ? setUpdatedRow({
          id: "",
          categoryId: "",
          category: "",
          subCategoryId: "",
          subCategory: "",
          subCategoryItem: "",
          active: false,
        })
      : setUpdatedRow({
          id: subCategoryItems[isEditing]._id,
          categoryId: category.value,
          category: category.label,
          subCategoryId: subCategory.value,
          subCategory: subCategory.label,
          subCategoryItem: subCategoryItems[isEditing].subCategoryItem,
          active: subCategoryItems[isEditing].active,
        });
  }, [isEditing]);

  useEffect(() => {}, [subCategoryItems]);

  const handleSubCategoryItemChange = (index, event) => {
    setUpdatedRow({
      id: subCategoryItems[index]._id,
      categoryId: category.value,
      category: category.label,
      subCategoryId: subCategory.value,
      subCategory: subCategory.label,
      subCategoryItem: event.target.value,
      active: updatedRow.active,
    });
  };

  const handleActiveChange = (index, event) => {
    setUpdatedRow({
      id: subCategoryItems[index]._id,
      categoryId: category.value,
      category: category.label,
      subCategoryId: subCategory.value,
      subCategory: subCategory.label,
      subCategoryItem: updatedRow.subCategoryItem,
      active: event.target.checked,
    });
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <div className="SectionHeader">
          SubCategoryItems of Category{" "}
          <InputLabel htmlFor="outlined-age-native-simple">
           
          </InputLabel>
          <Select
            native
            disabled={loading}
            label="categories"
            inputProps={{
              name: "categories",
              id: "categories",
            }}
            value={category.value}
            onChange={(e) => {
              setCategory({
                value: e.target.value,
                label: categories.filter(
                  (category) => category.value === e.target.value
                )[0].label,
              });
            }}
          >
            {categories.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>{" "}
          &amp; SubCategory{" "}
          {/* <FormControl variant="outlined" className={classes.formControl}> */}
            <InputLabel htmlFor="outlined-age-native-simple">
              {/* subCategories */}
            </InputLabel>
            <Select
              native
              disabled={loading}
              label="subCategories"
              inputProps={{
                name: "subCategories",
                id: "subCategories",
              }}
              value={subCategory.value}
              onChange={(e) => {
                setSubCategory({
                  value: e.target.value,
                  text: subCategories.filter(
                    (subCategory) => subCategory.value === e.target.value
                  )[0].label,
                });
              }}
            >
              {subCategories.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          {/* </FormControl> */}
        </div>
      </FormControl>
      <Table className={classes.table} aria-label="simple table">
        <TableRow>
          <TableCell>Sl. No. </TableCell>
          <TableCell>SubCategoryItem </TableCell>
          <TableCell style={{ textAlign: "center" }}>Active </TableCell>
          <TableCell> </TableCell>
        </TableRow>
        <TableRow>
          <TableCell> </TableCell>
          <TableCell>
            <TextField
              label="SubCategoryItem"
              id="outlined-size-small"
              value={newRow.subCategoryItem}
              onChange={(e) =>
                setNewRow({
                  categoryid: category.value,
                  category: category.label,
                  subCategoryId: subCategory.value,
                  subCategory: subCategory.label,
                  subCategoryItem: e.target.value,
                  active: newRow.active,
                })
              }
              variant="outlined"
              size="small"
            />
          </TableCell>
          <TableCell>
            <Checkbox
              onChange={(e) =>
                setNewRow({
                  categoryid: category.value,
                  category: category.label,
                  subCategoryId: subCategory.value,
                  subCategory: subCategory.label,
                  subCategoryItem: newRow.subCategoryItem,
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
        {subCategoryItems.map((item, idx) => {
          return (
            <TableRow key={idx}>
              <TableCell>{idx + 1} </TableCell>
              <TableCell>
                {isEditing === idx ? (
                  <TextField
                    label="SubCategoryItem"
                    id="outlined-size-small"
                    defaultValue={item.subCategoryItem}
                    onChange={(e) => handleSubCategoryItemChange(idx, e)}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  item.subCategoryItem
                )}
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

export default SubCategoryItemConfig;
