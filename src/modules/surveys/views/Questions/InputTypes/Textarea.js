import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

const TextareaInput = ({ submit }) => {
  const inputsData = {};

  const handleInputs = () => {
    let name = document.getElementById('name').value;
    let label = document.getElementById('label').value;
    let rows = document.getElementById('rows').value;
    if (name !== '' && label !== '') {
      inputsData.questionType = 'textarea';
      inputsData.questionName = name;
      inputsData.label = label;
      inputsData.additionalConfig = { rows: rows };
      submit(inputsData);
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          name: '',
          label: '',
          rows: 3
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(false);

          handleInputs();
          resetForm();
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Please enter name'),
          label: Yup.string().required('Label required'),
          rows: Yup.number()
            .max(100, 'Too Long!')
            .min(2, 'Too Short!')
            .required('required')
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
                spacing={6}
              >
                <Grid item xs={4}>
                  <Field
                    component={TextField}
                    name="label"
                    id="label"
                    type="text"
                    label="Label"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    component={TextField}
                    name="name"
                    id="name"
                    type="text"
                    label="Textarea Name"
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={4}>
                  <Field
                    component={TextField}
                    name="rows"
                    id="rows"
                    type="number"
                    label="Rows"
                    style={{ marginLeft: '30%' }}
                    InputLabelProps={{
                      shrink: true
                    }}
                    size="small"
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

export default TextareaInput;
