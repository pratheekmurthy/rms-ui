import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Grid, Fade, IconButton, Tooltip } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import AddIcon from '@material-ui/icons/Add';

const RadioInput = ({ submit, isEdit, question }) => {
  const [inputsData] = useState(isEdit ? question : {});
  console.log('Question : ', question);
  const [initState, setinitState] = useState(null);
  useEffect(() => {
    if (isEdit) {
      setinitState({
        name: question.questionName,
        label: question.label,
        value: question.options.map(question => question.value)
      });
    } else {
      setinitState({
        name: '',
        label: ''
      });
    }
  }, []);

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
            <Grid item xs={5}>
              <Field
                component={TextField}
                name={'value' + val}
                id={'value' + val}
                type="text"
                label="Radio Value"
                autoComplete="off"
                defaultValue={isEdit ? question.options[count - 1].value : null}
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                component={TextField}
                name={'label' + val}
                id={'label' + val}
                type="text"
                label="label"
                autoComplete="off"
                defaultValue={isEdit ? question.options[count - 1].label : null}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    ));
  };

  useEffect(() => {
    console.log('submit values : ', submitValues.values);
    if (submitValues.values) {
      let name = '';
      let label = '';
      let optionLabelArray = [];
      let optionValueArray = [];
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
            optionLabelArray.push(submitValues.values[data]);
          } else {
            optionValueArray.push(submitValues.values[data]);
          }
        }
      }

      for (let i = 0; i < optionLabelArray.length; i++) {
        optionList.push({
          label: optionLabelArray[i],
          value: optionValueArray[i]
        });
      }
      if (name !== '' && label !== '') {
        inputsData.questionType = 'radio';
        inputsData.questionName = name;
        inputsData.label = label;
        inputsData.options = optionList;
        submit(inputsData);
      }
    }
  }, [submitValues]);

  const handleOptions = () => {
    const obj = { ...initState };
    obj['label' + count] = '';
    obj['value' + count] = '';

    setCount(count + 1);
    setinitState(obj);
  };
  return (
    !!initState && (
      <>
        <Formik
          initialValues={initState}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(false);
            setSubmitValues({ values });
            if (!isEdit) {
              resetForm();
            }
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
                  <Grid item xs={5}>
                    <Field
                      component={TextField}
                      name="name"
                      id="name"
                      type="text"
                      label="Radio Name"
                      autoComplete="off"
                      disabled={isEdit}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      component={TextField}
                      name="label"
                      id="label"
                      type="text"
                      label="label"
                      autoComplete="off"
                    />
                  </Grid>
                </Grid>
              </Grid>
              {count > 0 ? addOptions() : null}
              <br />
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
                  <Grid item xs={5}>
                    <Tooltip
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                      title="Add Options"
                      aria-label="Add Options"
                      placement="bottom"
                      style={{ marginLeft: '25%', marginTop: '-5%' }}
                    >
                      <IconButton
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={handleOptions}
                        disabled={isEdit && question.options.length <= count}
                      >
                        <AddIcon fontSize="large" />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={4}>
                    {isSubmitting}

                    <Button
                      variant="contained"
                      color={isEdit ? 'primary' : 'inherit'}
                      onClick={submitForm}
                    >
                      {isEdit ? 'Update' : 'Add Data'}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </>
    )
  );
};

export default RadioInput;

// import React, { useEffect, useState } from 'react';
// import { Formik, Form, Field } from 'formik';
// import { Button, Grid, Fade, IconButton, Tooltip } from '@material-ui/core';
// import { TextField } from 'formik-material-ui';
// import * as Yup from 'yup';
// import AddIcon from '@material-ui/icons/Add';

// const RadioInput = ({ submit, isEdit, question }) => {
//   const [inputsData] = useState(isEdit ? question : {});
//   console.log('Question : ', question);
//   const [initState, setinitState] = useState(null);
//   useEffect(() => {
//     if (isEdit) {
//       setinitState({
//         name: question.questionName,
//         label: question.label,
//         value: question.options.map(question => question.value)
//       });
//     } else {
//       setinitState({
//         name: '',
//         label: ''
//       });
//     }
//   }, []);

