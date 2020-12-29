import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import {
  Button,
  RadioGroup,
  FormControlLabel,
  makeStyles,
  Radio,
  Typography,
  FormControl,
  MenuItem,
  Grid,
  Divider
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  formControl: {
    minWidth: 200
  },
  typography: {
    fontFamily: 'Raleway',
    margin: '1%'
  }
}));

const FormGenerate = ({ inputType }) => {
  console.log('inputType : ', inputType);
  const classes = useStyles();
  const [initState, setinitState] = useState(null);
  // useEffect(() => {
  //   inputType.forEach((input, index) => {
  //     switch (input.questionType) {
  //       case 'rating': {
  //        return setinitState({...initState,})
  //       }
  //       case 'text':{
  //         return ()
  //       }
  //       case 'text':{
  //         return ()
  //       }case 'text':{
  //         return ()
  //       }case 'text':{
  //         return ()
  //       }case 'text':{
  //         return ()
  //       }
  //      default:{
  //        return input.questionType
  //      }
  //     }
  //   });
  // }, []);
  const obj = {};
  const renderQuestion = isSubmitting => {
    if (inputType) {
      return inputType.map(question => {
        switch (question.questionType) {
          case 'rating':
            return (
              <span key={'rating' + question.questionName}>
                <Typography variant="h6" className={classes.typography}>
                  {question.label}
                </Typography>
                <Rating
                  name={question.questionName}
                  id="rating"
                  precision={0.5}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  size="large"
                />
              </span>
            );
          case 'text':
            return (
              <div key={'text' + question.questionName + '1'}>
                <Typography variant="h6" className={classes.typography}>
                  {question.label}
                </Typography>
                <Field
                  component={TextField}
                  color="primary"
                  name={question.questionName}
                  id={question.questionName}
                  type="text"
                  variant="outlined"
                  // required={true}
                  placeholder="This is text"
                  // label={question.label}
                  autoComplete="off"
                  style={{ width: '100%' }}
                />
                <br />
                <br />
              </div>
            );
          case 'textarea':
            return (
              <div key={'textarea' + question.questionName}>
                <Typography variant="h6" className={classes.typography}>
                  {question.label}
                </Typography>
                <Field
                  component={TextField}
                  color="primary"
                  name={question.questionName}
                  id={question.questionName}
                  type="text"
                  variant="outlined"
                  multiline
                  rows={question.additionalConfig.rows}
                  placeholder="This is textarea"
                  // label={question.label}
                  style={{ width: '100%' }}
                />
                <br />
                <br />
              </div>
            );
          case 'checkbox':
            return (
              <div key={'checkbox heading' + question.name}>
                <Typography variant="h6" className={classes.typography}>
                  {question.label}
                </Typography>
                {question.additionalConfig.displayType === 'inline' ? (
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    {question.options.map((option, index) => (
                      <Grid item key={'option' + option.value}>
                        <Field
                          component={CheckboxWithLabel}
                          type="checkbox"
                          name={option.value}
                          color="secondary"
                          Label={{ label: option.label }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    {question.options.map((option, index) => (
                      <Grid item key={'option' + option.value}>
                        <Field
                          component={CheckboxWithLabel}
                          type="checkbox"
                          name={option.value}
                          color="secondary"
                          Label={{ label: option.label }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </div>
            );
          case 'radio':
            return (
              <div key={'radio heading' + question.name}>
                <Typography variant="h6" className={classes.typography}>
                  {question.label}
                </Typography>
                {question.additionalConfig.displayType === 'inline' ? (
                  <Field
                    component={RadioGroup}
                    name={question.questionName}
                    key={'radio' + question.name}
                  >
                    <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-start"
                    >
                      {question.options.map((option, index) => (
                        <Grid item key={'option' + option.value}>
                          <FormControlLabel
                            value={option.value}
                            control={<Radio />}
                            label={option.label}
                            disabled={isSubmitting}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Field>
                ) : (
                  <Field
                    component={RadioGroup}
                    name={question.questionName}
                    key={'radio' + question.name}
                  >
                    {question.options.map((option, index) => (
                      <FormControlLabel
                        value={option.value}
                        control={<Radio disabled={isSubmitting} />}
                        label={option.label}
                        disabled={isSubmitting}
                      />
                    ))}
                  </Field>
                )}
              </div>
            );
          case 'select':
            return (
              <div key={'select heading' + question.name}>
                <Typography variant="h6" className={classes.typography}>
                  {question.label}
                </Typography>
                <FormControl
                  className={classes.formControl}
                  key={'select' + question.name}
                  style={{ width: '100%' }}
                >
                  <Field
                    component={TextField}
                    type="text"
                    name={question.questionName}
                    id={question.questionName}
                    select={true}
                    variant="outlined"
                    size="medium"
                  >
                    {question.options.map((option, index) => (
                      <MenuItem value={option.value}>{option.label}</MenuItem>
                    ))}
                  </Field>
                </FormControl>
                <br />
                <br />
              </div>
            );
          default:
            return null;
        }
      });
    }
  };
  return (
    <>
      <div key={inputType + inputType.length + 'generateForm'}>
        <Formik
          initialValues={{ gender: '' }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            console.log('values : ', values);
          }}
          key={inputType + inputType.questionName + 'formik'}
        >
          {({ values, submitForm, isSubmitting }) => (
            <Form>
              <br />
              {renderQuestion(isSubmitting)}
              {isSubmitting}
              <br />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                style={{ width: '100%' }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default FormGenerate;
