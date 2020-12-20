import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Page from 'src/components/Page';
import gridConfig from '../../utils/grid-configs';

const useStyles = theme => {
  return {
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
  };
};

class Home extends Component {
  constructor(props) {
    super(props);
    const x = 10;
  }

  render() {
    const { classes } = this.props;
    return (
      <Page title="Surveys" className={classes.root}>
        <Container maxWidth={false}>
          <Box marginBottom={2}>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button>
                <Link to="/surveys/new">Create New Survey</Link>
              </Button>
              <Button>
                <Link to="/surveys/questions">View Questions</Link>
              </Button>
              <Button>
                <Link to="/surveys/questions/new">Add New Questions</Link>
              </Button>
              <Button>
                <Link to="/surveys/edit">Edit Questions</Link>
              </Button>
            </ButtonGroup>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                style={{ padding: '0.5rem 0 1rem 0', fontWeight: 400 }}
                variant="h4"
                color="primary"
              >
                All Surveys
              </Typography>
              <Card>
                {/* <CardHeader title="Surveys" /> */}
                <div style={{ height: 580 }}>
                  <DataGrid
                    columns={gridConfig.surveyTable}
                    rows={[
                      {
                        id: '1234',
                        startDate: '12/3/2020',
                        endDate: '12/3/2020',
                        title: 'Demo Survey1'
                      },
                      {
                        id: '1235',
                        startDate: '12/3/2020',
                        endDate: '12/3/2020',
                        title: 'Demo Survey2'
                      },
                      {
                        id: '1236',
                        startDate: '12/3/2020',
                        endDate: '12/3/2020',
                        title: 'Demo Survey1'
                      },
                      {
                        id: '1237',
                        startDate: '12/3/2020',
                        endDate: '12/3/2020',
                        title: 'Demo Survey1'
                      },
                      {
                        id: '12333',
                        startDate: '12/3/2020',
                        endDate: '12/3/2020',
                        title: 'Demo Survey1'
                      },
                      {
                        id: '1239',
                        startDate: '12/3/2020',
                        endDate: '12/3/2020',
                        title: 'Demo Survey1'
                      },
                      {
                        id: '12399',
                        startDate: '12/3/2020',
                        endDate: '12/3/2020',
                        title: 'Demo Survey1'
                      },
                      {
                        id: '123331',
                        startDate: '12/3/2020',
                        endDate: '12/3/2020',
                        title: 'Demo Survey1'
                      },
                      {
                        id: '12390',
                        startDate: '12/3/2020',
                        endDate: '12/3/2020',
                        title: 'Demo Survey1'
                      }
                      // {
                      //     id: '12398',
                      //     startDate: '12/3/2020',
                      //     endDate: '12/3/2020',
                      //     title: 'Demo Survey1'
                      // },
                      // {
                      //     id: '1238',
                      //     startDate: '12/3/2020',
                      //     endDate: '12/3/2020',
                      //     title: 'Demo Survey1'
                      // },
                      // {
                      //     id: '1231',
                      //     startDate: '12/3/2020',
                      //     endDate: '12/3/2020',
                      //     title: 'Demo Survey1'
                      // }
                    ]}
                  />
                </div>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
  }
}

export default withStyles(useStyles)(Home);
