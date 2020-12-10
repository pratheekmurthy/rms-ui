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
} from "@material-ui/core";
import { green, orange, purple } from "@material-ui/core/colors";
import { CheckBox } from "@material-ui/icons";
import { Formik, Form, Field } from "formik";
import { CheckboxWithLabel, Select, TextField } from "formik-material-ui";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import GenerateForm from "./GenerateForm";
import CheckboxInput from "./InputTypes/Checkbox";
import RatingInput from "./InputTypes/Rating";
import TextInput from "./InputTypes/Text";
import TextareaInput from "./InputTypes/Textarea";
import RadioInput from "./InputTypes/Radio";
import SelectInput from "./InputTypes/Select";
import Axios from "axios";

const paragraphTheme = createMuiTheme({
  palette: {
    primary: orange,
  },
});

const GenerateFormBtn = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    minWidth: 200,
  },
}));

const FormFormik = () => {
  const formRef = useRef();

  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [textList, setTextList] = useState([]);
  const [radioInput, setRadioInput] = useState([]);
  const [questions, setQuestions] = useState({});
  const [input, setInput] = useState([]);

  let test = true;

  const handleClick = (e) => {
    if (e.target.value !== undefined) {
      setInputValue(e.target.value);
    }
  };

  const handleText = () => {
    let name = document.getElementById("textName").value;
    let label =
      inputValue === "rating"
        ? inputValue
        : inputValue === "radio"
        ? name.split(";")
        : name;
    if (name && label !== "") {
      setTextList([
        ...textList,
        {
          name: name,
          label: label,
          type: inputValue,
          row: document.getElementById("textNum")
            ? document.getElementById("textNum").value
            : null,
        },
      ]);
    }
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  useEffect(() => {
    if (inputValue !== "") {
      console.log(inputValue);
    }
    if (input.length !== 0) {
      console.log("input", input);
    }
  }, [inputValue, input]);

  let inputs = [];

  const onAddData = (data) => {
    // inputs.push(data);
    // console.log("inputs , ", inputs);
    setInput([...input, data]);
  };

  const handleInputs = (inputValue) => {
    switch (inputValue) {
      case "rating":
        return <RatingInput submit={onAddData} />;
      case "textarea":
        return <TextareaInput submit={onAddData} />;
      case "text":
        return <TextInput submit={onAddData} />;
      case "checkbox":
        return <CheckboxInput submit={onAddData} />;
      case "radio":
        return <RadioInput submit={onAddData} />;
      case "select":
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
    Axios.post("https://.typicode.com/posts", input)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(input);
      });
  }

  return (
    <>
      <div>
        <Formik
          innerRef={formRef}
          initialValues={{
            select: "",
            textName: "",
            textLabel: "",
            textNum: 3,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            console.log(values);
            console.log("textList : ", textList);
            {
              handleText;
            }
            // console.log("onAddData : ", inputs);
          }}
          validationSchema={Yup.object({
            select: Yup.string()
              .oneOf(
                ["rating", "textarea", "text", "checkbox", "radio", "select"],
                "Unknown item"
              )
              .required("Required"),
            textName: Yup.string().required("Please enter name"),
            textLabel: Yup.string().required("Label required"),
            textNum: Yup.number().required("Please add rows value"),
          })}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
                className={classes.root}
              >
                <Typography
                  variant="h5"
                  component="h6"
                  color="secondary"
                  align="center"
                >
                  Questions
                </Typography>
                <br />

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
                  style={{ display: "none" }}
                >
                  Submit
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>

        {inputValue && handleInputs(inputValue)}

        {/* {inputValue === "text" ? (
          <>
            <TextInput />
          </>
        ) : null} */}

        {/* {inputValue === "rating" ? (
          <>
            <Grid item>
              <Field
                component={TextField}
                name="textName"
                id="textName"
                type="text"
                label="Rating Name"
              />
            </Grid>
            <br />
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={handleText}
            >
              Add Question
            </Button> 
            <RatingInput />
          </>
        ) : null} */}

        {/* {inputValue === "textarea" ? (
          <>
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
                className={classes.root}
              >
                <Grid item xs={3}>
                  <Field
                    component={TextField}
                    name="textName"
                    id="textName"
                    type="text"
                    label="Textarea Name"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    component={TextField}
                    name="textLabel"
                    id="textLabel"
                    type="text"
                    label="Label"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    component={TextField}
                    name="textNum"
                    id="textNum"
                    type="number"
                    label="Rows"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={handleText}
            >
              Add data
            </Button>
          </>
        ) : null} */}

        {/* {inputValue === "checkbox" ? (
          <>
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
                className={classes.root}
              >
                <Grid item xs={5}>
                  <Field
                    component={TextField}
                    name="textName"
                    id="textName"
                    type="text"
                    label="Checkbox Name"
                  />
                </Grid>
                <Grid item xs={5}>
                  <Field
                    component={TextField}
                    name="textLabel"
                    id="textLabel"
                    type="text"
                    label="Label"
                  />
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={handleText}
            >
              Add data
            </Button>
          </>
        ) : null} */}

        {/* {inputValue === "radio" ? (
          <>
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                className={classes.root}
              >
                <Grid item xs={4}>
                  <Field
                    component={TextField}
                    name="textName"
                    id="textName"
                    type="text"
                    label="Radio Name"
                  />
                </Grid>
                <Grid item xs={7}>
                  <Field
                    component={TextField}
                    name="textLabel"
                    id="textLabel"
                    type="text"
                    label="Options"
                    placeholder="separate by ;"
                  />
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={handleText}
            >
              Add data
            </Button>
          </>
        ) : null} */}

        <br />
        <br />
        <div>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <GenerateFormBtn
              variant="contained"
              color="secondary"
              type="button"
              onClick={() => {
                if (input.length !== 0) {
                  postQuestions();
                }
              }}
            >
              Save questions
            </GenerateFormBtn>
          </Grid>
          {test ? (
            <>
              <GenerateForm inputs={input} />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default FormFormik;
