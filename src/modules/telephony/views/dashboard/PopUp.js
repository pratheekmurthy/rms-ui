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
    const { candidate, handleshortlisted, handlerejected, handleClose, show, link ,resume} = props
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
                <p>Resume : {resume ? (<a href={url + resume} target="_blank" rel="noopener noreferrer">show</a>) : null}</p>
                <p>{link}</p>
                <p><Button variant="contained" color="primary" onClick={handleClose}>Close</Button></p>
            </DialogContent>
        </Dialog>
    </div>)
}

export default Popup