import React, { useState, useEffect } from 'react';
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

const UpdateQuestions = ({ updateData, newUpdatedValue }) => {
  console.log('UpdateData : ', updateData);
  const obj = {};

  !!updateData &&
    updateData.map(input => {
      switch (input.questionType) {
        case 'rating':
          return (obj[input.questionName] = '');
        case 'textarea':
          return (obj[input.questionName] = '');
        case 'text':
          return (obj[input.questionName] = '');
        case 'radio':
          return (obj[input.questionName] = '');
        default:
          return true;
      }
    });

  // const [options, setOptions] = useState([]);

  // useEffect(() => {
  //   setOptions(updateData[0].options);
  // }, [updateData]);

  // useEffect(() => {
  //   console.log('Options : ', options);
  // }, [options]);

  const handleSubmit = values => {
    if (values.rating) {
      updateData[0].label = values.rating;
    }
    if (values.textarea) {
      updateData[0].label = values.textarea;
      if (values.rows) {
        updateData[0].additionalConfig.rows = values.rows;
      }
    }
    if (values.rows) {
      updateData[0].additionalConfig.rows = values.rows;
    }
    if (values.text) {
      updateData[0].label = values.text;
    }
    if (values.radio) {
      updateData[0].label = values.radio;
    }
    updateData.forEach(data => newUpdatedValue(data));
  };

  return (
    <div>
      <Formik
        initialValues={obj}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(false);
          console.log('values', values);
          handleSubmit(values);
          resetForm();
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <br />
            {updateData.map(data => {
              switch (data.questionType) {
                case 'rating':
                  return (
                    <div key={data.questionId}>
                      <Field
                        component={TextField}
                        color="primary"
                        name={data.questionType}
                        id={data.questionName}
                        autoComplete="off"
                        type="text"
                        label="Enter new label"
                        defaultValue={data.label}
                      />
                      <br />
                      <br />
                      <Button variant="contained" color="primary" type="submit">
                        Save
                      </Button>
                    </div>
                  );
                case 'textarea':
                  return (
                    <div key={data.questionId}>
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                        spacing={6}
                      >
                        <Grid item xs={4}>
                          <Field
                            component={TextField}
                            color="primary"
                            name={data.questionType}
                            id={data.questionName}
                            autoComplete="off"
                            defaultValue={data.label}
                            type="text"
                            label="Enter new label"
                          />
                        </Grid>

                        <Grid item xs={4}>
                          <Field
                            component={TextField}
                            name="rows"
                            id="rows"
                            type="number"
                            label="Rows"
                            defaultValue={data.additionalConfig.rows}
                            autoComplete="off"
                            InputLabelProps={{
                              shrink: true
                            }}
                            size="small"
                          />
                        </Grid>
                      </Grid>
                      <br />
                      <br />
                      <Button variant="contained" color="primary" type="submit">
                        Save
                      </Button>
                    </div>
                  );
                case 'text':
                  return (
                    <div key={data.questionId}>
                      <Field
                        component={TextField}
                        color="primary"
                        name={data.questionType}
                        id={data.questionName}
                        defaultValue={data.label}
                        type="text"
                        label="Enter new label"
                        autoComplete="off"
                      />
                      <br />
                      <br />
                      <Button variant="contained" color="primary" type="submit">
                        Save
                      </Button>
                    </div>
                  );
                case 'radio':
                  return (
                    <div key={data.questionId}>
                      <Field
                        component={TextField}
                        color="primary"
                        name={data.questionType}
                        id={data.questionName}
                        autoComplete="off"
                        type="text"
                        label="Enter new label"
                        defaultValue={data.label}
                      />
                      <br />
                      <br />
                      {!!updateData &&
                        updateData[0].options.map((option, index) => (
                          <div key={Math.random()}>
                            <Grid
                              container
                              direction="row"
                              justify="flex-start"
                              alignItems="flex-start"
                              spacing={6}
                            >
                              <Grid item xs={4}>
                                <Field
                                  component={TextField}
                                  color="primary"
                                  name={option.label}
                                  id={option.label}
                                  autoComplete="off"
                                  defaultValue={option.label}
                                  type="text"
                                  label="Enter new label"
                                />
                              </Grid>

                              <Grid item xs={4}>
                                <Field
                                  component={TextField}
                                  color="primary"
                                  name={option.value}
                                  id={option.value}
                                  autoComplete="off"
                                  // defaultValue={option.value}
                                  type="text"
                                  label="Enter new value"
                                />
                              </Grid>
                            </Grid>
                          </div>
                        ))}

                      <br />
                      <br />
                      <Button variant="contained" color="primary" type="submit">
                        Save
                      </Button>
                    </div>
                  );
                default:
                  return true;
              }
            })}
            {isSubmitting}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateQuestions;
