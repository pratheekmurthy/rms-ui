import React, { useEffect } from 'react';
import {

  Grid,

  makeStyles,

  Card,
  CardContent,
  Container,
  CardHeader,
  Box
} from '@material-ui/core';


import { grey } from '@material-ui/core/colors';




import CreateGroup from './Createform'
import GroupTable from './Table'

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


const AgentDashboard = () => {
  const classes = useStyles();


  useEffect(() => {



  }, [])

  return (
    // <>
    <Container maxWidth={false}>
      <div className={classes.root}>
        <Grid container spacing={3}>

          <Grid item xs={12} sm={4}>
            <div>

              <Card>
                <CardHeader title={'Create Group Admin'} />
                <CardContent>
                  <CreateGroup />
                </CardContent>
              </Card>

            </div>

          </Grid>
          <Grid item xs={12} sm={8}>
            <div>
              <Card>
                <CardHeader title={'Group Admin Details'} />
                <CardContent>
                  <GroupTable />
                </CardContent>
              </Card>
            </div>

          </Grid>

        </Grid>
      </div>

    </Container>
    // </>
  );
};

export default AgentDashboard;
