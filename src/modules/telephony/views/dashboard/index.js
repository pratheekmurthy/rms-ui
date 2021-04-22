import React, { useEffect, useState } from 'react';
import axios from 'axios'
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
    Box
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { MDBDataTable, MDBDataTableV5 } from 'mdbreact';
import { profilesColumns } from '../../../dashboard-360/utils/columns-config'
import DataTable from './datatable'

import 'bootstrap/dist/css/bootstrap.css'

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
    }
}));


const Inbound = () => {
    const [profiles, setProfiles] = useState([])
    const [checkbox1, setCheckbox1] = React.useState('');

    const showLogs2 = (e) => {
        setCheckbox1(e);
        console.log(checkbox1)
    };

    const getProfiles = () => {
        axios.get('http://192.168.3.45:3056/api/profiles')
            .then((response) => {
                let i = 0;
                response.data.map((ele) => {
                    i = i + 1;
                    return ele.slNo = i

                })
                console.log(response)
                setProfiles(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }



    useEffect(() => {
        getProfiles()
    }, [])


    console.log(profiles)

    const data1 = {}
    data1.rows = profiles;
    data1.columns = profilesColumns;



    return (
        <>
            {/* <MDBDataTableV5
                hover
                entriesOptions={[5, 20, 25]}
                entries={5}
                pagesAmount={4}
                data={data1}
                checkbox
                headCheckboxID='uniq1'
                bodyCheckboxID='uniq12'
                getValueCheckBox={(e) => {
                    showLogs2(e);
                }}
                proCheckboxes
                filledCheckboxes
                proSelect
            /> */}
            <DataTable profiles={data1} />
        </>
    );
};
export default Inbound;