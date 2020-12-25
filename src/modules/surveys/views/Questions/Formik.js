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
  IconButton,
  ButtonGroup
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import GenerateForm from './GenerateForm';
import CheckboxInput from './InputTypes/Checkbox';
import RatingInput from './InputTypes/Rating';
import TextInput from './InputTypes/Text';
import TextareaInput from './InputTypes/Textarea';
// import RadioInput from './InputTypes/Radio';
import RadioInput from './InputTypes/NewRadio';
import SelectInput from './InputTypes/Select';
import Axios from 'axios';
import Page from 'src/components/Page';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

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

const FormFormik = props => {
  const formRef = useRef();

  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [textList, setTextList] = useState([]);
  const [input, setInput] = useState([]);

  let test = true;

  const handleClick = e => {
    if (e.target.value !== undefined) {
      setInputValue(e.target.value);
    }
  };

  // const handleText = () => {
  //   let name = document.getElementById('textName').value;
  //   let label =
  //     inputValue === 'rating'
  //       ? inputValue
  //       : inputValue === 'radio'
  //       ? name.split(';')
  //       : name;
  //   if (name && label !== '') {
  //     setTextList([
  //       ...textList,
  //       {
  //         name: name,
  //         label: label,
  //         type: inputValue,
  //         row: document.getElementById('textNum')
  //           ? document.getElementById('textNum').value
  //           : null
  //       }
  //     ]);
  //   }
  //   if (formRef.current) {
  //     formRef.current.handleSubmit();
  //   }
  // };

  const onAddData = data => {
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
        return null;
    }
  };

  // function postQuestions() {
  //   Axios.post('/survey/questions', input)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(input);
  //     });
  // }

  async function postQuestions() {
    try {
      const res = await Axios['post']('/survey/questions', input);
      props.history.push({
        pathname: '/surveys/questions',
        state: 'create'
      });
    } catch (err) {
      console.log(err);
    }
  }

  // async function saveQuestion() {
  //   try {
  //     const res = await Axios['patch'](
  //       `/survey/question/${props.match.params.questionId}`,
  //       questions
  //     );
  //     props.history.push({
  //       pathname: '/surveys/questions',
  //       state: 'update'
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const handleDelete = data => {
    let filterInput = input.filter(currentObj => currentObj !== data);
    setInput(filterInput);
  };

  return (
    <Page title="questions">
      <Box margin="0.5rem 0 0 1rem">
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button>
            <Link to="/surveys/questions">View Questions</Link>
          </Button>
          <Button>
            <Link to="/surveys/edit">Edit Questions</Link>
          </Button>
        </ButtonGroup>
      </Box>
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
                          label="Select question"
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
                {!!input.length &&
                  input.map((data, index) => (
                    <div>
                      <ListItem
                        key={index}
                        style={{ marginTop: '-1%', marginLeft: '-4%' }}
                      >
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={() => {
                            handleDelete(data);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <ListItemText
                          primary={data.label}
                          style={{ marginLeft: '1%' }}
                        />
                      </ListItem>
                    </div>
                  ))}
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
