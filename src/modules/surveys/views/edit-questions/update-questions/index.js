import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import TextareaInput from '../../Questions/InputTypes/Textarea';
import RatingInput from '../../Questions/InputTypes/Rating';
import TextInput from '../../Questions/InputTypes/Text';
import MultiOptions from '../../Questions/InputTypes/MultiOptions';

const UpdateQuestions = ({ updateData: [prevData], newUpdatedValue }) => {
  const initialValue = {};
  const handleSubmit = values => {
    const localUpdateData = { ...prevData, ...values };
    console.log(localUpdateData);
    newUpdatedValue(localUpdateData);
  };

  const componentMap = {
    rating: RatingInput,
    textarea: TextareaInput,
    text: TextInput,
    radio: MultiOptions,
    select: MultiOptions,
    checkbox: MultiOptions
  };
  const renderQuestion = prevData => {
    if (prevData.questionType) {
      const comp = componentMap[prevData.questionType];
      return (
        <div key={prevData.questionId}>
          {React.createElement(comp, {
            question: prevData,
            submit: handleSubmit,
            isEdit: true,
            questionType: prevData.questionType
          })}
        </div>
      );
    }
    // switch (updateData.questionType) {
    //   case 'rating':
    //     return (
    //       <div key={updateData.questionId}>
    //         <RatingInput isEdit question={updateData} submit={handleSubmit} />
    //       </div>
    //     );
    //   case 'textarea':
    //     return (
    //       <div key={updateData.questionId}>
    //         <TextareaInput isEdit question={updateData} submit={handleSubmit} />
    //       </div>
    //     );
    //   case 'text':
    //     return (
    //       <div key={updateData.questionId}>
    //         <TextInput isEdit question={updateData} submit={handleSubmit} />
    //       </div>
    //     );
    //   case 'radio':
    //     return (
    //       <div key={updateData.questionId}>
    //         <MultiOptions isEdit question={updateData} submit={handleSubmit} />
    //       </div>
    //     );
    //   default:
    //     return true;
    // }
  };

  return (
    <div>
      {/* <Formik
        initialValues={initialValue}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(false);
          handleSubmit(values);
          resetForm();
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <br /> */}
      {renderQuestion(prevData)}
      {/* {isSubmitting}
          </Form>
        )}
      </Formik> */}
    </div>
  );
};

export default UpdateQuestions;
