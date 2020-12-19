import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import config from '../../views/config.json';
// import PieHooks from './PieHooks';
// import * as d3 from 'd3';
import {
  Paper,
  Grid,
  Typography,
  Box,
  Avatar,
  TextField,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from '@material-ui/core';

import { purple, orange, green } from '@material-ui/core/colors';

import { Bar, Line, Pie } from 'react-chartjs-2';
import c3 from 'c3';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 15
  },
  textBold: {
    fontWeight: '600'
  },
  paper: {
    padding: theme.spacing(1)
  },
  listRow: {
    flexGrow: 1,
    fontSize: 10,
    padding: 0
  },
  ticketMargin: {
    marginLeft: 5
  },
  listItemClass: {
    paddingLeft: 10,
    paddingRight: 10
  },
  metadataClass: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 16
  },
  labelClass: {
    fontWeight: '500',
    float: 'left',
    width: '50%'
  },
  valueClass: {
    width: '50%'
  },
  belowMargin: {
    marginBottom: 20
  },
  dateMargin: {
    marginBottom: 5
  },
  green: {
    color: theme.palette.getContrastText(green[900]),
    backgroundColor: green[900],
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  avatarValue: {
    marginLeft: 5,
    marginTop: 5
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    color: '#fff',
    backgroundColor: green[500],
    marginTop: 10
  },
  button: {
    margin: 5,
    marginTop: 20,
    marginBottom: 20
  },
  boxDiv: {
    paddingBottom: 10,
    paddingTop: 10
  },
  detailTitle: {
    marginLeft: 5,
    marginTop: 5,
    fontWeight: 600
  },

  drawer: {
    // width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    // width: drawerWidth,
    top: 62
  },
  modal: {
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  textField: {
    fontSize: 10,
    height: 22
  },
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 9
  }
}));

