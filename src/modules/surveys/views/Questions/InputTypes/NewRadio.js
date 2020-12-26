import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Grid, Fade, IconButton, Tooltip } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import AddIcon from '@material-ui/icons/Add';

const RadioInput = ({ submit, isEdit, question }) => {
  const [inputsData, setInputsData] = useState(isEdit ? question : {});
  const [initState, setinitState] = useState(null);
  const [options, setOptions] = useState([]);
  const [validationSchema, setValidationSchema] = useState(null);
  useEffect(() => {
    if (isEdit) {
      setinitState({
        name: question.questionName,
        label: question.label
      });
      setOptions(question.options);
    } else {
      setinitState({
        name: '',
        label: ''
      });
    }
  }, []);

  const addOptions = () => {
    const optionsArrayCopy = [...options];
    optionsArrayCopy.push({
      value: '',
      label: ''
    });
    setOptions(optionsArrayCopy);
    validateForm();
  };
  const validateForm = () => {
    const initialValidation = {
      name: Yup.string()
        .strict(true)
        .required('Please enter name'),
      label: Yup.string()
        .strict(true)
        .required('Label required')
    };
    options.forEach((option, index) => {
      initialValidation['value' + index] = Yup.string()
        .strict(true)
        .required('Please enter value');
      initialValidation['label' + index] = Yup.string()
        .strict(true)
        .required('Please enter label');
    });
    console.log(Yup.object(initialValidation));
    setValidationSchema(Yup.object(initialValidation));
    return Yup.object(initialValidation);
  };

  const setOptionsArray = (index, type, value) => {
    const localOptions = [...options];
    if (!localOptions[index]) {
      localOptions[index] = {};
    }
    localOptions[index][type] = value;
    validateForm();
    setOptions(localOptions);
  };

  useEffect(() => {
    console.log('options : ', options);
    let localInputsData = { ...inputsData };
    localInputsData.options = options;
    setInputsData(localInputsData);
  }, [options]);

  const setFinalQuestionObj = values => {
    let localInputsData = { ...inputsData };
    localInputsData.questionType = 'radio';
    localInputsData.questionName = values.name;
    localInputsData.label = values.label;
    localInputsData.options = options;
    setInputsData(localInputsData);
    console.log(localInputsData);
    submit(localInputsData);
  };

  return (
    !!initState && (
      <>
        <Formik
          initialValues={initState}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log('Values : ', values);
            setSubmitting(false);
            setFinalQuestionObj(values);
            if (!isEdit) {
              setOptions([]);
              resetForm();
            }
          }}
          validationSchema={validationSchema}
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
              {options.map((option, index) => (
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
                          name={'value' + index}
                          id={'value' + index}
                          onBlur={e =>
                            setOptionsArray(index, 'value', e.target.value)
                          }
                          type="text"
                          label="Radio Value"
                          autoComplete="off"
                          defaultValue={isEdit ? options[index].value : null}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Field
                          component={TextField}
                          name={'label' + index}
                          id={'label' + index}
                          onBlur={e =>
                            setOptionsArray(index, 'label', e.target.value)
                          }
                          type="text"
                          label="label"
                          autoComplete="off"
                          defaultValue={isEdit ? options[index].label : null}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              ))}
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
                  <Grid item xs={5}>
                    <Tooltip
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                      title="Add Options"
                      aria-label="Add Options"
                      placement="bottom"
                      style={{ marginLeft: '25%', marginTop: '-5%' }}
                    >
                      <IconButton
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={addOptions}
                        disabled={isEdit}
                      >
                        <AddIcon fontSize="large" />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={4}>
                    {isSubmitting}

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
};

export default RadioInput;
