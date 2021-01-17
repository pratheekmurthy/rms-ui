import {
  Button,
  MenuItem,
  FormControl,
  makeStyles,
  Grid,
  Box,
  List,
  Card,
  CardHeader,
  CardContent,
  Divider,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import GenerateForm from './GenerateForm';
import RatingInput from './InputTypes/Rating';
import TextInput from './InputTypes/Text';
import TextareaInput from './InputTypes/Textarea';
import Axios from 'axios';
import Page from 'src/components/Page';
import DeleteIcon from '@material-ui/icons/Delete';
import MultiOptions from './InputTypes/MultiOptions';
import { CRUD_QUESTIONS } from '../../utils/endpoints';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
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
  },
  container: {
    width: 400,
    position: 'relative'
  },
  listItem: {
    paddingRight: theme.spacing(5)
  },
  cardcontent: {
    '&:last-child': {
      paddingBottom: 0
    }
  }
}));

const FormFormik = props => {
  const formRef = useRef();

  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [input, setInput] = useState([]);

  const handleClick = e => {
    if (e.target.value !== undefined) {
      setInputValue(e.target.value);
    }
  };
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
        return <MultiOptions submit={onAddData} questionType="checkbox" />;
      case 'radio':
        return <MultiOptions submit={onAddData} questionType="radio" />;
      case 'select':
        return <MultiOptions submit={onAddData} questionType="select" />;
      default:
        return null;
    }
  };

  async function postQuestions() {
    try {
      await Axios.post(CRUD_QUESTIONS, input);
      props.history.push({
        pathname: '/surveys/questions',
        state: 'create'
      });
    } catch (err) {
      console.log(err);
    }
  }

  const handleDelete = data => {
    let filterInput = input.filter(currentObj => currentObj !== data);
    setInput(filterInput);
  };

  return (
    <Page title="questions">
      {/* <Box margin="0.5rem 0 0 1rem">
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button>
            <Link to="/surveys/questions">View Questions</Link>
          </Button>
          <Button>
            <Link to="/surveys/edit">Edit Questions</Link>
          </Button>
        </ButtonGroup>
      </Box> */}
      <Box margin="1rem">
        <Grid container spacing={2}>
          <Grid xs={12} lg={6} item>
            <Card style={{ width: '100%' }}>
              <CardHeader title="Feedback Designer" />
              <Divider />
              <CardContent className={classes.cardcontent}>
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
                <List component="nav" aria-label="main mailbox folders">
                  {!!input.length &&
                    input.map((data, index) => (
                      <div key={input + 'formik'}>
                        <ListItem
                          key={index}
                          classes={{
                            container: classes.container,
                            root: classes.listItem
                          }}
                        >
                          <ListItemText primary={data.label} />
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => handleDelete(data)}
                            >
                              <DeleteIcon color="secondary" />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </div>
                    ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} lg={6} item>
            <Card style={{ width: '100%' }}>
              <CardHeader title="Questions Preview" />
              <Divider />
              <CardContent>
                <>
                  <GenerateForm input={input} />
                </>
                {!!input.length && (
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
                    Save Questions
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
};

export default FormFormik;
