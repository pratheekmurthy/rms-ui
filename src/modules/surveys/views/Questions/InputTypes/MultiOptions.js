import {
  Button,
  Fade,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  MenuItem,
  FormControl,
  makeStyles
} from '@material-ui/core';
import { Field, FieldArray, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

const useStyles = makeStyles({
  formControl: {
    minWidth: 140
  }
});

function MultiOptions({ submit, isEdit, question, questionType }) {
  const classes = useStyles();
  const [inputsData, setInputsData] = useState(isEdit ? question : {});
  const [initState, setinitState] = useState(null);
  useEffect(() => {
    if (questionType === 'select') {
      if (isEdit) {
        setinitState({
          name: question.questionName,
          label: question.label,
          options: question.options
        });
      } else {
        setinitState({
          name: '',
          label: '',
          options: []
        });
      }
    } else {
      if (isEdit) {
        setinitState({
          name: question.questionName,
          label: question.label,
          displayType: question.additionalConfig.displayType,
          options: question.options
        });
      } else {
        setinitState({
          name: '',
          label: '',
          displayType: 'inline',
          options: []
        });
      }
    }
  }, []);

  const setFinalQuestionObj = values => {
    const localInputsData = { ...inputsData };
    localInputsData.questionType = questionType;
    localInputsData.questionName = values.name;
    localInputsData.label = values.label;
    localInputsData.questionType !== 'select' &&
      (localInputsData.additionalConfig = { displayType: values.displayType });
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
            console.log(values);
            if (values.options.length > 0) {
              setFinalQuestionObj(values);
              if (!isEdit) {
                resetForm();
              }
            } else {
              alert('Atleast one options required!');
            }
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Please provide an element name'),
            label: Yup.string().required('Question Label is required'),
            displayType: Yup.string()
              .oneOf(['inline', 'block'], 'Unknown item')
              .required('Required'),
            options: Yup.array().of(
              Yup.object().shape({
                label: Yup.string().required('Option Label is required'),
                value: Yup.string().required('Option Value is required')
              })
            )
          })}
        >
          {({ values }) => (
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
                      name="name"
                      id="name"
                      type="text"
                      label="Element Name"
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
                      label="Question Label"
                      autoComplete="off"
                    />
                  </Grid>
                  {questionType !== 'select' && (
                    <Grid item xs={4}>
                      <FormControl className={classes.formControl}>
                        <Field
                          component={TextField}
                          type="text"
                          name="displayType"
                          id="displayType"
                          select={true}
                          label="Display Type"
                          variant="outlined"
                          size="medium"
                        >
                          <MenuItem value="inline">Inline</MenuItem>
                          <MenuItem value="block">Block</MenuItem>
                        </Field>
                      </FormControl>
                    </Grid>
                  )}
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
                                  spacing={5}
                                >
                                  <Grid item xs={4}>
                                    <Field
                                      component={TextField}
                                      id={'value' + index}
                                      name={`options.${index}.value`}
                                      type="text"
                                      label="Option Value"
                                      autoComplete="off"
                                    />
                                  </Grid>
                                  <Grid item xs={5}>
                                    <Field
                                      component={TextField}
                                      name={`options.${index}.label`}
                                      id={'label' + index}
                                      type="text"
                                      label="Option Label"
                                      autoComplete="off"
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            </div>
                          ))
                        : ''}
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
                          spacing={6}
                        >
                          <Grid item xs={4} style={{ paddingLeft: '12.5%' }}>
                            <Tooltip
                              id="iconButton"
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
                          </Grid>
                          <Grid item xs={4} style={{ paddingLeft: '5%' }}>
                            <Button
                              type="submit"
                              variant="contained"
                              color={isEdit ? 'primary' : 'inherit'}
                              size="small"
                              style={{ paddingRight: '-15%' }}
                            >
                              <Typography variant="button">
                                {isEdit ? 'Update' : 'Add Question'}
                              </Typography>
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  );
                }}
              />
            </Form>
          )}
        </Formik>
      </>
    )
  );
}

export default MultiOptions;
