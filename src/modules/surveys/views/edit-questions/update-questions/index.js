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
import TextareaInput from '../../Questions/InputTypes/Textarea';
import RatingInput from '../../Questions/InputTypes/Rating';
import TextInput from '../../Questions/InputTypes/Text';
import RadioInput from '../../Questions/InputTypes/Radio';

const UpdateQuestions = ({ updateData, newUpdatedValue }) => {
  useEffect(() => {
    // console.log('UpdateData : ', updateData);
  }, [updateData]);
  const obj = {};

  // switch (updateData.questionType) {
  //   case 'rating':
  //     return (obj[updateData.questionName] = '');
  //   case 'textarea':
  //     return (obj[updateData.questionName] = '');
  //   case 'text':
  //     return (obj[updateData.questionName] = '');
  //   case 'radio':
  //     return (obj[updateData.questionName] = '');
  //   default:
  //     return true;
  // }

  // const [options, setOptions] = useState([]);

  // useEffect(() => {
  //   setOptions(updateData[0].options);
  // }, [updateData]);

  // useEffect(() => {
  //   console.log('Options : ', options);
  // }, [options]);

  const handleSubmit = values => {
    if (values.rating) {
      updateData.label = values.rating;
    }
    // if (values.textarea) {
    //   updateData.label = values.textarea;
    //   if (values.rows) {
    //     updateData.additionalConfig.rows = values.rows;
    //   }
    // }
    // if (values.rows) {
    //   updateData.additionalConfig.rows = values.rows;
    // }
    if (values.text) {
      updateData.label = values.text;
    }
    if (values.radio) {
      updateData.label = values.radio;
    }
    // updateData.forEach(data => newUpdatedValue(data));
    newUpdatedValue(updateData);
  };

  const dummyFunction = updateData => {
    switch (updateData.questionType) {
      case 'rating':
        return (
          <div key={updateData.questionId}>
            <RatingInput
              isEdit
              question={updateData}
              submit={newUpdatedValue}
            />
          </div>
        );
      case 'textarea':
        return (
          <div key={updateData.questionId}>
            {/* <Grid
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
                  name={updateData.questionType}
                  id={updateData.questionName}
                  autoComplete="off"
                  defaultValue={updateData.label}
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
                  defaultValue={updateData.additionalConfig.rows}
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
            </Button> */}
            <TextareaInput
              isEdit
              question={updateData}
              submit={newUpdatedValue}
            />
          </div>
        );
      case 'text':
        return (
          <div key={updateData.questionId}>
            <TextInput isEdit question={updateData} submit={newUpdatedValue} />
          </div>
        );
      case 'radio':
        return (
          <div key={updateData.questionId}>
            {/* <Field
              component={TextField}
              color="primary"
              name={updateData.questionType}
              id={updateData.questionName}
              autoComplete="off"
              type="text"
              label="Enter new label"
              defaultValue={updateData.label}
            />
            <br />
            <br />
            {!!updateData &&
              updateData.options.map((option, index) => (
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
                        defaultValue={option.value}
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
            </Button> */}
            <RadioInput isEdit question={updateData} submit={newUpdatedValue} />
          </div>
        );
      default:
        return true;
    }
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
            {dummyFunction(updateData)}
            {isSubmitting}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateQuestions;
