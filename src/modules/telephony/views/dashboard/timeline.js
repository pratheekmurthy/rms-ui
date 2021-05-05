import React, { useEffect, useState } from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import axios from 'axios'
import { GET_LOG } from './constants'

export default function ColorsTimeline(props) {
    const { id1, Applied } = props
    const [log, setLogs] = useState([])

    const getTimeline = () => {
        const data = {
            id: id1
        }

        console.log(data)

        axios.post(GET_LOG, data)
            .then((res) => {
                console.log(res)
                // res.data.unshift(Applied)
                setLogs(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

        console.log(data)
    }

    console.log(log)
    useEffect(() => {
        getTimeline()
        // alert("chaitra")
        // const data = {
        //     id: "609089b5cc6f3b12918f9281"
        // }

        // axios.post(`http://localhost:3056/api/profile/getlog`, data)
        //     .then((res) => {
        //         console.log(res)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })

        // console.log(data)
    }, [])


    return (
        <Timeline align="alternate">
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot color="secondary" />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent><div><h5>{Applied.action}</h5>{Applied.reject_reason}<br />{Applied.userName}<p>{Applied.created_At.slice(0, 10)}</p></div></TimelineContent>
            </TimelineItem>
            {
                log.map((ele) => {
                    return (
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot color="primary" />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent><div><h5>{ele.action}</h5>{ele.reject_reason}<br />{ele.userName}<p>{ele.created_At.slice(0, 10)}</p></div></TimelineContent>
                        </TimelineItem>
                    )
                })
            }

            {/* <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot color="primary" />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Code</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot color="secondary" />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Sleep</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot />
                </TimelineSeparator>
                <TimelineContent>Repeat</TimelineContent>
            </TimelineItem> */}
        </Timeline>
    );
}