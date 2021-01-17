import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Container,
  Grid,
  IconButton,
  Snackbar,
  Typography
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { withStyles } from '@material-ui/styles';
import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CommonAlert from 'src/components/CommonAlert';
import Page from 'src/components/Page';
import Spinner from 'src/components/Spinner';
import { CRUD_SURVEY, GET_SURVEYS } from '../../utils/endpoints';
import gridConfig from '../../utils/grid-configs';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert } from '@material-ui/lab';

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
    this.state = {
      surveys: [],
      loading: true,
      deleteApiResponse: ''
    };
    this.setDeleteApiResponse = this.setDeleteApiResponse.bind(this);
  }

  async componentDidMount() {
    try {
      const res = await Axios.get(GET_SURVEYS);
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        surveys: res.data
      }));
    } catch (err) {
      this.setState(prevState => ({
        ...prevState,
        error: true,
        loading: false
      }));
    }
  }

  // set value for snackbar type and visibility
  setDeleteApiResponse(val) {
    this.setState(prevState => ({
      ...prevState,
      deleteApiResponse: val
    }));
  }

  // Send and handle delete survey request
  async sendDeleteApiRequest(surveyId) {
    try {
      await Axios.delete(`${CRUD_SURVEY}/${surveyId}`);
      this.setDeleteApiResponse('success');
      this.setState(prevState => ({
        ...prevState,
        surveys: prevState.surveys.filter(s => s.surveyId !== surveyId)
      }));
    } catch (error) {
      this.setDeleteApiResponse('error');
    }
  }

  render() {
    const {
      classes,
      location: { state: { surveyOperation } = {} }
    } = this.props;
    const { error, loading, deleteApiResponse } = this.state;
    return loading ? (
      <Spinner />
    ) : (
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
              {/* <Button>
                <Link to="/surveys/questions/new">Add New Questions</Link>
              </Button>
              <Button>
                <Link to="/surveys/edit">Edit Questions</Link>
              </Button> */}
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
              {surveyOperation && (
                <>
                  <CommonAlert
                    variant="success"
                    text={
                      surveyOperation === 'create'
                        ? 'Survey Created Successfully!'
                        : 'Survey Updated Successfully'
                    }
                  />
                  <br />
                </>
              )}
              <Card>
                <div style={{ height: 580 }}>
                  {error ? (
                    <CommonAlert />
                  ) : (
                    <DataGrid
                      columns={gridConfig.surveyTable.concat([
                        {
                          headerName: 'Actions',
                          field: 'actions',
                          flex: 1,
                          renderCell: rowData => (
                            <IconButton
                              onClick={() =>
                                this.sendDeleteApiRequest(rowData.row.surveyId)
                              }
                            >
                              <DeleteIcon color="secondary" />
                            </IconButton>
                          )
                        }
                      ])}
                      rows={(this.state.surveys || []).map(survey => ({
                        ...survey,
                        id: survey._id
                      }))}
                    />
                  )}
                </div>
              </Card>
            </Grid>
          </Grid>
        </Container>
        {(deleteApiResponse === 'success' || deleteApiResponse === 'error') && (
          <Snackbar
            open
            autoHideDuration={6000}
            onClose={() => this.setDeleteApiResponse('')}
          >
            <Alert
              onClose={() => this.setDeleteApiResponse('')}
              severity={deleteApiResponse}
            >
              {deleteApiResponse === 'success' && 'Survey Deleted Successfully'}
              {deleteApiResponse === 'error' &&
                'Something Went Wrong! Please try again.'}
            </Alert>
          </Snackbar>
        )}
      </Page>
    );
  }
}

export default withStyles(useStyles)(Home);
