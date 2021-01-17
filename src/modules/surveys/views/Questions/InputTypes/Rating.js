import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Checkbox, FormControlLabel, Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

const RatingInput = ({ submit, isEdit, question }) => {
  const [inputsData] = useState(isEdit ? question : {});
  const [initState, setinitState] = useState(null);
  const [isCsatSet, setisCsatField] = useState(false);
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
    inputsData.questionType = 'rating';
    inputsData.questionName = name;
    inputsData.label = label;
    submit(inputsData);
  };

  function setRatingAsCsatScore(val, setFieldValue) {
    if (val.target.checked) {
      setFieldValue('name', 'CSAT');
    }
    setisCsatField(val.target.checked);
  }

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
          {({ submitForm, isSubmitting, setFieldValue }) => (
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
                      label="Rating Name"
                      disabled={isEdit || isCsatSet}
                      autoComplete="off"
                    />
                  </Grid>
                </Grid>
                {!isEdit && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isCsatSet}
                        onChange={val =>
                          setRatingAsCsatScore(val, setFieldValue)
                        }
                      />
                    }
                    label="Is For CSAT Score Calculation"
                  />
                )}
                {isSubmitting}
                <br />
                <Button
                  variant="contained"
                  color={isEdit ? 'primary' : 'inherit'}
                  onClick={submitForm}
                >
                  {isEdit ? 'Update' : 'Add Question'}
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </>
    )
  );
};

export default RatingInput;
