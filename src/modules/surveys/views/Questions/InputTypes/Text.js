import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

const TextInput = ({ submit, isEdit, question }) => {
  const [inputsData] = useState(isEdit ? question : {});
  const [initState, setinitState] = useState(null);
  useEffect(() => {
    if (isEdit) {
      setinitState({
        name: question.questionName,
        label: question.label
      });
    } else {
      setinitState({
        name: '',
        label: ''
      });
    }
  }, []);

  const handleInputs = ({ name, label }) => {
    inputsData.questionType = 'text';
    inputsData.questionName = name;
    inputsData.label = label;
    submit(inputsData);
  };

  return (
    !!initState && (
      <>
        <Formik
          initialValues={initState}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(false);
            if (!isEdit) {
              resetForm();
            }
            handleInputs(values);
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
                      autoComplete="off"
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Field
                      component={TextField}
                      name="name"
                      id="name"
                      type="text"
                      label="Text Name"
                      autoComplete="off"
                      disabled={isEdit}
                    />
                  </Grid>
                </Grid>
                {isSubmitting}
                <br />
                <br />
                <Button
                  variant="contained"
                  color={isEdit ? 'primary' : 'inherit'}
                  onClick={submitForm}
                >
                  {isEdit ? 'Update' : 'Add Data'}
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </>
    )
  );
};

export default TextInput;
