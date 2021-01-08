import React, { useState, useEffect } from 'react';
import Page from 'src/components/Page';
import {
  makeStyles,
  Box,
  Button,
  Typography,
  Divider,
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core';
import FormGenerate from './form-generate';
import Axios from 'axios';

const useStyles = makeStyles(() => ({
  typography: {
    fontFamily: 'Raleway,Bell MT',
    fontSize: '40px'
  }
}));

const EndUserForm = props => {
  const [surveyQuestions, setSurveyQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async function getQuestions() {
      try {
        const res = await Axios.get(`/survey/${props.match.params.surveyId}`);
        setSurveyQuestions(res.data);
      } catch (Err) {
        console.log(Err);
        setError(Err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const classes = useStyles();

  const theme = createMuiTheme();

  return (
    <ThemeProvider theme={theme}>
      <Page
        style={{
          margin: '1vh 15vw 1vh 15vw',
          backgroundColor: 'white',
          borderRadius: '1%'
        }}
      >
        <Typography
          variant="h1"
          style={{ margin: '0  35%', padding: '2% 0' }}
          className={classes.typography}
        >
          Feedback Form
        </Typography>
        <Divider style={{ margin: ' 0 10%' }} />
        <Box>
          <div style={{ margin: ' 0 20%' }}>
            <FormGenerate inputType={surveyQuestions.questions} />
          </div>
        </Box>
        <Divider style={{ margin: ' 3% 10%' }} />
      </Page>
    </ThemeProvider>
  );
};

export default EndUserForm;
