import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { DateRangePicker } from 'materialui-daterange-picker';
import { useState, useEffect } from 'react';
import config from '../../views/config.json';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 150
    }
  },
  paper: {
    padding: theme.spacing(1),
    marginBottom: 15
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-start'
  }
}));

export default function FilterTicket(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [apiTickets, setApiTickets] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [ticketNumber, setTicketNumber] = useState('');
  const [distributorName, setDistributorName] = useState('');
  const [distributorId, setDistributorId] = useState('');
  const [Createon, setCreateon] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketType, setTicketType] = useState({});
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState({});
  const [subCategoryItems, setSubCategoryItems] = useState([]);
  const [subCategoryItem, setSubCategoryItem] = useState({});
  const [priorities, setPriorities] = useState([]);
  const [priority, setPriority] = useState({});
  const [medium, setMedium] = useState([]);
  const [media, setMedia] = useState({});
  const [statuses, setStatuses] = useState([]);
  const [status, setStatus] = useState({});

  const [open, setOpen] = React.useState(false);
  const [opendate, setOpendate] = React.useState(true);
  // const toggle = () => setOpen(!open);
  const [dateRange, setDateRange] = React.useState({});
  const toggle = () => setOpendate(!open);
  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/tickettypes');
      const body = await response.json();
      if (!unmounted) {
        setTicketTypes(
          body.data.map(({ _id, ticketType }) => ({
            label: ticketType,
            value: _id
          }))
        );
        setLoading(false);
        setTicketType({
          label: 'All',
          value: ''
        });
        /* setTicketTypes(
          body.data.map(({ _id, ticketType }) => ({
            label: ticketType,
            value: _id
          }))
        );
        setLoading(false);
        body.data[0]
          ? setTicketType({
              label: body.data[0].tickettype,
              value: body.data[0]._id
            })
          : setTicketType({}); */
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
      const response = await fetch(config.APIS_URL + '/medium');
      const body = await response.json();
      if (!unmounted) {
        setMedium(
          body.data.map(({ _id, media }) => ({
            label: media,
            value: _id
          }))
        );
        setLoading(false);
        body.data[0]
          ? setMedia({
              label: body.data[0].media,
              value: body.data[0]._id
            })
          : setMedia({});
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

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(
        config.APIS_URL +
          '/subcategoryitems/' +
          category.value +
          '/' +
          subCategory.value
      );
      const body = await response.json();
      if (!unmounted) {
        setSubCategoryItems(
          body.data.map(({ _id, subCategoryItem }) => ({
            label: subCategoryItem,
            value: _id
          }))
        );
        setLoading(false);
        body.data[0]
          ? setSubCategoryItem({
              label: body.data[0].subCategoryItem,
              value: body.data[0]._id
            })
          : setSubCategoryItem({});
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, [subCategory.value]);

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(
        config.APIS_URL +
          '/priorities/' +
          (subCategory.value
            ? subCategory.value.toString().length > 0
              ? subCategory.value
              : 'abcdefghijklmnop'
            : 'abcdefghijklmnop')
      );
      const body = await response.json();
      if (!unmounted) {
        setPriorities(
          body.data.map(({ _id, priority }) => ({
            label: priority,
            value: _id
          }))
        );
        setLoading(false);
        body.data[0]
          ? setPriority({
              label: body.data[0].priority,
              value: body.data[0]._id
            })
          : setPriority({});
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, [subCategory, category]);

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/statuses');
      const body = await response.json();
      if (!unmounted) {
        setStatuses(
          body.data.map(({ _id, status }) => ({
            label: status,
            value: _id
          }))
        );
        setLoading(false);
        body.data[0]
          ? setStatus({
              label: body.data[0].status,
              value: body.data[0]._id
            })
          : setStatus({});
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, []);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Box component="div" className={classes.alignCenter}>
          <Typography variant="h6" style={{ marginRight: 10, marginLeft: 5 }}>
            Filter :
          </Typography>
          <TextField
            id="standard-select-currency-native"
            label="Ticket No."
            size="small"
            value={ticketNumber}
            onChange={e => {
              setTicketNumber(e.target.value);
              props.setTicketNumber(e.target.value);
            }}
            InputLabelProps={{
              shrink: true
            }}
            SelectProps={{
              native: true
            }}
            InputProps={{
              style: { fontSize: 13 },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          ></TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Ticket Type"
            size="small"
            InputLabelProps={{
              shrink: true
            }}
            SelectProps={{
              native: true
            }}
            inputProps={{ style: { fontSize: 13 } }}
            value={ticketType.value}
            onChange={e => {
              setTicketType({
                value: e.target.value,
                label: ticketTypes.filter(
                  ticketType => ticketType.value === e.target.value
                )[0]
                  ? ticketTypes.filter(
                      ticketType => ticketType.value === e.target.value
                    )[0].label
                  : ''
              });
              props.setTicketType({
                value: e.target.value,
                label: ticketTypes.filter(
                  ticketType => ticketType.value === e.target.value
                )[0]
                  ? ticketTypes.filter(
                      ticketType => ticketType.value === e.target.value
                    )[0].label
                  : ''
              });
            }}
          >
            {[...[{ label: 'All', value: '' }], ...ticketTypes].map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Category"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{ style: { fontSize: 13 } }}
            value={category.value}
            onChange={e => {
              setCategory({
                value: e.target.value,
                label: categories.filter(
                  category => category.value === e.target.value
                )[0]
                  ? categories.filter(
                      category => category.value === e.target.value
                    )[0].label
                  : ''
              });
              props.setCategory({
                value: e.target.value,
                label: categories.filter(
                  category => category.value === e.target.value
                )[0]
                  ? categories.filter(
                      category => category.value === e.target.value
                    )[0].label
                  : ''
              });
            }}
          >
            {[...[{ label: 'All', value: '' }], ...categories].map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Sub-Category"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{ style: { fontSize: 13 } }}
            value={subCategory.value}
            onChange={e => {
              setSubCategory({
                value: e.target.value,
                label: subCategories.filter(
                  subCategory => subCategory.value === e.target.value
                )[0]
                  ? subCategories.filter(
                      subCategory => subCategory.value === e.target.value
                    )[0].label
                  : ''
              });
              props.setSubCategory({
                value: e.target.value,
                label: subCategories.filter(
                  subCategory => subCategory.value === e.target.value
                )[0]
                  ? subCategories.filter(
                      subCategory => subCategory.value === e.target.value
                    )[0].label
                  : ''
              });
            }}
          >
            {[...[{ label: 'All', value: '' }], ...subCategories].map(
              option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              )
            )}
          </TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Sub-Category Item"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{ style: { fontSize: 13 } }}
            value={subCategoryItem.value}
            onChange={e => {
              setSubCategoryItem({
                value: e.target.value,
                label: subCategoryItems.filter(
                  subCategoryItem => subCategoryItem.value === e.target.value
                )[0]
                  ? subCategoryItems.filter(
                      subCategoryItem =>
                        subCategoryItem.value === e.target.value
                    )[0].label
                  : ''
              });
              props.setSubCategoryItem({
                value: e.target.value,
                label: subCategoryItems.filter(
                  subCategoryItem => subCategoryItem.value === e.target.value
                )[0]
                  ? subCategoryItems.filter(
                      subCategoryItem =>
                        subCategoryItem.value === e.target.value
                    )[0].label
                  : ''
              });
            }}
          >
            {[...[{ label: 'All', value: '' }], ...subCategoryItems].map(
              option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              )
            )}
          </TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Priority"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{ style: { fontSize: 13 } }}
            value={priority.value}
            onChange={e => {
              setPriority({
                value: e.target.value,
                label: priorities.filter(
                  priority => priority.value === e.target.value
                )[0]
                  ? priorities.filter(
                      priority => priority.value === e.target.value
                    )[0].label
                  : ''
              });
              props.setPriority({
                value: e.target.value,
                label: priorities.filter(
                  priority => priority.value === e.target.value
                )[0]
                  ? priorities.filter(
                      priority => priority.value === e.target.value
                    )[0].label
                  : ''
              });
            }}
          >
            {[...[{ label: 'All', value: '' }], ...priorities].map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Status"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{ style: { fontSize: 13 } }}
            value={status.value}
            onChange={e => {
              setStatus({
                value: e.target.value,
                label: statuses.filter(
                  status => status.value === e.target.value
                )[0]
                  ? statuses.filter(
                      status => status.value === e.target.value
                    )[0].label
                  : ''
              });
              props.setStatus({
                value: e.target.value,
                label: statuses.filter(
                  status => status.value === e.target.value
                )[0]
                  ? statuses.filter(
                      status => status.value === e.target.value
                    )[0].label
                  : ''
              });
            }}
          >
            {[...[{ label: 'All', value: '' }], ...statuses].map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Media"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{ style: { fontSize: 13 } }}
            defaultValue={media.value}
            onChange={e => {
              setMedia({
                value: e.target.value,
                label: medium.filter(media => media.value === e.target.value)[0]
                  ? medium.filter(media => media.value === e.target.value)[0]
                      .label
                  : ''
              });
              props.setMedia({
                value: e.target.value,
                label: medium.filter(media => media.value === e.target.value)[0]
                  ? medium.filter(media => media.value === e.target.value)[0]
                      .label
                  : ''
              });
            }}
          >
            {[...[{ label: 'All', value: '' }], ...medium].map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency-native"
            label="Dist Name"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              style: { fontSize: 13 },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            value={distributorName}
            onChange={e => {
              setDistributorName(e.target.value);
              props.setDistributorName(e.target.value);
            }}
          ></TextField>{' '}
          <TextField
            id="standard-select-currency-native"
            label="Dist Id"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              style: { fontSize: 13 },

              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            value={distributorId}
            onChange={e => {
              setDistributorId(e.target.value);
              props.setDistributorId(e.target.value);
            }}
          ></TextField>
          <div></div>
        </Box>
      </Paper>
    </div>
  );
}
