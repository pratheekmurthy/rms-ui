import React, { useState, useEffect } from 'react';
import GenerateForm from '../Questions/GenerateForm';
import {
  Button,
  MenuItem,
  FormControl,
  makeStyles,
  Grid,
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Tooltip,
  ListItem,
  ListItemText,
  IconButton,
  ButtonGroup,
  Link
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Page from 'src/components/Page';
import UpdateQuestions from './update-questions';
import Axios from 'axios';
import SaveIcon from '@material-ui/icons/Save';

const test = true;

const EditQuestions = props => {
  // console.log(props);

  const [targetData, setTargetData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // console.log(questions);
  useEffect(() => {
    (async function getQuestions() {
      try {
        // const res = await Axios.get('/survey/questions'+ props.match.params.questionId);
        const res = await Axios.get('/survey/questions');
        setQuestions(
          res.data.find(q => q.questionId === props.match.params.questionId)
        );
      } catch (Err) {
        // console.log(Err);
        setError(Err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // const [newData, setNewData] = useState([]);

  const updateSurvey = data => {
    // console.log('New updated data : ', data);
    const newData = { ...data };
    setQuestions(newData);
  };

  async function saveQuestion() {
    try {
      const res = await Axios['patch'](
        `/survey/question/${props.match.params.questionId}`,
        questions
      );
      props.history.push({
        pathname: '/surveys/questions',
        state: 'update'
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Page title="questions">
        <Box margin="1rem">
          <Grid container spacing={1}>
            <Grid xs={12} lg={6} item>
              <Card style={{ width: '100%' }}>
                <CardHeader title="Edit Question" />
                <Divider />
                <CardContent>
                  <UpdateQuestions
                    updateData={questions}
                    newUpdatedValue={updateSurvey}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} lg={6} item>
              <Card style={{ width: '100%' }}>
                <CardHeader
                  title="Preview"
                  action={
                    <Tooltip title="Save Question">
                      <IconButton
                        aria-label="Save Question"
                        onClick={saveQuestion}
                      >
                        <SaveIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  }
                />
                <Divider />
                <CardContent>
                  {test ? (
                    <>
                      <GenerateForm inputs={[questions]} />
                    </>
                  ) : null}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Page>
    </div>
  );
};

export default EditQuestions;
