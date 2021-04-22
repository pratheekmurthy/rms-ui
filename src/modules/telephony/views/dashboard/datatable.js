import React, { useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
// import Result from '../../components/result';
import { profilesColumns } from '../../../dashboard-360/utils/columns-config'
import axios from 'axios'

export default function FilledCheckboxes(props) {
    const { profiles } = props
    // const [profiles, setProfiles] = useState([])
    const [datatable, setDatatable] = React.useState({});
    const [checkbox1, setCheckbox1] = React.useState('');


    console.log(profiles)
    // const getProfiles = () => {
    //     axios.get('http://192.168.3.45:3056/api/profiles')
    //         .then((response) => {
    //             let i = 0;
    //             response.data.map((ele) => {
    //                 i = i + 1;
    //                 return ele.slNo = i

    //             })
    //             console.log(response)
    //             setProfiles(response.data)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }
    // getProfiles()

    // console.log(profiles)
    // const data1 = {}
    // data1.rows = profiles
    // data1.columns = profilesColumns
    // // setDatatable(data1)
    // console.log(data1)

    const showLogs2 = (e) => {
        setCheckbox1(e);
        console.log(checkbox1)
    };

    return (
        <>
            <MDBDataTableV5
                hover
                entriesOptions={[5, 20, 25]}
                entries={5}
                pagesAmount={4}
                data={profiles}
                checkbox
                headCheckboxID='uniq1'
                bodyCheckboxID='uniq12'
                getValueCheckBox={(e) => {
                    showLogs2(e);
                }}
                proCheckboxes
                filledCheckboxes
                proSelect
            />

        </>
    );
}