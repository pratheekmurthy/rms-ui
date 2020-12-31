import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '6px 16px'
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main
  }
}));

export default function CustomizedTimeline(props) {
  const classes = useStyles();
  const [ticketHistory, setTicketHistory] = useState([]);
useEffect(()=>{
 
  setTicketHistory(props.setTicketHistory);
},[])
  function getHistory() {
    for(var i=0; i<ticketHistory.length; i++){
      if(i%2==0){
       
        return(
       <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            6:30 pm
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot></TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Closed
            </Typography>
            <Typography>Closed the Ticket</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
        )
      }
      else{
        
         return(<TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            4:30 pm
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary"></TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Resolved
            </Typography>
            <Typography>Ticket issue resolved</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>

         )
      }
    }
   
  }
  return (
    <div>
      <Timeline align="alternate">
        {/* {getHistory()} */}
        {ticketHistory.map((item, index) =>
          index % 2 ? (
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  {new Date(item.updatedAt).toLocaleString(undefined, {
                    timeZone: 'Asia/Kolkata'
                  })}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot></TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    {item.status}
                  </Typography>
                  <Typography>{item.ticketRemarks}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ) : (
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  {new Date(item.updatedAt).toLocaleString(undefined, {
                    timeZone: 'Asia/Kolkata'
                  })}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary"></TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    {item.status}
                  </Typography>
                  <Typography>{item.ticketRemarks}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          )
        )}
      </Timeline>
    </div>
    // <Timeline align="alternate">
    //   <TimelineItem>
    //     <TimelineOppositeContent>
    //       <Typography variant="body2" color="textSecondary">
    //         6:30 pm
    //       </Typography>
    //     </TimelineOppositeContent>
    //     <TimelineSeparator>
    //       <TimelineDot></TimelineDot>
    //       <TimelineConnector />
    //     </TimelineSeparator>
    //     <TimelineContent>
    //       <Paper elevation={3} className={classes.paper}>
    //         <Typography variant="h6" component="h1">
    //           Closed
    //         </Typography>
    //         <Typography>Closed the Ticket</Typography>
    //       </Paper>
    //     </TimelineContent>
    //   </TimelineItem>
    //   <TimelineItem>
    //     <TimelineOppositeContent>
    //       <Typography variant="body2" color="textSecondary">
    //         4:30 pm
    //       </Typography>
    //     </TimelineOppositeContent>
    //     <TimelineSeparator>
    //       <TimelineDot color="primary"></TimelineDot>
    //       <TimelineConnector />
    //     </TimelineSeparator>
    //     <TimelineContent>
    //       <Paper elevation={3} className={classes.paper}>
    //         <Typography variant="h6" component="h1">
    //           Resolved
    //         </Typography>
    //         <Typography>Ticket issue resolved</Typography>
    //       </Paper>
    //     </TimelineContent>
    //   </TimelineItem>
    //   <TimelineItem>
    //     <TimelineOppositeContent>
    //       <Typography variant="body2" color="textSecondary">
    //         1:30 am
    //       </Typography>
    //     </TimelineOppositeContent>
    //     <TimelineSeparator>
    //       <TimelineDot color="primary" variant="outlined"></TimelineDot>
    //       <TimelineConnector className={classes.secondaryTail} />
    //     </TimelineSeparator>
    //     <TimelineContent>
    //       <Paper elevation={3} className={classes.paper}>
    //         <Typography variant="h6" component="h1">
    //           Open
    //         </Typography>
    //         <Typography>Finding To resolve</Typography>
    //       </Paper>
    //     </TimelineContent>
    //   </TimelineItem>
    //   <TimelineItem>
    //     <TimelineOppositeContent>
    //       <Typography variant="body2" color="textSecondary">
    //         10:00 am
    //       </Typography>
    //     </TimelineOppositeContent>
    //     <TimelineSeparator>
    //       <TimelineDot color="secondary"></TimelineDot>
    //     </TimelineSeparator>
    //     <TimelineContent>
    //       <Paper elevation={3} className={classes.paper}>
    //         <Typography variant="h6" component="h1">
    //           New
    //         </Typography>
    //         <Typography>Created ticket</Typography>
    //       </Paper>
    //     </TimelineContent>
    //   </TimelineItem>
    // </Timeline>
  );
}
