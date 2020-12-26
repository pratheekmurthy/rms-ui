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
    switch (input.questionType) {
      case 'rating':
        return (
          <span key={1}>
            <RatingComponent
              label={input.label}
              value={getRatingValue}
              name={input.questionName}
            />
          </span>
        );
      case 'text':
        return (
          <div key={input.questionName + '1'}>
            <Field
              component={TextField}
              color="primary"
              name={input.questionName}
              id={input.questionName}
              type="text"
              label={input.label}
            />
            <br />
            <br />
          </div>
        );
      case 'textarea':
        return (
          <div key={input.questionName}>
            <Field
              component={TextField}
              color="primary"
              name={input.questionName}
              id={input.questionName}
              type="text"
              variant="outlined"
              multiline
              rows={input.additionalConfig.rows}
              label={input.label}
              style={{ width: '100%' }}
            />
            <br />
            <br />
          </div>
        );
      case 'checkbox':
        return (
          <div key={input.name}>
            <Typography>{input.label}</Typography>
            {input.options.map((option, index) => (
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
      case 'radio':
        return (
          <>
            <Field component={RadioGroup} name={input.questionName}>
              <Typography>{input.label}</Typography>
              {input.options.map((option, index) => (
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
      case 'select':
        return (
          <>
            <FormControl className={classes.formControl}>
              <Field
                component={TextField}
                type="text"
                name={input.questionName}
                id={input.questionName}
                select={true}
                label={input.label}
                variant="outlined"
                size="medium"
              >
                {input.options.map((option, index) => (
                  <div key={index}>
                    <MenuItem value={option.value}>{option.label}</MenuItem>
                  </div>
                ))}
              </Field>
            </FormControl>
            <br />
          </>
        );
      default:
        return null;
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
