import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Container,
  Grid,
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
    this.state = {
      surveys: [],
      loading: true
    };
  }

  async componentDidMount() {
    try {
      const res = await Axios.get('/surveys');
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

  render() {
    const {
      classes,
      location: { state: { surveyOperation } = {} }
    } = this.props;
    const { error, loading } = this.state;
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
              <Button>
                <Link to="/surveys/questions/new">Add New Questions</Link>
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
                      columns={gridConfig.surveyTable}
                      rows={this.state.surveys.map(survey => ({
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
      </Page>
    );
  }
}

export default withStyles(useStyles)(Home);
