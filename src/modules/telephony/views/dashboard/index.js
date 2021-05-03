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
    TextField,
    Paper,
    Snackbar,
    Tooltip,
    IconButton
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
import { DataGrid } from '@material-ui/data-grid';
import Popup from './PopUp'
import EditIcon from '@material-ui/icons/Edit';
import RejectPopup from './RejectPopup'

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
    const [resume, setResume] = useState("")
    const [selectedCandaidate, setSelectedCandidate] = useState([])
    const [show1, setShow1] = useState(false)
    const [reason, setReason] = useState("")
    const [rejectId, setRejectID] = useState("")
    const [profileCount, setProfileCount] = useState("")
    const [header, setHeader] = useState("All Profiles")
    const [hired, setHired] = useState(0)
    const [but, setBut] = useState(false)

    var url = "http://localhost:3056/resumes/"

    const classes = useStyles();

    let shortlisted1 = ""
    let rejected1 = ""

    const profilesColumns = [
        // {
        //     headerName: 'SL.No',
        //     field: 'id',
        //     flex: 0.5
        // },
        {
            headerName: 'First Name',
            field: 'firstName',
            flex: 1

        },
        {
            headerName: 'Last Name',
            field: 'lastName',
            flex: 1
        },
        {
            headerName: 'Position Applied',
            field: 'role',
            flex: 1
        }, {
            headerName: 'Applied Date',
            field: 'created_At',
            flex: 1
        }, {
            headerName: 'Profile Status',
            field: 'prrofileStatus',
            flex: 1
        },
        {
            headerName: 'Job Code',
            field: 'jobcode',
            flex: 0.5
        },
        {
            headerName: 'Source',
            field: 'reference',
            flex: 0.5
        },
        // {
        //     headerName: 'Details',
        //     flex: 1,
        //     field: 'Details',
        //     renderCell: rowData => (
        //         <Tooltip title="Reject">
        //             <IconButton
        //                 onClick={() => showProfile(rowData.row._id)}
        //             ><Button variant="contained" >Reject</Button>
        //             </IconButton>
        //         </Tooltip>
        //     )
        // },
        {
            headerName: 'Actions',
            field: '',
            renderCell: rowData => (
                <>
                    {rowData.row.prrofileStatus === 'shortlisted' && <div>
                        <Tooltip title="Reject">
                            <IconButton
                                onClick={() => handleRejectPopup(rowData.row._id)}
                            ><Button variant="contained" >Reject</Button>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Reject">
                            <IconButton
                                onClick={() => HandleHired(rowData.row._id)}
                            ><Button variant="contained" fullWidth="true">Hire</Button>
                            </IconButton>
                        </Tooltip></div>}
                    {rowData.row.prrofileStatus === 'rejected' && <div>
                        <Tooltip title="Shortlist">
                            <IconButton
                                onClick={(e) => handleshortlisted(rowData.row._id, e)}
                            ><Button variant="contained" id="shortlistbutton">Shortlist</Button>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Reject">
                            <IconButton
                                onClick={() => handleRejectPopup(rowData.row._id)}
                            ><Button variant="contained"  >Discard</Button>
                            </IconButton>
                        </Tooltip></div>}

                    {rowData.row.prrofileStatus === 'Applied' && <div>
                        <Tooltip title="Shortlist">
                            <IconButton
                                onClick={() => handleshortlisted(rowData.row._id)}
                            ><Button variant="contained"  >Shortlist</Button>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Reject">
                            <IconButton
                                onClick={() => handleRejectPopup(rowData.row._id)}
                            ><Button variant="contained">Reject</Button>
                            </IconButton>
                        </Tooltip></div>}
                    {rowData.row.prrofileStatus === 'Hired' && <div>
                        <Tooltip title="Shortlist">
                            <IconButton
                            ><Button variant="contained" disabled="true" fullWidth="true">Hired</Button>
                            </IconButton>
                        </Tooltip>
                    </div>}

                </>
            ),
            flex: 1.1
        },

    ];




    //getALl profiles
    const getProfiles = () => {
        axios.get('http://localhost:3056/api/profiles')
            .then((response) => {
                response.data.reverse()
                let i = 0;
                response.data.map((ele) => {
                    i = i + 1;
                    return ele.id = i

                })
                //console.log(response.data)
                response.data.map((ele) => {
                    return ele.created_At = ele.created_At.slice(0, 10)
                })
                response.data.map((ele) => {
                    return ele.updated_At = ele.updated_At.slice(0, 10)
                })
                setProfiles(response.data)
                //setProfiles1(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //console.log(profiles1)

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
    const handleshortlisted = (id, e) => {
        //handleClose()
        //e.preventDefault()
        // console.log(e.target.id)
        const result = profiles.filter((ele) => {
            return ele._id === id
        })
        result[0].prrofileStatus = 'shortlisted'
        result[0].updated_At = new Date()

        // handleClose()

        axios.put(`http://localhost:3056/api/profiles/${id}`, result[0])
            .then((response) => {
                getProfiles()
                toast.success("Shortlisted", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
                setCardValue()
                handleShortlistCard()
                handleLog(id, 'shortlisted')
                //window.location.reload()

            })
            .catch((error) => {
                console.log(error)
            })
    }

    //handle shortlist and handle reject
    const HandleHired = (id) => {
        //handleClose()
        const result = profiles.filter((ele) => {
            return ele._id === id
        })
        result[0].prrofileStatus = 'Hired'
        result[0].updated_At = new Date()

        // handleClose()

        axios.put(`http://localhost:3056/api/profiles/${id}`, result[0])
            .then((response) => {
                getProfiles()
                toast.success("Hired", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
                setCardValue()
                handleShortlistCard()
                handleLog(id, 'Hired')
                //window.location.reload()

            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleshortlisted1 = (id) => {
        setBut(true)
        handleshortlisted(id)
    }
    //api call for updated rejected state
    const handlerejected = (id, reason) => {
        //handleClose()
        const result = profiles.filter((ele) => {
            return ele._id === id
        })
        //alert(reason)
        if (reason === 'Block') {
            result[0].prrofileStatus = 'Blocked'
            handleLog(id, 'Blocked')
        } else {
            result[0].prrofileStatus = 'rejected'
            handleLog(id, 'rejected')
        }

        result[0].updated_At = new Date()
        result[0].reason_reject = reason
        axios.put(`http://localhost:3056/api/profiles/${id}`, result[0])
            .then((response) => {
                getProfiles()
                toast.error("Rejected", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
                setCardValue()
                handleClose1()
                handlerejectCard()
                //propTypes.history.push("/telephony/dashboard")
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
        //console.log(search)
        const result = profiles1.filter((ele) => {
            return ele.firstName === search
        })
        setProfiles1(result)
    }

    // console.log(selectedCandaidate)

    const handleLog = (profileID, action) => {
        const data = {
            profileID: profileID,
            action: action,
            userID: localStorage.getItem('ID'),
            userName: localStorage.getItem('username')
        }
        console.log("i am here", data)

        axios.post(`http://localhost:3056/api/profile/log`, data)
            .then((res) => {
                console.log(res, "resssssssssssss")
            })
            .catch((err) => {
                console.log(err, "errrrrrrrrrrr")
            })

    }

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

        axios.get(`http://localhost:3056/api/profiles/${data.row._id}`)
        // .then((response) => {
        //     console.log(response.data)
        //     setCandidate(response.data)
        //     // setCandidate(resume.data.resume)
        //     setShow(true)
        // })
        // .catch((error) => {
        //     console.log(error)
        // })

        const result = profiles1.filter((profile) => {
            return profile._id === data.row._id
        })
        //console.log(result, "result")
        if (result[0].resume.length > 0) {
            setResume(result[0].resume)
        } else {
            setResume("")
        }

        //console.log(but)
        // console.log(result)
        setCandidate(result[0])
        if (but === true) {
            console.log(but)
            setShow(false)
        } else {
            console.log(but)
            setShow(true)
        }

    }

    const setCardValue = () => {
        const shortlisted1 = profiles.filter((ele) => {
            return ele.prrofileStatus === 'shortlisted'
        })
        setShortlisted(shortlisted1.length)
        const rejected1 = profiles.filter((ele) => {
            return ele.prrofileStatus === 'rejected'
        })
        setRejected(rejected1.length)
        const pending1 = profiles.filter((ele) => {
            return ele.prrofileStatus === 'Applied'
        })
        setPending(pending1.length)
        const hired1 = profiles.filter((ele) => {
            return ele.prrofileStatus === 'Hired'
        })
        setHired(hired1.length)

    }


    useEffect(() => {
        setValue()
        setCardValue()
    }, [filter])

    useEffect(() => {
        handleApplied()
        handleAll()
    }, [profiles])

    const handleChange = () => {

    }

    const handleSelected1 = (id) => {
        console.log(id)
    }

    //console.log(candidate)

    const handleShortlistCard = (e) => {
        const result = profiles.filter((ele) => {
            return ele.prrofileStatus === 'shortlisted'
        })
        setProfiles1(result)
        setHeader(`Shortlisted Profiles - (${result.length})`)
    }

    const handlerejectCard = (e) => {
        const result = profiles.filter((ele) => {
            return ele.prrofileStatus === 'rejected'
        })
        setProfiles1(result)
        setHeader(`Rejected Profiles - (${result.length})`)
    }

    const handleHired = (e) => {
        const result = profiles.filter((ele) => {
            return ele.prrofileStatus === 'Hired'
        })
        setProfiles1(result)
        setHeader(`Hired Profiles - (${result.length})`)
        setHired(result.length)
    }


    const handleAll = (e) => {
        // const result = profiles.filter((ele) => {
        //     return ele.prrofileStatus === 'Applied'
        // })
        const result = profiles.filter((ele) => {
            return ele.prrofileStatus !== 'Blocked'
        })
        setProfileCount(result.length)
        setHeader(`All Profiles - (${result.length})`)


        setProfiles1(result)
    }

    const handleApplied = (e) => {
        const result = profiles.filter((ele) => {
            return ele.prrofileStatus === 'Applied'
        })
        setProfiles1(result)
        setHeader(`Applied Profiles - (${result.length})`)
    }

    const handleClose1 = () => {
        setShow1(false)
    }

    const handleRejectPopup = (id) => {
        handleClose()
        setRejectID(id)
        setShow1(true)
    }

    return (
        <>
            <Grid container spacing={3} direction="row">
                <Grid item xs={1} sm={1}></Grid>
                <Grid item xs={2} sm={2}>
                    <div class="card" style={{ width: "17rem", backgroundColor: '#5F9EA0' }} onClick={handleApplied}>
                        <div class="card-body">
                            <h5 class="card-title">Applied</h5>
                            <h3 class="card-text" >{pending}</h3>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={2} sm={2}>
                    <div class="card" style={{ width: "17rem", backgroundColor: "#90EE90" }} onClick={handleShortlistCard} >
                        <div class="card-body">
                            <h5 class="card-title">Shortlisted</h5>
                            <h3 class="card-text">{shortlisted}</h3>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={2} sm={2}>
                    <div class="card" style={{ width: "17rem", backgroundColor: '#FF6347', justifyContent: "center" }} onClick={handlerejectCard}>
                        <div class="card-body">
                            <h5 class="card-title">Rejected</h5>
                            <h3 class="card-text">{rejected}</h3>
                        </div>
                    </div>
                </Grid>
                {/* <Grid item xs={1} sm={1}></Grid> */}
                <Grid item xs={2} sm={2}>
                    <div class="card" style={{ width: "18rem", backgroundColor: '#F5DEB3' }} onClick={handleAll}>
                        <div class="card-body">
                            <h5 class="card-title">Total Profiles</h5>
                            <h3 class="card-text">{profileCount}</h3>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={2} sm={2}>
                    <div class="card" style={{ width: "18rem", backgroundColor: '#4682B4' }} onClick={handleHired}>
                        <div class="card-body">
                            <h5 class="card-title">Hired</h5>
                            <h3 class="card-text">{hired}</h3>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={1} sm={1}></Grid>
                {/* <Grid item xs={2} sm={2}></Grid> */}
                <Grid item xs={12} sm={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={3} direction="row">
                                <Grid item xs={4} sm={4}>
                                    <TextField id="outlined-basic" label="Search By First Name" variant="outlined" size="small" value={search} onChange={handleSearch} />&nbsp;<Button variant="contained" onClick={searchcandidate}><SearchIcon style={{ color: 'grey' }} /></Button>&nbsp;<Button variant="contained" onClick={() => { getProfiles(); setSearch("") }}><RotateLeftIcon /></Button> &nbsp;

                            </Grid>
                                <Grid item xs={6} sm={6}>
                                    <DaterangeReport
                                        getALF={getALF}
                                        handleChange={handleChange}
                                    />

                                </Grid>
                                <Grid item xs={2} sm={2}>
                                    <button type="button" class="btn btn-light"><DownloadReport
                                        DownloadData={profiles1}
                                    /></button>
                                </Grid>
                                {/* <Grid item xs={2} sm={2}> */}
                                {/* <FormControl variant="outlined" className={classes.formControl} >
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
                                    </FormControl> */}
                                {/* </Grid> */}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <h6>&emsp;&emsp;{header}</h6>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Card>
                        <CardContent>
                            <div style={{ height: 500, width: '100%' }}>
                                <DataGrid rows={profiles1} columns={profilesColumns} pageSize={20}
                                    // rowsPerPageOptions={[10, 20, 50]}
                                    pagination onRowClick={showProfile} />
                            </div>

                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
            <Popup candidate={candidate} handleshortlisted={handleshortlisted} handlerejected={handlerejected} handleClose={handleClose} show={show} link={link} resume={resume} />
            <RejectPopup show={show1} handleClose={handleClose1} handlerejected={handlerejected} setReason={setReason} rejectId={rejectId} setReason={setReason} />
        </>
    );
};
export default Inbound;


