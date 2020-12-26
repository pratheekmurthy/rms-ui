import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import TextareaInput from '../../Questions/InputTypes/Textarea';
import RatingInput from '../../Questions/InputTypes/Rating';
import TextInput from '../../Questions/InputTypes/Text';
import RadioInput from '../../Questions/InputTypes/NewRadio';

const UpdateQuestions = ({ updateData, newUpdatedValue }) => {
  const initialValue = {};

  const handleSubmit = values => {
    const localUpdateData = { ...updateData, ...values };
    newUpdatedValue(localUpdateData);
  };

  const componentMap = {
    rating: RatingInput,
    textarea: TextareaInput,
    text: TextInput,
    radio: RadioInput
  };
  const renderQuestion = updateData => {
    if (updateData.questionType) {
      const comp = componentMap[updateData.questionType];
      return (
        <div key={updateData.questionId}>
          {React.createElement(comp, {
            question: updateData,
            submit: handleSubmit,
            isEdit: true
          })}
          {/* <comp/> */}
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
    //         <RadioInput isEdit question={updateData} submit={handleSubmit} />
    //       </div>
    //     );
    //   default:
    //     return true;
    // }
  };

  return (
    <div>
      <Formik
        initialValues={initialValue}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(false);
          handleSubmit(values);
          resetForm();
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <br />
            {renderQuestion(updateData)}
            {isSubmitting}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateQuestions;
