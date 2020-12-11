import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

const TextInput = ({ submit }) => {
  const inputsData = {};

  const handleInputs = () => {
    let name = document.getElementById('name').value;
    let label = document.getElementById('label').value;
    if (name !== '' && label !== '') {
      inputsData.questionType = 'text';
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
          // let name = values.name;
          // let label = values.label;
          // if (name && label !== "") {
          //   setAllData({
          //     questionType: "text",
          //     questionName: values.name,
          //     label: values.label,
          //   });
          //   submit(allData);
          // }
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
                spacing={10}
              >
                <Grid item xs={4}>
                  <Field
                    component={TextField}
                    name="label"
                    id="label"
                    type="text"
                    label="Label"
                  />
                </Grid>
                <Grid item xs={5}>
                  <Field
                    component={TextField}
                    name="name"
                    id="name"
                    type="text"
                    label="Text Name"
                  />
                </Grid>
              </Grid>
              {isSubmitting}
              <br />
              <br />
              <Button variant="contained" color="inherit" onClick={submitForm}>
                Add Data
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default TextInput;
