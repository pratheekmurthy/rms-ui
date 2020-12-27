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
import InputLabel from '@material-ui/core/InputLabel';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

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
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState({});

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

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(
        config.APIS_URL + '/subcategories/' + category.value
      );
      const body = await response.json();

      if (!unmounted) {
        setSubCategories(
          body.data.map(({ _id, subCategory }) => ({
            label: subCategory,
            value: _id
          }))
        );
        setLoading(false);
        body.data[0]
          ? setSubCategory({
              label: body.data[0].subCategory,
              value: body.data[0]._id
            })
          : setSubCategory({});
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, [category.value]);

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
          categoryid: category.value,
          category: category.label,
          subCategoryId: subCategory.value,
          subCategory: subCategory.label,
          sla: newRow.sla,
          active: newRow.active
        }
      };
      fetch(apiUrl, apiParam)
        .then(res => res.json())
        .then(repos => {
          setApiPriorities([]);
          setNewRow({
            priority: '',
            categoryid: '',
            category: '',
            subCategoryId: '',
            subCategory: '',
            sla: '',
            active: true
          });
        });
    }
  };

  useEffect(() => {
    const apiUrl = config.APIS_URL + '/priorities/' + subCategory.value;
    fetch(apiUrl)
      .then(res => res.json())
      .then(repos => {
        setApiPriorities(repos.data);
        setPriorities(apiPriorities);
      });
  }, [subCategory]);

  useEffect(() => {
    setUpdatedRow(isEditing === '-1' ? {} : priorities[isEditing]);
  }, [isEditing]);

  useEffect(() => {}, [priorities]);

  const handlePriorityChange = (index, event) => {
    setUpdatedRow({
      id: priorities[index]._id,
      priority: event.target.value,
      categoryId: category.value,
      category: category.label,
      subCategoryId: subCategory.value,
      subCategory: subCategory.label,
      sla: updatedRow.sla,
      active: updatedRow.active
    });
  };

  const handleSLAChange = (index, event) => {
    setUpdatedRow({
      id: priorities[index]._id,
      priority: updatedRow.priority,
      categoryId: category.value,
      category: category.label,
      subCategoryId: subCategory.value,
      subCategory: subCategory.label,
      sla: event.target.value,
      active: updatedRow.active
    });
  };

  const handleActiveChange = (index, event) => {
    setUpdatedRow({
      id: priorities[index]._id,
      priority: updatedRow.priority,
      categoryId: category.value,
      category: category.label,
      subCategoryId: subCategory.value,
      subCategory: subCategory.label,
      sla: updatedRow.sla,
      active: event.target.checked
    });
  };

  return (
    <div>
      <div className="SectionHeader">Priorities</div>
      <FormControl variant="outlined" className={classes.formControl}>
        <div className="SectionHeader">
          of Category{' '}
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
          </Select>{' '}
          &amp; SubCategory{' '}
          {/* <FormControl variant="outlined" className={classes.formControl}> */}
          <InputLabel htmlFor="outlined-age-native-simple">
            {/* subCategories */}
          </InputLabel>
          <Select
            native
            disabled={loading}
            label="subCategories"
            inputProps={{
              name: 'subCategories',
              id: 'subCategories'
            }}
            value={subCategory.value}
            onChange={e => {
              setSubCategory({
                value: e.target.value,
                text: subCategories.filter(
                  subCategory => subCategory.value === e.target.value
                )[0].label
              });
            }}
          >
            {subCategories.map(({ label, value }) => (
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
                  categoryId: category.value,
                  category: category.label,
                  subCategoryId: subCategory.value,
                  subCategory: subCategory.label,
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
                  categoryId: category.value,
                  category: category.label,
                  subCategoryId: subCategory.value,
                  subCategory: subCategory.label,
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
                  categoryId: category.value,
                  category: category.label,
                  subCategoryId: subCategory.value,
                  subCategory: subCategory.label,
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
        {priorities ||
          [].map((item, idx) => {
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
