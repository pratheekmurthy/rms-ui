import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import Page from 'src/components/Page';
import * as yup from 'yup';
import { TextField } from 'formik-material-ui';

export default function CreateSurvey() {
  const [questions, setQuestions] = useState({ chooseQuestion: '' });

  function addQuestionEvent(e) {
    console.log(e);
  }
  return (
    <Page title="Create Survey">
      <Box margin="1rem">
        <Grid container spacing={4}>
          <Grid xs={12} lg={5} item>
            <Card style={{ width: '100%' }}>
              <CardHeader title="Create a survey" />
              <CardContent>
                <Formik
                  initialValues={questions}
                  onSubmit={(...e) => addQuestionEvent(e)}
                  validationSchema={yup.object({
                    chooseQuestion: yup
                      .object()
                      .required('Please select a question')
                      .typeError('Please select a valid question')
                  })}
                >
                  {({ setFieldValue }) => (
                    <Form>
                      <Autocomplete
                        options={[{ title: 'a' }]}
                        getOptionLabel={option => option.title}
                        style={{ width: 300 }}
                        getOptionSelected={(option, value) =>
                          value.title === option.title
                        }
                        onChange={(event, value) =>
                          setFieldValue('chooseQuestion', value)
                        }
                        renderInput={params => (
                          <Field
                            component={TextField}
                            {...params}
                            label="Choose a question"
                            variant="outlined"
                            name="chooseQuestion"
                          />
                        )}
                        name="chooseQuestion"
                      />
                      <br />
                      <Button color="primary" variant="contained" type="submit">
                        Add Question
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
}
