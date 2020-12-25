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
import RadioInput from '../../Questions/InputTypes/NewRadio';

const UpdateQuestions = ({ updateData, newUpdatedValue }) => {
  useEffect(() => {
    // console.log('UpdateData : ', updateData);
  }, [updateData]);
  const obj = {};

  const handleSubmit = values => {
    if (values.rating) {
      updateData.label = values.rating;
    }
    if (values.text) {
      updateData.label = values.text;
    }
    if (values.radio) {
      updateData.label = values.radio;
    }
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
