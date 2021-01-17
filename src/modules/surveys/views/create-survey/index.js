import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  MenuItem,
  Tooltip,
  Typography
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import Page from 'src/components/Page';
import * as yup from 'yup';
import { Select, TextField } from 'formik-material-ui';
import DeleteIcon from '@material-ui/icons/Delete';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Axios from 'axios';
import SaveIcon from '@material-ui/icons/Save';
import Spinner from 'src/components/Spinner';
import CommonAlert from 'src/components/CommonAlert';
import { AccountTree, Close, Visibility } from '@material-ui/icons';
import { SEARCH_QUESTION, CRUD_SURVEY } from '../../utils/endpoints';
import GenerateForm from '../Questions/GenerateForm';

const asyncFunction = async text =>
  Axios.get(`${SEARCH_QUESTION}/${text}`)
    .then(val => val.data)
    .catch(err => console.log(err));

const asyncFunctionDebounced = AwesomeDebouncePromise(asyncFunction, 200);

const useStyle = makeStyles(theme => ({
  container: {
    width: 400,
    position: 'relative',
    padding: `${theme.spacing(2)}px 0`
  },
  listItem: {
    paddingRight: theme.spacing(7)
  },
  action: {
    position: 'absolute',
    right: 0,
    top: 2
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

  const [ratingFieldsCount, setRatingFieldCount] = useState(0);

  const handleChange = async text => {
    const result = await asyncFunctionDebounced(text.target.value);
    setSuggestions(result || []);
  };

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    if (!isPost) {
      (async function getSurveyDetails() {
        try {
          showSpinner(true);
          const res = await Axios.get(
            `${CRUD_SURVEY}/${match.params.surveyId}`
          );
          const obj = res.data;
          setInitFormVal({ ...obj, chooseQuestion: '' });
          setQuestions(obj.questions);
          setSurveyDetails(obj);
          showSpinner(false);
          setRatingFieldCount(
            obj.questions.filter(q => q.questionType === 'rating').length
          );
        } catch (err) {
          // Error handling
          showError(true);
          showSpinner(false);
        }
      })();
    }
  }, [match.params.surveyId]);

  function addQuestionEvent(e) {
    if (e.chooseQuestion) {
      if (
        !questions.map(q => q.questionId).includes(e.chooseQuestion.questionId)
      ) {
        const arr = questions.slice();
        setAutoCompleteKey(Math.random());
        arr.push(e.chooseQuestion);
        setQuestions(arr);
        setSuggestions([]);
        if (e.chooseQuestion.questionType === 'rating') {
          setRatingFieldCount(ratingFieldsCount + 1);
        }
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

  function deleteQuestionFromList(question) {
    setQuestions(
      questions
        .filter(q => q.questionId !== question.questionId)
        .map(q => {
          if (
            q.additionalConfig?.visibleIf?.relatedTo === question.questionId ||
            q.innerRef?.values?.relatedTo === question.questionId
          ) {
            resetForm(q.innerRef.setFieldValue, q.innerRef.setTouched);
            return {
              ...q,
              additionalConfig: {
                ...q.additionalConfig,
                visibleIf: null
              },
              showVisibilityOptions: false
            };
          }
          return q;
        })
    );
    if (question.questionType === 'rating') {
      setRatingFieldCount(ratingFieldsCount - 1);
    }
  }

  function getQuestionsString() {
    return (
      <div component="nav" aria-label="main mailbox folders">
        {questions.map(question => (
          <div key={question.questionId}>
            <div className={classes.container}>
              <Typography className={classes.listItem}>
                {question.label}
              </Typography>
              <div className={classes.action}>
                {!!question.additionalConfig?.visibleIf && (
                  <IconButton edge="end" aria-label="Related" disabled>
                    <AccountTree color="" />
                  </IconButton>
                )}
                {ratingFieldsCount > 0 && question.questionType !== 'rating' && (
                  <Tooltip title="Control Visibility">
                    <IconButton
                      edge="end"
                      aria-label="set visibility"
                      onClick={() => {
                        setQuestions(
                          questions.map(q =>
                            q.questionId !== question.questionId
                              ? q
                              : {
                                  ...q,
                                  showVisibilityOptions: !q.showVisibilityOptions
                                }
                          )
                        );
                      }}
                      disabled={question.showVisibilityOptions}
                    >
                      <Visibility
                        color={
                          question.showVisibilityOptions
                            ? 'disabled'
                            : 'primary'
                        }
                      />
                    </IconButton>
                  </Tooltip>
                )}
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteQuestionFromList(question)}
                >
                  <DeleteIcon color="secondary" />
                </IconButton>
              </div>
            </div>
            {!!ratingFieldsCount && (
              <div
                className={classes.listItem}
                key={`${question.questionId}-collapsed`}
                style={{
                  display: question.showVisibilityOptions ? 'block' : 'none'
                }}
              >
                <div>{relatedFormFor(question)}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
  function relatedFormFor(question) {
    return (
      <>
        <Typography style={{ marginBottom: '0.3rem' }}>Visible If</Typography>
        <Formik
          initialValues={
            question.additionalConfig?.visibleIf || {
              relatedTo: '',
              value: '',
              condition: '<'
            }
          }
          validationSchema={yup.object({
            relatedTo: yup.string().required('Required'),
            condition: yup.string().required(),
            value: yup
              .number()
              .max(5, 'Max 5')
              .min(1, 'Min 1')
              .required('Required')
              .typeError('Number')
          })}
          onSubmit={val => {
            question.additionalConfig = question.additionalConfig || {};
            question.additionalConfig.visibleIf = val;
            question.showVisibilityOptions = false;
            setQuestions(
              questions.map(q =>
                q.questionId === question.questionId ? { ...q } : q
              )
            );
          }}
          innerRef={val => {
            if (!question.innerRef) {
              question.innerRef = val;
            }
          }}
        >
          {({ submitForm, values, setFieldValue, setTouched }) => {
            if (question.innerRef) {
              question.innerRef.values = values;
            }
            return (
              <div>
                <Field
                  component={TextField}
                  style={{ width: 200 }}
                  name="relatedTo"
                  select="true"
                  label="Field"
                  disabled={false}
                  variant="outlined"
                >
                  {questions
                    .filter(q => q.questionType === 'rating')
                    .map(q => (
                      <MenuItem value={q.questionName} key={q.questionId}>
                        {q.label}
                      </MenuItem>
                    ))}
                </Field>
                <FormControl variant="outlined">
                  <InputLabel id="condition-label">Condition</InputLabel>
                  <Field
                    name="condition"
                    component={Select}
                    style={{ width: 100 }}
                    label="Condition"
                    disabled={false}
                    inputProps={{ labelId: 'condition-label' }}
                  >
                    <MenuItem value=">">&gt;</MenuItem>
                    <MenuItem value="<">&lt;</MenuItem>
                    <MenuItem value="=">=</MenuItem>
                  </Field>
                </FormControl>
                <Field
                  name="value"
                  component={TextField}
                  style={{ width: 100 }}
                  label="Value"
                  variant="outlined"
                  disabled={false}
                />
                <IconButton onClick={() => submitForm()}>
                  <SaveIcon color="primary" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    resetForm(setFieldValue, setTouched);
                    setTimeout(() => {
                      setQuestions(
                        questions.map(q =>
                          q.questionId === question.questionId
                            ? {
                                ...q,
                                showVisibilityOptions: false,
                                additionalConfig: {
                                  ...q.additionalConfig,
                                  visibleIf: null
                                }
                              }
                            : q
                        )
                      );
                    }, 1000);
                  }}
                >
                  <Close color="secondary" />
                </IconButton>
              </div>
            );
          }}
        </Formik>
      </>
    );
  }
  function resetForm(setFieldValue, setTouched) {
    setFieldValue('relatedTo', '');
    setFieldValue('value', '');
    setFieldValue('condition', '<');
    setTouched({});
  }

  function saveSurvey() {
    if (!questions.find(q => q.questionName === 'CSAT')) {
      setShowConfirmationModal(true);
    } else {
      sendSaveSurveyRequest();
    }
  }
  async function sendSaveSurveyRequest() {
    try {
      questions.forEach(q => {
        if (q.innerRef || q.showVisibilityOptions) {
          delete q.innerRef;
          delete q.showVisibilityOptions;
        }
      });
      await Axios[isPost ? 'post' : 'patch'](
        isPost ? CRUD_SURVEY : `${CRUD_SURVEY}/${match.params.surveyId}`,
        {
          ...surveyDetails,
          questions,
          state: 'draft'
        }
      );
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
                            autoComplete="off"
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
                <GenerateForm input={questions} />
                {!!questions.length && (
                  <Button variant="contained" color="primary">
                    Submit Response
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Dialog
          open={showConfirmationModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            No CSAT Question Found
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to create a survey without CSAT Question?
              <br />
              <b>Note:</b>The Survey cannot be used to set the customer CSAT
              score
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setShowConfirmationModal(false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => sendSaveSurveyRequest()}
              color="primary"
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Page>
  );
}
