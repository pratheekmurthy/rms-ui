import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

const RatingInput = ({ submit }) => {
  const inputsData = {};

  const handleInputs = () => {
    let name = document.getElementById('name').value;
    let label = document.getElementById('label').value;
    if (name !== '' && label !== '') {
      inputsData.questionType = 'rating';
      inputsData.questionName = name;
      inputsData.label = label;
      submit(inputsData);
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          name: '',
          label: ''
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          // console.log(values);
          {
            handleInputs();
          }
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Please enter name'),
          label: Yup.string().required('Label required')
        })}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs={3}>
                  <Field
                    component={TextField}
                    name="name"
                    id="name"
                    type="text"
                    label="Rating Name"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    component={TextField}
                    name="label"
                    id="label"
                    type="text"
                    label="Label"
                  />
                </Grid>
              </Grid>
              {isSubmitting}
              <br />
              <Button
                variant="contained"
                color="secondary"
                onClick={submitForm}
              >
                Add Data
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RatingInput;
