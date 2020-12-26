import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import {
  Button,
  RadioGroup,
  FormControlLabel,
  makeStyles,
  withStyles,
  Radio,
  Typography,
  FormControl,
  MenuItem,
  Grid
} from '@material-ui/core';
import RatingComponent from './RatingComponent';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  formControl: {
    minWidth: 200
  }
}));

const GenerateForm = ({ input }) => {
  const classes = useStyles();
  const obj = {};
  console.log(input);

  let [ratingValue, setRatingValue] = useState(0);
  const getRatingValue = data => {
    setRatingValue(data);
  };
  const renderQuestion = isSubmitting => {
    if (input) {
      return input.map(question => {
        switch (question.questionType) {
          case 'rating':
            return (
              <span key={1}>
                <RatingComponent
                  label={question.label}
                  value={getRatingValue}
                  name={question.questionName}
                />
              </span>
            );
            break;
          case 'text':
            return (
              <div key={question.questionName + '1'}>
                <Field
                  component={TextField}
                  color="primary"
                  name={question.questionName}
                  id={question.questionName}
                  type="text"
                  label={question.label}
                />
                <br />
                <br />
              </div>
            );
            break;
          case 'textarea':
            return (
              <div key={question.questionName}>
                <Field
                  component={TextField}
                  color="primary"
                  name={question.questionName}
                  id={question.questionName}
                  type="text"
                  variant="outlined"
                  multiline
                  rows={question.additionalConfig.rows}
                  label={question.label}
                  style={{ width: '100%' }}
                />
                <br />
                <br />
              </div>
            );
            break;
          case 'checkbox':
            return (
              <div key={question.name}>
                <Typography>{question.label}</Typography>
                {question.options.map((option, index) => (
                  <div key={index}>
                    <Field
                      component={CheckboxWithLabel}
                      type="checkbox"
                      name={option.value}
                      color="primary"
                      defaultValue={false}
                      Label={{ label: option.label }}
                    />
                  </div>
                ))}
              </div>
            );
            break;
          case 'radio':
            return (
              <>
                <Field component={RadioGroup} name={question.questionName}>
                  <Typography>{question.label}</Typography>
                  {question.options.map((option, index) => (
                    <div key={index}>
                      <FormControlLabel
                        value={option.value}
                        control={<Radio disabled={isSubmitting} />}
                        label={option.label}
                        disabled={isSubmitting}
                      />
                    </div>
                  ))}
                </Field>
              </>
            );
            break;
          case 'select':
            return (
              <>
                <FormControl className={classes.formControl}>
                  <Field
                    component={TextField}
                    type="text"
                    name={question.questionName}
                    id={question.questionName}
                    select={true}
                    label={question.label}
                    variant="outlined"
                    size="medium"
                  >
                    {question.options.map((option, index) => (
                      <div key={index}>
                        <MenuItem value={option.value}>{option.label}</MenuItem>
                      </div>
                    ))}
                  </Field>
                </FormControl>
                <br />
              </>
            );
            break;
          default:
            return null;
        }
      });
    }
  };
  return (
    <>
      <div>
        <Formik
          initialValues={obj}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <br />
              {renderQuestion(isSubmitting)}

              {isSubmitting}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ display: 'none' }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default GenerateForm;
