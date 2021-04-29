import React, { useEffect, useState } from 'react';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import DownloadReport from '../../../dashboard-360/views/DashboardView/DownloadReport'
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
    TextField
} from '@material-ui/core';
import {
    MenuItem, InputLabel, Select,
    FormControl
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors';
import { toast } from 'react-toastify'
import { MDBDataTable, MDBDataTableV5 } from 'mdbreact';
import { profilesColumns } from '../../../dashboard-360/utils/columns-config'
import DataTable from './datatable'
import { Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import SearchIcon from '@material-ui/icons/Search';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { setProfiles } from '../../../../redux/action'
import { useDispatch, useSelector } from 'react-redux'
import DaterangeReport from './DaterangeReport'
import moment from 'moment';
import { propTypes } from 'react-bootstrap/esm/Image';
import Popup from './PopUp'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: 'flex'
    },
    grey: {
        color: theme.palette.getContrastText(grey[50]),
        backgroundColor: grey[50]
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    paper: {
        textAlign: 'center'
    },
    list: {},
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        marginRight: '0.5vw'
    },
    listItem: {
        padding: 0
    },
    cardcontent: {
        padding: '0 0 0 5%',
        '&:last-child': {
            paddingBottom: 0
        }
    },
    formControl: {
        minWidth: 100,
    },
}));

toast.configure()

