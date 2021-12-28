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
import { GET_PROFILES, SHORTLIST, REJECT, HIRED, MAKE_LOG, SHOW_PROFILE, URL } from './constants'

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
    const [Discarded, setDiscarded] = useState(0)
    const [but, setBut] = useState(false)

    var url = URL

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
            flex: 0.5

        },
        {
            headerName: 'Last Name',
            field: 'lastName',
            flex: 0.5
        },
        {
            headerName: 'Position Applied',
            field: 'role',
            flex: 0.5
        },
        {
            headerName: 'Experience',
            field: 'experience',
            flex: 0.5
        },
        {
            headerName: 'Location',
            field: 'currentLocation',
            flex: 0.5
        },
        {
            headerName: 'Source',
            field: 'reference',
            flex: 0.5
        },
        {
            headerName: 'Profile Status',
            field: 'prrofileStatus',
            flex: 0.5
        },
        {
            headerName: 'Job Code',
            field: 'jobcode',
            flex: 0.5
        },

        {
            headerName: 'Applied Date',
            field: 'created_At',
            flex: 0.5
        },
        {
            headerName: 'Actions',
            field: '',

            renderCell: rowData => (
                <>
                    {rowData.row.prrofileStatus === 'Shortlisted' && <div>
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
                    {rowData.row.prrofileStatus === 'Rejected' && <div>
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
        axios.get(GET_PROFILES)
            .then((response) => {
                console.log(response)
                response.data.reverse()
                let i = 0;
                response.data.map((ele) => {
                    i = i + 1;
                    return ele.id = i

                })

                // response.data.map((ele) => {
                //     return ele.created_At = moment(ele.created_At).format("MMM Do YYYY")
                // })
                console.log(response.data)
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
        result[0].prrofileStatus = 'Shortlisted'
        result[0].updated_At = new Date()

        // handleClose()
        // console.log("i am here")

        axios.put(`${SHORTLIST}${id}`, result[0])
            .then((response) => {
                console.log(response)
                // console.log(response)
                toast.success("Shortlisted", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
                getProfiles()
                setCardValue()
                handleShortlistCard()
                let r = ''
                handleLog(id, 'Shortlisted', r)
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

        axios.put(`${REJECT}${id}`, result[0])
            .then((response) => {
                getProfiles()
                toast.success("Hired", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
                setCardValue()
                handleShortlistCard()
                let r = ''
                handleLog(id, 'Hired', r)
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
    const handlerejected = (id, reason, reason1) => {
        //handleClose()
        console.log(id, reason, reason1)
        console.log(reason1)
        const result = profiles.filter((ele) => {
            return ele._id === id
        })
        //alert(reason)
        if (reason === 'Discarded') {
            result[0].prrofileStatus = 'Discarded'
            handleLog(id, 'Discarded', reason1)
        } else if (reason === 'Others') {
            result[0].prrofileStatus = 'Rejected'
            result[0].reason_reject = reason1
            handleLog(id, 'Rejected', reason1)
        } else {
            result[0].prrofileStatus = 'Rejected'

            handleLog(id, 'Rejected', reason)
        }

        result[0].updated_At = new Date()
        result[0].reason_reject = reason
        axios.put(`${HIRED}${id}`, result[0])
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

    const handleLog = (profileID, action, reason1) => {
        const data = {
            profileID: profileID,
            action: action,
            userID: localStorage.getItem('ID'),
            userName: localStorage.getItem('username'),
            reject_reason: reason1
        }


        axios.post(`${MAKE_LOG}`, data)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
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
        handleApplied()

    }, [])

    const showProfile = (data) => {

        axios.get(`${SHOW_PROFILE}${data.row._id}`)
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
            return ele.prrofileStatus === 'Shortlisted'
        })
        setShortlisted(shortlisted1.length)
        const rejected1 = profiles.filter((ele) => {
            return ele.prrofileStatus === 'Rejected'
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
        const Discarded = profiles.filter((ele) => {
            return ele.prrofileStatus === 'Discarded'
        })
        setDiscarded(Discarded.length)
    }


    useEffect(() => {
        setValue()
        setCardValue()
    }, [filter])

    useEffect(() => {
        //handleApplied()
        //setCardValue()
        handleAll()
        handleApplied()
    }, [profiles])

    const handleChange = () => {

    }

    const handleSelected1 = (id) => {
        console.log(id)
    }

    //console.log(candidate)

    const handleShortlistCard = (e) => {
        const result = profiles.filter((ele) => {
            return ele.prrofileStatus === 'Shortlisted'
        })
        setProfiles1(result)
        setHeader(`Shortlisted Profiles - (${result.length})`)
    }

    const handlerejectCard = (e) => {
        const result = profiles.filter((ele) => {
            return ele.prrofileStatus === 'Rejected'
        })
        setProfiles1(result)
        setHeader(`Rejected Profiles - (${result.length})`)
    }

    const handleDiscarded = (e) => {
        const result = profiles.filter((ele) => {
            return ele.prrofileStatus === 'Discarded'
        })
        setProfiles1(result)
        setHeader(`Discarded Profiles - (${result.length})`)
    }

    const handleHired = (e) => {
        const result = profiles.filter((ele) => {
            return ele.prrofileStatus === 'Hired'
        })
        setProfiles1(result)
        setHeader(`Hired Profiles - (${result.length})`)
        setHired(result.length)
    }

    // const handleDiscarded = (e) => {
    //     const result = profiles.filter((ele) => {
    //         return ele.prrofileStatus === 'Dis'
    //     })
    //     setProfiles1(result)
    //     setHeader(`Hired Profiles - (${result.length})`)
    //     setHired(result.length)
    // }


    const handleAll = (e) => {
        // const result = profiles.filter((ele) => {
        //     return ele.prrofileStatus === 'Applied'
        // })
        const result = profiles.filter((ele) => {
            return ele.prrofileStatus !== 'Discarded'
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
        <div></div>
    );
};
export default Inbound;


