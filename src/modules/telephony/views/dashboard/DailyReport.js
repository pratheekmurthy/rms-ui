import React, { useState, useEffect } from 'react'
import DaterangeReport from '../dashboard/DaterangeReport'
import { useSelector } from 'react-redux'
import {
    Grid,
    Card,
    CardContent,
    CardHeader,
    Box
} from '@material-ui/core';
import axios from 'axios'
import MUIDataTable from "mui-datatables";
import { LiveCallscolumns1 } from '../../../dashboard-360/utils/columns-config'
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MDBDataTable } from 'mdbreact';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));


const DailyReport = (props) => {
    const classes = useStyles();
    const [progress, setProgress] = useState(false);
    const [agentdisposedCalls, setagentdisposedCalls] = useState([])
    const [allusers, setUsers] = useState([])
    const [agentStatus, setAgentstatus] = useState([])



    function getALF(startDate, endDate) {
        setProgress(true)
        var startdate = moment(startDate).format('YYYY-MM-DD')
        var enddate = moment(endDate).format('YYYY-MM-DD')


        console.log(startdate, enddate, "foramtted date")
        const axios = require('axios');

        axios.get('http://192.168.3.36:4000/auth/apiM/allusers',)
            .then((response) => {
                setUsers(response.data.userdetails)
            })
            .catch((error) => {
                console.log(error.message)
            })

        let data = '';
        let config = {
            method: 'get',
            url: `http://192.168.3.36:42004/crm/?startDate=${startdate}T01%3A00%3A00.000Z&endDate=${enddate}T23%3A00%3A00.000Z`,
            headers: {},
            data: data
        };

        axios(config)
            .then(async (response) => {
                var ALFDATA = response.data;
                ALFDATA = ALFDATA.reverse();
                var filteredData = ALFDATA.filter(data => data.created.substring(0, 10) >= startDate.toISOString().substring(0, 10) && data.created.substring(0, 10) <= endDate.toISOString().substring(0, 10))
                setagentdisposedCalls(filteredData)
                setProgress(false)
                return filteredData;

            })
            .catch((error) => {
                console.log(error);
            });
    }

    if (agentdisposedCalls.length > 1) {
        var agentstatus1 = [];
        var obj1 = {};
        var i = 1;
        agentdisposedCalls.forEach((element1) => {
            allusers.forEach((element2) => {
                if (element1.agentID === element2.External_num) {
                    obj1 = {
                        'sl_No': i,
                        'Agent_Number': element2.External_num,
                        'Agent_Name': element2.EmployeeName,
                        'callType': element1.callType,
                        'Caller_Name': element1.CallerName,
                        'callerapplication': element1.callerapplication,
                        'callerNumber': element1.callerNumber,
                        'issuetype': element1.issuetype,
                        'category': element1.category,
                        'subcategory': element1.subcategory,
                        'subcategoryitem': element1.subcategoryitem,
                        'connectivitytype': element1.connectivitytype,
                        'ostype': element1.ostype,
                        'solution': element1.solution,
                        'comments': element1.comments,
                        'asterixUniqueID': element1.asterixUniqueID,
                        'agenttype': element1.agenttype,
                        'distributerID': element1.distributerID,
                        'distributerName': element1.distributerName,
                        'createdAt': element1.createdAt,
                        'updatedAt': element1.updatedAt
                    }
                    i = i + 1;
                    agentstatus1.push(obj1)
                }

            })
        })
    }

    // console.log(agentstatus1, "filtered data111")

    function handleChange() {
        setagentdisposedCalls([])
    }

    const options = {
        filterType: 'checkbox',
    };


    return (<div>
        <Grid>
            <Card>
                <CardContent>
                    <DaterangeReport
                        getALF={getALF}
                        handleChange={handleChange}
                    />
                </CardContent>
            </Card>
        </Grid>
        {
            progress && <LinearProgress />
        }

        {
            agentdisposedCalls.length > 1 ? <Grid>
                <Card>
                    <CardContent>
                        <MUIDataTable
                            title={`Records - ${agentdisposedCalls.length}`}
                            data={agentstatus1}
                            columns={LiveCallscolumns1}
                            options={options}
                        />
                    </CardContent>
                </Card>
            </Grid> : null
        }

    </div>)
}

export default DailyReport

// var agentstatus1 = [];
//         var obj1 = {};

// console.log(" i am in condition")
// var i = 1;
// agentdisposedCalls.forEach((element1) => {
//     allusers.forEach((element2) => {
//         if (element1.agentID === element2.External_num) {
//             obj1 = {
//                 'sl.no': i,
//                 'EmployeeName': element2.EmployeeName,
//                 'agentID': element1.agentID,
//                 'CallerName': element1.CallerName,
//                 'CallerNumber': element1.callerNumber,
//                 'callerapplication': element1.callerapplication,
//                 'issuetype': element1.issuetype

//             }

//             i = i + 1;
//             agentstatus1.push(obj1);
//             console.log(agentstatus1, "agentstatus")

// }
// })
// })