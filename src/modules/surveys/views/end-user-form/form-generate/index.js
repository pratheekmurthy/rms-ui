import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CheckboxWithLabel, TextField, RadioGroup } from 'formik-material-ui';
import {
  Button,
  FormControlLabel,
  makeStyles,
  Radio,
  Typography,
  FormControl,
  MenuItem,
  Grid
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import * as Yup from 'yup';

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 200
  },
  typography: {
    fontFamily: 'Raleway',
    margin: '1%'
  }
}));

const FormGenerate = ({ inputType }) => {
  const classes = useStyles();
  const initialState = {};
  let initialValidation = {};
  inputType &&
    inputType.forEach(question => (initialState[question.questionName] = ''));

  inputType &&
    inputType.forEach(question => {
      switch (question.questionType) {
        case 'rating': {
          return (initialValidation[
            question.questionName
          ] = Yup.string().required('Required'));
        }
        case 'text':
          return (initialValidation[question.questionName] = !question
            .additionalConfig?.visibleIf
            ? Yup.string().required('Required')
            : Yup.string().when(question.additionalConfig.visibleIf.relatedTo, {
                is: value1 =>
                  checkConditionvalues(
                    value1,
                    question.additionalConfig.visibleIf.value,
                    question.additionalConfig.visibleIf.condition
                  ),
                then: Yup.string().required('Required'),
                otherwise: Yup.string()
              }));
        case 'textarea':
          return (initialValidation[question.questionName] = !question
            .additionalConfig?.visibleIf
            ? Yup.string().required('Required')
            : Yup.string().when(question.additionalConfig.visibleIf.relatedTo, {
                is: value1 =>
                  checkConditionvalues(
                    value1,
                    question.additionalConfig.visibleIf.value,
                    question.additionalConfig.visibleIf.condition
                  ),
                then: Yup.string().required('Required'),
                otherwise: Yup.string()
              }));
        case 'checkbox':
          return (initialValidation[question.questionName] = !question
            .additionalConfig?.visibleIf
            ? Yup.array().required('Required')
            : Yup.array().when(question.additionalConfig.visibleIf.relatedTo, {
                is: value1 =>
                  checkConditionvalues(
                    value1,
                    question.additionalConfig.visibleIf.value,
                    question.additionalConfig.visibleIf.condition
                  ),
                then: Yup.array().required('Required'),
                otherwise: Yup.string()
              }));
        case 'radio':
          return (initialValidation[question.questionName] = !question
            .additionalConfig?.visibleIf
            ? Yup.string().required('Required')
            : Yup.string().when(question.additionalConfig.visibleIf.relatedTo, {
                is: value1 =>
                  checkConditionvalues(
                    value1,
                    question.additionalConfig.visibleIf.value,
                    question.additionalConfig.visibleIf.condition
                  ),
                then: Yup.string().required('Required'),
                otherwise: Yup.string()
              }));
        case 'select':
          return (initialValidation[question.questionName] = !question
            .additionalConfig?.visibleIf
            ? Yup.string()
                .oneOf(
                  question.options.map(option => option.value),
                  'Choose correct option'
                )
                .required('Please select Option')
            : Yup.string().when(question.additionalConfig.visibleIf.relatedTo, {
                is: value1 =>
                  checkConditionvalues(
                    value1,
                    question.additionalConfig.visibleIf.value,
                    question.additionalConfig.visibleIf.condition
                  ),
                then: Yup.string()
                  .oneOf(
                    question.options.map(option => option.value),
                    'Choose correct option'
                  )
                  .required('Please select Option'),
                otherwise: Yup.string()
              }));
        default:
          return question.questionType;
      }
    });

  const renderQuestion = (values, setFieldValue) => {
    if (inputType) {
      return inputType.map(question => {
        const {
          additionalConfig: {
            visibleIf: { relatedTo, condition, value } = {}
          } = {}
        } = question;
        return !relatedTo
          ? switchField(question, values, setFieldValue)
          : checkConditionvalues(values[relatedTo], value, condition)
          ? switchField(question, values, setFieldValue)
          : values[question.questionName] !== ''
          ? setFieldValue(question.questionName, '')
          : null;
      });
    }
  };
  function checkConditionvalues(value1, value2, condition) {
    console.log(value1, value2, typeof value1, typeof value2);
    if (value1 !== '') {
      switch (condition) {
        case '=':
          return value1 === value2;
        case '<':
          return value1 < value2;
        case '>':
          return value1 > value2;
        default:
          return false;
      }
    }
  }

  function switchField(question, values, setFieldValue) {
    switch (question.questionType) {
      case 'rating':
        return (
          <div key={'rating' + question.questionName}>
            <Typography variant="h6" className={classes.typography}>
              {question.label}
            </Typography>
            <Rating
              name={question.questionName}
              id="rating"
              precision={0.5}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
              size="large"
              onChange={e =>
                setFieldValue(question.questionName, e.target.value.toString())
              }
            />
            {values[question.questionName] === '' && (
              <span style={{ color: '#F44336' }}>
                <br />
                <ErrorMessage name={question.questionName} />
              </span>
            )}
          </div>
        );
      case 'text':
        return (
          <div key={'text' + question.questionName + '1'}>
            <Typography variant="h6" className={classes.typography}>
              {question.label}
            </Typography>
            <Field
              component={TextField}
              color="primary"
              name={question.questionName}
              id={question.questionName}
              type="text"
              variant="outlined"
              placeholder="This is text"
              autoComplete="off"
              style={{ width: '100%' }}
            />
            <br />
            <br />
          </div>
        );
      case 'textarea':
        return (
          <div key={'textarea' + question.questionName}>
            <Typography variant="h6" className={classes.typography}>
              {question.label}
            </Typography>
            <Field
              component={TextField}
              color="primary"
              name={question.questionName}
              id={question.questionName}
              type="text"
              variant="outlined"
              multiline
              rows={question.additionalConfig.rows}
              placeholder="This is textarea"
              style={{ width: '100%' }}
            />
            <br />
            <br />
          </div>
        );
      case 'checkbox':
        return (
          <div key={'checkbox heading' + question.name}>
            <Typography variant="h6" className={classes.typography}>
              {question.label}
            </Typography>

            <Grid
              container
              direction={
                question.additionalConfig.displayType === 'inline'
                  ? 'row'
                  : 'column'
              }
              justify="flex-start"
              alignItems="flex-start"
            >
              {question.options.map(option => (
                <Grid item key={'option' + option.value}>
                  <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    name={question.questionName}
                    value={option.value}
                    color="secondary"
                    Label={{ label: option.label }}
                  />
                </Grid>
              ))}
              <span style={{ color: '#F44336' }}>
                <ErrorMessage name={question.questionName} />
              </span>
            </Grid>
          </div>
        );
      case 'radio':
        return (
          <div key={'radio heading' + question.name}>
            <Typography variant="h6" className={classes.typography}>
              {question.label}
            </Typography>
            {question.additionalConfig.displayType === 'inline' ? (
              <>
                <Field component={RadioGroup} name={question.questionName}>
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    {question.options.map(option => (
                      <Grid item key={'option' + option.value}>
                        <FormControlLabel
                          value={option.value}
                          control={<Radio />}
                          label={option.label}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Field>
                <span style={{ color: '#F44336' }}>
                  <ErrorMessage name={question.questionName} />
                </span>
              </>
            ) : (
              <>
                <Field component={RadioGroup} name={question.questionName}>
                  {question.options.map(option => (
                    <FormControlLabel
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </Field>
                <span style={{ color: '#F44336' }}>
                  <ErrorMessage name={question.questionName} />
                </span>
              </>
            )}
          </div>
        );
      case 'select':
        return (
          <div key={'select heading' + question.name}>
            <Typography variant="h6" className={classes.typography}>
              {question.label}
            </Typography>
            <FormControl
              className={classes.formControl}
              key={'select' + question.name}
              style={{ width: '100%' }}
            >
              <Field
                component={TextField}
                type="text"
                name={question.questionName}
                id={question.questionName}
                select={true}
                variant="outlined"
                size="medium"
              >
                {question.options.map(option => (
                  <MenuItem
                    value={option.value}
                    key={'menuitem' + option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
            <br />
            <br />
          </div>
        );
      default:
        return null;
    }
  }
  return (
    <>
      {inputType && (
        <div key={inputType + 'generateForm'}>
          <Formik
            initialValues={initialState}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              console.log('values : ', values);
            }}
            key={inputType + 'formik'}
            validationSchema={Yup.object().shape(initialValidation)}
          >
            {({ values, submitForm, isSubmitting, setFieldValue }) => (
              <Form>
                <br />
                {renderQuestion(values, setFieldValue)}
                {isSubmitting}
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  style={{ width: '100%' }}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default FormGenerate;