export default function TicketDashboard() {
  const classes = useStyles();
  const [displayTitle, setdisplayTitle] = useState(true);
  const [displayLegend, setdisplayLegend] = useState(false);
  const [legendPosition, setlegendPosition] = useState('bottom');

  const [pieData, setpieData] = useState({
    chartData: {
      labels: [
        'Boston',
        'Worcester',
        'Springfield',
        'Lowell',
        'Cambridge',
        'New Bedford'
      ],
      datasets: [
        {
          data: [617594, 181045, 153060, 106519, 105162, 95072],
          //backgroundColor:'green',
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ]
        }
      ]
    }
  });

  //  const generateData = (value, length = 5) =>
  //    d3.range(length).map((item, index) => ({
  //      date: index,
  //      value:
  //        value === null || value === undefined ? Math.random() * 100 : value
  //    }));

  //  const [data, setData] = useState(generateData(0));
  //  const changeData = () => {
  //    setData(generateData());
  //  };

  //  useEffect(() => {
  //    setData(generateData());
  //  }, [!data]);

  useEffect(() => {
    var chart = c3.generate({
      bindto: '#chart1',
      data: {
        columns: [
          ['data1', 30],
          ['data2', 120]
        ],
        type: 'donut',
        onclick: function(d, i) {
          console.log('onclick', d, i);
        },
        onmouseover: function(d, i) {
          console.log('onmouseover', d, i);
        },
        onmouseout: function(d, i) {
          console.log('onmouseout', d, i);
        }
      },
      donut: {
        title: 'Iris Petal Width'
      }
    });

    setTimeout(function() {
      chart.load({
        columns: [
          [
            'setosa',
            0.2,
            0.2,
            0.2,
            0.2,
            0.2,
            0.4,
            0.3,
            0.2,
            0.2,
            0.1,
            0.2,
            0.2,
            0.1,
            0.1,
            0.2,
            0.4,
            0.4,
            0.3,
            0.3,
            0.3,
            0.2,
            0.4,
            0.2,
            0.5,
            0.2,
            0.2,
            0.4,
            0.2,
            0.2,
            0.2,
            0.2,
            0.4,
            0.1,
            0.2,
            0.2,
            0.2,
            0.2,
            0.1,
            0.2,
            0.2,
            0.3,
            0.3,
            0.2,
            0.6,
            0.4,
            0.3,
            0.2,
            0.2,
            0.2,
            0.2
          ],
          [
            'versicolor',
            1.4,
            1.5,
            1.5,
            1.3,
            1.5,
            1.3,
            1.6,
            1.0,
            1.3,
            1.4,
            1.0,
            1.5,
            1.0,
            1.4,
            1.3,
            1.4,
            1.5,
            1.0,
            1.5,
            1.1,
            1.8,
            1.3,
            1.5,
            1.2,
            1.3,
            1.4,
            1.4,
            1.7,
            1.5,
            1.0,
            1.1,
            1.0,
            1.2,
            1.6,
            1.5,
            1.6,
            1.5,
            1.3,
            1.3,
            1.3,
            1.2,
            1.4,
            1.2,
            1.0,
            1.3,
            1.2,
            1.3,
            1.3,
            1.1,
            1.3
          ],
          [
            'virginica',
            2.5,
            1.9,
            2.1,
            1.8,
            2.2,
            2.1,
            1.7,
            1.8,
            1.8,
            2.5,
            2.0,
            1.9,
            2.1,
            2.0,
            2.4,
            2.3,
            1.8,
            2.2,
            2.3,
            1.5,
            2.3,
            2.0,
            2.0,
            1.8,
            2.1,
            1.8,
            1.8,
            1.8,
            2.1,
            1.6,
            1.9,
            2.0,
            2.2,
            1.5,
            1.4,
            2.3,
            2.4,
            1.8,
            1.8,
            2.1,
            2.4,
            2.3,
            1.9,
            2.3,
            2.5,
            2.3,
            1.9,
            2.0,
            2.3,
            1.8
          ]
        ]
      });
    }, 1500);

    setTimeout(function() {
      chart.unload({
        ids: 'data1'
      });
      chart.unload({
        ids: 'data2'
      });
    }, 2500);

    // pie chart
    var chart2 = c3.generate({
      bindto: '#chart2',
      data: {
        // iris data from R
        columns: [
          ['data1', 30],
          ['data2', 120]
        ],
        type: 'pie',
        onclick: function(d, i) {
          console.log('onclick', d, i);
        },
        onmouseover: function(d, i) {
          console.log('onmouseover', d, i);
        },
        onmouseout: function(d, i) {
          console.log('onmouseout', d, i);
        }
      }
    });

    setTimeout(function() {
      chart2.load({
        columns: [
          [
            'setosa',
            0.2,
            0.2,
            0.2,
            0.2,
            0.2,
            0.4,
            0.3,
            0.2,
            0.2,
            0.1,
            0.2,
            0.2,
            0.1,
            0.1,
            0.2,
            0.4,
            0.4,
            0.3,
            0.3,
            0.3,
            0.2,
            0.4,
            0.2,
            0.5,
            0.2,
            0.2,
            0.4,
            0.2,
            0.2,
            0.2,
            0.2,
            0.4,
            0.1,
            0.2,
            0.2,
            0.2,
            0.2,
            0.1,
            0.2,
            0.2,
            0.3,
            0.3,
            0.2,
            0.6,
            0.4,
            0.3,
            0.2,
            0.2,
            0.2,
            0.2
          ],
          [
            'versicolor',
            1.4,
            1.5,
            1.5,
            1.3,
            1.5,
            1.3,
            1.6,
            1.0,
            1.3,
            1.4,
            1.0,
            1.5,
            1.0,
            1.4,
            1.3,
            1.4,
            1.5,
            1.0,
            1.5,
            1.1,
            1.8,
            1.3,
            1.5,
            1.2,
            1.3,
            1.4,
            1.4,
            1.7,
            1.5,
            1.0,
            1.1,
            1.0,
            1.2,
            1.6,
            1.5,
            1.6,
            1.5,
            1.3,
            1.3,
            1.3,
            1.2,
            1.4,
            1.2,
            1.0,
            1.3,
            1.2,
            1.3,
            1.3,
            1.1,
            1.3
          ],
          [
            'virginica',
            2.5,
            1.9,
            2.1,
            1.8,
            2.2,
            2.1,
            1.7,
            1.8,
            1.8,
            2.5,
            2.0,
            1.9,
            2.1,
            2.0,
            2.4,
            2.3,
            1.8,
            2.2,
            2.3,
            1.5,
            2.3,
            2.0,
            2.0,
            1.8,
            2.1,
            1.8,
            1.8,
            1.8,
            2.1,
            1.6,
            1.9,
            2.0,
            2.2,
            1.5,
            1.4,
            2.3,
            2.4,
            1.8,
            1.8,
            2.1,
            2.4,
            2.3,
            1.9,
            2.3,
            2.5,
            2.3,
            1.9,
            2.0,
            2.3,
            1.8
          ]
        ]
      });
    }, 1500);

    setTimeout(function() {
      chart.unload({
        ids: 'data1'
      });
      chart.unload({
        ids: 'data2'
      });
    }, 2500);
    // bar chart
    var chart3 = c3.generate({
      bindto: '#chart3',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
        //   ['data2', 130, 100, 140, 200, 150, 50]
        ],
        type: 'bar'
      },
      bar: {
        width: {
          ratio: 0.5 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
      }
    });

    setTimeout(function() {
      chart3.load({
        // columns: [['data3', 130, -150, 200, 300, -200, 100]]
      });
    }, 1000);
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item sm={12} md={12}>
          <Paper
            className={classes.paper}
            style={{ maxHeight: 720, overflow: 'auto' }}
          >
           
            <div id="chart3"></div>
            {/* <PieHooks
              data={data}
              width={200}
              height={200}
              innerRadius={60}
              outerRadius={100}
            /> */}
          </Paper>
        </Grid>
        {/* 
        <Grid item sm={12} md={6}>
          <Paper
            className={classes.paper}
            style={{ maxHeight: 720, overflow: 'auto' }}
          >
            <div className={classes.listItemClass}>
              <div display="flex" flexDirection="row"></div>
              <div className={classes.boxDiv}>
                <div style={{ paddingRight: 15, paddingLeft: 15 }}>
                  <Grid container spacing={0}>
                    <Grid container item xs={12} spacing={1}>
                      <React.Fragment>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}></Grid>
                      </React.Fragment>
                    </Grid>
                    <Grid container item xs={12} spacing={1}>
                      <React.Fragment>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}></Grid>
                      </React.Fragment>
                    </Grid>
                  </Grid>
                </div>
              </div>
              <div className={classes.boxDiv}></div>
            </div>
          </Paper>
        </Grid> */}

        {/**
         * This is the ticket Metadata block
         */}
        <Grid item sm={12} md={6}>
          <Paper className={classes.paper}>
           
              <div id="chart1"></div>
          
            {/* <Grid item sm={6} md={6}>
              <div id="chart2"></div>
            </Grid> */}
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={classes.paper}>
            {/* <Grid item sm={6} md={6}>
              <div id="chart1"></div>
            </Grid> */}
            {/* <Grid item sm={6} md={6}> */}
              <div id="chart2"></div>
            {/* </Grid> */}
          </Paper>
        </Grid>
      </Grid>

      <br />
    </div>
  );
}
