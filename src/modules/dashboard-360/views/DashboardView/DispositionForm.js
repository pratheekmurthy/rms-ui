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
    tickettype: '',
    category: '',
    subcategory: '',
    comments: '',
    type: '',
    subcategoryitem: '',
    enable: false,
    issuetype: '',
    devicetype: '',
    connectivitytype: '',
    speedtype: '',
    ostype: '',
    solution: '',
    issuedescription:'',
    CallerName:'',
    callerapplication:'',
    
    status:''
  });
  const devicetype =[
    {
      id:'1', value:'Mobile',
    },
    {
      id:'2', value:'Laptop/ Desktop',
    }
  ]
    
  const ostype =[
    {
      id:'1', value:'Android',
    },
    {
      id:'2', value:'Win-7 / 8/10 '
    },
    {
      id:'3', value:'MAC / Linux,'
    }
  ]
  const connectivitytype =[
    {
      id:'1', value:'Hotspot',
    },
    {
      id:'2', value:'DataCard',
    },
    {
      id:'3', value:'Broadband',
    }
  ]
  const issuetype =[
   
  ]
  const speedtype =[
    {
      id:'1', value:'Less than 2 MBPS',
    },
    {
      id:'2', value:'More than 2 MBPS',
    }
  ]
  const classes = useStyle();
  const formRef = useRef({});
  const agentServiceURL = 'http://localhost:42004/';
  const [category, setCategory] = useState({
    value: '',
    label: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketType, setTicketType] = useState({
    ticketTypeId: '',
    ticketType: ''
  });
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState({
    value: '',
    label: ''
  });
  const [subCategoryItems, setSubCategoryItems] = useState([]);
  const [subCategoryItem, setSubCategoryItem] = useState({
    value: '',
    label: ''
  });
  const url ="http://192.168.3.45:5001"
  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(url + '/level1');
      const body = await response.json();

      if (!unmounted) {
        body.data[0]
          ? setCategory({
            label: body.data[0].category,
            value: body.data[0]._id
          })
          : setCategory({});

        setCategories(
          body.data.map(({ _id, category }) => ({
            label: category,
            value: _id
          }))
        );
        setLoading(false);
      }
    }
    getItems();

    return () => {
      unmounted = true;
    };
  }, []);
  
  const getSubCategories = cat => {

    let unmounted = false;
    async function getItems() {
      const response = await fetch(
        url + '/level2/' + cat.value
      );
      const body = await response.json();
      console.log("bosy",body)
      if (!unmounted) {
        setSubCategories(
          body.data.map(({ _id, subCategory }) => ({
            label: subCategory,
            value: _id
          }))
        );

        body.data[0]
          ? setSubCategory({
            label: body.data[0].subCategory,
            value: body.data[0]._id
          })
          : setSubCategory({});

        setLoading(false);
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  };
  const getSubCategoryItems = (cat, sct) => {
    let unmounted = false;
    async function getItems() {
      //  alert(JSON.stringify(cat))
      const response = await fetch(
        url+ '/level3/' + cat + '/' + sct.value
      );
      const body = await response.json();

      if (!unmounted) {
        setSubCategoryItems(
          body.data.map(({ _id, subCategoryItem }) => ({
            label: subCategoryItem,
            value: _id
          }))
        );

        setLoading(false);

        body.data[0]
          ? setSubCategoryItem({
            label: body.data[0].subCategoryItem,
            value: body.data[0]._id
          })
          : setSubCategoryItem({});
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  };
  function updateCallData(uniqueid, dispostionData) {
    const axios = require('axios');
    let data = JSON.stringify(dispostionData);
    console.log('updateCAllData', data, uniqueid)

    let config = {
      method: 'post',

      url:UPDATE_CALL_STATUS + uniqueid,
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
      url: UPDATE_CURRENT_STATUS + updateData.callStatusId,
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
    console.log('dispostion', {
      tickettype: formRef.current.values.tickettype.label,
      category: formRef.current.values.category.label,
      subcategory: formRef.current.values.subcategory.label,
      subcategoryitem: formRef.current.values.subcategoryitem.label,
      comments: formRef.current.values.comments,
      type: formRef.current.values.type
    });
    // props.setdisForm(formRef.current.values);
    localStorage.setItem('callDispositionStatus', 'Disposed');
    props.removeFromQueue(props.AgentSipId, '5000');
    props.addToQueue(props.agentSipID, '5000');
    // props.setCurrentCallDetails(localStorage.getItem("callUniqueId"), localStorage.getItem("callType"), localStorage.getItem("callStatus"), localStorage.getItem("callEvent"), localStorage.getItem("callDispositionStatus"))
    props.setCurrentCallDetails(
      localStorage.getItem('callStatusId'),
      localStorage.getItem('callUniqueId'),
      localStorage.getItem('callType'),
      localStorage.getItem('callStatus'),
      localStorage.getItem('callEvent'),
      localStorage.getItem('callDispositionStatus'),
      localStorage.getItem('callerNumber'),
      localStorage.getItem('breakStatus')
    );
    updateAgentCallStatus({
      callStatusId: localStorage.getItem('callStatusId'),
      callUniqueId: localStorage.getItem('callUniqueId'),
      callType: localStorage.getItem('callType'),
      callStatus: localStorage.getItem('callStatus'),
      callEvent: localStorage.getItem('callEvent'),
      callDispositionStatus: localStorage.getItem('callDispositionStatus'),
      callerNumber: localStorage.getItem('callerNumber')
    })
    updateCallData(localStorage.getItem('callUniqueId'), {
      tickettype: formRef.current.values.tickettype.label,
      category: formRef.current.values.category.label,
      subcategory: formRef.current.values.subcategory.label,
      subcategoryitem: formRef.current.values.subcategoryitem.label,
      comments: formRef.current.values.comments,
      type: formRef.current.values.type,
      distributerID: localStorage.getItem('distributer_id')

    })


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
        tickettype: yup
          .object()
          .required('Please select a Type')
          .typeError('Please select a valid Type'),
        category: yup
          .object()
          .required('Please select a  category')
          .typeError('Please select a valid  category'),
        subcategory: yup
          .object()
          .required('Please select a  subcategory')
          .typeError('Please select a valid  subcategory'),
        subcategoryitem: yup
          .object()
          .required('Please select a  subcategoryitem')
          .typeError('Please select a valid  subcategoryitem'),
        comments: yup.string().required('Please Enter Comments'),
        type: yup.string().required('Please Enter type'),
        issuetype: yup
        .object()
        .required('Please select a Issue Type')
        .typeError('Please select a valid Issue Type'),
      devicetype: yup
        .object()
        .required('Please select a  Device Type')
        .typeError('Please select a valid  Device Type'),
      ostype: yup
        .object()
        .required('Please select a OS Type ')
        .typeError('Please select a valid  OS Type'),
      connectivitytype: yup
        .object()
        .required('Please select a  Internet Connectivity Type')
        .typeError('Please select a valid  Internet Connectivity Type'),
      speedtype: yup
        .object()
        .required('Please select a Internet Speed ')
        .typeError('Please select a valid  Internet Speed'),
        CallerName: yup.string().required('Please Enter Caller Name'),
        callerapplication: yup.string().required('Please Enter Caller Application'),
        issuedescription: yup.string().required('Please Enter Issue Description'),
  solution: yup.string().required('Please Enter Response /Solution Provided')
      })}
    >
      {({ setFieldValue }) => (
        <Form>
          <Grid container spacing={2} direction="row">
          <Grid item xs={4} sm={4}>
              <Field
                className={classes.fieldContainer}
                name="CallerName"
                component={TextField}
                variant="outlined"
                multiline
                
                label="Caller Name"
              />
              </Grid>
               <Grid item xs={4} sm={4}>
               <Field
                className={classes.fieldContainer}
                name="callerapplication"
                component={TextField}
                variant="outlined"
                multiline
                
                label="Caller Application"
              />
            </Grid>

          

           <Grid item xs={4} sm={4}>
              <FormControl
                variant="outlined"
                className={classes.fieldContainer}
              >
               

                <Autocomplete
                  options={categories}
                  getOptionLabel={option => option.label}
                  // style={{ width: 400, overflow: "hidden" }}
                  getOptionSelected={(option, value) =>
                    value.label === option.label
                  }
                  key={autoCompleteKey}
                  onChange={(event, value) => {
                    setFieldValue('category', value);

                    props.setCategory(value);

                    getSubCategories(value);
                  }}
                  renderInput={params => (
                    <Field
                      component={TextField}
                      {...params}
                      label="Select a Issue Type"
                      variant="outlined"
                      name="category"
                    />
                  )}
                  name="category"
                />
              </FormControl>
            </Grid>
            { subCategories.length> 0 ? (
              <Grid item xs={4} sm={4}>
             

                <Autocomplete
                  options={subCategories}
                  getOptionLabel={option => option.label}
                  // style={{ width: 400, overflow: "hidden" }}
                  getOptionSelected={(option, value) => value.id === option.id}
                  key={autoCompleteKey}
                  onChange={(event, value) => {
                    setFieldValue('subcategory', value);
                    props.setSubCategory(value);
                    getSubCategoryItems(
                      formRef.current.values.category.value,
                      value
                    );
                  }}
                  renderInput={params => (
                    <Field
                      component={TextField}
                      {...params}
                      label="Select a Type1"
                      variant="outlined"
                      name="subcategory"
                    />
                  )}
                  name="subcategory"
                />
              </Grid>
            ) : (
                <></>
              )}
            {subCategoryItems.length > 0 ? (
              <Grid item xs={4} sm={4}>
                <FormControl
                  variant="outlined"
                  className={classes.fieldContainer}
                >
              

                  <Autocomplete
                    options={subCategoryItems}
                    getOptionLabel={option => option.label}
                    // style={{ width: 400, overflow: "hidden" }}
                    getOptionSelected={(option, value) =>
                      value.id === option.id
                    }
                    key={autoCompleteKey}
                    onChange={(event, value) => {
                      setFieldValue('subcategoryitem', value);
                      props.setSubCategoryItem(value);
                    }}
                    renderInput={params => (
                      <Field
                        component={TextField}
                        {...params}
                        label="Select a Type2"
                        variant="outlined"
                        name="subcategoryitem"
                      />
                    )}
                    name="subcategoryitem"
                  />
                </FormControl>
              </Grid>
            ) : (
                <></>
              )}
           <Grid item xs={4} sm={4}>
             

             <Autocomplete
               options={devicetype}
               getOptionLabel={option => option.value}
               // style={{ width: 400, overflow: "hidden" }}
               getOptionSelected={(option, value) => value.id === option.id}
               key={autoCompleteKey}
               onChange={(event, value) => {
                 setFieldValue('devicetype', value);
                //  props.setSubCategory(value);
                //  getSubCategoryItems(
                //    formRef.current.values.category.value,
                //    value
                //  );
               }}
               renderInput={params => (
                 <Field
                   component={TextField}
                   {...params}
                   label="Select a Device Type"
                   variant="outlined"
                   name="devicetype"
                 />
               )}
               name="devicetype"
             />
           </Grid>


           <Grid item xs={4} sm={4}>
             

             <Autocomplete
               options={ostype}
               getOptionLabel={option => option.value}
               // style={{ width: 400, overflow: "hidden" }}
               getOptionSelected={(option, value) => value.id === option.id}
               key={autoCompleteKey}
               onChange={(event, value) => {
                 setFieldValue('ostype', value);
                 
               }}
               renderInput={params => (
                 <Field
                   component={TextField}
                   {...params}
                   label="Select a OS Type"
                   variant="outlined"
                   name="ostype"
                 />
               )}
               name="ostype"
             />
           </Grid>

           <Grid item xs={4} sm={4}>
             

             <Autocomplete
               options={connectivitytype}
               getOptionLabel={option => option.value}
               // style={{ width: 400, overflow: "hidden" }}
               getOptionSelected={(option, value) => value.id === option.id}
               key={autoCompleteKey}
               onChange={(event, value) => {
                 setFieldValue('connectivitytype', value);
                 
               }}
               renderInput={params => (
                 <Field
                   component={TextField}
                   {...params}
                   label="Select a Internet Connectivity Type"
                   variant="outlined"
                   name="connectivitytype"
                 />
               )}
               name="connectivitytype"
             />
           </Grid>

           <Grid item xs={4} sm={4}>
             

             <Autocomplete
               options={speedtype}
               getOptionLabel={option => option.value}
               // style={{ width: 400, overflow: "hidden" }}
               getOptionSelected={(option, value) => value.id === option.id}
               key={autoCompleteKey}
               onChange={(event, value) => {
                 setFieldValue('speedtype', value);
                
               }}
               renderInput={params => (
                 <Field
                   component={TextField}
                   {...params}
                   label="Select a Internet Speed"
                   variant="outlined"
                   name="speedtype"
                 />
               )}
               name="speedtype"
             />
           </Grid>

           <Grid item xs={4} sm={4}>
               <Field
                className={classes.fieldContainer}
                name="issuedescription"
                component={TextField}
                variant="outlined"
                multiline
                rows={2}
                label="Issue Description"
              />
            </Grid>
            <Grid item xs={4} sm={4}>
               <Field
                className={classes.fieldContainer}
                name="solution"
                component={TextField}
                variant="outlined"
                multiline
                rows={2}
                label="Response /Solution Provided"
              />
            </Grid>
          
            <Grid item xs={4} sm={4}>
              <Field
                className={classes.fieldContainer}
                name="comments"
                component={TextField}
                variant="outlined"
                multiline
                rows={2}
                label="Comments"
              />
            </Grid>
            {/* {formRef.current.values.type.label === 'Open' ? (<Grid item>
            <FormControl
                  variant="outlined"
                  className={classes.fieldContainer}
                >
              

                  <Autocomplete
                    options={subCategoryItems}
                    getOptionLabel={option => option.label}
                    // style={{ width: 400, overflow: "hidden" }}
                    getOptionSelected={(option, value) =>
                      value.id === option.id
                    }
                    key={autoCompleteKey}
                    onChange={(event, value) => {
                      setFieldValue('subcategoryitem', value);
                      props.setSubCategoryItem(value);
                    }}
                    renderInput={params => (
                      <Field
                        component={TextField}
                        {...params}
                        label="Select a L1"
                        variant="outlined"
                        name="L1"
                      />
                    )}
                    name="L1"
                  />
                </FormControl>

            </Grid>):(<></>)
} */}
            <Grid item>
             
              <Field component={RadioGroup} name="type" row>
                {/* <FormControlLabel value="FCR" control={<Radio />} label="FCR" /> */}
                <FormControlLabel
                  value="open"
                  control={<Radio />}
                  label="Open"
                />
                <FormControlLabel
                  value="closed"
                  control={<Radio />}
                  label="Closed"
                />
                 <FormControlLabel
                  value="transfercall"
                  control={<Radio />}
                  label="Transfer Call"
                />
              </Field>
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
