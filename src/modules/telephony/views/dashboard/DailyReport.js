import React, { useState } from 'react'
import DaterangeReport from '../dashboard/DaterangeReport'
import {
    Grid,
    Card,
    CardContent,
    CardHeader
} from '@material-ui/core';
import { LiveCallscolumns1 } from '../../../dashboard-360/utils/columns-config'
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MDBDataTable } from 'mdbreact';
import DownloadReport from '../../../dashboard-360/views/DashboardView/DownloadReport'
import 'bootstrap/dist/css/bootstrap.css'


// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//         '& > * + *': {
//             marginTop: theme.spacing(2),
//         },
//     },
// }));


const DailyReport = (props) => {
    const [progress, setProgress] = useState(false);
    const [agentdisposedCalls, setagentdisposedCalls] = useState([])
    const [allusers, setUsers] = useState([])
    var agentstatus1 = [];


    function getALF(startDate, endDate) {
        setProgress(true)
        var startdate = moment(startDate).format('YYYY-MM-DD')
        var enddate = moment(endDate).format('YYYY-MM-DD')
        const axios = require('axios');

        //Api for All users data
        axios.get('http://106.51.86.75:4000/auth/apiM/allusers',)
            .then((response) => {
                console.log(response)
                setUsers(response.data.userdetails)
            })
            .catch((error) => {
                console.log(error.message)
            })

        //Api call to get date range adily report 
        let data = '';
        let config = {
            method: 'get',
            url: `http://106.51.86.75:42004/crm/?startDate=${startdate}T01%3A00%3A00.000Z&endDate=${enddate}T23%3A00%3A00.000Z`,
            headers: {},
            data: data
        };

        axios(config)
            .then(async (response) => {
                // console.log(response.data)
                var ALFDATA = response.data;
                ALFDATA = ALFDATA.reverse();
                var filteredData = ALFDATA.filter(data => data.created.substring(0, 10) >= startDate.toISOString().substring(0, 10) && data.created.substring(0, 10) <= endDate.toISOString().substring(0, 10))
                console.log(filteredData)
                setagentdisposedCalls(filteredData)
                setProgress(false)
                return filteredData;

            })
            .catch((error) => {
                console.log(error);
            });
    }

    //Mapping Allusers and daily report data 
    if (agentdisposedCalls.length > 1) {
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

    //Table configuring
    const DailysReportsData = {}
    DailysReportsData.rows = agentstatus1
    DailysReportsData.columns = LiveCallscolumns1

    function handleChange() {
        setagentdisposedCalls([])
    }


    return (<div>
        <Grid >
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

        <Grid item lg={4} sm={6}>
            {agentstatus1.length > 1 ? <DownloadReport
                DownloadData={agentstatus1}
            /> : null}
        </Grid>
        {
            agentdisposedCalls.length > 1 ? <Grid>
                <Card>
                    <CardHeader
                        title={
                            `Total Records :: ${agentstatus1.length}  `
                        }
                    />
                    <CardContent>
                        <MDBDataTable
                            striped
                            hover
                            data={DailysReportsData}
                            scrollX
                        />

                    </CardContent>
                </Card>
            </Grid> : null
        }

    </div>)
}

export default DailyReport