const Inbound = () => {
    const [profiles, setProfiles] = useState([])
    const [profiles1, setProfiles1] = useState([])
    const [candidate, setCandidate] = useState("")
    const [show, setShow] = useState(false)
    const [link, setLink] = useState()
    const [filter, setFilter] = useState("")
    const [shortlisted, setShortlisted] = useState(0)
    const [rejected, setRejected] = useState(0)
    const [pending, setPending] = useState(0)
    const [search, setSearch] = useState("")
    const [progress, setProgress] = useState(false);
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [selectedCandaidate, setSelectedCandidate] = useState([])
    var url = "http://192.168.3.45:3056/resumes/"

    const classes = useStyles();

    let shortlisted1 = ""
    let rejected1 = ""



    //getALl profiles
    const getProfiles = () => {
        axios.get('http://192.168.3.45:3056/api/profiles')
            .then((response) => {
                response.data.reverse()
                let i = 0;
                response.data.map((ele) => {
                    i = i + 1;
                    return ele.slNo = i

                })
                response.data.map((ele) => {
                    return ele.created_At = ele.created_At.slice(0, 10)
                })
                response.data.map((ele) => {
                    return ele.updated_At = ele.updated_At.slice(0, 10)
                })
                setProfiles(response.data)
                setProfiles1(response.data)


            })
            .catch((error) => {
                console.log(error)
            })
    }

    // console.log(profiles1)
    function getALF(startDate, endDate) {
        setProgress(true)
        var startdate = moment(startDate).format('YYYY-MM-DD')
        var enddate = moment(endDate).format('YYYY-MM-DD')
        const axios = require('axios');

        setStartDate(startdate)
        setEndDate(enddate)

        const filteredData = []
        profiles.map((ele) => {
            if (new Date(ele.created_At) >= new Date(startDate) && new Date(ele.created_At) <= new Date(endDate)) {
                //console.log(ele)
                filteredData.push(ele)
            }
            setProfiles1(filteredData)
        })

    }

    //handle shortlist and handle reject
    const handleshortlisted = (id) => {
        const result = profiles.filter((ele) => {
            return ele._id === id
        })
        result[0].prrofileStatus = 'shortlisted'
        result[0].updated_At = new Date()
        // handleClose()

        axios.put(`http://192.168.3.45:3056/api/profiles/${id}`, result[0])
            .then((response) => {
                getProfiles()
                toast.success("Shortlisted", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
                window.location.reload()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //api call for updated rejected state
    const handlerejected = (id) => {
        const result = profiles.filter((ele) => {
            return ele._id === id
        })
        result[0].prrofileStatus = 'rejected'
        result[0].updated_At = new Date()
        axios.put(`http://192.168.3.45:3056/api/profiles/${id}`, result[0])
            .then((response) => {
                getProfiles()
                toast.error("Rejected", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
                propTypes.history.push("/telephony/dashboard")
                //window.location.reload()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const role1 = [{ name: 'MERN Developer', value: 'MERN Developer' }, { name: 'Manual Tester', value: 'Manual Tester' }, { name: 'Automation Tester', value: 'Automation Tester' }]

    const handleClose = () => {
        setLink()
        setShow(false)
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const searchcandidate = (e) => {
        console.log(search)
        const result = profiles1.filter((ele) => {
            return ele.firstName === search
        })
        setProfiles1(result)
    }

    console.log(selectedCandaidate)

    const onChangeFilter = (e, value) => {
        setFilter(e.target.value)
        // setFilter('ALL')

    }

    const setValue = () => {
        if (filter === 'ALL') {
            getProfiles()
        }

        if (filter !== 'ALL') {
            const result = profiles.filter((ele) => {
                return ele.role === filter
            })
            setProfiles1(result)
            setCardValue()
        }
    }

    useEffect(() => {
        setCardValue()
    }, [profiles1])

    useEffect(() => {
        getProfiles()

    }, [])

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

    const setCardValue = () => {
        const shortlisted1 = profiles1.filter((ele) => {
            return ele.prrofileStatus === 'shortlisted'
        })
        setShortlisted(shortlisted1.length)
        const rejected1 = profiles1.filter((ele) => {
            return ele.prrofileStatus === 'rejected'
        })
        setRejected(rejected1.length)
    }


    useEffect(() => {
        setValue()
        setCardValue()
    }, [filter])

    const handleChange = () => {

    }


    return (
        <>
            <Grid container spacing={3} direction="row">
                <Grid item xs={2} sm={2}></Grid>
                <Grid item xs={2} sm={2}>
                    <div class="card" style={{ width: "18rem", backgroundColor: '#FFF8DC' }}>
                        <div class="card-body">
                            <h5 class="card-title">Total Profiles</h5>
                            <p class="card-text">{profiles1.length}</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={2} sm={2}>
                    <div class="card" style={{ width: "18rem", backgroundColor: "#7FFF00" }}>
                        <div class="card-body">
                            <h5 class="card-title">Shortlisted Profiles</h5>
                            <p class="card-text">{shortlisted}</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={2} sm={2}>
                    <div class="card" style={{ width: "18rem", backgroundColor: '#FF0000' }}>
                        <div class="card-body">
                            <h5 class="card-title">Rejected Profiles</h5>
                            <p class="card-text">{rejected}</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={2} sm={2}>
                    <div class="card" style={{ width: "18rem", backgroundColor: '#FFD700' }}>
                        <div class="card-body">
                            <h5 class="card-title">Pending Profiles</h5>
                            <p class="card-text" >{profiles1.length - (shortlisted + rejected)}</p>
                        </div>
                    </div>
                </Grid>
                {/* <Grid item xs={2} sm={2}></Grid> */}
                <Grid item xs={12} sm={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={3} direction="row">
                                <Grid item xs={4} sm={4}>
                                    <TextField id="outlined-basic" label="search by first name" variant="outlined" size="small" value={search} onChange={handleSearch} />&nbsp;<Button variant="contained" color="primary" onClick={searchcandidate}><SearchIcon /></Button>&nbsp;<Button variant="contained" onClick={() => { getProfiles(); setSearch("") }}><RotateLeftIcon /></Button> &nbsp;

                            </Grid>
                                <Grid item xs={6} sm={6}>
                                    <DaterangeReport
                                        getALF={getALF}
                                        handleChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2}>
                                    <FormControl variant="outlined" className={classes.formControl} >
                                        <InputLabel id="demo-simple-select-outlined-label">Filter</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={filter}
                                            onChange={onChangeFilter}
                                            label="Filter"
                                            required="true"
                                        >
                                            <MenuItem value="ALL">
                                                <em>All</em>

                                            </MenuItem>
                                            {
                                                role1.map((exp) => {
                                                    return (<MenuItem value={exp.value}>{exp.name}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <DownloadReport
                        DownloadData={profiles1}
                    />
                    <Card>
                        <CardContent>
                            {
                                profiles1.length > 0 ? (<DataTable
                                    records={profiles1}
                                    selectedData={showProfile}
                                />) : null
                            }
                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
            <Popup candidate={candidate} handleshortlisted={handleshortlisted} handlerejected={handlerejected} handleClose={handleClose} show={show} link={link} />
        </>
    );
};
export default Inbound;

