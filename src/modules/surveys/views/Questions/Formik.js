// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import {
  Typography,
  createMuiTheme,
  ThemeProvider,
  Button,
  MenuItem,
  FormControl,
  makeStyles,
  withStyles,
  Grid,
  Paper,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { green, orange, purple } from '@material-ui/core/colors';
import { CheckBox } from '@material-ui/icons';
import { Formik, Form, Field } from 'formik';
import { CheckboxWithLabel, Select, TextField } from 'formik-material-ui';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import GenerateForm from './GenerateForm';
import CheckboxInput from './InputTypes/Checkbox';
import RatingInput from './InputTypes/Rating';
import TextInput from './InputTypes/Text';
import TextareaInput from './InputTypes/Textarea';
import RadioInput from './InputTypes/Radio';
import SelectInput from './InputTypes/Select';
import Axios from 'axios';
import Page from 'src/components/Page';
import { Autocomplete } from '@material-ui/lab';

const paragraphTheme = createMuiTheme({
  palette: {
    primary: orange
  }
});

const GenerateFormBtn = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700]
    }
  }
}))(Button);

const drawerWidth = '45%';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  appBar: {
    width: `calc(100% - ${drawerWidth})`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(5)
  },
  formControl: {
    minWidth: 200
  },
  cardActions: {
    height: '70%',
    flexGrow: 1
  }
}));

const FormFormik = () => {
  const formRef = useRef();

  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [textList, setTextList] = useState([]);
  const [radioInput, setRadioInput] = useState([]);
  const [questions, setQuestions] = useState({});
  const [input, setInput] = useState([]);

  let test = true;

  const handleClick = e => {
    if (e.target.value !== undefined) {
      setInputValue(e.target.value);
    }
  };

  const handleText = () => {
    let name = document.getElementById('textName').value;
    let label =
      inputValue === 'rating'
        ? inputValue
        : inputValue === 'radio'
        ? name.split(';')
        : name;
    if (name && label !== '') {
      setTextList([
        ...textList,
        {
          name: name,
          label: label,
          type: inputValue,
          row: document.getElementById('textNum')
            ? document.getElementById('textNum').value
            : null
        }
      ]);
    }
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  useEffect(() => {
    if (inputValue !== '') {
      // console.log(inputValue);
    }
    if (input.length !== 0) {
      // console.log('input', input);
    }
  }, [inputValue, input]);

  let inputs = [];

  const onAddData = data => {
    // inputs.push(data);
    // console.log("inputs , ", inputs);
    setInput([...input, data]);
  };

  const handleInputs = inputValue => {
    switch (inputValue) {
      case 'rating':
        return <RatingInput submit={onAddData} />;
      case 'textarea':
        return <TextareaInput submit={onAddData} />;
      case 'text':
        return <TextInput submit={onAddData} />;
      case 'checkbox':
        return <CheckboxInput submit={onAddData} />;
      case 'radio':
        return <RadioInput submit={onAddData} />;
      case 'select':
        return <SelectInput submit={onAddData} />;
      default:
        return inputValue;
    }
  };

  // const fakeData = { userId: 2, title: "title 1", body: "body 1" };

  // useEffect(() => {
  //   Axios.post("https://.typicode.com/posts", input)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(input);
  //     });
  // }, [inputValue]);

  function postQuestions() {
    Axios.post('/questions', input)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(input);
      });
  }

  return (
    <Page title="questions">
      <Box margin="1rem">
        <Grid container spacing={2}>
          <Grid xs={12} lg={5} item>
            <Card style={{ width: '100%' }}>
              <CardHeader title="Feedback Designer" />
              <Divider />
              <CardContent>
                <Formik
                  innerRef={formRef}
                  initialValues={{
                    select: '',
                    textName: '',
                    textLabel: '',
                    textNum: 3
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    // console.log(values);
                    // console.log('textList : ', textList);

                    // {
                    //   handleText;
                    // }
                    // console.log("onAddData : ", inputs);
                  }}
                  validationSchema={Yup.object({
                    select: Yup.string()
                      .oneOf(
                        [
                          'rating',
                          'textarea',
                          'text',
                          'checkbox',
                          'radio',
                          'select'
                        ],
                        'Unknown item'
                      )
                      .required('Required'),
                    textName: Yup.string().required('Please enter name'),
                    textLabel: Yup.string().required('Label required'),
                    textNum: Yup.number().required('Please add rows value')
                  })}
                >
                  {({ submitForm, isSubmitting }) => (
                    <Form>
                      <FormControl className={classes.formControl}>
                        <Field
                          component={TextField}
                          type="text"
                          name="select"
                          id="select"
                          select={true}
                          label="Select any 1"
                          variant="outlined"
                          size="medium"
                          onClick={handleClick}
                        >
                          <MenuItem value="" disabled>
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="rating">Rating</MenuItem>
                          <MenuItem value="textarea">Textarea</MenuItem>
                          <MenuItem value="text">Text</MenuItem>
                          <MenuItem value="checkbox">Checkbox</MenuItem>
                          <MenuItem value="radio">Radio</MenuItem>
                          <MenuItem value="select">Select</MenuItem>
                        </Field>
                      </FormControl>
                      {isSubmitting}
                      <br />
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        id="submit"
                        style={{ display: 'none' }}
                      >
                        Submit
                      </Button>
                    </Form>
                  )}
                </Formik>
                {inputValue && handleInputs(inputValue)}
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} lg={7} item>
            <Card style={{ width: '100%' }}>
              <CardHeader title="Survey Preview" />
              <Divider />
              <CardContent>
                {test ? (
                  <>
                    <GenerateForm inputs={input} />
                  </>
                ) : null}
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={() => {
                    if (input.length !== 0) {
                      postQuestions();
                    }
                  }}
                >
                  Save questions
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
};

export default FormFormik;
