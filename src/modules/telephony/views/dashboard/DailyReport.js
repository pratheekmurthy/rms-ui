import React, { useState } from 'react'
import DaterangeReport from '../dashboard/DaterangeReport'
import { useSelector } from 'react-redux'
import axios from 'axios'

import moment from 'moment';


const DailyReport = (props) => {
    const [agentdisposedCalls, setagentdisposedCalls] = useState([])
    const [allusers, setUsers] = useState([])
    const [agentStatus, setAgentstatus] = useState([])


    console.log(allusers, "all users")
    console.log(agentdisposedCalls, "filtereddata")

    function getALF(startDate, endDate) {
        var startdate = moment(startDate).format('YYYY-MM-DD')
        var enddate = moment(endDate).format('YYYY-MM-DD')


        console.log(startdate, enddate)
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
            url: `http://192.168.3.36:42004/crm/?startDate=2021-03-25T01%3A00%3A00.000Z&endDate=2021-03-25T23%3A00%3A00.000Z`,
            headers: {},
            data: data
        };

        axios(config)
            .then(async (response) => {
                var ALFDATA = response.data;
                console.log("i am here", response.data)
                console.log(ALFDATA, "response")
                ALFDATA = ALFDATA.reverse();
                var filteredData = ALFDATA.filter(data => data.created.substring(0, 10) >= startDate.toISOString().substring(0, 10) && data.created.substring(0, 10) <= endDate.toISOString().substring(0, 10))
                setagentdisposedCalls(filteredData)
                return filteredData;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    if (agentdisposedCalls.length > 1) {
        var agentstatus1 = [];
        var obj1 = {};


    }

    function handleChange() {
        setagentdisposedCalls([])
    }


    return (<div>
        <DaterangeReport
            getALF={getALF}
            handleChange={handleChange}
        />
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