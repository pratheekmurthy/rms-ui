import React from 'react'
import { Modal } from 'react-bootstrap'
import {
    Avatar,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Card,
    CardContent,
    CardHeader,
    Box,
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle
} from '@material-ui/core';


const Popup = (props) => {
    const { candidate, handleshortlisted, handlerejected, handleClose, show, link, resume } = props
    console.log(candidate)
    console.log(resume)

    var url = "http://192.168.3.45:3056/resumes/"


    return (<div>
        <Dialog
            open={show}
            onClose={() => handleClose()}
            style={{ padding: 2 }}
        >
            <DialogTitle>{candidate.firstName} {candidate.lastName}</DialogTitle>
            < DialogContent>
                <p><b>First Name : </b>{candidate.firstName}</p>
                <p> <b>Last Name: </b>{candidate.lastName}</p>
                <p> <b>Role : </b>{candidate.role}</p>
                <p><b>Email : </b>{candidate.email}</p>
                <p>DOB :{candidate.Dob}</p>
                <p><b>Mobile Number : </b>{candidate.mobile}</p>
                <p><b>Alternate Number : </b>{candidate.alternatemob}</p>
                <p><b>Experience: </b>{candidate.experience}</p>
                <p><b>Applied Date : </b>{candidate.created_At}</p>
                <p><b>Graduation year : </b>{candidate.graduation}</p>
                <p><b>Backlogs : </b>{candidate.backlogs}</p>
                <p><b>Current CTC : </b>{candidate.ctc}</p>
                <p><b>Available for Immediate Joining : </b>{candidate.joining}</p>
                <p><b>Profile Status : </b>{candidate.prrofileStatus} </p>
                <p><b>Resume</b> : {resume ? (<a href={url + resume} target="_blank" rel="noopener noreferrer">View</a>) : null}</p>
                <p>{link}</p>
                <p><Button variant="contained" color="primary" onClick={handleClose}>Close</Button></p>
            </DialogContent>
        </Dialog>
    </div>)
}

export default Popup