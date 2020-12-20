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

const UpdateQuestions = ({ updateData }) => {
  const obj = {};

  updateData.map(input => {
    switch (input) {
      case 'rating':
        return (obj[input.questionName] = '');
      case 'textarea':
        return (
          (obj[input.questionName] = '') &&
          (obj[input.additionalConfig.rows] = '')
        );
      default:
        return true;
    }
  });

  const handleSubmit = values => {
    values.rating && (updateData[0].label = values.rating);
    let newChanges = updateData;
    console.log('newchanges , ', newChanges);
  };

  return (
    <div>
      <Formik
        initialValues={obj}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          handleSubmit(values);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <br />
            {updateData.map((data, index) => {
              switch (data.questionType) {
                case 'rating':
                  return (
                    <div key={data.label}>
                      <Field
                        component={TextField}
                        color="primary"
                        name={data.questionName}
                        id={data.questionName}
                        type="text"
                        label="Enter new label"
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
                    <div key={data.label}>
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
                            name={data.questionName}
                            id={data.questionName}
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
                            defaultValue={3}
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
