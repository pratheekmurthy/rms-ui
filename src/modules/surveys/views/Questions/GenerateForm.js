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

const GenerateForm = ({ inputs }) => {
  const classes = useStyles();
  const obj = {};
  // inputs.forEach((input) =>
  //   input.type === "checkbox"
  //     ? (obj[input.name] = false)
  //     : (obj[input.name] = "")
  // );

  inputs.forEach(input => (obj[input.questionName] = ''));

  console.log('obj : ', obj);

  let [ratingValue, setRatingValue] = useState(0);
  const getRatingValue = data => {
    setRatingValue(data);
  };

  // console.log("ratingValue , ", ratingValue);

  return (
    <>
      <div>
        <Formik
          initialValues={obj}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            console.log('Values : ', values);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <br />
              {inputs.map((input, index) => {
                switch (input.questionType) {
                  case 'rating':
                    return (
                      <span key={Math.random()}>
                        <RatingComponent
                          label={input.label}
                          value={getRatingValue}
                          name={input.questionName}
                        />
                      </span>
                    );
                  case 'text':
                    return (
                      <div key={index}>
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
                        <Field
                          component={CheckboxWithLabel}
                          type="checkbox"
                          name={input.questionName}
                          color="primary"
                          defaultValue={false}
                          Label={{ label: input.label }}
                        />
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
                                <MenuItem value={option.value}>
                                  {option.label}
                                </MenuItem>
                              </div>
                            ))}
                          </Field>
                        </FormControl>
                        <br />
                      </>
                    );
                  default:
                    return <div>Empty</div>;
                }
              })}

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
