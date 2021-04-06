import React, { useState } from 'react'
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
import {
    Grid,
    Button,
    Card,
    CardContent
} from '@material-ui/core';


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
    const [cdrData, setcdrData] = useState([])

    const handleChange = (event) => {
        setServer(event.target.value);
    };

    const handleSubmit = (e) => {
        var startDate1 = moment(startDate).format('YYYY-MM-DD')
        if (server.length === 0) {
            alert(`Please select the server`)
        } else {
            let data = {
                "server": server,
                "date": startDate1
            }
            axios.post(`http://106.51.86.75:7000/report/api/getcdrdata`, data)
                .then((res) => {
                    console.log(res)
                    setcdrData(res.data.cdr)
                })
                .catch((error) => {
                    console.log(error.message)
                })
        }

    }


    return (<div>
        <Grid container spacing={3} justify={'space-around'}>
            <Grid item lg={12} md={12} xs={12}>
                <h3 align="center" style={{ 'background-color': "#B8860B" }}>CDR Report </h3>
            </Grid>
            <Card>
                <CardContent>
                    <Grid item lg={12} md={12} xs={12}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">server</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={server}
                                onChange={handleChange}
                                label="Age"
                                autoWidth={false}
                            >
                                <MenuItem value="">
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
                        <card>
                            <CardContent>
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
                            </CardContent>
                        </card>
                        {/* </Grid>
            <Grid item lg={2} md={12} xs={12}> */}
                        <Button variant="contained" color="primary" onClick={handleSubmit}>generate report </Button>
                    </Grid>
                    <Grid item lg={12} md={12} xs={12}>
                        <DownloadReport
                            DownloadData={cdrData}
                        />
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    </div>)
}

export default CdrReports