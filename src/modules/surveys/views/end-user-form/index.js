import React, { useState, useEffect } from 'react';
import Page from 'src/components/Page';
import {
  makeStyles,
  Box,
  Button,
  Typography,
  Divider,
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core';
import FormGenerate from './form-generate';

const useStyles = makeStyles(() => ({
  typography: {
    fontFamily: 'Raleway,Bell MT',
    fontSize: '40px'
  }
}));

const EndUserForm = ({ renderInputs }) => {
  const classes = useStyles();

  const demoData = [
    {
      questionName: 'rating',
      questionType: 'rating',
      label: 'How would you like to rate us ?'
    },
    {
      questionName: 'text',
      questionType: 'text',
      label: 'Name : '
    },
    {
      questionName: 'textarea',
      questionType: 'textarea',
      label: 'Address : ',
      additionalConfig: { rows: 5 }
    },
    {
      questionName: 'checkbox',
      questionType: 'checkbox',
      label: 'Hobbies : ',
      additionalConfig: { displayType: 'block' },
      options: [
        { label: 'Volleyball', value: 'vollyball' },
        { label: 'Reading Books', value: 'readingBooks' },
        { label: 'Singing', value: 'singing' }
      ]
    },
    {
      questionName: 'radio',
      questionType: 'radio',
      label: 'Gender : ',
      additionalConfig: { displayType: 'inline' },
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      questionName: 'select',
      questionType: 'select',
      label:
        'How was your experience while talking with out service care executive?',
      options: [
        { label: 'Poor', value: 'poor' },
        { label: 'Fine', value: 'fine' },
        { label: 'Great', value: 'great' }
      ]
    }
  ];

  const theme = createMuiTheme();

  /************************************************************************************************ */

  // return (
  //   <Page
  //     style={{
  //       margin: '0.5rem 20rem 1rem 20rem',
  //       backgroundColor: 'white',
  //       borderRadius: '1%'
  //     }}
  //   >
  //     <Typography variant="h3" style={{ margin: '0  35%', padding: '3% 0' }}>
  //       Feedback Form
  //     </Typography>
  //     <Divider style={{ margin: ' 0 10%' }} />
  //     <Box>
  //       <div style={{ margin: ' 0 20%' }}>
  //         <GenerateForm input={demoData} />
  //       </div>
  //     </Box>
  //     <Divider style={{ margin: ' 3% 10%' }} />
  //     <div style={{ margin: ' 0 15% 0 15%', paddingBottom: '3%' }}>
  //       <Button variant="contained" color="primary" style={{ width: '100%' }}>
  //         Submit
  //       </Button>
  //     </div>
  //   </Page>
  // );

  /************************************************************************************************ */

  // return (
  //   <div>
  //     <FormGenerate inputType={demoData} />
  //   </div>
  // );

  /************************************************************************************************ */

  return (
    <ThemeProvider theme={theme}>
      <Page
        style={{
          margin: '1vh 15vw 1vh 15vw',
          backgroundColor: 'white',
          borderRadius: '1%'
        }}
      >
        <Typography
          variant="h1"
          style={{ margin: '0  35%', padding: '2% 0' }}
          className={classes.typography}
        >
          Feedback Form
        </Typography>
        <Divider style={{ margin: ' 0 10%' }} />
        <Box>
          <div style={{ margin: ' 0 20%' }}>
            <FormGenerate inputType={demoData} />
          </div>
        </Box>
        <Divider style={{ margin: ' 3% 10%' }} />
        {/* <div style={{ margin: ' 0 20% 0 20%', paddingBottom: '3%' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: '100%' }}
          >
            <Typography variant="body1">Submit</Typography>
          </Button>
        </div> */}
      </Page>
    </ThemeProvider>
  );
};

/************************************************************************************************ */

export default EndUserForm;