//   const [count, setCount] = useState(0);
//   const [submitValues, setSubmitValues] = useState({});
//   const addOptions = () => {
//     return new Array(count).fill().map((_, val) => (
//       <div key={val}>
//         <Grid
//           container
//           direction="column"
//           justify="center"
//           alignItems="flex-start"
//         >
//           <Grid
//             container
//             direction="row"
//             justify="flex-start"
//             alignItems="flex-start"
//             spacing={10}
//           >
//             <Grid item xs={5}>
//               <Field
//                 component={TextField}
//                 name={'value' + val}
//                 id={'value' + val}
//                 type="text"
//                 label="Radio Value"
//                 autoComplete="off"
//                 defaultValue={isEdit ? question.options[count - 1].value : null}
//               />
//             </Grid>
//             <Grid item xs={4}>
//               <Field
//                 component={TextField}
//                 name={'label' + val}
//                 id={'label' + val}
//                 type="text"
//                 label="label"
//                 autoComplete="off"
//                 defaultValue={isEdit ? question.options[count - 1].label : null}
//               />
//             </Grid>
//           </Grid>
//         </Grid>
//       </div>
//     ));
//   };

//   useEffect(() => {
//     console.log('submit values : ', submitValues.values);
//     if (submitValues.values) {
//       let name = '';
//       let label = '';
//       let optionLabelArray = [];
//       let optionValueArray = [];
//       let optionList = [];
//       for (let data in submitValues.values) {
//         if (data === 'name') {
//           name = submitValues.values[data];
//         }
//         if (data === 'label') {
//           label = submitValues.values[data];
//         }
//         if (data !== 'name' && data !== 'label') {
//           if (data.slice(0, 1) === 'l') {
//             optionLabelArray.push(submitValues.values[data]);
//           } else {
//             optionValueArray.push(submitValues.values[data]);
//           }
//         }
//       }

//       for (let i = 0; i < optionLabelArray.length; i++) {
//         optionList.push({
//           label: optionLabelArray[i],
//           value: optionValueArray[i]
//         });
//       }
//       if (name !== '' && label !== '') {
//         inputsData.questionType = 'radio';
//         inputsData.questionName = name;
//         inputsData.label = label;
//         inputsData.options = optionList;
//         submit(inputsData);
//       }
//     }
//   }, [submitValues]);

//   const handleOptions = () => {
//     const obj = { ...initState };
//     obj['label' + count] = '';
//     obj['value' + count] = '';

//     setCount(count + 1);
//     setinitState(obj);
//   };
//   return (
//     !!initState && (
//       <>
//         <Formik
//           initialValues={initState}
//           onSubmit={(values, { setSubmitting, resetForm }) => {
//             setSubmitting(false);
//             setSubmitValues({ values });
//             if (!isEdit) {
//               resetForm();
//             }
//           }}
//           validationSchema={Yup.object({
//             name: Yup.string().required('Please enter name'),
//             label: Yup.string().required('Label required')
//           })}
//         >
//           {({ submitForm, isSubmitting }) => (
//             <Form>
//               <Grid
//                 container
//                 direction="column"
//                 justify="center"
//                 alignItems="flex-start"
//               >
//                 <Grid
//                   container
//                   direction="row"
//                   justify="flex-start"
//                   alignItems="flex-start"
//                   spacing={10}
//                 >
//                   <Grid item xs={5}>
//                     <Field
//                       component={TextField}
//                       name="name"
//                       id="name"
//                       type="text"
//                       label="Radio Name"
//                       autoComplete="off"
//                       disabled={isEdit}
//                     />
//                   </Grid>
//                   <Grid item xs={4}>
//                     <Field
//                       component={TextField}
//                       name="label"
//                       id="label"
//                       type="text"
//                       label="label"
//                       autoComplete="off"
//                     />
//                   </Grid>
//                 </Grid>
//               </Grid>
//               {count > 0 ? addOptions() : null}
//               <br />
//               <Grid
//                 container
//                 direction="column"
//                 justify="center"
//                 alignItems="flex-start"
//               >
//                 <Grid
//                   container
//                   direction="row"
//                   justify="flex-start"
//                   alignItems="flex-start"
//                   spacing={10}
//                 >
//                   <Grid item xs={5}>
//                     <Tooltip
//                       TransitionComponent={Fade}
//                       TransitionProps={{ timeout: 600 }}
//                       title="Add Options"
//                       aria-label="Add Options"
//                       placement="bottom"
//                       style={{ marginLeft: '25%', marginTop: '-5%' }}
//                     >
//                       <IconButton
//                         type="button"
//                         variant="contained"
//                         color="primary"
//                         onClick={handleOptions}
//                         disabled={isEdit && question.options.length <= count}
//                       >
//                         <AddIcon fontSize="large" />
//                       </IconButton>
//                     </Tooltip>
//                   </Grid>
//                   <Grid item xs={4}>
//                     {isSubmitting}

//                     <Button
//                       variant="contained"
//                       color={isEdit ? 'primary' : 'inherit'}
//                       onClick={submitForm}
//                     >
//                       {isEdit ? 'Update' : 'Add Data'}
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Form>
//           )}
//         </Formik>
//       </>
//     )
//   );
// };

// export default RadioInput;
