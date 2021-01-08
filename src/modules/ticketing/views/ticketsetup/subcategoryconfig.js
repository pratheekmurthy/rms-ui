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
import InputLabel from '@material-ui/core/InputLabel';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
function SubCategoryConfig() {
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
  const [newRow, setNewRow] = useState({ subcategory: '', active: true });
  const [apiSubCategories, setApiSubCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState({});
  const [isEditing, setIsEditing] = useState(-1);
  const [updatedRow, setUpdatedRow] = useState({
    subcategory: '',
    active: false
  });

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/categories');
      const body = await response.json();
      if (!unmounted) {
        setCategories(
          body.data.map(({ _id, category }) => ({
            label: category,
            value: _id
          }))
        );
        setLoading(false);
        body.data[0]
          ? setCategory({
              label: body.data[0].category,
              value: body.data[0]._id
            })
          : setCategory({});
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, []);

  const updateRow = () => {
    const val = JSON.stringify(updatedRow.subcategory);

    if (val.length === 2) {
      alert('Please enter value');
    } else {
      setIsEditing(-1);
      const apiUrl = config.APIS_URL + '/subcategories';
      var apiParam = {
        method: 'PUT',
        headers: updatedRow
      };
      fetch(apiUrl, apiParam)
        .then(res => res.json())
        .then(repos => {
          setApiSubCategories([]);
        });
    }
  };

  const addRow = e => {
    const val = JSON.stringify(newRow.subcategory);

    if (val.length === 2) {
      alert('Please enter value');
    } else {
      const apiUrl = config.APIS_URL + '/subcategories';
      var apiParam = {
        method: 'POST',
        headers: {
          categoryid: category.value,
          category: category.label,
          subcategory: newRow.subcategory,
          active: newRow.active
        }
      };
      fetch(apiUrl, apiParam)
        .then(res => res.json())
        .then(repos => {
          setApiSubCategories([]);
          setNewRow({
            categoryid: '',
            category: '',
            subcategory: '',
            active: true
          });
        })
        .catch(e => alert(JSON.stringify(e)));
    }
  };

  useEffect(() => {
    const apiUrl = config.APIS_URL + '/subcategories/' + category.value;
    fetch(apiUrl)
      .then(res => res.json())
      .then(repos => {
        setApiSubCategories(repos.data);
        setSubCategories(repos.data);
      });
  }, [category.value, apiSubCategories]);

  useEffect(() => {
    setUpdatedRow(isEditing === '-1' ? {} : subCategories[isEditing]);
  }, [isEditing]);

  useEffect(() => {}, [subCategories]);

  const handleSubCategoryChange = (index, event) => {
    setUpdatedRow({
      id: subCategories[index]._id,
      categoryid: category.value,
      category: category.label,
      subCategory: event.target.value,
      active: updatedRow.active
    });
  };

  const handleActiveChange = (index, event) => {
    setUpdatedRow({
      id: subCategories[index]._id,
      categoryid: category.value,
      category: category.label,
      subCategory: updatedRow.subCategory,
      active: event.target.checked
    });
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <div className="SectionHeader">
          SubCategories of Category{' '}
          <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
          <Select
            native
            disabled={loading}
            label="categories"
            inputProps={{
              name: 'categories',
              id: 'categories'
            }}
            value={category.value}
            onChange={e => {
              setCategory({
                value: e.target.value,
                label: categories.filter(
                  category => category.value === e.target.value
                )[0].label
              });
            }}
          >
            {categories.map(({ label, value }) => (
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
          <TableCell>SubCategory</TableCell>
          <TableCell style={{ textAlign: 'center' }}>Active</TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>
            <TextField
              label="SubCategory"
              id="outlined-size-small"
              value={newRow.subcategory}
              onChange={e =>
                setNewRow({
                  categoryid: category.value,
                  category: category.label,
                  subcategory: e.target.value,
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
                  categoryid: category.value,
                  category: category.label,
                  subcategory: newRow.subcategory,
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
        {subCategories.map((item, idx) => {
          return (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                {isEditing === idx ? (
                  <TextField
                    label="Sub Categor"
                    id="outlined-size-small"
                    defaultValue={item.subCategory}
                    onChange={e => handleSubCategoryChange(idx, e)}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  item.subCategory
                )}
              </TableCell>
              <TableCell>
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

export default SubCategoryConfig;
