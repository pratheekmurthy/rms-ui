import { Button, Fade, Grid, IconButton, Tooltip } from '@material-ui/core';
import { Field, FieldArray, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

function Radio({ submit, isEdit, question }) {
  const [inputsData, setInputsData] = useState(isEdit ? question : {});
  const [initState, setinitState] = useState(null);
  //   const [options, setOptions] = useState([]);
  useEffect(() => {
    if (isEdit) {
      setinitState({
        name: question.questionName,
        label: question.label,
        options: question.options
      });
      //   setOptions(question.options);
    } else {
      setinitState({
        name: '',
        label: '',
        options: []
      });
    }
  }, []);

  //   function extractOptionsFromValues(values) {
  //     return new Array(totalOptions).fill(0).map((_, index) => ({
  //       label: values['label' + index],
  //       value: values['value' + index]
  //     }));
  //   }

  const setFinalQuestionObj = values => {
    const localInputsData = { ...inputsData };
    localInputsData.questionType = 'radio';
    localInputsData.questionName = values.name;
    localInputsData.label = values.label;
    localInputsData.options = values.options;
    setInputsData(localInputsData);
    submit(localInputsData);
  };
  return (
    !!initState && (
      <>
        <Formik
          initialValues={initState}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(false);
            setFinalQuestionObj(values);
            if (!isEdit) {
              resetForm();
            }
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Please provide an element name'),
            label: Yup.string().required('Radio Label is required'),
            options: Yup.array().of(
              Yup.object().shape({
                label: Yup.string().required('Label is required'),
                value: Yup.string().required('Value is required')
              })
            )
          })}
        >
          {({ isSubmitting, values }) => (
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
                  <Grid item xs={5}>
                    <Field
                      component={TextField}
                      name="name"
                      id="name"
                      type="text"
                      label="Radio Name"
                      autoComplete="off"
                      disabled={isEdit}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      component={TextField}
                      name="label"
                      id="label"
                      type="text"
                      label="label"
                      autoComplete="off"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <FieldArray
                name="options"
                render={arrayHelpers => {
                  return (
                    <div>
                      {values.options && values.options.length > 0
                        ? values.options.map((option, index) => (
                            <div key={index + 'option'}>
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
                                  <Grid item xs={5}>
                                    <Field
                                      component={TextField}
                                      id={'value' + index}
                                      name={`options.${index}.value`}
                                      type="text"
                                      label="Radio Value"
                                      autoComplete="off"
                                    />
                                  </Grid>
                                  <Grid item xs={4}>
                                    <Field
                                      component={TextField}
                                      name={`options.${index}.label`}
                                      id={'label' + index}
                                      type="text"
                                      label="label"
                                      autoComplete="off"
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            </div>
                          ))
                        : ''}
                      <Tooltip
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title="Add Options"
                        aria-label="Add Options"
                        placement="bottom"
                      >
                        <IconButton
                          type="button"
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            arrayHelpers.push({ label: '', value: '' })
                          }
                        >
                          <AddIcon fontSize="large" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  );
                }}
              />
              <br />
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
                    <Button
                      type="submit"
                      variant="contained"
                      color={isEdit ? 'primary' : 'inherit'}
                    >
                      {isEdit ? 'Update' : 'Add Data'}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </>
    )
  );
}

export default Radio;
