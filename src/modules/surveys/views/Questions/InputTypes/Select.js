import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

const SelectInput = ({ submit }) => {
  const inputsData = {};

  const [initialValuesObj, setValues] = useState({
    name: '',
    label: ''
  });

  const [count, setCount] = useState(0);
  const [submitValues, setSubmitValues] = useState({});

  const addOptions = () => {
    return new Array(count).fill().map((_, val) => (
      <div key={val}>
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
                name={'value' + val}
                id={'value' + val}
                type="text"
                label="Option Value"
              />
            </Grid>
            <Grid item xs={5}>
              <Field
                component={TextField}
                name={'label' + val}
                id={'label' + val}
                type="text"
                label="label"
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    ));
  };

  useEffect(() => {
    if (submitValues.values) {
      let name = '';
      let label = '';
      let labelArr = [];
      let valueArr = [];
      let optionList = [];

      for (let data in submitValues.values) {
        if (data === 'name') {
          name = submitValues.values[data];
        }
        if (data === 'label') {
          label = submitValues.values[data];
        }
        if (data !== 'name' && data !== 'label') {
          if (data.slice(0, 1) === 'l') {
            labelArr.push(submitValues.values[data]);
          } else {
            valueArr.push(submitValues.values[data]);
          }
        }
      }

      for (let i = 0; i < labelArr.length; i++) {
        optionList.push({ label: labelArr[i], value: valueArr[i] });
      }
      if (name !== '' && label !== '') {
        inputsData.questionType = 'select';
        inputsData.questionName = name;
        inputsData.label = label;
        inputsData.options = optionList;
        submit(inputsData);
      }
    }
  }, [submitValues]);

  const handleOptions = () => {
    const obj = { ...initialValuesObj };
    obj['label' + count] = '';
    obj['value' + count] = '';
    setCount(count + 1);
    setValues(obj);
  };
  return (
    <>
      <Formik
        initialValues={initialValuesObj}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          // console.log(values);
          setSubmitValues({ values });
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
                    name="name"
                    id="name"
                    type="text"
                    label="Select Name"
                  />
                </Grid>
                <Grid item xs={5}>
                  <Field
                    component={TextField}
                    name="label"
                    id="label"
                    type="text"
                    label="Label"
                  />
                </Grid>
              </Grid>
            </Grid>
            {count > 0 ? addOptions() : null}
            <br />
            <Button
              type="button"
              variant="contained"
              color="primary"
              endIcon={<AddCircleRoundedIcon style={{ fontSize: 23 }} />}
              onClick={handleOptions}
            >
              Options
            </Button>
            {isSubmitting}
            <br />
            <br />
            <Button variant="contained" color="inherit" onClick={submitForm}>
              Add Data
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SelectInput;
