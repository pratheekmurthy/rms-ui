import React from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Box from '@material-ui/core/Box';
import DownloadReport from '../../../dashboard-360/views/DashboardView/DownloadReport'
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 170,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const CdrReports = props => {
    const classes = useStyles();
    const [server, setServer] = React.useState('');
    const [startDate, setStartDate] = React.useState(new Date());

    const handleChange = (event) => {
        setServer(event.target.value);
    };

    var startDate1 = moment(startDate).format('YYYY-MM-DD')
    
    axios.get(`http://106.51.86.75:7000/report/api/getcdrdata`)
    

    return (<div>
        <h4 >CDR Report </h4>
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Select server</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={server}
                onChange={handleChange}
                label="Age"
                autoWidth={false}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={'All'}>ALL</MenuItem>
                <MenuItem value={'192.168.3.25'}>192.168.3.25</MenuItem>
                <MenuItem value={'192.168.3.31'}>192.168.3.31</MenuItem>
                <MenuItem value={'192.168.3.32'}>192.168.3.32</MenuItem>
                <MenuItem value={'192.168.3.34'}>192.168.3.34</MenuItem>
                <MenuItem value={'192.168.3.37'}>192.168.3.37</MenuItem>
                <MenuItem value={'192.168.3.38'}>192.168.3.38</MenuItem>
                <MenuItem value={'192.168.30.11'}>192.168.30.11</MenuItem>
            </Select>
        </FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Select date"
                value={startDate}
                onChange={date => {
                    setStartDate(date)
                }}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            /> &nbsp;
        </MuiPickersUtilsProvider>

    </div>)
}

export default CdrReports