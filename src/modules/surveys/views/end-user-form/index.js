import React from 'react';
import GenerateForm from '../Questions/GenerateForm';
import Page from 'src/components/Page';
import {
  makeStyles,
  ButtonGroup,
  Box,
  Button,
  Typography,
  Divider
} from '@material-ui/core';

const EndUserForm = () => {
  const demoData = [
    {
      questionName: 'rating',
      questionType: 'rating',
      label: 'Rating'
    },
    {
      questionName: 'text',
      questionType: 'text',
      label: 'Text'
    },
    {
      questionName: 'textarea',
      questionType: 'textarea',
      label: 'textarea',
      additionalConfig: { rows: 5 }
    },
    {
      questionName: 'checkbox',
      questionType: 'checkbox',
      label: 'Checkbox',
      additionalConfig: { displayType: 'inline' },
      options: [
        { label: 'label1', value: 'value1' },
        { label: 'label2', value: 'value2' },
        { label: 'label3', value: 'value3' }
      ]
    },
    {
      questionName: 'radio',
      questionType: 'radio',
      label: 'Radio',
      additionalConfig: { displayType: 'inline' },
      options: [
        { label: 'label1', value: 'value1' },
        { label: 'label2', value: 'value2' },
        { label: 'label3', value: 'value3' }
      ]
    },
    {
      questionName: 'select',
      questionType: 'select',
      label:
        'How was your experience while talking with out service care executive?',
      options: [
        { label: 'label1', value: 'value1' },
        { label: 'label2', value: 'value2' },
        { label: 'label3', value: 'value3' }
      ]
    }
  ];
  return (
    <Page
      style={{
        margin: '0.5rem 20rem 1rem 20rem',
        backgroundColor: 'white',
        borderRadius: '1%'
      }}
    >
      <Typography variant="h3" style={{ margin: '0  35%', padding: '3% 0' }}>
        Feedback Form
      </Typography>
      <Divider style={{ margin: ' 0 10%' }} />
      <Box>
        <div style={{ margin: ' 0 20%' }}>
          <GenerateForm input={demoData} />
        </div>
      </Box>
      <Divider style={{ margin: ' 3% 10%' }} />
      <div style={{ margin: ' 0 15% 0 15%', paddingBottom: '3%' }}>
        <Button variant="contained" color="primary" style={{ width: '100%' }}>
          Submit
        </Button>
      </div>
    </Page>
  );
};

export default EndUserForm;
