import React from 'react';
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
  Grid
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  formControl: {
    minWidth: 200
  }
}));

const GenerateForm = ({ input }) => {
  const classes = useStyles();
  const obj = {};
  const renderQuestion = isSubmitting => {
    if (input) {
      return input.map(question => {
        switch (question.questionType) {
          case 'rating':
            return (
              <span key={'rating' + question.questionName}>
                <Typography component="legend">{question.label}</Typography>
                <Rating
                  name={question.questionName}
                  id="rating"
                  precision={0.5}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                />
              </span>
            );
          case 'text':
            return (
              <div key={'text' + question.questionName + '1'}>
                <Field
                  component={TextField}
                  color="primary"
                  name={question.questionName}
                  id={question.questionName}
                  type="text"
                  label={question.label}
                  autoComplete="off"
                />
                <br />
                <br />
              </div>
            );
          case 'textarea':
            return (
              <div key={'textarea' + question.questionName}>
                <Field
                  component={TextField}
                  color="primary"
                  name={question.questionName}
                  id={question.questionName}
                  type="text"
                  variant="outlined"
                  multiline
                  rows={question.additionalConfig.rows}
                  label={question.label}
                  style={{ width: '100%' }}
                />
                <br />
                <br />
              </div>
            );
          case 'checkbox':
            return (
              <div key={'checkbox' + question.name}>
                <Typography>{question.label}</Typography>
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
                          color="primary"
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
                          color="primary"
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
              <div key={'radio' + question.name}>
                {question.additionalConfig.displayType === 'inline' ? (
                  <Field
                    component={RadioGroup}
                    name={question.questionName}
                    key={'radio' + question.name}
                  >
                    <Typography>{question.label}</Typography>
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
                            control={<Radio disabled={isSubmitting} />}
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
                    <Typography>{question.label}</Typography>
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
              <div key={'select' + question.name}>
                <Typography>{question.label}</Typography>
                <FormControl
                  className={classes.formControl}
                  key={'select' + question.name}
                >
                  <Field
                    component={TextField}
                    type="text"
                    name={question.questionName}
                    id={question.questionName}
                    select={true}
                    placeholder="Select"
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
      <div key={input + input.length + 'generateForm'}>
        <Formik
          initialValues={obj}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
          }}
          key={input + input.questionName + 'formik'}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <br />
              {renderQuestion(isSubmitting)}

              {isSubmitting}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ display: 'none' }}
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

export default GenerateForm;
