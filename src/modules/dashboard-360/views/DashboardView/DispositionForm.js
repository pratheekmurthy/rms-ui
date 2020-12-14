import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { TextField, RadioGroup, Select } from 'formik-material-ui';
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  makeStyles,
  Radio
} from '@material-ui/core';
const useStyle = makeStyles(() => ({
  fieldContainer: {
    minWidth: 300
  }
}));
export default function DispositionForm() {
  const [initialValue] = useState({
    category: '',
    subcategory: '',
    comments: '',
    type: '',
    solution: ''
  });
  const classes = useStyle();
  return (
    <Formik initialValues={initialValue}>
      {() => (
        <Form>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <FormControl
                variant="outlined"
                className={classes.fieldContainer}
              >
                <InputLabel htmlFor="category-box" id="category-label">
                  Select a Category
                </InputLabel>

                <Field
                  className={classes.fieldContainer}
                  name="category"
                  type="select"
                  component={Select}
                  inputProps={{
                    id: 'category-box',
                    labelId: 'category-label'
                  }}
                  label="Select a category"
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl
                variant="outlined"
                className={classes.fieldContainer}
              >
                <InputLabel htmlFor="sub-category-box" id="sub-category-label">
                  Select Sub Category
                </InputLabel>

                <Field
                  className={classes.fieldContainer}
                  name="subcategory"
                  type="select"
                  component={Select}
                  inputProps={{
                    id: 'sub-category-box',
                    labelId: 'sub-category-label'
                  }}
                  label="Select Sub Category"
                />
              </FormControl>
            </Grid>
            <Grid item>
              <Field
                className={classes.fieldContainer}
                name="solution"
                component={TextField}
                inputProps={{
                  label: 'Select provided solution'
                }}
                variant="outlined"
                label="Select provided solution"
              />
            </Grid>
            <Grid item>
              <Field
                className={classes.fieldContainer}
                name="comments"
                component={TextField}
                variant="outlined"
                multiline
                rows={3}
                label="Comments"
              />
            </Grid>
            <Grid item>
              <Field component={RadioGroup} name="type">
                <FormControlLabel
                  value="painting"
                  control={<Radio />}
                  label="Raised Issue"
                />
                <FormControlLabel
                  value="drawing"
                  control={<Radio />}
                  label="Provided Details"
                />
                <FormControlLabel
                  value="closes"
                  control={<Radio />}
                  label="Closed"
                />
              </Field>
            </Grid>
          </Grid>
          <br />
          <Button color="primary" variant="contained">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
