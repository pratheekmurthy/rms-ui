import { Field, Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { TextField, RadioGroup, Select } from 'formik-material-ui';
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Hidden,
  InputLabel,
  makeStyles,
  Radio
} from '@material-ui/core';
import * as yup from 'yup';
import { Autocomplete } from '@material-ui/lab';
const useStyle = makeStyles(() => ({
  fieldContainer: {
    width: '100%'
  }
}));
export default function DispositionForm(props) {
  const [initialValue] = useState({
    category: '',
    subcategory: '',
    comments: '',
    type: '',
    solution: ''
  });
  const classes = useStyle();
  const formRef = useRef({});
  const agentServiceURL = 'http://192.168.3.45:42004/'

  function updateCallData(uniqueid, dispostionData) {
    const axios = require('axios');
    let data = JSON.stringify(dispostionData);

    let config = {
      method: 'post',
      url: agentServiceURL + 'crm/interactions/' + uniqueid,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then((response) => {
        console.log("dispostionForm", JSON.stringify(response.data));
        props.getALF()
      })
      .catch((error) => {
        console.log("dispostionFrom", error);
      });

  }
  function handleSubmit(e) {
    console.log("formRef", formRef.current.values)
    console.log("dispostion", {
      category: formRef.current.values.category.label,
      subcategory: formRef.current.values.subcategory.label,
      solution: formRef.current.values.solution.label,
      comments: formRef.current.values.comments,
      type: formRef.current.values.type
    })
    localStorage.setItem("callDispositionStatus", "Disposed")
    props.removeFromQueue(props.AgentSipId, "9002")
    props.addToQueue(props.agentSipID, "9002")
    // props.setCurrentCallDetails(localStorage.getItem("callUniqueId"), localStorage.getItem("callType"), localStorage.getItem("callStatus"), localStorage.getItem("callEvent"), localStorage.getItem("callDispositionStatus"))
    props.setCurrentCallDetails(localStorage.getItem("callStatusId"), localStorage.getItem("callUniqueId"), localStorage.getItem("callType"), localStorage.getItem("callStatus"), localStorage.getItem("callEvent"), localStorage.getItem("callDispositionStatus"), localStorage.getItem("callerNumber"))
    updateCallData(localStorage.getItem("callUniqueId"), {

      category: formRef.current.values.category.label,
      subcategory: formRef.current.values.subcategory.label,
      solution: formRef.current.values.solution.label,
      comments: formRef.current.values.comments,
      type: formRef.current.values.type

    })
  }
  const [autoCompleteKey, setAutoCompleteKey] = useState(0);
  return (
    <Formik initialValues={initialValue}
      onSubmit={e => handleSubmit(e)}
      innerRef={formRef}
      validationSchema={yup.object({
        category: yup
          .object()
          .required('Please select a Type')
          .typeError('Please select a valid Type'),
        subcategory: yup
          .object()
          .required('Please select a  category')
          .typeError('Please select a valid  category'),
        comments: yup
          .string()
          .required('Please Enter Comments'),
        type: yup
          .string()
          .required('Please Enter type'),
        solution: yup
          .object()
          .required('Please select a sub category')
          .typeError('Please select a sub category')
      })}
    >
      {({ setFieldValue }) => (
        <Form>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <FormControl
                variant="outlined"
                className={classes.fieldContainer}
              >
                {/* <InputLabel htmlFor="category-box" id="category-label">
                  Select a Category
                </InputLabel> */}

                {/* <Field
                  className={classes.fieldContainer}
                  name="category"
                  type="select"
                  component={Select}
                  inputProps={{
                    id: 'category-box',
                    labelId: 'category-label'
                  }}
                  label="Select a category"
                  

                /> */}
                <Autocomplete
                  options={[
                    {
                      label: 'Query',
                      id: '1'
                    },
                    {
                      label: 'Request',
                      id: '2'
                    },
                    {
                      label: 'Complaint',
                      id: '3'
                    }
                  ]}
                  getOptionLabel={option => option.label}
                  // style={{ width: 400, overflow: "hidden" }}
                  getOptionSelected={(option, value) =>
                    value.id === option.id
                  }
                  key={option => option.id}
                  onChange={(event, value) =>
                    setFieldValue('category', value)

                  }
                  renderInput={params => (
                    <Field
                      component={TextField}
                      {...params}
                      label="Select a Type"
                      variant="outlined"
                      name="category"
                    />
                  )}
                  name="category"
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl
                variant="outlined"
                className={classes.fieldContainer}
              >
                {/* <InputLabel htmlFor="sub-category-box" id="sub-category-label">
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
                /> */}

                <Autocomplete
                  options={[
                    {
                      label: 'Activation',
                      id: '1'
                    },
                    {
                      label: 'Business Opening',
                      id: '2'
                    },
                    {
                      label: 'Free product',
                      id: '3'
                    },
                    {
                      label: 'GST',
                      id: '4'
                    },
                    {
                      label: 'ID related',
                      id: '5'
                    },
                    {
                      label: 'Incentive',
                      id: '6'
                    },
                    {
                      label: 'Insurance',
                      id: '7'
                    },
                    {
                      label: 'KYC',
                      id: '8'
                    },
                    {
                      label: 'Merchandise',
                      id: '9'
                    },
                    {
                      label: 'Order Related',
                      id: '10'
                    },
                    {
                      label: 'PINs',
                      id: '11'
                    },
                    {
                      label: 'Product',
                      id: '12'
                    },
                    {
                      label: 'Product delivery',
                      id: '13'
                    },
                    {
                      label: 'Profile',
                      id: '14'
                    },
                    {
                      label: 'PV , GV related',
                      id: '15'
                    },
                    {
                      label: 'Refund',
                      id: '16'
                    },
                    {
                      label: 'Rewards',
                      id: '17'
                    },
                    {
                      label: 'Schemes/Offer',
                      id: '18'
                    },
                    {

                      label: 'Virtual office',
                      id: '19'
                    }

                  ]}
                  getOptionLabel={option => option.label}
                  // style={{ width: 400, overflow: "hidden" }}
                  getOptionSelected={(option, value) =>
                    value.id === option.id
                  }
                  key={autoCompleteKey}
                  onChange={(event, value) =>
                    setFieldValue('subcategory', value)
                  }
                  renderInput={params => (
                    <Field
                      component={TextField}
                      {...params}
                      label="Select a cateqory"
                      variant="outlined"
                      name="subcategory"
                    />
                  )}
                  name="subcategory"
                />

              </FormControl>
            </Grid>
            <Grid item>
              {/* <Field
                className={classes.fieldContainer}
                name="solution"
                component={TextField}
                inputProps={{
                  label: 'Select provided solution'
                }}
                variant="outlined"
                label="Select provided solution"
              /> */}

              <Autocomplete
                options={[
                  {
                    id: "1",
                    label: "PCM Related",
                    subcategoryid: "1"
                  },
                  {
                    id: "2",
                    label: "VOTM Related",
                    subcategoryid: "1"
                  },
                  {
                    id: "3",
                    label: "Procedure",
                    subcategoryid: "2"
                  },
                  {
                    id: "4",
                    label: "Options",
                    subcategoryid: "3"
                  },
                  {
                    id: "5",
                    label: "Revert the option",
                    subcategoryid: "3"
                  },
                  {
                    id: "6",
                    label: "General Information",
                    subcategoryid: "4"
                  },
                  {
                    id: "7",
                    label: "Refund",
                    subcategoryid: "4"
                  },
                  {
                    id: "8",
                    label: "Clarification",
                    subcategoryid: "5"
                  },
                  {
                    id: "9",
                    label: "Duel ID",
                    subcategoryid: "5"
                  },
                  {
                    id: "10",
                    label: "ID reactivation",
                    subcategoryid: "5"
                  },
                  {
                    id: "11",
                    label: "Vacate ID",
                    subcategoryid: "5"
                  },
                  {
                    id: "12",
                    label: "General Information",
                    subcategoryid: "6"
                  },
                  {
                    id: "13",
                    label: "Not credited",
                    subcategoryid: "6"
                  },
                  {
                    id: "14",
                    label: "TDS related",
                    subcategoryid: "6"
                  },
                  {
                    id: "15",
                    label: "Claim Procedure",
                    subcategoryid: "7"
                  },
                  {
                    id: "16",
                    label: "Claims pending",
                    subcategoryid: "7"
                  },
                  {
                    id: "17",
                    label: "Genaral Information",
                    subcategoryid: "7"
                  },
                  {
                    id: "18",
                    label: "Insurance Card",
                    subcategoryid: "7"
                  },
                  {
                    id: "19",
                    label: "Policy Number",
                    subcategoryid: "7"
                  },
                  {
                    id: "20",
                    label: "Approval",
                    subcategoryid: "8"
                  },
                  {
                    id: "21",
                    label: "Change Bank Details",
                    subcategoryid: "8"
                  },
                  {
                    id: "22",
                    label: "Document Related",
                    subcategoryid: "8"
                  },
                  {
                    id: "23",
                    label: "Tax Exemption Certificate",
                    subcategoryid: "8"
                  },
                  {
                    id: "24",
                    label: "Wrongly updated, Correction",
                    subcategoryid: "8"
                  },
                  {
                    id: "25",
                    label: "General",
                    subcategoryid: "9"
                  },
                  {
                    id: "26",
                    label: "Approve Order",
                    subcategoryid: "10"
                  },
                  {
                    id: "27",
                    label: "Cancel Invoice",
                    subcategoryid: "10"
                  },
                  {
                    id: "28",
                    label: "Cancel Order",
                    subcategoryid: "10"
                  },
                  {
                    id: "29",
                    label: "General Information",
                    subcategoryid: "10"
                  },
                  {
                    id: "30",
                    label: "Invoice not generated",
                    subcategoryid: "10"
                  },
                  {
                    id: "31",
                    label: "PV limit related",
                    subcategoryid: "10"
                  },
                  {
                    id: "32",
                    label: "Rejected",
                    subcategoryid: "10"
                  },
                  {
                    id: "33",
                    label: "PIN not received",
                    subcategoryid: "11"
                  },
                  {
                    id: "34",
                    label: "Certificate Related",
                    subcategoryid: "12"
                  },
                  {
                    id: "35",
                    label: "General Information",
                    subcategoryid: "12"
                  },
                  {
                    id: "36",
                    label: "Stock Related",
                    subcategoryid: "12"
                  },
                  {
                    id: "37",
                    label: "change Shipping Address",
                    subcategoryid: "13"
                  },
                  {
                    id: "38",
                    label: "Courier Agency",
                    subcategoryid: "13"
                  },
                  {
                    id: "39",
                    label: "Delayed Delivery",
                    subcategoryid: "13"
                  },
                  {
                    id: "40",
                    label: "Dispatch Related",
                    subcategoryid: "13"
                  },
                  {
                    id: "41",
                    label: "Dispute",
                    subcategoryid: "13"
                  },
                  {
                    id: "42",
                    label: "Docket Number",
                    subcategoryid: "13"
                  },
                  {
                    id: "43",
                    label: "General Information",
                    subcategoryid: "13"
                  },
                  {
                    id: "44",
                    label: "International Shipment",
                    subcategoryid: "13"
                  },
                  {
                    id: "45",
                    label: "Non serviceable area",
                    subcategoryid: "13"
                  },
                  {
                    id: "46",
                    label: "Partial Delivery",
                    subcategoryid: "13"
                  },
                  {
                    id: "47",
                    label: "Product damaged",
                    subcategoryid: "13"
                  },
                  {
                    id: "48",
                    label: "Replacement",
                    subcategoryid: "13"
                  },
                  {
                    id: "49",
                    label: "RTO",
                    subcategoryid: "13"
                  },
                  {
                    id: "50",
                    label: "Wrong Delivery",
                    subcategoryid: "13"
                  },
                  {
                    id: "51",
                    label: "Sponsor Change",
                    subcategoryid: "14"
                  },
                  {
                    id: "52",
                    label: "Change of personal infomation",
                    subcategoryid: "14"
                  },
                  {
                    id: "53",
                    label: "Co-Applicant",
                    subcategoryid: "14"
                  },
                  {
                    id: "54",
                    label: "Carry Forward",
                    subcategoryid: "15"
                  },
                  {
                    id: "55",
                    label: "Procedure",
                    subcategoryid: "16"
                  },
                  {
                    id: "56",
                    label: "Claim Procedure",
                    subcategoryid: "17"
                  },
                  {
                    id: "57",
                    label: "Royalty not received",
                    subcategoryid: "17"
                  },
                  {
                    id: "58",
                    label: "Clarification",
                    subcategoryid: "18"
                  },
                  {
                    id: "59",
                    label: "Dispute",
                    subcategoryid: "18"
                  },
                  {
                    id: "60",
                    label: "Error",
                    subcategoryid: "19"
                  },
                  {
                    id: "61",
                    label: "ID Card /Welcome letter",
                    subcategoryid: "19"
                  }

                ]}
                getOptionLabel={option => option.label}
                // style={{ width: 400, overflow: "hidden" }}
                getOptionSelected={(option, value) =>
                  value.id === option.id
                }
                key={autoCompleteKey}
                onChange={(event, value) =>
                  setFieldValue('solution', value)
                }
                renderInput={params => (
                  <Field
                    component={TextField}
                    {...params}
                    label="Select a sub category"
                    variant="outlined"
                    name="solution"
                  />
                )}
                name="solution"
              />
            </Grid>
            <Grid item>
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
            <Grid item>
              <Field component={RadioGroup} name="type" row>
                <FormControlLabel value="FCR" control={<Radio />} label="FCR" />
                <FormControlLabel
                  value="raisedIssue"
                  control={<Radio />}
                  label="Raised Issue"
                />
                <FormControlLabel
                  value="closed"
                  control={<Radio />}
                  label="Closed"
                />
              </Field>
            </Grid>
          </Grid>
          <br />
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
