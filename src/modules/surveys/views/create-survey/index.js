import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Field, Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import Page from 'src/components/Page';
import * as yup from 'yup';
import { TextField } from 'formik-material-ui';
import GenerateForm from '../Questions/GenerateForm';
import DeleteIcon from '@material-ui/icons/Delete';

export default function CreateSurvey() {
  const [chooseQuestion] = useState({
    surveyTitle: '',
    chooseQuestion: '',
    surveyDescription: ''
  });

  const [questions, setQuestions] = useState([]);
  const [surveyDetails, setSurveyDetails] = useState({
    title: '',
    description: ''
  });
  const [autoCompleteKey, setAutoCompleteKey] = useState(0);

  const formRef = useRef({});

  function addQuestionEvent(e) {
    const arr = questions.slice();
    arr.push(e.chooseQuestion);
    setQuestions(arr);
    setSurveyDetails({
      title: e.surveyTitle,
      description: e.surveyDescription
    });
    setAutoCompleteKey(arr.length);
    formRef.current.setFieldValue('chooseQuestion', '');
  }

  function getQuestionsString() {
    return (
      <List component="nav" aria-label="main mailbox folders">
        {questions.map(question => (
          <ListItem>
            <ListItemIcon button>
              <DeleteIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary={question.label} />
          </ListItem>
        ))}
      </List>
    );
  }
  return (
    <Page title="Create Survey">
      <Box margin="1rem">
        <Grid container spacing={4}>
          <Grid xs={12} lg={5} item>
            <Card style={{ width: '100%' }}>
              <CardHeader title="Create a survey" />
              <Divider />
              <CardContent>
                <Formik
                  initialValues={chooseQuestion}
                  onSubmit={e => addQuestionEvent(e)}
                  innerRef={formRef}
                  validationSchema={yup.object({
                    surveyTitle: yup
                      .string()
                      .required('Please Enter Survey Title'),
                    surveyDescription: yup
                      .string()
                      .required('Please Enter Survey Description'),
                    chooseQuestion: yup
                      .object()
                      .required('Please select a question')
                      .typeError('Please select a valid question')
                  })}
                >
                  {({ setFieldValue }) => (
                    <Form>
                      <Field
                        name="surveyTitle"
                        component={TextField}
                        style={{ width: 400 }}
                        label="Enter Survey Title"
                        variant="outlined"
                        disabled={false}
                      />
                      <br />
                      <br />
                      <Field
                        name="surveyDescription"
                        component={TextField}
                        style={{ width: 400 }}
                        rows="3"
                        label="Enter Survey Description"
                        variant="outlined"
                        multiline
                        disabled={false}
                      />
                      <br />
                      <br />
                      {!!questions.length && (
                        <>
                          {getQuestionsString()}
                          <br />
                        </>
                      )}
                      <Autocomplete
                        options={[
                          {
                            questionType: 'rating',
                            questionName: 'Rating',
                            label: 'How would you like to rate us?',
                            id: '1234'
                          },
                          {
                            questionType: 'textarea',
                            questionName: 'AnyComments',
                            label:
                              'Any other feedback that you want to provide',
                            additionalConfig: {
                              rows: '3'
                            },
                            id: '1235'
                          }
                        ]}
                        getOptionLabel={option => option.label}
                        style={{ width: 400 }}
                        getOptionSelected={(option, value) =>
                          value.id === option.id
                        }
                        key={autoCompleteKey}
                        onChange={(event, value) =>
                          setFieldValue('chooseQuestion', value)
                        }
                        renderInput={params => (
                          <Field
                            component={TextField}
                            {...params}
                            label="Choose a question"
                            variant="outlined"
                            name="chooseQuestion"
                          />
                        )}
                        name="chooseQuestion"
                      />
                      <br />
                      <Button color="primary" variant="contained" type="submit">
                        Update Preview
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} lg={7} item>
            <Card style={{ width: '100%' }}>
              <CardHeader title="Survey Preview" />
              <Divider />
              <CardContent>
                <Typography variant="h6">{surveyDetails.title}</Typography>
                <br />
                <Typography>{surveyDetails.description}</Typography>
                <GenerateForm inputs={questions} />
                {!!questions.length && (
                  <Button variant="contained" color="primary">
                    Submit Response
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
}
