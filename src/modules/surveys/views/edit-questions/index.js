import React, { useState, useEffect } from 'react';
import GenerateForm from '../Questions/GenerateForm';
import {
  Button,
  MenuItem,
  FormControl,
  makeStyles,
  Grid,
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  ListItem,
  ListItemText,
  IconButton
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Page from 'src/components/Page';
import UpdateQuestions from './update-questions';

const sampleInputData = [
  {
    label: 'Rating',
    questionName: 'rating',
    questionType: 'rating'
  },
  {
    additionalConfig: {
      rows: '3'
    },
    label: 'Textarea',
    questionName: 'textarea',
    questionType: 'textarea'
  }
];

const test = true;

const EditQuestions = () => {
  const [dummyData, setDummyData] = useState([
    {
      label: 'Rating',
      questionName: 'rating',
      questionType: 'rating'
    },
    {
      additionalConfig: {
        rows: '3'
      },
      label: 'Textarea',
      questionName: 'textarea',
      questionType: 'textarea'
    }
  ]);
  const [targetData, setTargetData] = useState([]);

  const handleEdit = data => {
    setTargetData([data]);
  };

  console.log('targetData : ', targetData);

  return (
    <div>
      <Page title="questions">
        <Box margin="1rem">
          <Grid container spacing={1}>
            <Grid xs={12} lg={6} item>
              <Card style={{ width: '100%' }}>
                <CardHeader title="Edit Survey" />
                <Divider />
                <CardContent>
                  {test ? (
                    <>
                      <GenerateForm inputs={dummyData} />
                    </>
                  ) : null}
                  {!!dummyData.length &&
                    dummyData.map((data, index) => (
                      <div>
                        <ListItem key={index} style={{ marginTop: '-1%' }}>
                          <IconButton
                            aria-label="edit"
                            color="primary"
                            onClick={() => {
                              handleEdit(data);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <ListItemText
                            primary={data.label}
                            style={{ marginLeft: '5%' }}
                          />
                        </ListItem>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} lg={6} item>
              <Card style={{ width: '100%' }}>
                <CardHeader title="Update" />
                <Divider />
                <CardContent>
                  {targetData && <UpdateQuestions updateData={targetData} />}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Page>
    </div>
  );
};

export default EditQuestions;
