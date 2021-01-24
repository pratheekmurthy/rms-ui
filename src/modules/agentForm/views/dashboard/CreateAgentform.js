import { Field, Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { TextField, RadioGroup } from 'formik-material-ui';
import { useEffect } from 'react';
import {
  UPDATE_CALL_STATUS,
  UPDATE_CURRENT_STATUS,
} from 'src/modules/dashboard-360/utils/endpoints';
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
  Radio
} from '@material-ui/core';
import * as yup from 'yup';
// import config from '../../../ticketing/views/config.json';g
import { Autocomplete } from '@material-ui/lab';
// import { AlternateEmailTwoTone } from '@material-ui/icons';
const useStyle = makeStyles(() => ({
  fieldContainer: {
    width: '100%'
  }
}));
export default function DispositionForm(props) {
  const config="http://192.168.3.45:8083/"
  const [initialValue] = useState({
     
    AgentName: '',
    AgentEmail: '',
    Agentcontact: '',
    location: '',
    enable: false
  });
  const classes = useStyle();
  const formRef = useRef({});
  const agentServiceURL = 'http://localhost:42004/';
  const AgentType =[
    {
      id:'1', value:'L1',
    },
    {
      id:'2', value:'L2',
    },
   
  ]
  
  function updateCallData(uniqueid, dispostionData) {
    const axios = require('axios');
    let data = JSON.stringify(dispostionData);
    console.log('updateCAllData', data, uniqueid)

    let config = {
      method: 'post',

      url:'http://localhost:42004'+ UPDATE_CALL_STATUS + uniqueid,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(response => {
        console.log('dispostionForm', JSON.stringify(response.data));
        props.getALF();
      })
      .catch(error => {
        console.log('dispostionFrom', error);
      });
  }

  function updateAgentCallStatus(updateData) {
    var axios = require('axios');
    var data = {
      agentCallStatus: updateData.callStatus,
      agentCallEvent: updateData.callEvent,
      agentCallUniqueId: updateData.callUniqueId,
      agentCallType: updateData.callType,
      agentCallDispositionStatus: updateData.callDispositionStatus,
      callerNumber: updateData.callerNumber
    };
    var config = {

      method: 'put',
      url: 'https://localhost:42004'+UPDATE_CURRENT_STATUS + updateData.callStatusId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log("update", JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function handleSubmit(e) {
    console.log('formRef', formRef.current.values);
   
 
   

  }
  const [autoCompleteKey, setAutoCompleteKey] = useState(0);
  return (
    <Formik
      validateOnBlur={false}
      initialValues={initialValue}
      disform={initialValue}
      onSubmit={(e, { validate }) => {
        handleSubmit(e);
        validate(e);
      }}
      innerRef={formRef}
      validationSchema={yup.object({
        AgentType: yup
        .object()
        .required('Please select a Agent Type')
        .typeError('Please select a valid Agent Type'),
        AgentName: yup.string().required('Please Enter Agent Name'),
        AgentEmail: yup.string().required('Please Enter Agent Email'),
        Agentcontact: yup.string().required('Please Enter Agent Contact Number'),
        location: yup.string().required('Please Enter Location'),
      })}
    >
      {({ setFieldValue }) => (
        <Form>
          <Grid container spacing={2} direction="column">
          <Grid item>
              <Field
                className={classes.fieldContainer}
                name="AgentName"
                component={TextField}
                variant="outlined"
                multiline
                
                label="Agent Name"
              />
              </Grid>
               <Grid item>
               <Field
                className={classes.fieldContainer}
                name="AgentEmail"
                component={TextField}
                variant="outlined"
                multiline
                
                label="Agent Email"
              />
            </Grid>
            <Grid item>
               <Field
                className={classes.fieldContainer}
                name="Agentcontact"
                component={TextField}
                variant="outlined"
                multiline
                
                label="Agent Contact Number"
              />
            </Grid>
            <Grid item>
               <Field
                className={classes.fieldContainer}
                name="location"
                component={TextField}
                variant="outlined"
                multiline
                
                label="Location"
              />
            </Grid>
            <Grid item >
            <FormControl
                  variant="outlined"
                  className={classes.fieldContainer}
                >
              

                  <Autocomplete
                    options={AgentType}
                    getOptionLabel={option => option.value}
                    // style={{ width: 400, overflow: "hidden" }}
                    getOptionSelected={(option, value) =>
                      value.id === option.id
                    }
                    key={autoCompleteKey}
                    onChange={(event, value) => {
                      setFieldValue('AgentType', value);
                    
                    }}
                    renderInput={params => (
                      <Field
                        component={TextField}
                        {...params}
                        label="Select Agent Type"
                        variant="outlined"
                        name="AgentType"
                      />
                    )}
                    name="AgentType"
                  />
                </FormControl>

            </Grid>
          </Grid>
          <br />

          <Button color="primary" variant="contained" disabled={localStorage.getItem('callStatus') === 'connected' ? true : false} onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
