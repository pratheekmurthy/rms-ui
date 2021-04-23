import React, { useEffect, useState } from 'react'
import DaterangeReport from '../dashboard/DaterangeReport'
import {
    Grid,
    Card,
    CardContent,
    CardHeader,
    Button
} from '@material-ui/core';
import { profilesColumns } from '../../../dashboard-360/utils/columns-config'
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MDBDataTable } from 'mdbreact';
import DownloadReport from '../../../dashboard-360/views/DashboardView/DownloadReport'
import DataTable from './datatable'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { Modal } from 'react-bootstrap'



toast.configure()

const DailyReport = (props) => {
    const [profiles, setProfiles] = useState([]);
    const [progress, setProgress] = useState(false);
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [candidate, setCandidate] = useState({})
    const [show, setShow] = useState(false)
    const [link, setLink] = useState()

    var url = "http://192.168.3.45:3056/resumes/"


    const handleshortlisted = (id) => {
        const result = profiles.filter((ele) => {
            return ele._id === id
        })
        result[0].prrofileStatus = 'shortlisted'
        result[0].updated_At = new Date()

        axios.put(`http://192.168.3.45:3056/api/profiles/${id}`, result[0])
            .then((response) => {
                //getProfiles()
                //getALF(startDate, endDate)
                toast.success("Shortlisted", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
                //window.location.reload()

            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handlerejected = (id) => {
        const result = profiles.filter((ele) => {
            return ele._id === id
        })
        result[0].prrofileStatus = 'rejected'
        result[0].updated_At = new Date()
        axios.put(`http://192.168.3.45:3056/api/profiles/${id}`, result[0])
            .then((response) => {
                //getProfiles()
                toast.error("Rejected", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
                window.location.reload()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleClose = () => {
        setLink()
        setShow(false)
        //getALF(startDate, endDate)
    }

    const showProfile = (data) => {
        axios.get(`http://192.168.3.45:3056/api/profiles/${data._id}`)
            .then((response) => {
                setCandidate(response.data)
                setShow(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    function getALF(startDate, endDate) {
        setProgress(true)
        var startdate = moment(startDate).format('YYYY-MM-DD')
        var enddate = moment(endDate).format('YYYY-MM-DD')
        const axios = require('axios');

        setStartDate(startdate)
        setEndDate(enddate)

        //Api for All users data
        axios.get('http://192.168.3.45:3056/api/profiles')
            .then((response) => {
                setProfiles(response.data)
                //setProfiles1(response.data)

            })
            .catch((error) => {
                console.log(error)
            })

    }

    function handleChange() {
        //setagentdisposedCalls([])
    }






    const filteredData = []
    profiles.map((ele) => {
        if (new Date(ele.created_At.substring(0, 10)) >= new Date(startDate.substring(0, 10)) && new Date(ele.created_At.substring(0, 10)) <= new Date(endDate.substring(0, 10))) {
            //console.log(ele)
            filteredData.push(ele)
        }
    })




    return (<div>
        <Grid container spacing={3} direction="row">
            <Grid item xs={4} sm={4}></Grid>
            <Grid item xs={4} sm={4}>
                <Card>
                    <CardContent>
                        <DaterangeReport
                            getALF={getALF}
                            handleChange={handleChange}
                        />
                    </CardContent>
                </Card>

                <Grid item xs={4} sm={4}></Grid>
            </Grid>
            {
                progress && <LinearProgress />
            }
            {
                filteredData.length > 0 ? (<Grid item xs={12} sm={12}>
                    <Card>
                        <CardContent>
                            <DataTable
                                records={filteredData}
                                selectedData={showProfile}
                            />
                        </CardContent>
                    </Card>
                </Grid>) : null
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    {/* <Modal.Title>{candidate.firstName} {candidate.lastName}</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <p>Full Name : {candidate.firstName} {candidate.lastName} </p>
                    <p>First Name : {candidate.firstName}</p>
                    <p> Last Name: {candidate.lastName}</p>
                    <p> Role : {candidate.role}</p>
                    <p>Email : {candidate.email}</p>
                    <p>DOB :{candidate.Dob}</p>
                    <p>Mobile Number : {candidate.mobile}</p>
                    <p>Alternate Number : {candidate.alternatemob}</p>
                    <p> Experience: {candidate.experience}</p>
                    <p>Applied Date : {candidate.created_At}</p>
                    <p>Graduation year : {candidate.graduation}</p>
                    <p>Backlogs : {candidate.backlogs}</p>
                    <p>Current CTC : {candidate.ctc}</p>
                    <p>Available for Immediate Joining : {candidate.joining}</p>
                    <p>Profile Status : {candidate.prrofileStatus === 'Applied' ? (<div><Button variant="contained" color="primary" onClick={() => { handleshortlisted(candidate._id); }}>Shortlist</Button> <Button variant="contained" color="secondary" onClick={() => { handlerejected(candidate._id); }}>Reject</Button></div>) : (candidate.prrofileStatus)}</p>
                    <p>Resume : {candidate.resume ? (<a href={url + candidate.resume} target="_blank" rel="noopener noreferrer">show</a>) : null}</p>
                    <p>{link}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" class="btn btn-primary" onClick={handleClose} >Close</button>
                </Modal.Footer>
            </Modal>

        </Grid>

    </div>)
}

export default DailyReport