import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Tooltip,
  Typography
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import Page from 'src/components/Page';
import * as yup from 'yup';
import { TextField } from 'formik-material-ui';
import GenerateForm from '../Questions/GenerateForm';
import DeleteIcon from '@material-ui/icons/Delete';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Axios from 'axios';
import SaveIcon from '@material-ui/icons/Save';
import Spinner from 'src/components/Spinner';
import CommonAlert from 'src/components/CommonAlert';

const asyncFunction = async text =>
  Axios.get('/survey/question/search/' + text)
    .then(val => val.data)
    .catch(err => console.log(err));

const asyncFunctionDebounced = AwesomeDebouncePromise(asyncFunction, 200);

const useStyle = makeStyles(theme => ({
  container: {
    width: 400,
    position: 'relative'
  },
  listItem: {
    paddingRight: theme.spacing(5)
  }
}));

export default function CreateSurvey(props) {
  const classes = useStyle();
  const { match, history } = props;
  const [initFormVal, setInitFormVal] = useState({
    title: '',
    chooseQuestion: '',
    description: ''
  });
  const isPost = !match.params.surveyId;
  const [questions, setQuestions] = useState([]);
  const [surveyDetails, setSurveyDetails] = useState({
    title: '',
    description: ''
  });

  const [autoCompleteKey, setAutoCompleteKey] = useState(0);

  const formRef = useRef({});

  const [suggestions, setSuggestions] = useState([]);

  const [spinner, showSpinner] = useState(false);
  const [error, showError] = useState(false);

  const handleChange = async text => {
    const result = await asyncFunctionDebounced(text.target.value);
    setSuggestions(result || []);
  };

  useEffect(() => {
    console.log(props);
    if (!isPost) {
      (async function getSurveyDetails() {
        try {
          showSpinner(true);
          const res = await Axios.get('/survey/' + match.params.surveyId);
          const obj = res.data;
          setInitFormVal({ ...obj, chooseQuestion: '' });
          setQuestions(obj.questions);
          setSurveyDetails(obj);
          showSpinner(false);
        } catch (err) {
          // Error handling
          showError(true);
          showSpinner(false);
        }
      })();
    }
  }, [match]);

  function addQuestionEvent(e) {
    console.log(e);
    if (e.chooseQuestion) {
      if (
        !questions.map(q => q.questionId).includes(e.chooseQuestion.questionId)
      ) {
        const arr = questions.slice();
        setAutoCompleteKey(Math.random());
        arr.push(e.chooseQuestion);
        setQuestions(arr);
        console.log('resetting', arr.length);
        formRef.current.setFieldValue('chooseQuestion', '');
        formRef.current.setTouched({ chooseQuestion: false });
      } else {
        formRef.current.setErrors({
          chooseQuestion: 'Question Already Exists!'
        });
      }
    }
    setSurveyDetails({
      title: e.title,
      description: e.description
    });
  }

  function deleteQuestionFromList(id) {
    console.log(id, 'id');
    setQuestions(questions.filter(q => q.questionId !== id));
  }

  function getQuestionsString() {
    return (
      <List component="nav" aria-label="main mailbox folders">
        {questions.map(question => (
          <ListItem
            key={question.questionId}
            classes={{ container: classes.container, root: classes.listItem }}
          >
            <ListItemText primary={question.label} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteQuestionFromList(question.questionId)}
              >
                <DeleteIcon color="secondary" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }

  async function saveSurvey() {
    console.log(isPost, match);
    try {
      const res = await Axios[isPost ? 'post' : 'patch'](
        isPost ? '/survey' : `/survey/${match.params.surveyId}`,
        {
          questions,
          ...surveyDetails,
          state: 'draft'
        }
      );
      console.log(res);
      history.push({
        pathname: '/surveys/home',
        state: {
          surveyOperation: isPost ? 'create' : 'update'
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Page title={isPost ? 'Create Survey' : 'Edit Survey'}>
      <Box margin="1rem">
        <Grid container spacing={4}>
          <Grid xs={12} lg={5} item>
            <Card style={{ width: '100%' }}>
              <CardHeader title="Create a survey" />
              <Divider />
              <CardContent>
                {!spinner ? (
                  error ? (
                    <CommonAlert />
                  ) : (
                    <Formik
                      initialValues={initFormVal}
                      onSubmit={e => addQuestionEvent(e)}
                      innerRef={formRef}
                      validationSchema={yup.object({
                        title: yup
                          .string()
                          .required('Please Enter Survey Title'),
                        description: yup
                          .string()
                          .required('Please Enter Survey Description'),
                        chooseQuestion: yup.lazy(value => {
                          if (!questions.length) {
                            return yup
                              .object()
                              .required('Please select a question')
                              .typeError('Please select a valid question');
                          }
                          return yup
                            .string()
                            .nullable()
                            .notRequired()
                            .typeError('Please select a valid question');
                        })
                      })}
                    >
                      {({ setFieldValue }) => (
                        <Form>
                          <Field
                            name="title"
                            component={TextField}
                            style={{ width: 400 }}
                            label="Enter Survey Title"
                            variant="outlined"
                            disabled={false}
                          />
                          <br />
                          <br />
                          <Field
                            name="description"
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
                            options={suggestions}
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
                                onChange={handleChange}
                              />
                            )}
                            name="chooseQuestion"
                          />
                          <br />
                          <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                          >
                            Update Preview
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  )
                ) : (
                  <Spinner />
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} lg={7} item>
            <Card style={{ width: '100%' }}>
              <CardHeader
                title="Survey Preview"
                action={
                  !!questions.length && (
                    <Tooltip title="Save Survey">
                      <IconButton aria-label="Save Survey" onClick={saveSurvey}>
                        <SaveIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  )
                }
              />
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
